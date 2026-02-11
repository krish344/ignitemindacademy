import { NextResponse } from 'next/server';
import pg from 'pg';

// Force dynamic rendering - don't prerender during build
export const dynamic = 'force-dynamic';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

interface QuizSubmission {
  studentName: string;
  email: string;
  grade: string;
  testType: string;
  score: number;
  totalQuestions: number;
  answers: Record<string, string>;
}

export async function POST(request: Request) {
  const client = await pool.connect();
  try {
    const body = await request.json();
    console.log('Received quiz submission:', body);
    
    const { studentName, email, grade, testType, score, totalQuestions, answers } = body;

    if (!studentName || !email || !grade || !testType || score === undefined || !totalQuestions || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const percentage = Math.round((score / totalQuestions) * 100);
    console.log('Calculated percentage:', percentage);

    // Use explicit transaction
    await client.query('BEGIN');
    console.log('Transaction started');

    console.log('Looking for student with email:', email);
    const existingStudent = await client.query('SELECT * FROM students WHERE email = $1', [email]);
    console.log('Existing student:', existingStudent.rows);

    let studentId: number;

    if (existingStudent.rows.length > 0) {
      studentId = existingStudent.rows[0].id;
      console.log('Using existing student ID:', studentId);
    } else {
      console.log('Creating new student...');
      const newStudent = await client.query(
        'INSERT INTO students (name, email, grade) VALUES ($1, $2, $3) RETURNING id',
        [studentName, email, grade]
      );
      console.log('New student result:', newStudent.rows);
      studentId = newStudent.rows[0].id;
    }

    console.log('Saving quiz result for student ID:', studentId);
    const newQuizResult = await client.query(
      'INSERT INTO quiz_results (student_id, test_type, grade, score, total_questions, percentage, answers) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [studentId, testType, grade, score, totalQuestions, percentage, JSON.stringify(answers)]
    );
    console.log('Quiz result saved:', newQuizResult.rows);

    await client.query('COMMIT');
    console.log('Transaction committed');

    return NextResponse.json({
      success: true,
      message: 'Quiz result saved successfully',
      data: {
        id: newQuizResult.rows[0].id,
        percentage,
      },
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error saving quiz result:', error);
    return NextResponse.json(
      { error: 'Failed to save quiz result',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
