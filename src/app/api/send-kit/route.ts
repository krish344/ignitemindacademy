import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: gmailUser,
    pass: gmailAppPassword,
  },
});

export async function POST(request: Request) {
  try {
    if (!gmailUser || !gmailAppPassword) {
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { email, name, yearLevel } = body;

    if (!email || !name || !yearLevel) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resourcesUrl = `https://${site.domain}/resources`;
    const quizUrl = `https://${site.domain}/quiz`;
    const kitUrl = `https://${site.domain}/kit`;
    const pricingUrl = `https://${site.domain}/pricing`;
    const contactUrl = `https://${site.domain}/contact`;

    await transporter.sendMail({
      from: `"IgniteMind Academy" <${gmailUser}>`,
      to: email,
      subject: `🎯 Your NAPLAN ${yearLevel} Resource Links`,
      text: `Hi ${name},

Thanks for requesting the ${yearLevel} NAPLAN kit.

We now provide quick-access resource links instead of PDF attachments:

- Resources Hub: ${resourcesUrl}
- Practice Quiz: ${quizUrl}
- Kit Page: ${kitUrl}
- Pricing: ${pricingUrl}
- Contact / Book Diagnostic: ${contactUrl}

If you'd like a personalized study plan, reply to this email.

© 2026 IgniteMind Academy`,
      html: `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;font-family:Arial,sans-serif;color:#333;background:#fffaf5;">
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <div style="background:linear-gradient(135deg,#f97316,#dc2626);padding:24px;border-radius:12px;color:#fff;text-align:center;">
        <h1 style="margin:0;">🧠 IgniteMind Academy</h1>
        <p style="margin:8px 0 0;opacity:.95;">NAPLAN Tutoring Melbourne</p>
      </div>

      <div style="background:#ffffff;border-radius:12px;padding:24px;margin-top:16px;border:1px solid #fed7aa;">
        <h2 style="color:#ea580c;margin-top:0;">Hi ${name}! 👋</h2>
        <p>Thanks for requesting support for <strong>${yearLevel}</strong>.</p>
        <p>Instead of sending a PDF attachment, here are your direct learning resources:</p>

        <ul style="line-height:1.9;padding-left:18px;">
          <li><a href="${resourcesUrl}" style="color:#f97316;">Resources Hub</a></li>
          <li><a href="${quizUrl}" style="color:#f97316;">Practice Quiz</a></li>
          <li><a href="${kitUrl}" style="color:#f97316;">Free Kit Page</a></li>
          <li><a href="${pricingUrl}" style="color:#f97316;">Pricing</a></li>
          <li><a href="${contactUrl}" style="color:#f97316;">Contact / Book Free Diagnostic</a></li>
        </ul>

        <div style="margin-top:24px;text-align:center;">
          <a href="${resourcesUrl}" style="display:inline-block;background:#f97316;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:700;">Open Resources</a>
        </div>
      </div>

      <div style="text-align:center;margin-top:16px;color:#64748b;font-size:12px;">
        © 2026 IgniteMind Academy · Follow <a href="${site.socials.instagram}" style="color:#f97316;">@ignitemind27</a>
      </div>
    </div>
  </body>
</html>
      `,
    });

    return NextResponse.json({ success: true, message: "Kit links sent successfully" });
  } catch (error) {
    console.error("Error sending kit links email:", error);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
