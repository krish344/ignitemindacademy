import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICT Mock Tests - IgniteMind Academy",
  description: "Practice ICT tests with visual charts",
};

export default function IctTestPage({ searchParams }: { searchParams: { grade?: string } }) {
  const grade = searchParams.grade || "5";
  
  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💻</div>
          <h1 className="text-3xl font-bold text-slate-900">ICT Tests</h1>
          <p className="text-slate-600 mt-2">Year {grade} - Information & Communication Technology</p>
        </div>

        {/* Grade Selection */}
        <div className="flex justify-center gap-4 mb-8">
          {["3", "5", "7", "9"].map((g) => (
            <a
              key={g}
              href={`/test/ict?grade=${g}`}
              className={`px-4 py-2 rounded-full font-medium ${
                grade === g 
                  ? "bg-purple-500 text-white" 
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              Year {g}
            </a>
          ))}
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
                  : "border-purple-200 bg-purple-50 hover:border-purple-400"
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
        <div className="mt-12 p-6 bg-purple-50 rounded-xl border border-purple-200">
          <div className="text-center">
            <div className="text-2xl mb-2">🚧</div>
            <p className="font-medium text-purple-800">Full Test Integration Coming Soon!</p>
            <a 
              href="https://ignitemind-mocktests.vercel.app" 
              target="_blank"
              className="inline-block mt-4 px-6 py-2 bg-purple-500 text-white rounded-full font-medium hover:bg-purple-600"
            >
              Try ICT Tests →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
