import { NextResponse } from 'next/server';
import pg from 'pg';

// Force dynamic rendering - don't prerender during build
export const dynamic = 'force-dynamic';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL?.replace('&channel_binding=require', ''),
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: 'DATABASE_URL not configured' },
      { status: 500 }
    );
  }
  
  let client;
  try {
    client = await pool.connect();
  } catch (err) {
    console.error('Database connection error:', err);
    return NextResponse.json(
      { error: 'Failed to connect to database', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
  
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const studentId = searchParams.get('studentId');

    // If email provided - get specific student results
    if (email) {
      const student = await client.query('SELECT * FROM students WHERE email = $1 LIMIT 1', [email]);
      
      if (student.rows.length === 0) {
        return NextResponse.json(
          { error: 'Student not found' },
          { status: 404 }
        );
      }

      const results = await client.query('SELECT * FROM quiz_results WHERE student_id = $1 ORDER BY created_at DESC', [student.rows[0].id]);

      return NextResponse.json({
        success: true,
        data: {
          ...student.rows[0],
          quizResults: results.rows,
        },
      });
    }

    // If studentId provided - get specific student results
    if (studentId) {
      const sid = parseInt(studentId);
      const student = await client.query('SELECT * FROM students WHERE id = $1 LIMIT 1', [sid]);
      
      if (student.rows.length === 0) {
        return NextResponse.json(
          { error: 'Student not found' },
          { status: 404 }
        );
      }

      const results = await client.query('SELECT * FROM quiz_results WHERE student_id = $1 ORDER BY created_at DESC', [sid]);

      return NextResponse.json({
        success: true,
        data: {
          ...student.rows[0],
          quizResults: results.rows,
        },
      });
    }

    // Admin: get all students with results
    const allStudents = await client.query('SELECT * FROM students ORDER BY created_at DESC');
    
    const studentsWithResults = await Promise.all(
      allStudents.rows.map(async (student) => {
        const results = await client.query('SELECT * FROM quiz_results WHERE student_id = $1 ORDER BY created_at DESC', [student.id]);
        
        return {
          ...student,
          quizResults: results.rows,
        };
      })
    );

    // Stats
    const totalStudents = await client.query('SELECT COUNT(*) as count FROM students');
    const totalQuizzes = await client.query('SELECT COUNT(*) as count FROM quiz_results');
    const avgScore = await client.query('SELECT COALESCE(AVG(percentage), 0) as avg FROM quiz_results');

    const recentResults = await client.query(`
      SELECT qr.*, s.name as student_name, s.email as student_email 
      FROM quiz_results qr 
      INNER JOIN students s ON qr.student_id = s.id 
      ORDER BY qr.created_at DESC 
      LIMIT 10
    `);

    return NextResponse.json({
      success: true,
      data: {
        students: studentsWithResults,
        stats: {
          totalStudents: parseInt(totalStudents.rows[0]?.count || '0'),
          totalQuizzes: parseInt(totalQuizzes.rows[0]?.count || '0'),
          averageScore: Math.round(parseFloat(avgScore.rows[0]?.avg || '0')),
        },
        recentSubmissions: recentResults.rows,
      },
    });
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quiz results',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
