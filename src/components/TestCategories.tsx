"use client";

import { useState } from "react";
import Link from "next/link";

const testCategories = [
  {
    id: "naplan",
    name: "NAPLAN",
    icon: "📝",
    color: "from-orange-500 to-red-500",
    description: "Australian Standardized Tests",
    levels: ["Year 3", "Year 5", "Year 7", "Year 9"],
    url: "/test/naplan"
  },
  {
    id: "ict",
    name: "ICT",
    icon: "💻",
    color: "from-purple-500 to-indigo-500",
    description: "Information & Communication Technology",
    levels: ["Year 3", "Year 5", "Year 7", "Year 9"],
    url: "/test/ict"
  },
  {
    id: "olympiad",
    name: "Olympiad",
    icon: "🏆",
    color: "from-yellow-500 to-orange-500",
    description: "Competitive Exams",
    subjects: [
      { name: "Math", icon: "🔢", url: "/test/olympiad?subject=math" },
      { name: "Science", icon: "🔬", url: "/test/olympiad?subject=science" },
      { name: "English", icon: "📚", url: "/test/olympiad?subject=english" },
      { name: "GK", icon: "🌍", url: "/test/olympiad?subject=gk" },
    ],
    url: "/test/olympiad"
  }
];

export function TestCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div>
      {/* Category Selection */}
      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="relative">
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-slate-900">{category.name}</h3>
                <p className="text-slate-600 mt-2">{category.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.levels?.map((level) => (
                    <span key={level} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                      {level}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div>
          {/* Back Button */}
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            ← Back to Categories
          </button>

          {/* Selected Category */}
          {testCategories.filter(c => c.id === selectedCategory).map((category) => (
            <div key={category.id} className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">{category.icon}</div>
                <h2 className="text-2xl font-bold text-slate-900">{category.name} Tests</h2>
                <p className="text-slate-600">{category.description}</p>
              </div>

              {/* Olympiad Subjects */}
              {category.subjects ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {category.subjects.map((subject) => (
                    <Link
                      key={subject.name}
                      href={subject.url}
                      className="block p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center border border-slate-200"
                    >
                      <div className="text-3xl mb-2">{subject.icon}</div>
                      <div className="font-semibold text-slate-900">{subject.name}</div>
                    </Link>
                  ))}
                </div>
              ) : (
                /* Grade Levels for NAPLAN/ICT */
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {category.levels?.map((level) => (
                    <Link
                      key={level}
                      href={`${category.url}?grade=${level.replace('Year ', '')}`}
                      className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-orange-300"
                    >
                      <div className="text-2xl font-bold text-slate-900">{level}</div>
                      <div className="text-sm text-slate-500 mt-1">10 Tests Available</div>
                      <div className="mt-3 inline-block px-4 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Tests 1-2 Free
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Info Box */}
              <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <p className="font-medium text-blue-900">How it works</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Select your grade or subject. First 2 tests are free. 
                      Take visual practice tests with charts, graphs, and real exam format.
                      Get instant results with band scores!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Features */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4">
          <div className="text-3xl mb-2">📊</div>
          <div className="font-semibold text-slate-900">Visual Charts</div>
          <div className="text-xs text-slate-500">Bar, Pie & Line</div>
        </div>
        <div className="text-center p-4">
          <div className="text-3xl mb-2">⏱️</div>
          <div className="font-semibold text-slate-900">Timed Exams</div>
          <div className="text-xs text-slate-500">40-50 Minutes</div>
        </div>
        <div className="text-center p-4">
          <div className="text-3xl mb-2">🎯</div>
          <div className="font-semibold text-slate-900">Band Scores</div>
          <div className="text-xs text-slate-500">ACARA Aligned</div>
        </div>
        <div className="text-center p-4">
          <div className="text-3xl mb-2">📧</div>
          <div className="font-semibold text-slate-900">Email Results</div>
          <div className="text-xs text-slate-500">Get Solutions</div>
        </div>
      </div>
    </div>
  );
}
