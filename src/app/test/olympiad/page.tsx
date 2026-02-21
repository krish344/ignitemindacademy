import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Olympiad Mock Tests - IgniteMind Academy",
  description: "Practice Math, Science, English, GK Olympiad tests",
};

const subjects = [
  { id: "math", name: "Math", icon: "🔢", color: "from-blue-500 to-indigo-500" },
  { id: "science", name: "Science", icon: "🔬", color: "from-green-500 to-emerald-500" },
  { id: "english", name: "English", icon: "📚", color: "from-yellow-500 to-orange-500" },
  { id: "gk", name: "General Knowledge", icon: "🌍", color: "from-teal-500 to-cyan-500" },
];

export default function OlympiadTestPage({ searchParams }: { searchParams: { subject?: string } }) {
  const subject = searchParams.subject || "math";
  const currentSubject = subjects.find(s => s.id === subject) || subjects[0];
  
  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-bold text-slate-900">Olympiad Tests</h1>
          <p className="text-slate-600 mt-2">Competitive Exam Practice</p>
        </div>

        {/* Subject Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {subjects.map((s) => (
            <Link
              key={s.id}
              href={`/test/olympiad?subject=${s.id}`}
              className={`px-4 py-2 rounded-full font-medium ${
                subject === s.id 
                  ? "bg-yellow-500 text-white" 
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {s.icon} {s.name}
            </Link>
          ))}
        </div>

        {/* Current Subject */}
        <div className={`bg-gradient-to-br ${currentSubject.color} rounded-2xl p-8 text-white mb-8`}>
          <div className="text-center">
            <div className="text-5xl mb-4">{currentSubject.icon}</div>
            <h2 className="text-2xl font-bold">{currentSubject.name} Olympiad</h2>
          </div>
        </div>

        {/* Test Options */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <a
              key={num}
              href="#test"
              className={`p-4 rounded-xl text-center border-2 transition-all ${
                num <= 2 
                  ? "border-green-300 bg-green-50 hover:border-green-500" 
                  : "border-yellow-200 bg-yellow-50 hover:border-yellow-400"
              }`}
            >
              <div className="text-xl font-bold text-slate-900">Test {num}</div>
              <div className="text-xs mt-1 text-slate-500">
                {num <= 2 ? "✓ Free" : "🔒 Locked"}
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>📊 Visual Tests • ✅ 2 Free</p>
        </div>

        {/* Coming Soon */}
        <div className="mt-12 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
          <div className="text-center">
            <div className="text-2xl mb-2">🚧</div>
            <p className="font-medium text-yellow-800">Full Test Integration Coming Soon!</p>
            <a 
              href="https://ignitemind-mocktests.vercel.app" 
              target="_blank"
              className="inline-block mt-4 px-6 py-2 bg-yellow-500 text-white rounded-full font-medium hover:bg-yellow-600"
            >
              Try Olympiad Tests →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
