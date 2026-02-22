import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import pg from "pg";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL?.replace('&channel_binding=require', ''),
  ssl: { rejectUnauthorized: false },
});

// Gmail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER || "ignitemind60@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD || "kljsugzwgawzttus",
  },
  tls: { rejectUnauthorized: false },
});

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  yearLevel: string;
  message: string;
}

function generateAdminEmail(data: ContactFormData): string {
  return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #f97316, #dc2626); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🧠 IgniteMind Academy</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">New Contact Form Submission</p>
  </div>
  
  <div style="background: #fff; padding: 30px; border: 1px solid #e2e8f0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; font-weight: bold; color: #475569; width: 40%;">Name</td>
        <td style="padding: 12px; color: #1e293b;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold; color: #475569;">Email</td>
        <td style="padding: 12px; color: #1e293b;"><a href="mailto:${data.email}" style="color: #f97316;">${data.email}</a></td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; font-weight: bold; color: #475569;">Phone</td>
        <td style="padding: 12px; color: #1e293b;">${data.phone || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold; color: #475569;">Year Level</td>
        <td style="padding: 12px; color: #1e293b;">${data.yearLevel || 'Not provided'}</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; font-weight: bold; color: #475569;">Message</td>
        <td style="padding: 12px; color: #1e293b;">${data.message}</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold; color: #475569;">Submitted</td>
        <td style="padding: 12px; color: #1e293b;">${new Date().toLocaleString("en-AU", { timeZone: "Australia/Melbourne" })}</td>
      </tr>
    </table>
  </div>
</div>
`;
}

function generateCustomerEmail(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px; padding: 25px; background: linear-gradient(135deg, #f97316, #dc2626); border-radius: 12px;">
      <h1 style="margin: 0; color: white; font-size: 28px;">🧠 IgniteMind Academy</h1>
      <p style="margin: 5px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">NAPLAN Tutoring Excellence</p>
    </div>

    <div style="background: #fff; border-radius: 12px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <h2 style="color: #f97316; margin-top: 0;">Hi ${data.name}! 👋</h2>
      
      <p>Thank you for contacting IgniteMind Academy!</p>
      
      <div style="background: #f0fdf4; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #22c55e;">
        <h3 style="margin: 0 0 10px; color: #166534;">✅ What Happens Next?</h3>
        <ol style="margin: 0; padding-left: 20px; color: #166534;">
          <li>We've received your message</li>
          <li>Our team will contact you within <strong>24 hours</strong></li>
          <li>We'll help you find the right tutoring solution for your child</li>
        </ol>
      </div>

      <h3 style="color: #1e293b; margin: 25px 0 15px;">📋 Your Message Summary</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748b;">Year Level</td>
          <td style="padding: 10px 0; color: #1e293b; font-weight: bold;">${data.yearLevel || 'Not specified'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748b;">Message</td>
          <td style="padding: 10px 0; color: #1e293b;">${data.message}</td>
        </tr>
      </table>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://ignitemindacademy.vercel.app/pricing" style="display: inline-block; background: linear-gradient(to right, #f97316, #dc2626); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Our Pricing</a>
      </div>
    </div>

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
    const body: ContactFormData = await request.json();
    const { name, email, phone, yearLevel, message } = body;

    console.log("Contact form submission:", body);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    // Save to database - only insert fields that exist in table
    const client = await pool.connect();
    try {
      await client.query(
        'INSERT INTO contact_submissions (name, email, year_level, message, phone) VALUES ($1, $2, $3, $4, $5)',
        [name, email, yearLevel || null, message, phone || null]
      );
      console.log("Saved to database");
    } catch (dbError) {
      console.error("Database error:", dbError);
      // Continue anyway - don't fail if DB insert fails
    } finally {
      client.release();
    }

    // Send email to admin
    try {
      await transporter.sendMail({
        from: '"IgniteMind Academy Website" <ignitemind60@gmail.com>',
        to: "ignitemind60@gmail.com",
        subject: `📨 New Contact: ${name} - Year ${yearLevel || 'N/A'}`,
        html: generateAdminEmail(body),
      });
      console.log("Admin email sent");
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    // Send confirmation email to customer
    try {
      await transporter.sendMail({
        from: '"IgniteMind Academy" <ignitemind60@gmail.com>',
        to: email,
        subject: "Thanks for contacting IgniteMind Academy!",
        html: generateCustomerEmail(body),
      });
      console.log("Customer email sent");
    } catch (emailError) {
      console.error("Customer email error:", emailError);
    }

    return NextResponse.json({ success: true, message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ error: "Failed to process contact form" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const submissions = await pool.query('SELECT * FROM contact_submissions ORDER BY created_at DESC');
    return NextResponse.json({ success: true, data: submissions.rows });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}
