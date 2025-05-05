// Example path: app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Ensure RESEND_API_KEY and TO_EMAIL are set in your .env.local
const resendApiKey = process.env.RESEND_API_KEY;
const recipientEmail = process.env.RESEND_TO_EMAIL; // Use a dedicated variable for the recipient

// Basic check for environment variables
if (!resendApiKey) {
  console.error("RESEND_API_KEY is not set.");
  // Avoid exposing details in the response for security
  // You might want more robust error handling/logging here
}
if (!recipientEmail) {
  console.error("TO_EMAIL is not set.");
}

// Initialize Resend only if the key exists
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  // Check if Resend was initialized and recipient email is set
  if (!resend || !recipientEmail) {
    return NextResponse.json(
      { message: "Email service configuration error." },
      { status: 500 }
    );
  }

  try {
    // 1. Get data from the request body
    const { name, email, message } = await request.json();

    // 2. Basic validation (you might want more robust validation)
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields (name, email, message)." },
        { status: 400 } // Bad Request status
      );
    }

    // 3. Send the email using Resend
    const { data, error } = await resend.emails.send({
      // --- FIXES APPLIED ---
      to: recipientEmail, // Use the correct recipient email from env vars
      from: `anassLebkhaiti Portfolio <onboarding@resend.dev>`, // Use your site name. Replace onboarding@resend.dev with your verified domain email for production.
      replyTo: email, // Add the sender's email here for easy replies
      subject: `New Contact Form Submission from ${name}`,
      // Use HTML for better formatting and include all details
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Sent via anassLebkhaiti Portfolio Contact Form</small></p>
      `,
      // You can still provide a plain text version as fallback
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      // --- END FIXES ---
    });

    // 4. Check for Resend API errors
    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        { message: "Failed to send email via Resend.", error: error.message },
        { status: 500 } // Internal Server Error from Resend's side
      );
    }

    // 5. Log success and return response
    console.log("Resend Success Response:", data);
    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error: unknown) {
    // 6. Catch other errors (e.g., request parsing errors)
    console.error("API Route Error:", error);
    return NextResponse.json(
      {
        message: "Failed to process request.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
