import { TestClient } from "@/components/TestClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NAPLAN Practice Test - IgniteMind Academy",
  description: "Practice NAPLAN tests for Grade 3 Numeracy and English Grammar",
};

export default function TestPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            NAPLAN Practice Test
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Choose your test type and grade to start practicing
          </p>
        </div>

        <div className="mt-10">
          <TestClient />
        </div>
      </div>
    </div>
  );
}
