"use client";

import { motion, AnimatePresence } from "framer-motion";

interface QuizNavigatorProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: Record<string, number | null>;
  markedForReview: Set<number>;
  onNavigate: (index: number) => void;
}

export default function QuizNavigator({
  totalQuestions,
  currentQuestion,
  answers,
  markedForReview,
  onNavigate,
}: QuizNavigatorProps) {
  const getQuestionStatus = (index: number) => {
    const questionNum = index + 1;
    if (markedForReview.has(index)) return "review";
    if (answers[`q${questionNum}`] !== null && answers[`q${questionNum}`] !== undefined)
      return "answered";
    return "unanswered";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-3xl shadow-lg p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Questions</h3>
        <span className="text-sm text-gray-500">
          {Object.values(answers).filter((a) => a !== null).length}/{totalQuestions}
        </span>
      </div>

      {/* Question Grid */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const status = getQuestionStatus(index);
          const isCurrent = index === currentQuestion;

          let bgClass = "bg-gray-100 hover:bg-gray-200";
          if (status === "answered") bgClass = "bg-green-100 hover:bg-green-200 text-green-700";
          if (status === "review") bgClass = "bg-orange-100 hover:bg-orange-200 text-orange-700";
          if (isCurrent) bgClass = "bg-gray-900 text-white";

          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate(index)}
              className={`w-10 h-10 rounded-lg font-semibold text-sm transition-colors ${bgClass}`}
            >
              {index + 1}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gray-100" />
          <span className="text-gray-600">Unanswered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-green-100" />
          <span className="text-gray-600">Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-orange-100" />
          <span className="text-gray-600">Review</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gray-900" />
          <span className="text-gray-600">Current</span>
        </div>
      </div>

      {/* Mark for Review Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full mt-4 py-3 rounded-xl font-medium transition-colors ${
          markedForReview.has(currentQuestion)
            ? "bg-orange-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => {
          // Toggle review - this would be handled by parent
        }}
      >
        {markedForReview.has(currentQuestion) ? "✓ Marked for Review" : "📌 Mark for Review"}
      </motion.button>
    </motion.div>
  );
}
