import type { Metadata } from "next";
import { ExamInterface } from "@/components/ExamInterface";

export const metadata: Metadata = {
  title: "Olympiad Mock Tests - IgniteMind Academy",
  description: "Practice Math, Science, English, ICT, GK Olympiad tests",
};

export default function OlympiadTestPage({ searchParams }: { searchParams: { subject?: string; test?: string } }) {
  const subject = searchParams.subject || "math";
  const testNum = searchParams.test || "1";
  
  const subjectInfo: Record<string, { title: string; icon: string; color: string }> = {
    math: { title: "Math Olympiad", icon: "🔢", color: "blue" },
    science: { title: "Science Olympiad", icon: "🔬", color: "green" },
    english: { title: "English Olympiad", icon: "📚", color: "yellow" },
    ict: { title: "ICT Olympiad", icon: "💻", color: "purple" },
    gk: { title: "General Knowledge", icon: "🌍", color: "teal" },
  };
  
  const info = subjectInfo[subject] || subjectInfo.math;
  
  return (
    <ExamInterface 
      category="olympiad" 
      grade={subject} 
      testNum={testNum}
      title={info.title}
      icon={info.icon}
      color={info.color}
    />
  );
}
