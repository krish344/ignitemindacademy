"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { gradeLabels, GradeKey, testTypes, mcqsForGrade, Mcq } from "@/lib/quiz";
import QuizModeSelector from "@/components/quiz/QuizModeSelector";
import QuestionCard from "@/components/quiz/QuestionCard";
import Timer from "@/components/quiz/Timer";
import Navigator from "@/components/quiz/Navigator";
import ResultsDashboard from "@/components/quiz/ResultsDashboard";
import { saveQuizResult, getQuizResults, QuizResult } from "@/lib/student-storage";

interface QuizSubmission {
  studentName: string;
  email: string;
  grade: string;
  testType: string;
  answers: Record<string, string>;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function trackEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}

function QuizContent() {
  const searchParams = useSearchParams();
  const [quizState, setQuizState] = useState<"setup" | "mode" | "quiz" | "results">("setup");
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    email: "",
    grade: "year3" as GradeKey,
  });
  const [selectedMode, setSelectedMode] = useState<string>("practice");
  const [selectedSubject, setSelectedSubject] = useState<string>("numeracy");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [showReview, setShowReview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);

  // Check URL params on mount to auto-advance
  useEffect(() => {
    const subject = searchParams.get("subject");
    const mode = searchParams.get("mode");
    const name = searchParams.get("name");
    const grade = searchParams.get("grade");
    
    if (subject) {
      setSelectedSubject(subject);
    }
    if (mode) {
      setSelectedMode(mode);
    }
    if (name) {
      setStudentInfo(prev => ({ ...prev, name }));
    }
    if (grade) {
      const gradeMap: Record<string, GradeKey> = {
        "3": "year3",
        "5": "year5",
        "7": "year7",
        "9": "year9",
      };
      setStudentInfo(prev => ({ ...prev, grade: gradeMap[grade] || "year3" }));
    }
    
    // Auto-advance from setup to quiz if params are present
    if (subject && mode && name) {
      setQuizState("mode");
      // Then go to quiz after a brief delay
      setTimeout(() => {
        setQuizState("quiz");
        setStartTime(Date.now());
      }, 500);
    }
  }, [searchParams]);

  // Get questions based on grade
  const questions = useMemo(() => {
    return mcqsForGrade(studentInfo.grade, "all");
  }, [studentInfo.grade]);

  const question = questions[currentQuestion];

  const handleAnswerSelect = (choiceIndex: number) => {
    setAnswers((prev) => ({ ...prev, [question?.id || ""]: choiceIndex }));
  };

  const handleModeSelect = (modeId: string) => {
    setSelectedMode(modeId);
    setQuizState("quiz");
    setStartTime(Date.now());
    trackEvent('quiz_start', {
      mode: modeId,
      grade: studentInfo.grade,
      subject: selectedSubject,
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answerIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    const endTime = Date.now();
    const taken = Math.round((endTime - startTime) / 1000);
    setTimeTaken(taken);

    const percentage = Math.round((score / questions.length) * 100);

    setLoading(true);

    // Save to localStorage for dashboard
    const quizResult: QuizResult = {
      id: `quiz-${Date.now()}`,
      date: new Date().toISOString(),
      subject: selectedSubject,
      mode: selectedMode,
      score: percentage,
      totalQuestions: questions.length,
      timeTaken: taken,
      topics: [selectedSubject],
    };
    saveQuizResult(quizResult);

    try {
      const submission: QuizSubmission = {
        studentName: studentInfo.name,
        email: studentInfo.email,
        grade: gradeLabels[studentInfo.grade],
        testType: "mixed",
        answers: Object.entries(answers).reduce(
          (acc, [key, val]) => ({ ...acc, [key]: val?.toString() || "" }),
          {}
        ),
      };

      const response = await fetch("/api/quiz/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...submission,
          score,
          totalQuestions: questions.length,
        }),
      });

      if (response.ok) {
        trackEvent('quiz_complete', {
          grade: studentInfo.grade,
          subject: selectedSubject,
          mode: selectedMode,
          score: percentage,
          total_questions: questions.length,
        });
        setQuizState("results");
      } else {
        setQuizState("results");
      }
    } catch {
      setQuizState("results");
    } finally {
      setLoading(false);
    }
  };

  const handleTimeUp = () => {
    handleSubmit();
  };

  // Calculate breakdown for results
  const calculateBreakdown = () => {
    const topics = ["number", "algebra", "measurement", "geometry", "statistics", "grammar"];
    return topics.map((topic) => {
      const topicQuestions = questions.filter((q) => q.topic === topic);
      const correct = topicQuestions.filter((q) => answers[q.id] === q.answerIndex).length;
      return {
        topic: topic.charAt(0).toUpperCase() + topic.slice(1),
        correct,
        total: topicQuestions.length || 1,
      };
    }).filter((item) => item.total > 1);
  };

  const isFormComplete = studentInfo.name && studentInfo.email;

  // Setup View
  if (quizState === "setup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 NAPLAN Practice Quiz</h1>
              <p className="text-gray-600">Test your knowledge and improve your skills</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  value={studentInfo.name}
                  onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                  className="w-full rounded-xl border-2 border-gray-200 p-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={studentInfo.email}
                  onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
                  className="w-full rounded-xl border-2 border-gray-200 p-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(gradeLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setStudentInfo({ ...studentInfo, grade: key as GradeKey })}
                      className={`p-3 rounded-xl border-2 font-medium transition-all ${
                        studentInfo.grade === key
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setQuizState("mode")}
                disabled={!isFormComplete}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Mode Selection View
  if (quizState === "mode") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <QuizModeSelector onSelectMode={handleModeSelect} />
        </div>
      </div>
    );
  }

  // Results View
  if (quizState === "results") {
    const score = calculateScore();
    const breakdown = calculateBreakdown();

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <ResultsDashboard
            score={score}
            totalQuestions={questions.length}
            timeTaken={timeTaken}
            breakdown={breakdown}
            previousScore={undefined}
          />

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="/dashboard"
              className="flex-1 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-orange-300 text-center"
            >
              📊 View Dashboard
            </a>
            <button
              onClick={() => {
                setAnswers({});
                setCurrentQuestion(0);
                setQuizState("mode");
                setMarkedForReview(new Set());
              }}
              className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg"
            >
              🔄 Try Another Quiz
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Quiz View
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Timer (only for timed modes) */}
      {selectedMode === "timed" && (
        <Timer
          duration={30}
          onTimeUp={handleTimeUp}
          isActive={quizState === "quiz"}
        />
      )}

      {/* Quiz Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">📝 Quiz</h1>
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                {selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)}
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                {gradeLabels[studentInfo.grade]}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium capitalize">
                {selectedMode}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{Object.values(answers).filter((a) => a !== null).length}</span>
                /{questions.length} answered
              </div>
              <button
                onClick={() => setShowReview(true)}
                className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg font-medium hover:bg-orange-200 transition-colors"
              >
                Review
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Question Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {question && (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <QuestionCard
                    question={question}
                    selectedAnswer={answers[question.id] ?? null}
                    isAnswered={answers[question.id] !== undefined}
                    onSelectAnswer={handleAnswerSelect}
                    questionNumber={currentQuestion + 1}
                    totalQuestions={questions.length}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestion((prev) => prev + 1)}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading || Object.keys(answers).length < questions.length}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Finish Quiz"}
                </button>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <div className="hidden xl:block w-72 flex-shrink-0">
            <Navigator
              totalQuestions={questions.length}
              currentQuestion={currentQuestion}
              answers={answers}
              markedForReview={markedForReview}
              onNavigate={setCurrentQuestion}
            />
          </div>
        </div>
      </div>

      {/* Mobile Question Navigator */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {questions.map((q, index) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = index === currentQuestion;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-full text-sm font-medium flex-shrink-0 transition-all ${
                  isCurrent
                    ? "bg-gray-900 text-white"
                    : isAnswered
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function EnhancedQuizPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading quiz...</div>}>
      <QuizContent />
    </Suspense>
  );
}
