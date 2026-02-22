import type { Metadata } from "next";
import { ExamInterface } from "@/components/ExamInterface";

export const metadata: Metadata = {
  title: "Olympiad Mock Tests - IgniteMind Academy",
  description: "Practice Math, Science, English, ICT, GK Olympiad tests",
};

// Timing in minutes per subject
const TIMING = {
  'math': 60,
  'science': 50,
  'english': 45,
  'ict': 45,
  'gk': 40,
  'logical': 45,
};

const SUBJECT_INFO: Record<string, { title: string; icon: string; color: string }> = {
  math: { title: "Math Olympiad", icon: "🔢", color: "blue" },
  science: { title: "Science Olympiad", icon: "🔬", color: "green" },
  english: { title: "English Olympiad", icon: "📚", color: "yellow" },
  ict: { title: "ICT Olympiad", icon: "💻", color: "purple" },
  gk: { title: "General Knowledge", icon: "🌍", color: "teal" },
  logical: { title: "Logical Reasoning", icon: "🧠", color: "indigo" },
};

export default function OlympiadTestPage({ searchParams }: { searchParams: { subject?: string; test?: string } }) {
  const subject = searchParams.subject || "math";
  const testNum = parseInt(searchParams.test || "1");
  const timeLimit = TIMING[subject as keyof typeof TIMING] || 45;
  const info = SUBJECT_INFO[subject] || SUBJECT_INFO.math;
  
  return (
    <ExamInterface 
      category="olympiad" 
      grade={subject} 
      testNum={testNum}
      timeLimit={timeLimit}
      title={info.title}
      icon={info.icon}
      color={info.color}
    />
  );
}
