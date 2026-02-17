-- Create tables for IgniteMind Academy
-- Run this SQL in your Neon database

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    grade VARCHAR(50) NOT NULL,
    parent_phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz results table
CREATE TABLE IF NOT EXISTS quiz_results (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    test_type VARCHAR(100) NOT NULL,
    grade VARCHAR(50) NOT NULL,
    subject VARCHAR(100),
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    time_taken INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_results_student_id ON quiz_results(student_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON quiz_results(created_at);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);

-- Insert sample data (optional)
-- INSERT INTO students (name, email, grade) VALUES ('Test Student', 'test@example.com', 'Year 5');
