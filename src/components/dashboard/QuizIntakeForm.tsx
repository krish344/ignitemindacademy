"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface QuizIntakeFormProps {
  onStartQuiz: (selection: QuizSelection) => void;
  onCancel: () => void;
}

export interface QuizSelection {
  subject: string;
  mode: string;
}

const SUBJECTS = [
  { id: "numeracy", label: "Numeracy", icon: "🔢" },
  { id: "reading", label: "Reading", icon: "📖" },
  { id: "writing", label: "Writing", icon: "✍️" },
  { id: "language", label: "Language", icon: "🌍" },
  { id: "all", label: "All Subjects", icon: "📚" },
];

const MODES = [
  {
    id: "quick",
    label: "Quick Practice",
    description: "10 questions",
    icon: "⚡",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: "full",
    label: "Full Quiz",
    description: "30 questions",
    icon: "📝",
    color: "from-orange-400 to-red-500",
  },
  {
    id: "mock",
    label: "Timed Mock Test",
    description: "45 minutes",
    icon: "⏱️",
    color: "from-purple-400 to-purple-600",
  },
];

export default function QuizIntakeForm({ onStartQuiz, onCancel }: QuizIntakeFormProps) {
  const [subject, setSubject] = useState<string>("numeracy");
  const [mode, setMode] = useState<string>("quick");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartQuiz({ subject, mode });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-lg mx-auto"
    >
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-4xl">📝</span>
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Quick Setup
          </h1>
          <p className="text-gray-600">
            What would you like to practice today?
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Subject
            </label>
            <div className="grid grid-cols-3 gap-3">
              {SUBJECTS.slice(0, 3).map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSubject(item.id)}
                  className={`p-4 rounded-xl text-center transition-all ${
                    subject === item.id
                      ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600"
                  }`}
                >
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-sm font-medium">{item.label}</div>
                </motion.button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {SUBJECTS.slice(3).map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSubject(item.id)}
                  className={`p-4 rounded-xl text-center transition-all ${
                    subject === item.id
                      ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600"
                  }`}
                >
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-sm font-medium">{item.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Mode Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Mode
            </label>
            <div className="space-y-3">
              {MODES.map((modeOption) => (
                <motion.button
                  key={modeOption.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMode(modeOption.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    mode === modeOption.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${modeOption.color} flex items-center justify-center text-2xl`}>
                    {modeOption.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className={`font-semibold ${
                      mode === modeOption.id ? "text-gray-900" : "text-gray-700"
                    }`}>
                      {modeOption.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {modeOption.description}
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    mode === modeOption.id
                      ? "border-orange-500 bg-orange-500"
                      : "border-gray-300"
                  }`}>
                    {mode === modeOption.id && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-200 transition-all"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>▶️</span>
              Start Quiz
            </motion.button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
