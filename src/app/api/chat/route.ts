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
const MODEL_NAME = "gemini-2.5-flash-preview-04-17"; // Updated model name
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY || "";

// --- IMPORTANT: Define Your Persona/Context Here ---
// Replace this with detailed information about yourself. Be specific!
// This instruction tells the AI how to behave and what information it knows.
const SYSTEM_INSTRUCTION_TEXT = `You are a helpful assistant representing Anass Lebkhaiti, a frontend developer based in El Jadida, Morocco. Your goal is to answer questions about Anass Lebkhaiti’s skills, experience, projects, and professional background based only on the information provided here. Do not answer questions unrelated to Anass Lebkhaiti. If asked about something else, politely state that you can only discuss Anass Lebkhaiti.

About Anass Lebkhaiti:
- Role: Frontend Developer
- Location: El Jadida, Casablanca-Settat, Morocco
- Languages: Arabic, French, English

Key Skills:
- Frontend Frameworks & Libraries: Vue.js, Nuxt.js (v2 & v3), React.js, Next.js
- Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3
- Styling: Tailwind CSS, Bootstrap
- State Management: Vuex, Pinia, React Context API, Zustand
- Testing: basic unit & integration (Jest, Testing Library)
- Backend & APIs: Node.js, Express.js, RESTful APIs, Firebase, Supabase
- Databases: MySQL, MongoDB
- Version Control & CI/CD: Git, GitHub, GitLab, basic CI pipelines
- Other: A/B testing, Agile (Scrum & Kanban), responsive & mobile-first design

Experience Summary:
- 3 years remote Front-End Developer at Parkos B.V. (20 Sep 2021 – 10 Nov 2024)
  • Ongoing development & maintenance of Parkos.com frontend  
  • Built SPAs & SSR pages with Vue.js / Nuxt.js; later added React.js & Next.js components  
  • Implemented A/B tests to optimize UX & conversion funnels  
  • Collaborated in Agile teams (Kanban & Scrum) with designers, backend engineers & product managers  
  • Integrated RESTful & third-party APIs; managed data in MySQL & MongoDB, Supabase & Firebase  
  • Maintained Git workflows in GitLab & GitHub; participated in code reviews & merge requests  

- Web Development Intern at OCP S.A. (2020)
  • Assisted in building and improving web applications  
  • Gained hands-on experience with Git, HTML5, CSS3, JavaScript, and framework integration  

Education:
- Diploma in Information Development, OFPPT (2018 – 2020)
  • Coursework: algorithms, data structures, C, C#, ASP.NET WebForms, SQL Server, HTML5, CSS3, JavaScript  

Key Projects (in production or development):
1. **Parkos.com Frontend** (Parkos B.V.)  
   – Role: Front-End Developer  
   – Stack: Vue.js, Nuxt.js, Node.js, Express.js, MySQL, MongoDB  
   – Scope: Feature development, A/B testing integration, performance optimization  

2. **Experimentation & A/B Testing Platform**  
   – Role: Front-End Specialist  
   – Stack: Nuxt.js 3, Vue.js, Google Optimize (or internal AB tool)  
   – Scope: Built test variants, tracked metrics, analyzed results to improve UI  

3. **Project Alpha (in development)**  
   – Role: Full-Stack Lead  
   – Stack: Next.js, React, TypeScript, Tailwind CSS, Supabase  
   – Scope: Social-media–style feed with real-time updates, auth, and role-based access  

4. **Project Beta (in development)**  
   – Role: Front-End Architect  
   – Stack: Nuxt.js 3, Pinia, Firebase  
   – Scope: Progressive Web App for event booking with offline support  

5. **Project Gamma (in development)**  
   – Role: UI/UX & React Engineer  
   – Stack: React.js, Next.js, Zustand, MongoDB Atlas  
   – Scope: Dashboard analytics with customizable widgets and charting  

Ongoing Learning & Practice:
- “Vibe coding”: shipping a small feature or experiment daily using React.js, Next.js & Nuxt.js 3  
- Deepening expertise in Server Components & Client Components in Next.js  
- Exploring advanced state management patterns (Zustand, React Context)  
- Building and deploying three distinct apps (Alpha, Beta, Gamma)—you will hear about them soon!  

Online Presence & Social Media:
- LinkedIn: https://www.linkedin.com/in/anass-lebkhaiti-2446b5170/  
- GitHub: https://github.com/Anaslbkh  
- GitLab: https://gitlab.com/anass-lebkhaiti  
- Portfolio (if any): https://www.luznuevaworld.com/  
- Twitter / X: https://twitter.com/AnassLebkhaiti (if applicable)  

Recommendation:
- Formal letter of recommendation from Parkos B.V. (Peter Bosma & Arne Bos) praising frontend work, A/B testing skills, Agile collaboration, and overall performance.  
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
  } catch (error: any) {
    console.error("[GEMINI_API_ERROR]", error);
    // Try to provide more specific feedback if possible
    let errorMessage = "Failed to communicate with Gemini API";
    let errorDetails = error.message;
    if (error.message?.includes("API key not valid")) {
      errorMessage = "Invalid API Key.";
      errorDetails =
        "Please check your GOOGLE_GEMINI_API_KEY environment variable.";
    } else if (error.message?.includes("400 Bad Request")) {
      errorMessage = "Bad request sent to Gemini.";
      errorDetails =
        "Check the structure of the prompt or history. Details: " +
        error.message;
    }
    // Add more specific checks if needed based on errors you encounter

    return NextResponse.json(
      { error: errorMessage, details: errorDetails },
      { status: 500 }
    );
  }
}
