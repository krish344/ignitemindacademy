import type { Metadata } from "next";
import { ExamInterface } from "@/components/ExamInterface";

export const metadata: Metadata = {
  title: "NAPLAN Mock Tests - IgniteMind Academy",
  description: "Practice NAPLAN Numeracy tests for Year 3, 5, 7, 9 with visual charts",
};

// Timing in minutes per year level
const TIMING = {
  '3': 40,
  '5': 45,
  '7': 45,
  '9': 50,
};

export default function NaplanTestPage({ searchParams }: { searchParams: { grade?: string; test?: string } }) {
  const grade = searchParams.grade || "5";
  const testNum = parseInt(searchParams.test || "1");
  const timeLimit = TIMING[grade as keyof typeof TIMING] || 45;
  
  return (
    <ExamInterface 
      category="naplan" 
      grade={grade} 
      testNum={testNum}
      timeLimit={timeLimit}
      title="NAPLAN Numeracy"
      icon="📝"
      color="orange"
    />
  );
}
