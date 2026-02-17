import { NextResponse } from 'next/server';
import pg from 'pg';

// Force dynamic rendering - don't prerender during build
export const dynamic = 'force-dynamic';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

interface ContactFormData {
  name: string;
  email: string;
  yearLevel: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();
    
    const { name, email, yearLevel, message } = body;

    if (!name || !email || !yearLevel || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const client = await pool.connect();
    try {
      const newSubmission = await client.query(
        'INSERT INTO contact_submissions (name, email, year_level, message) VALUES ($1, $2, $3, $4) RETURNING id',
        [name, email, yearLevel, message]
      );

      return NextResponse.json({
        success: true,
        message: 'Contact form submitted successfully',
        data: {
          id: newSubmission.rows[0].id,
        },
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error saving contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const submissions = await pool.query(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC'
    );

    return NextResponse.json({
      success: true,
      data: submissions.rows,
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact submissions' },
      { status: 500 }
    );
  }
}
