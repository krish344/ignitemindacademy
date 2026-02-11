"use client";

import { useState } from "react";

const tabs = [
  {
    key: "parents" as const,
    label: "Parents",
    title: "Clear progress, less stress at home",
    bullets: [
      "Weekly progress notes (strengths + next steps)",
      "Simple at-home routines (10–15 minutes)",
      "Transparent goals aligned to NAPLAN skills",
    ],
  },
  {
    key: "students" as const,
    label: "Students",
    title: "Practice that feels doable",
    bullets: [
      "Short, focused tasks with instant feedback",
      "Strategies for timing, accuracy and confidence",
      "Topic-wise quizzes so you can improve fast",
    ],
  },
  {
    key: "tutors" as const,
    label: "Tutors",
    title: "Better structure for better results",
    bullets: [
      "Curriculum-style topic breakdown",
      "Reusable MCQ banks and explanations",
      "A consistent lesson rhythm students enjoy",
    ],
  },
];

export function AudienceTabs() {
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("parents");
  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActive(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              t.key === active
                ? "bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-500 text-white shadow-sm"
                : "bg-slate-100 text-slate-900 hover:bg-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <div className="text-lg font-semibold">{current.title}</div>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {current.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-emerald-600">✓</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
