"use client";

import { motion } from "framer-motion";

interface QuizMode {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: string;
  features: string[];
}

interface QuizModeSelectorProps {
  onSelectMode: (modeId: string) => void;
}

const quizModes: QuizMode[] = [
  {
    id: "practice",
    name: "Practice Mode",
    description: "Learn as you go with instant feedback",
    icon: "🎓",
    duration: "No time limit",
    features: ["Instant explanations", "Unlimited attempts", "Learn from mistakes"],
  },
  {
    id: "timed",
    name: "Timed Mode",
    description: "Exam simulation with time pressure",
    icon: "⏱️",
    duration: "30 minutes",
    features: ["Real exam conditions", "Time tracking", "Performance analysis"],
  },
  {
    id: "quickfire",
    name: "Quick Fire",
    description: "Speed practice for rapid score gains",
    icon: "🎯",
    duration: "5 minutes",
    features: ["Fast-paced", "Leaderboards", "Speed drills"],
  },
  {
    id: "mocktest",
    name: "Full Mock Test",
    description: "Complete NAPLAN simulation",
    icon: "📝",
    duration: "3 hours",
    features: ["Full length", "Realistic format", "Detailed report"],
  },
];

export default function QuizModeSelector({ onSelectMode }: QuizModeSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-lg p-6"
    >
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          Choose Your Challenge
        </motion.h2>
        <p className="text-gray-600">
          Select a quiz mode that matches your learning goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizModes.map((mode, index) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 cursor-pointer border-2 border-transparent hover:border-orange-300 transition-all"
            onClick={() => onSelectMode(mode.id)}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{mode.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{mode.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{mode.description}</p>
                
                <div className="mt-3 flex items-center gap-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                    {mode.duration}
                  </span>
                </div>

                <ul className="mt-3 space-y-1">
                  {mode.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
