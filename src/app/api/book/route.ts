import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

// Gmail SMTP works for booking (no attachments)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER || "ignitemind60@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD || "kljsugzwgawzttus",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

interface BookingData {
  bookingType: string;
  parentName: string;
  email: string;
  phone: string;
  suburb: string;
  studentName: string;
  yearLevel: string;
  school: string;
  dob: string;
  naplanScore: string;
  focusArea: string;
  preferredDay: string;
  preferredTime: string;
  additionalInfo: string;
}

function generateAdminEmail(data: BookingData): string {
  const bookingTypeLabel = data.bookingType === "diagnostic" ? "🎯 Free Diagnostic" : "🚀 Trial Class";
  
  return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #f97316, #dc2626); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🧠 IgniteMind Academy</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">New Booking Received!</p>
  </div>
  
  <div style="background: #fff; padding: 30px; border: 1px solid #e2e8f0;">
    <h2 style="color: #f97316; margin-top: 0;">${bookingTypeLabel}</h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; font-weight: bold; color: #475569; width: 40%;">Booking Type</td>
        <td style="padding: 12px; color: #1e293b;">${bookingTypeLabel}</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold; color: #475569;">Submitted On</td>
        <td style="padding: 12px; color: #1e293b;">${new Date().toLocaleString("en-AU", { timeZone: "Australia/Melbourne" })}</td>
      </tr>
    </table>
    
    <h3 style="color: #1e293b; margin: 25px 0 15px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Parent/Guardian Details</h3>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; font-weight: bold; color: #475569; width: 40%;">Parent Name</td>
        <td style="padding: 12px; color: #1e293b;">${data.parentName}</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold; color: #475569;">Email</td>
        <td style="padding: 12px; color: #1e293b;"><a href="mailto:${data.email}" style="color: #f97316;">${data.email}</a></td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; font-weight: bold; color: #475569;">Phone</td>
        <td style="padding: 12px; color: #1e293b;"><a href="tel:${data.phone}" style="color: #f97316;">${data.phone}</a></td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold; color: #475569;">Suburb</td>
        <td style="padding: 12px; color: #1e293b;">${data.suburb}</td>
      </tr>
    </table>
    
    <h3 style="color: #1e293b; margin: 25px 0 15px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Student Details</h3>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; font-weight: bold; color: #475569; width: 40%;">Student Name</td>
        <td style="padding: 12px; color: #1e293b;">${data.studentName}</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold; color: #475569;">Year Level</td>
        <td style="padding: 12px; color: #1e293b;">${data.yearLevel}</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; font-weight: bold; color: #475569;">Current School</td>
        <td style="padding: 12px; color: #1e293b;">${data.school || "Not provided"}</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold; color: #475569;">Date of Birth</td>
        <td style="padding: 12px; color: #1e293b;">${data.dob || "Not provided"}</td>
      </tr>
    </table>
    
    <h3 style="color: #1e293b; margin: 25px 0 15px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">NAPLAN Information</h3>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; font-weight: bold; color: #475569; width: 40%;">Last NAPLAN Score</td>
        <td style="padding: 12px; color: #1e293b;">${data.naplanScore || "Not available"}</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold; color: #475569;">Focus Area</td>
        <td style="padding: 12px; color: #1e293b;">${data.focusArea || "General preparation"}</td>
      </tr>
    </table>
    
    <h3 style="color: #1e293b; margin: 25px 0 15px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Preferred Schedule</h3>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; font-weight: bold; color: #475569; width: 40%;">Preferred Day</td>
        <td style="padding: 12px; color: #1e293b;">${data.preferredDay || "Any day"}</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold; color: #475569;">Preferred Time</td>
        <td style="padding: 12px; color: #1e293b;">${data.preferredTime || "Any time"}</td>
      </tr>
    </table>
    
    ${data.additionalInfo ? `
    <h3 style="color: #1e293b; margin: 25px 0 15px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Additional Information</h3>
    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; color: #475569;">
      ${data.additionalInfo}
    </div>
    ` : ""}
    
    <div style="margin-top: 30px; padding: 20px; background: #fff7ed; border-radius: 8px; border-left: 4px solid #f97316;">
      <strong style="color: #ea580c;">📋 Next Steps:</strong>
      <ol style="margin: 10px 0 0; padding-left: 20px; color: #475569;">
        <li>Respond to customer within 24 hours</li>
        <li>Confirm ${data.bookingType === "diagnostic" ? "diagnostic assessment" : "trial class"} date & time</li>
        <li>Send confirmation email with Zoom/link details</li>
        <li>Update booking tracker</li>
      </ol>
    </div>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 12px;">
    <p>This booking was submitted via the IgniteMind Academy website.</p>
    <p>© 2026 IgniteMind Academy</p>
  </div>
</div>
`;
}

function generateCustomerConfirmationEmail(data: BookingData): string {
  const bookingTypeLabel = data.bookingType === "diagnostic" 
    ? "Free Diagnostic Assessment" 
    : "Trial Class";
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 30px; padding: 25px; background: linear-gradient(135deg, #f97316, #dc2626); border-radius: 12px;">
      <h1 style="margin: 0; color: white; font-size: 28px;">🧠 IgniteMind Academy</h1>
      <p style="margin: 5px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">NAPLAN Tutoring Excellence</p>
    </div>

    <!-- Main Content -->
    <div style="background: #fff; border-radius: 12px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      
      <h2 style="color: #f97316; margin-top: 0;">Hi ${data.parentName}! 👋</h2>
      
      <p>Thank you for booking a <strong>${bookingTypeLabel}</strong> with IgniteMind Academy!</p>
      
      <div style="background: #f0fdf4; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #22c55e;">
        <h3 style="margin: 0 0 10px; color: #166534;">✅ What Happens Next?</h3>
        <ol style="margin: 0; padding-left: 20px; color: #166534;">
          <li>We&apos;ll review your booking details</li>
          <li>Our team will contact you within <strong>24 hours</strong> to confirm your appointment</li>
          <li>You&apos;ll receive an email with date, time, and Zoom/classroom link</li>
        </ol>
      </div>

      <h3 style="color: #1e293b; margin: 25px 0 15px;">📋 Your Booking Summary</h3>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748b;">Booking Type</td>
          <td style="padding: 10px 0; color: #1e293b; font-weight: bold;">${bookingTypeLabel}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748b;">Student</td>
          <td style="padding: 10px 0; color: #1e293b; font-weight: bold;">${data.studentName} (${data.yearLevel})</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748b;">Preferred Day</td>
          <td style="padding: 10px 0; color: #1e293b;">${data.preferredDay || "Any day"}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748b;">Preferred Time</td>
          <td style="padding: 10px 0; color: #1e293b;">${data.preferredTime || "Any time"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #64748b;">Focus Area</td>
          <td style="padding: 10px 0; color: #1e293b;">${data.focusArea || "General preparation"}</td>
        </tr>
      </table>

      <div style="background: #fff7ed; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #f97316;">
        <h4 style="margin: 0 0 10px; color: #ea580c;">📞 Questions?</h4>
        <p style="margin: 0; color: #475569;">
          Reply to this email or call us at <a href="tel:${site.phoneE164}" style="color: #f97316;">${site.phoneDisplay}</a>
        </p>
      </div>

      <!-- CTA -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://ignitemindacademy.vercel.app/pricing" style="display: inline-block; background: linear-gradient(to right, #f97316, #dc2626); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Our Pricing</a>
      </div>

    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
      <p style="margin: 0 0 10px; color: #666;">
        Follow us on Instagram: <a href="https://instagram.com/ignitemind27" style="color: #f97316;">@ignitemind27</a>
      </p>
      <p style="margin: 0; color: #999; font-size: 12px;">
        © 2026 IgniteMind Academy. All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>
`;
}

