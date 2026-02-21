import type { Metadata } from "next";
import { TestCategories } from "@/components/TestCategories";

export const metadata: Metadata = {
  title: "NAPLAN & Olympiad Mock Tests - IgniteMind Academy",
  description: "Practice NAPLAN, ICT and Olympiad mock tests for Year 3-9 students. Visual charts, timed exams, band scoring.",
};

export default function TestPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Mock Tests
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Choose your test type and grade to start practicing
          </p>
        </div>

        <div className="mt-10">
          <TestCategories />
        </div>
      </div>
    </div>
  );
}
