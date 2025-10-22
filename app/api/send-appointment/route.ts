import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Email configuration - these should be set in your environment variables
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || "587");
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;
const CALENDLY_LINK =
  process.env.NEXT_PUBLIC_CALENDLY_LINK ||
  "https://calendly.com/wonderminds/consultation";

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

// HTML email template for appointment requests
const createAppointmentEmailHTML = (data: {
  parentName: string;
  parentEmail: string;
  phone: string;
  childName: string;
  childAge: string;
  area: string;
  address: string;
  preferredDate: string;
  notes: string;
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Appointment Request - WonderMinds</title>
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
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e2e8f0;
        }
        .field {
          margin-bottom: 15px;
          padding: 12px;
          background: #f8fafc;
          border-radius: 6px;
          border-left: 3px solid #7c3aed;
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
        .cta-section {
          background: linear-gradient(135deg, #f0f4ff, #e0e7ff);
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          margin: 25px 0;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          color: white;
          padding: 12px 24px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          margin-top: 10px;
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
        .highlight {
          background: #fef3c7;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Appointment Request</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">WonderMinds Website</p>
        </div>
        
        <div class="content">
          <div class="section">
            <div class="section-title">Parent Information</div>
            
            <div class="field">
              <div class="field-label">Parent Name</div>
              <div class="field-value">${data.parentName}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">${data.parentEmail}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Phone</div>
              <div class="field-value">${data.phone}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Child Information</div>
            
            <div class="field">
              <div class="field-label">Child's Name</div>
              <div class="field-value">${data.childName}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Age Group</div>
              <div class="field-value highlight">${data.childAge}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Location & Preferences</div>
            
            <div class="field">
              <div class="field-label">Area/City</div>
              <div class="field-value">${data.area}</div>
            </div>
            
            ${
              data.address
                ? `
            <div class="field">
              <div class="field-label">Address</div>
              <div class="field-value">${data.address}</div>
            </div>
            `
                : ""
            }
            
            ${
              data.preferredDate
                ? `
            <div class="field">
              <div class="field-label">Preferred Date</div>
              <div class="field-value highlight">${new Date(
                data.preferredDate
              ).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</div>
            </div>
            `
                : ""
            }
          </div>

          ${
            data.notes
              ? `
          <div class="section">
            <div class="section-title">Additional Notes</div>
            <div class="field">
              <div class="field-value" style="background: #f7fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">
                ${data.notes.replace(/\n/g, "<br>")}
              </div>
            </div>
          </div>
          `
              : ""
          }

          <div class="cta-section">
            <h3 style="margin: 0 0 10px 0; color: #4a5568;">Next Steps</h3>
            <p style="margin: 0; color: #718096;">
              Please use the link below to schedule your consultation appointment:
            </p>
            <a href="${CALENDLY_LINK}" class="cta-button">
              Schedule Consultation
            </a>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #a0aec0;">
              You can also reply directly to this email to coordinate a different time.
            </p>
          </div>
        </div>
        
        <div class="footer">
          <p>This appointment request was submitted from the WonderMinds website.</p>
          <p style="margin-top: 10px;">
            <span class="logo">W</span> WonderMinds - Nurturing Young Minds
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Function to save appointment data to JSON file (optional persistence)
const saveAppointmentData = async (data: {
  parentName: string;
  parentEmail: string;
  phone: string;
  childName: string;
  childAge: string;
  area: string;
  address: string;
  preferredDate: string;
  notes: string;
}) => {
  try {
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "appointments.json");

    // Create data directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing data or create new array
    let appointments = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      appointments = JSON.parse(fileContent);
    }

    // Add new appointment with timestamp
    const newAppointment = {
      ...data,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };

    appointments.push(newAppointment);

    // Save back to file
    fs.writeFileSync(filePath, JSON.stringify(appointments, null, 2));

    console.log("Appointment data saved to:", filePath);
  } catch (error) {
    console.error("Error saving appointment data:", error);
    // Don't throw error - this is optional functionality
  }
};

export async function POST(request: NextRequest) {
  try {
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
    const {
      parentName,
      parentEmail,
      phone,
      childName,
      childAge,
      area,
      address,
      preferredDate,
      notes,
    } = body;

    // Validate required fields
    if (
      !parentName ||
      !parentEmail ||
      !phone ||
      !childName ||
      !childAge ||
      !area
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: parentName, parentEmail, phone, childName, childAge, and area are required.",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(parentEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format.",
        },
        { status: 400 }
      );
    }

    // Validate phone format (more flexible validation)
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    const phoneRegex = /^[\+]?[0-9]{7,15}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid phone number format. Please enter a valid phone number (7-15 digits).",
        },
        { status: 400 }
      );
    }

    // Prepare data for email
    const appointmentData = {
      parentName,
      parentEmail,
      phone,
      childName,
      childAge,
      area,
      address: address || "",
      preferredDate: preferredDate || "",
      notes: notes || "",
    };

    // Save appointment data to file (optional)
    await saveAppointmentData(appointmentData);

    // Create email content
    const emailHTML = createAppointmentEmailHTML(appointmentData);

    // Send email
    const info = await transporter.sendMail({
      from: `"WonderMinds Website" <${EMAIL_USER}>`,
      to: RECEIVER_EMAIL,
      subject: `New Appointment Request: ${childName} (${childAge}) - ${parentName}`,
      html: emailHTML,
      replyTo: parentEmail, // Allow direct reply to the parent
    });

    console.log("Appointment email sent successfully:", info.messageId);

    return NextResponse.json(
      {
        success: true,
        message: "Appointment request submitted successfully",
        messageId: info.messageId,
        calendlyLink: CALENDLY_LINK,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing appointment request:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process appointment request. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