export async function POST(request: Request) {
  try {
    const data: BookingData = await request.json();
    console.log('Booking data received:', data);

    // Validate required fields
    if (!data.parentName || !data.email || !data.phone || !data.suburb || !data.studentName || !data.yearLevel) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json({ error: "Please fill in all required fields" }, { status: 400 });
    }

    console.log('Sending email to admin...');
    // Send email to admin with all details
    const adminResult = await transporter.sendMail({
      from: '"IgniteMind Academy Website" <ignitemind60@gmail.com>',
      to: "ignitemind60@gmail.com",
      subject: `📅 New ${data.bookingType === "diagnostic" ? "Diagnostic" : "Trial"} Booking: ${data.studentName} (${data.yearLevel})`,
      html: generateAdminEmail(data),
    });
    console.log('Admin email sent:', adminResult.messageId);

    console.log('Sending confirmation email to customer...');
    // Send confirmation email to customer
    const customerResult = await transporter.sendMail({
      from: '"IgniteMind Academy" <ignitemind60@gmail.com>',
      to: data.email,
      subject: `✅ Booking Confirmed: ${data.bookingType === "diagnostic" ? "Free Diagnostic" : "Trial Class"} with IgniteMind Academy`,
      html: generateCustomerConfirmationEmail(data),
    });
    console.log('Customer email sent:', customerResult.messageId);

    return NextResponse.json({ 
      success: true, 
      message: "Booking submitted successfully!" 
    });
  } catch (error: any) {
    console.error("Error processing booking:", error.message);
    return NextResponse.json({ error: `Failed to process booking: ${error.message}` }, { status: 500 });
  }
}
