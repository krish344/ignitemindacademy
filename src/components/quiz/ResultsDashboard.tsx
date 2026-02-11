"use client";

import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

interface ResultsDashboardProps {
  score: number;
  totalQuestions: number;
  timeTaken: number; // in seconds
  breakdown: {
    topic: string;
    correct: number;
    total: number;
  }[];
  previousScore?: number;
}

const COLORS = ["#f97316", "#fb923c", "#fdba74", "#fed7aa", "#ffedd5"];

export default function ResultsDashboard({
  score,
  totalQuestions,
  timeTaken,
  breakdown,
  previousScore,
}: ResultsDashboardProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const avgTimePerQuestion = Math.round(timeTaken / totalQuestions);

  // Radar data from breakdown
  const radarData = breakdown.map((item) => ({
    topic: item.topic,
    score: Math.round((item.correct / item.total) * 100),
    fullMark: 100,
  }));

  // Determine performance level
  const getPerformanceLevel = () => {
    if (percentage >= 90) return { label: "Outstanding!", color: "text-green-600", emoji: "🏆" };
    if (percentage >= 75) return { label: "Excellent!", color: "text-blue-600", emoji: "⭐" };
    if (percentage >= 60) return { label: "Good Job!", color: "text-orange-600", emoji: "👍" };
    return { label: "Keep Practicing!", color: "text-gray-600", emoji: "💪" };
  };

  const performance = getPerformanceLevel();

  // Compare with previous
  const scoreChange = previousScore !== undefined ? percentage - previousScore : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-lg p-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-6xl mb-4"
        >
          {percentage >= 90 ? "🎉" : percentage >= 75 ? "🎊" : percentage >= 60 ? "🙂" : "📚"}
        </motion.div>
        <h2 className={`text-3xl font-bold ${performance.color}`}>
          {performance.label}
        </h2>
        
        {/* Score Display */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="#f97316"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: "352 352", strokeDashoffset: "352" }}
                animate={{ strokeDashoffset: 352 - (352 * percentage) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{percentage}%</div>
                <div className="text-sm text-gray-500">{score}/{totalQuestions}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Score Change */}
        {scoreChange !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 inline-flex items-center gap-1 px-4 py-2 rounded-full ${
              scoreChange > 0
                ? "bg-green-100 text-green-700"
                : scoreChange < 0
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {scoreChange > 0 ? "📈" : scoreChange < 0 ? "📉" : "➡️"}
            {scoreChange > 0 ? "+" : ""}
            {scoreChange}% vs last attempt
          </motion.div>
        )}
      </div>

      {/* Time Analysis */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {Math.floor(timeTaken / 60)}:{(timeTaken % 60).toString().padStart(2, "0")}
          </div>
          <div className="text-sm text-gray-500">Total Time</div>
        </div>
        <div className="bg-gray-50 rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{avgTimePerQuestion}s</div>
          <div className="text-sm text-gray-500">Avg per Question</div>
        </div>
      </div>

      {/* Topic Breakdown */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Breakdown</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={breakdown} layout="vertical">
              <XAxis type="number" domain={[0, "dataMax"]} tick={{ fontSize: 12 }} />
              <YAxis dataKey="topic" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${props.payload.correct}/${props.payload.total} (${Math.round((props.payload.correct / props.payload.total) * 100)}%)`,
                  "Score",
                ]}
              />
              <Bar
                dataKey="correct"
                radius={[0, 4, 4, 0]}
                name="Correct"
              >
                {breakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Radar */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Radar</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="topic" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name="Score %"
                dataKey="score"
                stroke="#f97316"
                fill="#f97316"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💪</span>
            <span className="font-semibold text-green-800">Strengths</span>
          </div>
          <ul className="text-sm text-green-700 space-y-1">
            {breakdown
              .filter((item) => item.correct / item.total >= 0.7)
              .map((item) => (
                <li key={item.topic}>✓ {item.topic} ({Math.round((item.correct / item.total) * 100)}%)</li>
              ))}
          </ul>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🎯</span>
            <span className="font-semibold text-orange-800">Focus Areas</span>
          </div>
          <ul className="text-sm text-orange-700 space-y-1">
            {breakdown
              .filter((item) => item.correct / item.total < 0.7)
              .map((item) => (
                <li key={item.topic}>↗ {item.topic} ({Math.round((item.correct / item.total) * 100)}%)</li>
              ))}
          </ul>
        </div>
      </div>

      {/* Share Card Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share Your Results
      </motion.button>
    </motion.div>
  );
}
