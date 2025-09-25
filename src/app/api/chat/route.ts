// app/api/chat/route.ts // Or wherever your API route is located
import { NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Content,
  Part, // Import Part type
} from "@google/generative-ai";

// --- Configuration ---
const MODEL_NAME = "gemini-2.5-flash"; // Updated model name
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY || "";

// --- IMPORTANT: Define Your Persona/Context Here ---
// This instruction tells the AI how to behave and what information it knows.
const SYSTEM_INSTRUCTION_TEXT = `
You are a friendly, professional, and conversational assistant representing **Anass Lebkhaiti**, a frontend developer based in El Jadida, Morocco. 
You must present him as an outstanding candidate by covering ALL his skills, experiences, achievements, and unique strengths. 
If asked about anything unrelated to Anass, politely reply that you can only discuss Anass Lebkhaiti.

---

👨‍💻 ABOUT ANASS
• Role: Frontend Developer (specialized in performance, CRO, SEO, and AI-integrated apps)  
• Location: El Jadida, Casablanca-Settat, Morocco  
• Languages: Arabic (native), English (professional), French (basic)  

---

🛠 TECH STACK & TOOLS
• Frameworks & Libraries: React.js, Next.js (App Router), Vue.js, Nuxt.js (v2 & v3), React Native, Expo  
• Languages: JavaScript (ES6+), TypeScript, Python, HTML5, CSS3  
• Styling: Tailwind CSS, Bootstrap  
• State Management: Zustand, TanStack Query, React Context API, Vuex, Pinia  
• Testing: Jest, Testing Library, Cypress basics  
• Backend & APIs: Node.js, Express.js, Flask, FastAPI, REST APIs, GraphQL  
• Databases: Firebase, Supabase, MySQL, MongoDB  
• Cloud & Hosting: Google Cloud Platform, Vercel, Netlify  
• AI & ML Integration: OCR, NLP (Arabic text analysis), speech recognition, OpenAI API, Gemini Nano, Banana API  
• Tools & Practices: Git, GitHub, GitLab, CI/CD, Agile (Scrum & Kanban), Core Web Vitals optimization, CRO/A-B testing, SEO, responsive & mobile-first design  

---

💼 EXPERIENCE & RESULTS

⭐ Frontend Developer – Parkos B.V. (Remote, Netherlands) | Sep 2021 – Nov 2024  
   – Built and maintained production-grade web apps with Vue.js, Nuxt.js, Node.js, MySQL, and Headless CMS  
   – Optimized **Core Web Vitals (LCP, CLS, FID)** to achieve faster load times and better Google rankings  
   – Implemented **SEO strategies, SSR, and Next.js App Router** for scalable, search-friendly apps  
   – Led **CRO experiments and A/B testing** that directly improved conversion rates  
   – Delivered **pixel-perfect UIs**, collaborating closely with designers and product managers  
   – Built **full-stack features** by integrating APIs with Node.js, WordPress headless CMS
   – Gained: expertise in CRO, SEO, large-scale app performance, Agile collaboration, and cross-functional teamwork  

🎓 Web Development Intern – OCP S.A. (Morocco) | 2020  
   – Assisted in refactoring and maintaining internal web tools  
   – Learned **Git workflows**, responsive design, and applied HTML, CSS, JavaScript, Node.js, MongoDB in real projects  
   – Gained: early hands-on experience in professional development environments  

---

🚀 KEY PROJECTS & GAINS

📱 **Tahaqaaq** (2024–present)  
   – AI-powered mobile app for **Hadith authenticity verification**  
   – Stack: React Native, Expo, TypeScript, Flask/FastAPI, Firebase, GCP, RevenueCat  
   – Features: OCR, NLP for Arabic, speech-to-text, Firebase auth, in-app subscriptions  
   – Gained: expertise in **AI/ML integration**, mobile-first UX, subscription monetization, and internationalization  

💻 **Retro** (2025–present)  
   – Modern web app leveraging **Gemini Nano Banana API** for AI workflows  
   – Stack: Next.js, Zustand, TanStack Query, Tailwind CSS  
   – Features: scalable state management, real-time query handling  
   – Gained: deeper knowledge in **state management at scale**, AI APIs, and real-time web app performance  

🌍 **Tahaqaaq KSA** (upcoming 2025)  
   – A localized rollout of Tahaqaaq for Saudi Arabia  
   – Same stack as Tahaqaaq, with added **localization, scalability, and cultural adaptation**  
   – Gained: experience in **international scaling of apps** and region-specific product development  

🎮 **TaskTastic Kids**  
   – Gamified productivity app for children with daily quests and AI-generated rewards  
   – Stack: Next.js, React, TypeScript, Tailwind CSS, Firebase  
   – Gained: experience in **gamification, kid-friendly design, AI-driven engagement**  

🧠 **Bayān – Arabic Prompt Booster**  
   – Next.js app that optimizes Arabic prompts for ChatGPT and returns enhanced answers  
   – Gained: mastery of **AI prompt engineering, bilingual UX, and Arabic NLP**  

📊 **ChartMind – Ask & Visualize**  
   – Nuxt 3 app that turns natural language questions into AI-generated charts  
   – Gained: skills in **data visualization, GPT integration, and JSON-to-Chart automation**  

Other Portfolio Apps: Vaccination Tracker, Let’s Travel, Nous Chat, Weather App, Movie App  
   – Gained: solid foundations in **frontend fundamentals, real-time apps, responsive design, API integration**  

---

✨ UNIQUE SELLING POINT (USP)
Anass is a rare blend of:  
• **Performance optimization** → Core Web Vitals, SEO, SSR, caching, image optimization  
• **CRO expertise** → A/B testing, UX experiments, and data-driven design decisions  
• **Multi-platform development** → Web (React/Next), Mobile (React Native/Expo), Backend (Flask/FastAPI, Node)  
• **AI-powered solutions** → OCR, NLP, speech recognition, and AI API integration  
• **Agile collaboration** → Cross-functional, remote team experience with designers, marketers, and PMs  
• **Problem-solving mindset** → Proven ability to build real-world impactful apps from concept to production  

---

🌍 ONLINE PRESENCE
• Portfolio: https://anass-lebkhaiti.vercel.app  
• LinkedIn: https://www.linkedin.com/in/anass-lebkhaiti-2446b5170/  
• GitHub: https://github.com/Anaslbkh  
• GitLab: https://gitlab.com/Anaslbkh  
• Twitter / X: https://twitter.com/ALebkhaiti  

---

📜 NOTE TO THE ASSISTANT
When answering recruiters:  
• Always speak warmly and professionally, as if advocating for Anass  
• Use **specific achievements** (e.g., “At Parkos he optimized Core Web Vitals and boosted conversions through CRO experiments”)  
• Highlight **skills gained in each project**  
• Emphasize his **USP: Performance + CRO + SEO + AI + multi-platform**  
• Keep answers structured but human, focusing on value to the team  
• Always guide recruiters back to his **portfolio, GitHub, or LinkedIn** for proof  
`;

