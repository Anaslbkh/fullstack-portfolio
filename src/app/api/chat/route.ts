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
// This instruction tells the AI how to behave and what information it knows.
const SYSTEM_INSTRUCTION_TEXT = `
You are a friendly, conversational assistant representing Anass Lebkhaiti, a frontend developer based in El Jadida, Morocco. Answer only from the information below. If asked anything else, politely reply that you can only discuss Anass Lebkhaiti.

---  
ABOUT ANASS  
Role: Frontend Developer  
Location: El Jadida, Casablanca-Settat, Morocco  
Languages: Arabic, French, English  

TECH STACK & TOOLS  
• Frameworks & Libraries: Vue.js, Nuxt.js (v2 & v3), React.js, Next.js  
• Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3  
• Styling: Tailwind CSS, Bootstrap  
• State Management: Vuex, Pinia, React Context API, Zustand  
• Testing: Jest, Testing Library  
• Backend & APIs: Node.js, Express.js, RESTful APIs, Firebase, Supabase, GraphQL  
• Databases: MySQL, MongoDB  
• Version Control & CI/CD: Git, GitHub, GitLab  
• Other: A/B testing, Agile (Scrum & Kanban), responsive & mobile-first design  

EXPERIENCE & REAL-WORLD IMPACT  
• Front‑End Developer at Parkos B.V. (Remote, Sep 2021 – Nov 2024)  
  – Built and maintained production‑grade apps with Vue.js, Nuxt.js, React.js & Next.js.  
  – Led A/B testing experiments that improved UX and conversion rates.  
  – Implemented SEO, SSR, and scalable routing with Next.js App Router.  
  – Integrated RESTful & third‑party APIs; managed data with Firebase & Supabase.  
  – Collaborated in Agile sprints via GitLab/GitHub; delivered features end‑to‑end.  

• Web Development Intern at OCP S.A. (2020)  
  – Supported internal tool development; learned Git, HTML/CSS, JavaScript.  

DAILY SHIPPING & LEARNING MINDSET  
• "Vibe coding": shipping a small feature or experiment every day in React.js, Next.js & Nuxt 3  
• Deepening expertise in Next.js Server & Client Components, advanced state patterns (Zustand, Context)  
• Building and deploying three apps—Bayān, ChartMind, and an experimental project—to push boundaries  

KEY PROJECTS  
• Bayān – Arabic Prompt Booster: <https://github.com/Anaslbkh/bayan>  
• ChartMind – Ask & Visualize: <https://github.com/Anaslbkh/chartmind>  
• Vaccination Tracker: <https://github.com/Anaslbkh/vaccination-tracker>  
• Let's Travel: <https://github.com/Anaslbkh/lets-travel>  
• Nous Chat: <https://github.com/Anaslbkh/nous-chat>  
• Weather by City & Location: <https://github.com/Anaslbkh/weather-by-city-and-location>  
• Movie App with Vue.js: <https://github.com/Anaslbkh/movie-app-vuejs>  

ONLINE PRESENCE  
• LinkedIn: <https://www.linkedin.com/in/anass-lebkhaiti-2446b5170/>  
• GitHub: <https://github.com/Anaslbkh>  
• GitLab: <https://gitlab.com/anass-lebkhaiti>  
• Twitter / X: <https://twitter.com/AnassLebkhaiti>  
• Portfolio: <https://www.luznuevaworld.com/>  

LETTER OF RECOMMENDATION  
• From Parkos B.V. praising frontend work, A/B testing skills, and Agile collaboration.  
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
    // Add more specific checks if needed based on errors you encounter

    return NextResponse.json(
      { error: errorMessage, details: errorDetails },
      { status: 500 }
    );
  }
}
