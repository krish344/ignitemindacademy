import type { Metadata } from "next";
import { ExamInterface } from "@/components/ExamInterface";

export const metadata: Metadata = {
  title: "ICT Mock Tests - IgniteMind Academy",
  description: "Practice ICT tests for Year 3, 5, 7, 9",
};

export default function IctTestPage({ searchParams }: { searchParams: { grade?: string; test?: string } }) {
  const grade = searchParams.grade || "5";
  const testNum = parseInt(searchParams.test || "1");
  
  return (
    <ExamInterface 
      category="ict" 
      grade={grade} 
      testNum={testNum}
      timeLimit={45}
      title="ICT Tests"
      icon="💻"
      color="purple"
    />
  );
}
