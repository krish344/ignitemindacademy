import type { Metadata } from "next";
import { ExamInterface } from "@/components/ExamInterface";

export const metadata: Metadata = {
  title: "NAPLAN Mock Tests - IgniteMind Academy",
  description: "Practice NAPLAN Numeracy tests for Year 3, 5, 7, 9 with visual charts",
};

export default function NaplanTestPage({ searchParams }: { searchParams: { grade?: string; test?: string } }) {
  const grade = searchParams.grade || "5";
  const testNum = searchParams.test || "1";
  
  return (
    <ExamInterface 
      category="naplan" 
      grade={grade} 
      testNum={testNum}
      title="NAPLAN Numeracy"
      icon="📝"
      color="orange"
    />
  );
}
