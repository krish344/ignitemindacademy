"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ProgressChart from "@/components/dashboard/ProgressChart";
import QuizIntakeForm from "@/components/dashboard/QuizIntakeForm";
import QuizHistory from "@/components/dashboard/QuizHistory";
import { 
  saveStudentInfo, 
  getStudentInfo, 
  clearStudentInfo, 
  getQuizResults,
  saveQuizResult,
  StudentInfo,
  QuizResult 
} from "@/lib/student-storage";

// Header Component
function DashboardHeader({ studentInfo, onLogout }: { studentInfo: StudentInfo | null; onLogout: () => void }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="font-semibold text-gray-900">IgniteMind</span>
            <span className="text-sm text-gray-500 ml-2">NAPLAN Practice</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-gray-600 hover:text-orange-500 transition-colors">
              Home
            </a>
            <a href="/quiz" className="text-gray-600 hover:text-orange-500 transition-colors">
              Quizzes
            </a>
            <a href="/dashboard" className="text-orange-500 font-medium">
              Dashboard
            </a>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {studentInfo && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {studentInfo.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <div className="font-medium text-gray-900">{studentInfo.name}</div>
                  <div className="text-xs text-gray-500">Year {studentInfo.year}</div>
                  {studentInfo.email && (
                    <div className="text-xs text-gray-400">{studentInfo.email}</div>
                  )}
                </div>
                <button
                  onClick={onLogout}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors ml-2 px-3 py-2 rounded-lg hover:bg-gray-100"
                  title="Logout"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// Quiz Intake Modal
function QuizIntakeModal({ onStart, onCancel }: { onStart: (selection: { subject: string; mode: string }) => void; onCancel: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 overflow-y-auto"
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
      >
        <QuizIntakeForm onStartQuiz={onStart} onCancel={onCancel} />
      </motion.div>
    </motion.div>
  );
}

// Main Dashboard Content
function DashboardContent({ 
  studentInfo, 
  onNewQuiz,
  quizResults,
  showAnalysis,
  onToggleAnalysis,
  onLogout
}: { 
  studentInfo: StudentInfo; 
  onNewQuiz: () => void;
  quizResults: QuizResult[];
  showAnalysis: boolean;
  onToggleAnalysis: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <DashboardHeader studentInfo={studentInfo} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-gray-900">
              🧠 IgniteMind NAPLAN Practice
            </h1>
            <p className="text-gray-600 mt-2">
              Track your progress and improve your scores
            </p>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Take Quiz */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl shadow-lg p-6"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Take a Quiz</h2>
                  <p className="text-gray-600 text-sm mt-1">Select a subject and start practicing</p>
                </div>

                {/* Subject Selection */}
                <div className="space-y-3 mb-6">
                  {[
                    { id: "numeracy", label: "Numeracy", icon: "🔢" },
                    { id: "reading", label: "Reading", icon: "📖" },
                    { id: "writing", label: "Writing", icon: "✍️" },
                  ].map((subject) => (
                    <motion.button
                      key={subject.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all"
                    >
                      <span className="text-2xl">{subject.icon}</span>
                      <span className="font-medium text-gray-900">{subject.label}</span>
                      <span className="ml-auto text-orange-500">→</span>
                    </motion.button>
                  ))}
                </div>

                {/* Mode Selection */}
                <div className="space-y-2 mb-6">
                  {[
                    { id: "quick", label: "Quick", desc: "10 questions", icon: "⚡" },
                    { id: "full", label: "Full", desc: "30 questions", icon: "📝" },
                    { id: "timed", label: "Timed", desc: "45 minutes", icon: "⏱️" },
                  ].map((mode) => (
                    <motion.button
                      key={mode.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-100 hover:bg-orange-100 transition-all"
                    >
                      <span className="text-xl">{mode.icon}</span>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">{mode.label}</div>
                        <div className="text-xs text-gray-500">{mode.desc}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Start Quiz Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onNewQuiz}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>▶️</span>
                  Start Quiz
                </motion.button>
              </motion.div>
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quiz History / Results */}
              <QuizHistory 
                quizResults={quizResults}
                onViewAnalysis={onToggleAnalysis}
              />

              {/* Progress Chart - Only show when analysis is enabled */}
              {showAnalysis && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <ProgressChart quizResults={quizResults} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Welcome Screen (when no data)
function WelcomeScreen({ onComplete }: { onComplete: (data: StudentInfo) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🧠</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            IgniteMind NAPLAN Practice
          </h1>
          <p className="text-gray-600">
            Enter your details to get started
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const name = (form.elements.namedItem('name') as HTMLInputElement).value;
            const email = (form.elements.namedItem('email') as HTMLInputElement).value;
            const year = parseInt((form.elements.namedItem('year') as HTMLSelectElement).value);
            const subjectCheckboxes = form.querySelectorAll('input[name="subject"]:checked');
            const subjects = Array.from(subjectCheckboxes).map((el) => (el as HTMLInputElement).value);
            
            onComplete({ name, email, year, subjects });
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Year Level
            </label>
            <select
              name="year"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
            >
              <option value="3">Year 3</option>
              <option value="5">Year 5</option>
              <option value="7">Year 7</option>
              <option value="9">Year 9</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subjects
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "numeracy", label: "Numeracy" },
                { id: "reading", label: "Reading" },
                { id: "writing", label: "Writing" },
                { id: "language", label: "Language Conventions" },
              ].map((subject) => (
                <label
                  key={subject.id}
                  className="flex items-center gap-2 p-3 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-orange-500 transition-colors"
                >
                  <input
                    type="checkbox"
                    name="subject"
                    value={subject.id}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">{subject.label}</span>
                </label>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Get Started →
          </motion.button>
        </form>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(false);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [showQuizIntake, setShowQuizIntake] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const checkStorage = () => {
      const info = getStudentInfo();
      
      if (info) {
        setStudentInfo(info);
        setHasOnboarded(true);
      }
      setIsLoading(false);
    };

    checkStorage();
  }, []);

  // Handle form completion
  const handleWelcomeComplete = (data: StudentInfo) => {
    saveStudentInfo(data);
    setStudentInfo(data);
    setHasOnboarded(true);
  };

  // Handle logout/switch student
  const handleLogout = () => {
    clearStudentInfo();
    setStudentInfo(null);
    setHasOnboarded(false);
  };

  // Handle new quiz
  const handleStartQuiz = () => {
    setShowQuizIntake(true);
  };

  // Handle quiz start from intake form - ACTUALLY NAVIGATE TO QUIZ
  const handleQuizIntakeStart = (selection: { subject: string; mode: string }) => {
    setShowQuizIntake(false);
    
    // Navigate to quiz page with all student parameters
    const params = new URLSearchParams({
      subject: selection.subject,
      mode: selection.mode,
      name: studentInfo?.name || "",
      email: studentInfo?.email || "",
      year: studentInfo?.year?.toString() || "3",
    });
    router.push(`/quiz?${params.toString()}`);
  };

  // Load quiz results from localStorage
  const quizResults = getQuizResults();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!hasOnboarded ? (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <WelcomeScreen onComplete={handleWelcomeComplete} />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <DashboardContent 
            studentInfo={studentInfo!} 
            onNewQuiz={handleStartQuiz}
            quizResults={quizResults}
            showAnalysis={showAnalysis}
            onToggleAnalysis={() => setShowAnalysis(!showAnalysis)}
            onLogout={handleLogout}
          />
          
          <AnimatePresence>
            {showQuizIntake && (
              <QuizIntakeModal
                onStart={handleQuizIntakeStart}
                onCancel={() => setShowQuizIntake(false)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Export types for use in other components
export type { StudentInfo, QuizResult };
