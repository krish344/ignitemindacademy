"use client";

import { motion } from "framer-motion";
import { Mcq } from "@/components/QuizClient";

interface QuestionCardProps {
  question: Mcq;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onSelectAnswer: (choiceIndex: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  isAnswered,
  onSelectAnswer,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden"
    >
      {/* Question Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium opacity-90">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            {question.topic.charAt(0).toUpperCase() + question.topic.slice(1)}
          </span>
        </div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl md:text-2xl font-semibold"
        >
          {question.prompt}
        </motion.h2>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          className="h-full bg-gradient-to-r from-orange-500 to-red-500"
        />
      </div>

      {/* Answer Options */}
      <div className="p-6 space-y-3">
        {question.choices.map((choice, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.answerIndex;
          const showResult = isAnswered;

          let buttonClass =
            "w-full p-4 rounded-xl text-left font-medium transition-all duration-200 border-2 ";

          if (showResult) {
            if (isCorrect) {
              buttonClass += "border-green-500 bg-green-50 text-green-700";
            } else if (isSelected && !isCorrect) {
              buttonClass += "border-red-500 bg-red-50 text-red-700";
            } else {
              buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
            }
          } else if (isSelected) {
            buttonClass += "border-orange-500 bg-orange-50 text-orange-700";
          } else {
            buttonClass += "border-gray-200 hover:border-orange-300 hover:bg-orange-50";
          }

          return (
            <motion.button
              key={index}
              whileHover={!showResult ? { scale: 1.01 } : {}}
              whileTap={!showResult ? { scale: 0.99 } : {}}
              className={buttonClass}
              onClick={() => !showResult && onSelectAnswer(index)}
              disabled={showResult}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    showResult
                      ? isCorrect
                        ? "bg-green-500 text-white"
                        : isSelected
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-500"
                      : isSelected
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {showResult ? (
                    isCorrect ? (
                      "✓"
                    ) : isSelected ? (
                      "✗"
                    ) : (
                      String.fromCharCode(65 + index)
                    )
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </span>
                <span>{choice}</span>
                {showResult && isCorrect && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-auto text-green-600"
                  >
                    ✓ Correct
                  </motion.span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pb-6"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-600">💡</span>
              <span className="font-semibold text-blue-800">Explanation</span>
            </div>
            <p className="text-blue-700 text-sm">{question.explanation}</p>
            
            {/* Linked Resources */}
            <div className="mt-3 pt-3 border-t border-blue-200">
              <button className="text-sm text-orange-600 font-medium hover:text-orange-700 flex items-center gap-1">
                📚 View related resources
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
