"use client";

import { motion } from "framer-motion";
import { QuizResult } from "@/app/dashboard/page";

interface QuizHistoryProps {
  quizResults: QuizResult[];
  onViewAnalysis?: () => void;
}

export default function QuizHistory({ quizResults, onViewAnalysis }: QuizHistoryProps) {
  // Calculate overall average
  const overallAverage = quizResults.length > 0
    ? Math.round(quizResults.reduce((acc, r) => acc + r.score, 0) / quizResults.length)
    : 0;

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  // Get subject icon
  const getSubjectIcon = (subject: string) => {
    const icons: Record<string, string> = {
      numeracy: "🔢",
      reading: "📖",
      writing: "✍️",
      language: "🌍",
    };
    return icons[subject.toLowerCase()] || "📚";
  };

  // Get score color based on performance
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  // Sort by most recent first
  const sortedResults = [...quizResults].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 10); // Show last 10 quizzes

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-lg p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Your Results</h3>
        {onViewAnalysis && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewAnalysis}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all"
          >
            📈 View Detailed Analysis
          </motion.button>
        )}
      </div>

      {/* Overall Average */}
      <div className="mb-6 p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">Overall Average</span>
          <span className="text-2xl font-bold text-orange-600">{overallAverage}%</span>
        </div>
      </div>

      {/* Quiz List */}
      <div className="space-y-3">
        {sortedResults.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📝</div>
            <p>No quizzes yet</p>
            <p className="text-sm">Start your first quiz to see results here!</p>
          </div>
        ) : (
          sortedResults.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors"
            >
              {/* Subject Icon */}
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                {getSubjectIcon(result.subject)}
              </div>

              {/* Quiz Details */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 capitalize">
                  {result.subject}
                </div>
                <div className="text-sm text-gray-500">
                  {result.totalQuestions} questions • {formatDate(result.date)}
                </div>
              </div>

              {/* Score */}
              <div className={`px-4 py-2 rounded-xl font-semibold ${getScoreColor(result.score)}`}>
                {result.score}%
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Total Quizzes */}
      {quizResults.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-sm text-gray-500">
          {quizResults.length} quiz{quizResults.length !== 1 ? 'zes' : ''} completed
        </div>
      )}
    </motion.div>
  );
}
