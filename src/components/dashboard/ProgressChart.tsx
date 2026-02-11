"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { QuizResult } from "@/app/dashboard/page";

interface ProgressChartProps {
  quizResults: QuizResult[];
}

const COLORS = {
  numeracy: "#f97316",
  reading: "#3b82f6",
  writing: "#8b5cf6",
  language: "#10b981",
  default: "#6b7280",
};

export default function ProgressChart({ quizResults }: ProgressChartProps) {
  // Calculate average score by subject
  const subjectScores = quizResults.reduce((acc, result) => {
    const subject = result.subject.toLowerCase();
    if (!acc[subject]) {
      acc[subject] = { total: 0, count: 0 };
    }
    acc[subject].total += result.score;
    acc[subject].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  // Format data for chart
  const chartData = Object.entries(subjectScores).map(([subject, data]) => ({
    subject: subject.charAt(0).toUpperCase() + subject.slice(1),
    score: Math.round(data.total / data.count),
    fill: COLORS[subject as keyof typeof COLORS] || COLORS.default,
  }));

  // Calculate overall average
  const overallAverage = quizResults.length > 0
    ? Math.round(quizResults.reduce((acc, r) => acc + r.score, 0) / quizResults.length)
    : 0;

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ payload: { score: number } }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-orange-600 font-bold">
            Average: {payload[0].payload.score}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance by Subject</h3>

      {quizResults.length === 0 ? (
        <div className="h-48 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p>No data yet</p>
            <p className="text-sm">Complete quizzes to see your performance</p>
          </div>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <XAxis 
                type="number" 
                domain={[0, 100]} 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis 
                type="category" 
                dataKey="subject" 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="score" 
                radius={[0, 8, 8, 0]}
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Overall Average Display */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">Overall Average</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
            <span className="text-xl font-bold text-gray-900">{overallAverage}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
