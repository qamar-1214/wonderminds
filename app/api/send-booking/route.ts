import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      childFullName,
      age,
      gender,
      nationality,
      languagesHome,
      languagesKnown,
      primaryConcerns,
      otherConcern,
      parentName,
      relation,
      contactNumber,
      email,
      preferredMode,
      preferredDays,
      preferredTimeSlot,
      previousDiagnosis,
      currentTherapy,
    } = body;

    // Validation
    if (
      !childFullName ||
      !age ||
      !gender ||
      !nationality ||
      !languagesHome ||
      !languagesKnown ||
      !primaryConcerns ||
      !parentName ||
      !relation ||
      !contactNumber ||
      !email ||
      !preferredMode ||
      !preferredDays ||
      !preferredTimeSlot ||
      !previousDiagnosis ||
      !currentTherapy
    ) {
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
    if (!phoneRegex.test(contactNumber.replace(/[\s\-\(\)]/g, ""))) {
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

    // Primary concerns formatted
    const concernsList = primaryConcerns
      .map((c: string) => `• ${c}`)
      .join("\n");
    const otherConcernText =
      otherConcern && primaryConcerns.includes("Other")
        ? `\nOther Concern: ${otherConcern}`
        : "";

    // Preferred days formatted
    const daysList = preferredDays.map((d: string) => `• ${d}`).join("\n");

    // Professional email template for admin
    const adminMailOptions = {
      from: EMAIL_USER,
      to: ADMIN_EMAIL,
      subject: `🔔 New Pre-Booking Request - ${childFullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Pre-Booking Appointment Request</title>
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
                        Pre-Booking Appointment Request
                      </h1>
                      <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                        Neurodivergent Child Assessment / Consultation
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      
                      <!-- Child Information -->
                      <div style="margin-bottom: 30px;">
                        <div style="background: linear-gradient(135deg, #8B5CF6 0%, #9333EA 100%); padding: 15px 20px; border-radius: 8px 8px 0 0;">
                          <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">
                            👶 Child Information
                          </h2>
                        </div>
                        <div style="background-color: #FAF5FF; padding: 20px; border-radius: 0 0 8px 8px; border: 2px solid #E9D5FF; border-top: none;">
                          <table width="100%" cellpadding="8" cellspacing="0">
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600; width: 180px;">Full Name:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${childFullName}</td>
                            </tr>
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600;">Age:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${age} years</td>
                            </tr>
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600;">Gender:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${gender}</td>
                            </tr>
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600;">Nationality:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${nationality}</td>
                            </tr>
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600;">Languages at Home:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${languagesHome}</td>
                            </tr>
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600;">Languages Child Knows:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${languagesKnown}</td>
                            </tr>
                          </table>
                        </div>
                      </div>

                      <!-- Primary Concerns -->
                      <div style="margin-bottom: 30px;">
                        <div style="background: linear-gradient(135deg, #EC4899 0%, #F472B6 100%); padding: 15px 20px; border-radius: 8px 8px 0 0;">
                          <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">
                            ⚠️ Primary Concerns
                          </h2>
                        </div>
                        <div style="background-color: #FFF1F2; padding: 20px; border-radius: 0 0 8px 8px; border: 2px solid #FECDD3; border-top: none;">
                          <pre style="margin: 0; color: #1F2937; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; white-space: pre-wrap;">${concernsList}${otherConcernText}</pre>
                        </div>
                      </div>

                      <!-- Parent/Guardian Details -->
                      <div style="margin-bottom: 30px;">
                        <div style="background: linear-gradient(135deg, #14B8A6 0%, #0D9488 100%); padding: 15px 20px; border-radius: 8px 8px 0 0;">
                          <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">
                            👨‍👩‍👧 Parent / Guardian Details
                          </h2>
                        </div>
                        <div style="background-color: #F0FDFA; padding: 20px; border-radius: 0 0 8px 8px; border: 2px solid #CCFBF1; border-top: none;">
                          <table width="100%" cellpadding="8" cellspacing="0">
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600; width: 180px;">Name:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${parentName}</td>
                            </tr>
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600;">Relation to Child:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${relation}</td>
                            </tr>
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600;">Contact Number:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${contactNumber}</td>
                            </tr>
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600;">Email:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${email}</td>
                            </tr>
                          </table>
                        </div>
                      </div>

                      <!-- Appointment Preference -->
                      <div style="margin-bottom: 30px;">
                        <div style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); padding: 15px 20px; border-radius: 8px 8px 0 0;">
                          <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">
                            📅 Appointment Preference
                          </h2>
                        </div>
                        <div style="background-color: #FFFBEB; padding: 20px; border-radius: 0 0 8px 8px; border: 2px solid #FEF3C7; border-top: none;">
                          <table width="100%" cellpadding="8" cellspacing="0">
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600; width: 180px;">Preferred Mode:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${preferredMode}</td>
                            </tr>
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600; vertical-align: top;">Preferred Days:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">
                                <pre style="margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; white-space: pre-wrap;">${daysList}</pre>
                              </td>
                            </tr>
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600;">Preferred Time Slot:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500;">${preferredTimeSlot}</td>
                            </tr>
                          </table>
                        </div>
                      </div>

                      <!-- Medical History -->
                      <div style="margin-bottom: 30px;">
                        <div style="background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); padding: 15px 20px; border-radius: 8px 8px 0 0;">
                          <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">
                            🩺 Medical History
                          </h2>
                        </div>
                        <div style="background-color: #EFF6FF; padding: 20px; border-radius: 0 0 8px 8px; border: 2px solid #DBEAFE; border-top: none;">
                          <table width="100%" cellpadding="8" cellspacing="0">
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600; width: 180px; vertical-align: top;">Previous Diagnosis:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500; white-space: pre-wrap;">${previousDiagnosis}</td>
                            </tr>
                            <tr>
                              <td style="color: #6B7280; font-size: 14px; font-weight: 600; vertical-align: top;">Current Therapy:</td>
                              <td style="color: #1F2937; font-size: 14px; font-weight: 500; white-space: pre-wrap;">${currentTherapy}</td>
                            </tr>
                          </table>
                        </div>
                      </div>

                      <!-- Action Note -->
                      <div style="background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px 20px; border-radius: 4px; margin-top: 30px;">
                        <p style="margin: 0; color: #78350F; font-size: 14px; line-height: 1.6;">
                          <strong>⏰ Action Required:</strong> Please review this pre-booking request and contact the parent at <strong>${contactNumber}</strong> or <strong>${email}</strong> with the earliest available appointment slot and required instructions.
                        </p>
                      </div>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #F3F4F6; padding: 20px 30px; text-align: center; border-top: 1px solid #E5E7EB;">
                      <p style="margin: 0; color: #6B7280; font-size: 12px;">
                        This is an automated email from WonderMinds Pre-Booking System
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

    // Confirmation email for parent
    const parentMailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Pre-Booking Request Received - WonderMinds",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
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
                        ✅ Pre-Booking Request Received
                      </h1>
                      <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                        Thank you for choosing WonderMinds
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
                        Thank you for submitting a pre-booking request for <strong>${childFullName}</strong>. We have received your information and our Neurodevelopmental Team will review it carefully.
                      </p>

                      <!-- Booking Summary -->
                      <div style="background-color: #FAF5FF; border: 2px solid #E9D5FF; border-radius: 8px; padding: 20px; margin: 30px 0;">
                        <h3 style="margin: 0 0 15px 0; color: #7C3AED; font-size: 18px;">Your Booking Details:</h3>
                        <table width="100%" cellpadding="6" cellspacing="0">
                          <tr>
                            <td style="color: #6B7280; font-size: 14px;">Preferred Mode:</td>
                            <td style="color: #1F2937; font-size: 14px; font-weight: 600;">${preferredMode}</td>
                          </tr>
                          <tr>
                            <td style="color: #6B7280; font-size: 14px;">Preferred Time:</td>
                            <td style="color: #1F2937; font-size: 14px; font-weight: 600;">${preferredTimeSlot}</td>
                          </tr>
                          <tr>
                            <td style="color: #6B7280; font-size: 14px;">Contact Number:</td>
                            <td style="color: #1F2937; font-size: 14px; font-weight: 600;">${contactNumber}</td>
                          </tr>
                        </table>
                      </div>

                      <!-- Next Steps -->
                      <div style="background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px 20px; border-radius: 4px; margin: 30px 0;">
                        <h3 style="margin: 0 0 10px 0; color: #78350F; font-size: 16px;">📋 Next Steps:</h3>
                        <ul style="margin: 0; padding-left: 20px; color: #78350F; font-size: 14px; line-height: 1.8;">
                          <li>Our team will review your request within 24-48 hours</li>
                          <li>We will contact you via phone or email with available appointment slots</li>
                          <li>You will receive instructions and any required documentation</li>
                        </ul>
                      </div>

                      <p style="margin: 20px 0 0 0; color: #1F2937; font-size: 16px; line-height: 1.6;">
                        If you have any questions or need to make changes to your request, please don't hesitate to contact us.
                      </p>

                      <div style="text-align: center; margin: 30px 0 0 0;">
                        <p style="margin: 0; color: #1F2937; font-size: 16px; font-weight: 600;">
                          Warm regards,
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
                        Email: ${EMAIL_USER} | Phone: ${contactNumber}
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

    // Send confirmation email to parent
    await transporter.sendMail(parentMailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Booking request sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending booking request:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        error: "Failed to send booking request",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