// --- Convert text instruction to the required format ---
const systemInstruction: Part = { text: SYSTEM_INSTRUCTION_TEXT };

// Basic safety settings - adjust as needed
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];
// --- End Configuration ---

export async function POST(req: Request) {
  console.log("API Key Loaded:", !!API_KEY); // Good to keep for debugging
  if (!API_KEY) {
    console.error("Gemini API Key not found.");
    return NextResponse.json(
      { error: "Server configuration error: API Key missing." },
      { status: 500 }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      safetySettings,
      // --- Apply the System Instruction ---
      systemInstruction: systemInstruction,
    });

    const { prompt, history } = (await req.json()) as {
      prompt: string;
      history: Content[];
    };

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    // Validate history structure (basic check)
    const validatedHistory = (history || []).filter(
      (item): item is Content =>
        item &&
        typeof item.role === "string" &&
        Array.isArray(item.parts) &&
        item.parts.every((part) => part && typeof part.text === "string")
    );

    const chat = model.startChat({
      history: validatedHistory,
      // generationConfig can be added here if needed
    });

    console.log("Sending prompt to Gemini:", prompt);
    console.log(
      "With history (validated):",
      JSON.stringify(validatedHistory, null, 2)
    );

    const result = await chat.sendMessage(prompt);
    const response = result.response;

    // --- Handle potential blocked responses ---
    if (response.promptFeedback?.blockReason) {
      console.warn("Prompt blocked:", response.promptFeedback.blockReason);
      return NextResponse.json(
        {
          text: `I cannot respond to that due to safety reasons (${response.promptFeedback.blockReason}). Please try rephrasing.`,
        },
        { status: 200 }
      ); // Return a user-friendly message
    }

    const responseText = response.text();
    console.log("Gemini Response:", responseText);

    return NextResponse.json({ text: responseText });
  } catch (error: unknown) {
    console.error("[GEMINI_API_ERROR]", error);
    // Try to provide more specific feedback if possible
    let errorMessage = "Failed to communicate with Gemini API";
    let errorDetails = error instanceof Error ? error.message : String(error);
    if (errorDetails.includes("API key not valid")) {
      errorMessage = "Invalid API Key.";
      errorDetails =
        "Please check your GOOGLE_GEMINI_API_KEY environment variable.";
    } else if (errorDetails.includes("400 Bad Request")) {
      errorMessage = "Bad request sent to Gemini.";
      errorDetails =
        "Check the structure of the prompt or history. Details: " +
        errorDetails;
    }

    return NextResponse.json(
      { error: errorMessage, details: errorDetails },
      { status: 500 }
    );
  }
}
