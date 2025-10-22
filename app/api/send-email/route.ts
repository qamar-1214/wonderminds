import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email configuration - these should be set in your environment variables
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || "587");
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

// Create transporter
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_PORT === 465, // true for 465, false for other ports
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// HTML email template
const createEmailHTML = (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission - WonderMinds</title>
      <style>
        body {
          font-family: 'Inter', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          color: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          margin-bottom: 30px;
        }
        .field {
          margin-bottom: 20px;
          padding: 15px;
          background: #f8fafc;
          border-radius: 8px;
          border-left: 4px solid #7c3aed;
        }
        .field-label {
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 5px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .field-value {
          color: #2d3748;
          font-size: 16px;
        }
        .message-field {
          background: #f7fafc;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        .footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          color: #718096;
          font-size: 14px;
        }
        .logo {
          display: inline-block;
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: bold;
          font-size: 18px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">WonderMinds Website</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">Name</div>
            <div class="field-value">${data.name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value">${data.email}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Phone</div>
            <div class="field-value">${data.phone || "Not provided"}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Message</div>
            <div class="field-value message-field">${data.message.replace(
              /\n/g,
              "<br>"
            )}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>This message was sent from the WonderMinds website contact form.</p>
          <p style="margin-top: 10px;">
            <span class="logo">W</span> WonderMinds - Nurturing Young Minds
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    // Debug: Log environment variables (without sensitive data)
    console.log("Email Configuration Debug:");
    console.log("EMAIL_HOST:", EMAIL_HOST ? "Set" : "Missing");
    console.log("EMAIL_PORT:", EMAIL_PORT);
    console.log("EMAIL_USER:", EMAIL_USER ? "Set" : "Missing");
    console.log("EMAIL_PASS:", EMAIL_PASS ? "Set" : "Missing");
    console.log("RECEIVER_EMAIL:", RECEIVER_EMAIL ? "Set" : "Missing");

    // Check if required environment variables are set
    if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS || !RECEIVER_EMAIL) {
      console.error(
        "Missing required environment variables for email configuration"
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Email configuration is incomplete. Please check environment variables.",
        },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: name, email, and message are required.",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format.",
        },
        { status: 400 }
      );
    }

    // Create email content
    const emailHTML = createEmailHTML({ name, email, phone, message });

    // Send email
    console.log("Attempting to send email...");
    const info = await transporter.sendMail({
      from: `"WonderMinds Website" <${EMAIL_USER}>`,
      to: RECEIVER_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: emailHTML,
      replyTo: email, // Allow direct reply to the sender
    });

    console.log("Email sent successfully:", info.messageId);

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        messageId: info.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send email. Please try again later.",
        debug:
          process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
