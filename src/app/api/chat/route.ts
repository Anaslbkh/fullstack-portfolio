// app/api/gemini/route.ts
import { NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Content,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash"; // Use a recent model
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY || "";

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

export async function POST(req: Request) {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      safetySettings,
    });

    // --- Context Handling ---
    // Expect the request body to include the new prompt and the history
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

    // Start a chat session with the provided history
    const chat = model.startChat({
      history: history || [], // Pass previous messages for context
      // generationConfig: { // Optional: configure temperature, max tokens etc.
      //   maxOutputTokens: 200,
      //   temperature: 0.7,
      // },
    });

    console.log("Sending prompt to Gemini:", prompt);
    console.log("With history:", history);

    const result = await chat.sendMessage(prompt);
    const response = result.response;

    console.log("Gemini Response:", response.text());

    // Return the model's response text
    return NextResponse.json({ text: response.text() });
  } catch (error: any) {
    console.error("[GEMINI_API_ERROR]", error);
    // Consider more specific error handling based on error type
    return NextResponse.json(
      {
        error: "Failed to communicate with Gemini API",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
