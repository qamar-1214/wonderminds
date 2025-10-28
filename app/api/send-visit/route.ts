import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      parentName,
      email,
      phone,
      date,
      timeSlot,
      childrenCount,
      area,
      message,
    } = body;

    // Validation
    if (!parentName || !email || !phone || !date || !timeSlot) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Phone number validation
    const phoneRegex = /^[\+]?[0-9]{7,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""))) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Environment variables
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
    const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || "587");
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || EMAIL_USER;

    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error("Email credentials not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: EMAIL_PORT === 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Format date
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Email to admin
    const adminMailOptions = {
      from: EMAIL_USER,
      to: ADMIN_EMAIL,
      subject: `🏫 New Visit Request - ${parentName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Visit Request</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                        New Visit Request
                      </h1>
                      <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                        School Tour & Consultation
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      
                      <!-- Visitor Information -->
                      <div style="margin-bottom: 30px;">
                        <div style="background: linear-gradient(135deg, #8B5CF6 0%, #9333EA 100%); padding: 15px 20px; border-radius: 8px 8px 0 0;">
                          <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">
                            👤 Visitor Information
                          </h2>
                        </div>
                        <div style="background-color: #FAF5FF; padding: 20px; border-radius: 0 0 8px 8px; border: 2px solid #E9D5FF; border-top: none;">
                          <table width="100%" cellpadding="8" cellspacing="0">
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600; width: 180px;">Name:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${parentName}</td>
                            </tr>
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600;">Email:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${email}</td>
                            </tr>
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600;">Phone:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${phone}</td>
                            </tr>
                            ${
                              area
                                ? `<tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600;">Area/City:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${area}</td>
                            </tr>`
                                : ""
                            }
                            ${
                              childrenCount
                                ? `<tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600;">Number of Children:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${childrenCount}</td>
                            </tr>`
                                : ""
                            }
                          </table>
                        </div>
                      </div>

                      <!-- Visit Details -->
                      <div style="margin-bottom: 30px;">
                        <div style="background: linear-gradient(135deg, #EC4899 0%, #F472B6 100%); padding: 15px 20px; border-radius: 8px 8px 0 0;">
                          <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">
                            📅 Visit Details
                          </h2>
                        </div>
                        <div style="background-color: #FFF1F2; padding: 20px; border-radius: 0 0 8px 8px; border: 2px solid #FECDD3; border-top: none;">
                          <table width="100%" cellpadding="8" cellspacing="0">
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600; width: 180px;">Preferred Date:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${formattedDate}</td>
                            </tr>
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600;">Preferred Time:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${timeSlot}</td>
                            </tr>
                          </table>
                        </div>
                      </div>

                      ${
                        message
                          ? `<!-- Additional Information -->
                      <div style="margin-bottom: 30px;">
                        <div style="background: linear-gradient(135deg, #14B8A6 0%, #0D9488 100%); padding: 15px 20px; border-radius: 8px 8px 0 0;">
                          <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">
                            💬 Additional Information
                          </h2>
                        </div>
                        <div style="background-color: #F0FDFA; padding: 20px; border-radius: 0 0 8px 8px; border: 2px solid #CCFBF1; border-top: none;">
                          <p style="margin: 0; color: #1F2937; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </div>
                      </div>`
                          : ""
                      }

                      <!-- Action Note -->
                      <div style="background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px 20px; border-radius: 4px; margin-top: 30px;">
                        <p style="margin: 0; color: #78350F; font-size: 14px; line-height: 1.6;">
                          <strong>⏰ Action Required:</strong> Please contact ${parentName} at <strong>${phone}</strong> or <strong>${email}</strong> to confirm the visit details.
                        </p>
                      </div>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #F3F4F6; padding: 20px 30px; text-align: center; border-top: 1px solid #E5E7EB;">
                      <p style="margin: 0; color: #6B7280; font-size: 12px;">
                        This is an automated email from WonderMinds Visit Request System
                      </p>
                      <p style="margin: 5px 0 0 0; color: #9CA3AF; font-size: 11px;">
                        Received on ${new Date().toLocaleString("en-US", {
                          dateStyle: "full",
                          timeStyle: "short",
                        })}
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    // Confirmation email to visitor
    const visitorMailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Visit Request Confirmation - WonderMinds",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Visit Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                        ✅ Visit Request Received
                      </h1>
                      <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                        We look forward to welcoming you!
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      
                      <p style="margin: 0 0 20px 0; color: #1F2937; font-size: 16px; line-height: 1.6;">
                        Dear <strong>${parentName}</strong>,
                      </p>

                      <p style="margin: 0 0 20px 0; color: #1F2937; font-size: 16px; line-height: 1.6;">
                        Thank you for your interest in visiting WonderMinds! We have received your visit request and our team will confirm your appointment shortly.
                      </p>

                      <!-- Visit Summary -->
                      <div style="background-color: #FAF5FF; border: 2px solid #E9D5FF; border-radius: 8px; padding: 20px; margin: 30px 0;">
                        <h3 style="margin: 0 0 15px 0; color: #7C3AED; font-size: 18px;">Your Visit Details:</h3>
                        <table width="100%" cellpadding="6" cellspacing="0">
                          <tr>
                            <td style="color: #6B7280; font-size: 14px;">Preferred Date:</td>
                            <td style="color: #1F2937; font-size: 14px; font-weight: 600;">${formattedDate}</td>
                          </tr>
                          <tr>
                            <td style="color: #6B7280; font-size: 14px;">Preferred Time:</td>
                            <td style="color: #1F2937; font-size: 14px; font-weight: 600;">${timeSlot}</td>
                          </tr>
                          <tr>
                            <td style="color: #6B7280; font-size: 14px;">Contact Number:</td>
                            <td style="color: #1F2937; font-size: 14px; font-weight: 600;">${phone}</td>
                          </tr>
                        </table>
                      </div>

                      <!-- Next Steps -->
                      <div style="background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px 20px; border-radius: 4px; margin: 30px 0;">
                        <h3 style="margin: 0 0 10px 0; color: #78350F; font-size: 16px;">📋 What to Expect:</h3>
                        <ul style="margin: 0; padding-left: 20px; color: #78350F; font-size: 14px; line-height: 1.8;">
                          <li>Our team will call you within 24 hours to confirm your visit</li>
                          <li>We'll provide directions and parking information</li>
                          <li>Feel free to ask any questions during your tour</li>
                          <li>You're welcome to bring your children along</li>
                        </ul>
                      </div>

                      <p style="margin: 20px 0 0 0; color: #1F2937; font-size: 16px; line-height: 1.6;">
                        If you have any immediate questions or need to reschedule, please don't hesitate to contact us.
                      </p>

                      <div style="text-align: center; margin: 30px 0 0 0;">
                        <p style="margin: 0; color: #1F2937; font-size: 16px; font-weight: 600;">
                          We can't wait to meet you!
                        </p>
                        <p style="margin: 5px 0 0 0; color: #7C3AED; font-size: 18px; font-weight: 700;">
                          The WonderMinds Team
                        </p>
                      </div>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #F3F4F6; padding: 20px 30px; text-align: center; border-top: 1px solid #E5E7EB;">
                      <p style="margin: 0 0 10px 0; color: #1F2937; font-size: 14px; font-weight: 600;">
                        Need help? Contact us:
                      </p>
                      <p style="margin: 0; color: #6B7280; font-size: 13px;">
                        Email: ${EMAIL_USER} | Phone: ${phone}
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Send confirmation email to visitor
    await transporter.sendMail(visitorMailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Visit request sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending visit request:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        error: "Failed to send visit request",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
