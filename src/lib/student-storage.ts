// LocalStorage keys for IgniteMind
export const STORAGE_KEYS = {
  NAME: "ignitemind_student_name",
  EMAIL: "ignitemind_student_email",
  YEAR: "ignitemind_student_year",
  SUBJECTS: "ignitemind_student_subjects",
  QUIZ_PROGRESS: "ignitemind_quiz_progress",
  QUIZ_RESULTS: "ignitemind_quiz_results",
} as const;

// Student Info Interface
export interface StudentInfo {
  name: string;
  email: string;
  year: number;
  subjects: string[];
}

// Quiz Result Interface
export interface QuizResult {
  id: string;
  date: string;
  subject: string;
  mode: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  topics: string[];
}

// Save student info to localStorage
export function saveStudentInfo(info: StudentInfo): void {
  localStorage.setItem(STORAGE_KEYS.NAME, info.name);
  localStorage.setItem(STORAGE_KEYS.EMAIL, info.email || "");
  localStorage.setItem(STORAGE_KEYS.YEAR, info.year.toString());
  localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(info.subjects));
}

// Get student info from localStorage
export function getStudentInfo(): StudentInfo | null {
  const name = localStorage.getItem(STORAGE_KEYS.NAME);
  const email = localStorage.getItem(STORAGE_KEYS.EMAIL);
  const year = localStorage.getItem(STORAGE_KEYS.YEAR);
  const subjects = localStorage.getItem(STORAGE_KEYS.SUBJECTS);

  if (name && year && subjects) {
    return {
      name,
      email: email || "",
      year: parseInt(year),
      subjects: JSON.parse(subjects),
    };
  }

  return null;
}

// Clear student info from localStorage
export function clearStudentInfo(): void {
  localStorage.removeItem(STORAGE_KEYS.NAME);
  localStorage.removeItem(STORAGE_KEYS.EMAIL);
  localStorage.removeItem(STORAGE_KEYS.YEAR);
  localStorage.removeItem(STORAGE_KEYS.SUBJECTS);
}

// Save quiz result to localStorage
export function saveQuizResult(result: QuizResult): void {
  const results = getQuizResults();
  results.push(result);
  localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(results));
}

// Get all quiz results from localStorage
export function getQuizResults(): QuizResult[] {
  try {
    const results = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
    return results ? JSON.parse(results) : [];
  } catch {
    return [];
  }
}

// Clear all student data from localStorage
export function clearAllStudentData(): void {
  clearStudentInfo();
  localStorage.removeItem(STORAGE_KEYS.QUIZ_RESULTS);
}

// Check if student has onboarded
export function hasOnboarded(): boolean {
  const name = localStorage.getItem(STORAGE_KEYS.NAME);
  const year = localStorage.getItem(STORAGE_KEYS.YEAR);
  const subjects = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
  
  return !!(name && year && subjects);
}

// Quiz Progress Interface
export interface QuizProgress {
  subject: string;
  mode: string;
  grade: string;
  answers: Record<string, number | null>;
  currentQuestion: number;
  timestamp: number;
}

// Save quiz progress to localStorage (auto-save)
export function saveQuizProgress(progress: QuizProgress): void {
  localStorage.setItem(STORAGE_KEYS.QUIZ_PROGRESS, JSON.stringify(progress));
}

// Get quiz progress from localStorage
export function getQuizProgress(): QuizProgress | null {
  try {
    const progress = localStorage.getItem(STORAGE_KEYS.QUIZ_PROGRESS);
    if (progress) {
      const parsed = JSON.parse(progress);
      // Check if progress is less than 24 hours old
      const isRecent = Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000;
      return isRecent ? parsed : null;
    }
    return null;
  } catch {
    return null;
  }
}

// Clear quiz progress
export function clearQuizProgress(): void {
  localStorage.removeItem(STORAGE_KEYS.QUIZ_PROGRESS);
}
