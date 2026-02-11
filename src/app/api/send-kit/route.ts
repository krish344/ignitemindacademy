import { NextResponse } from "next/server";
import { Resend } from "resend";
import { generatePDFBuffer } from "@/lib/pdf-generator";

// Use Resend for reliable email delivery on Netlify
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, yearLevel } = body;

    if (!email || !name || !yearLevel) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate PDF
    const pdfBuffer = await generatePDFBuffer(yearLevel);

    // Send email with PDF using Resend
    await resend.emails.send({
      from: "IgniteMind Academy <kit@ignitemindacademy.com>",
      to: [email],
      subject: `🎯 Your NAPLAN Preparation Kit for ${yearLevel}`,
      text: `
Hi ${name}!

Thank you for requesting our NAPLAN Preparation Kit for ${yearLevel}!

We've attached a comprehensive PDF with:
- ${yearLevel} Numeracy Questions (with answers)
- Reading Comprehension Questions
- Writing Prompts
- Language Conventions Questions
- Answer Key

To download: Open the attached PDF or visit: https://ignitemindacademy.com/kit

Ready for personalized tutoring? Visit https://ignitemindacademy.com/pricing

© 2026 IgniteMind Academy
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Logo Header -->
    <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #f97316, #dc2626); border-radius: 12px;">
      <h1 style="margin: 0; color: white; font-size: 28px;">🧠 IgniteMind Academy</h1>
      <p style="margin: 5px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">NAPLAN Tutoring Excellence</p>
    </div>

    <!-- Main Content -->
    <div style="background: #fff; border-radius: 12px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      
      <h2 style="color: #f97316; margin-top: 0;">Hi ${name}! 👋</h2>
      
      <p>Thank you for requesting our <strong>Comprehensive NAPLAN Preparation Kit</strong> for <strong>${yearLevel}</strong>!</p>

      <div style="background: #fff7ed; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #f97316;">
        <h3 style="margin-top: 0; color: #ea580c;">📦 What's Included in Your PDF:</h3>
        <ul style="margin: 0; padding-left: 20px;">
          <li>✅ 50+ Numeracy Practice Questions</li>
          <li>✅ Reading Comprehension Questions</li>
          <li>✅ Writing Prompts with Guidelines</li>
          <li>✅ Language Conventions Questions</li>
          <li>✅ Complete Answer Key</li>
          <li>✅ Detailed Explanations</li>
        </ul>
      </div>

      <p><strong>📎 Your PDF is attached to this email!</strong></p>

      <p>Can't open the attachment? <a href="https://ignitemindacademy.com/kit" style="color: #f97316;">Download from our website</a></p>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://ignitemindacademy.com/quiz" style="display: inline-block; background: linear-gradient(to right, #f97316, #dc2626); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">🚀 Try Our Free Practice Quiz</a>
      </div>

      <p style="text-align: center; color: #666; font-size: 14px;">
        Ready for personalized tutoring? <a href="https://ignitemindacademy.com/pricing" style="color: #f97316;">View our pricing</a> or
        <a href="https://ignitemindacademy.com/contact" style="color: #f97316;">contact us</a> to book a free diagnostic!
      </p>

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
      `,
      attachments: [
        {
  filename: `NAPLAN-Prep-Kit-${yearLevel.replace(" ", "-")}.pdf`,
  content: pdfBuffer.toString("base64"),
  contentType: "application/pdf", // use the property expected by the Attachment type
}
},
      ],
    });

    return NextResponse.json({ success: true, message: "Kit sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
