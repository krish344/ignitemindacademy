import { NextResponse } from 'next/server';
import crypto from 'crypto';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ignitemind.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'IgniteMind@2024';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log('Login attempt - Email:', email);
    console.log('Expected email:', ADMIN_EMAIL);
    console.log('Expected password:', ADMIN_PASSWORD);

    // Simple credential check (in production, use bcrypt and database)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate a simple token (in production, use JWT)
      const token = crypto.randomBytes(32).toString('hex');
      
      console.log('Login successful!');
      
      return NextResponse.json({
        success: true,
        token,
        message: 'Login successful',
      });
    }

    console.log('Login failed - invalid credentials');
    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}
