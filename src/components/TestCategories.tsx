"use client";

import { useState } from "react";
import Link from "next/link";

// Constants
const FREE_TEST_LIMIT = 2;
const VALID_CODES = ['NAPLAN2026', 'OLYMPIAD2026', 'ALLACCESS2026'];

// Timing config (in minutes)
const TIMING_CONFIG = {
  naplan: {
    '3': 40,  // Year 3: 40 min
    '5': 45,  // Year 5: 45 min
    '7': 45,  // Year 7: 45 min
    '9': 50,   // Year 9: 50 min
  },
  olympiad: {
    'math': 60,
    'science': 50,
    'english': 45,
    'ict': 45,
    'gk': 40,
    'logical': 45,
  }
};

const testCategories = [
  {
    id: "naplan",
    name: "NAPLAN",
    icon: "📝",
    color: "from-orange-500 to-red-500",
    description: "Australian Standardized Tests",
    levels: [
      { id: "3", name: "Year 3", timing: 40 },
      { id: "5", name: "Year 5", timing: 45 },
      { id: "7", name: "Year 7", timing: 45 },
      { id: "9", name: "Year 9", timing: 50 },
    ],
    url: "/test/naplan"
  },
  {
    id: "olympiad",
    name: "Olympiad",
    icon: "🏆",
    color: "from-yellow-500 to-orange-500",
    description: "Competitive Exams",
    levels: [
      { id: "math", name: "Math", icon: "🔢", timing: 60 },
      { id: "science", name: "Science", icon: "🔬", timing: 50 },
      { id: "english", name: "English", icon: "📚", timing: 45 },
      { id: "ict", name: "ICT", icon: "💻", timing: 45 },
      { id: "gk", name: "GK", icon: "🌍", timing: 40 },
      { id: "logical", name: "Logical", icon: "🧠", timing: 45 },
    ],
    url: "/test/olympiad"
  }
];

// Access Code Modal
function AccessCodeModal({ isOpen, onClose, onSubmit, category }: { isOpen: boolean; onClose: () => void; onSubmit: (code: string) => void; category: string }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedCode = code.trim().toUpperCase();
    if (VALID_CODES.includes(normalizedCode) || 
        (category === 'naplan' && normalizedCode.includes('NAPLAN')) ||
        (category === 'olympiad' && normalizedCode.includes('OLYMPIAD'))) {
      onSubmit(normalizedCode);
    } else {
      setError("Invalid code. Contact your teacher!");
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.92)"
    }}>
      <div style={{
        background: "#1a1a2e", padding: "2rem", borderRadius: "16px",
        maxWidth: "400px", width: "90%"
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer" }}>×</button>
        
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem" }}>🔐</div>
          <h2 style={{ fontSize: "1.5rem", marginTop: "1rem" }}>Teacher Access Code</h2>
          <p style={{ color: "#888", marginTop: "0.5rem" }}>This test requires a teacher access code</p>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
          <input
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(""); }}
            placeholder="Enter access code"
            style={{
              width: "100%", padding: "0.8rem", borderRadius: "8px",
              border: error ? "2px solid red" : "2px solid #333",
              background: "#0f0f1a", color: "#fff",
              fontSize: "1rem", boxSizing: "border-box"
            }}
          />
          {error && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "0.5rem" }}>{error}</p>}
          
          <button type="submit" style={{
            width: "100%", padding: "0.8rem", borderRadius: "8px",
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            color: "white", border: "none", fontWeight: "600",
            cursor: "pointer", fontSize: "1rem", marginTop: "1rem"
          }}>
            Unlock Test
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>
          <p style={{ fontSize: "0.8rem", color: "#888", textAlign: "center" }}>Demo codes:</p>
          <p style={{ fontSize: "0.85rem", color: "#fff", textAlign: "center", marginTop: "0.5rem" }}>
            NAPLAN2026 • OLYMPIAD2026 • ALLACCESS2026
          </p>
        </div>
      </div>
    </div>
  );
}

// Lead Modal (after 2 free tests)
function LeadModal({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", grade: "Year 5" });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    localStorage.setItem("ignitemind_lead", JSON.stringify(formData));
    onSubmit(formData);
  };

  if (submitted) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.92)" }}>
        <div style={{ background: "#1a1a2e", padding: "2rem", borderRadius: "16px", textAlign: "center", maxWidth: "340px" }}>
          <div style={{ fontSize: "3rem" }}>🎉</div>
          <h2 style={{ fontSize: "1.5rem", margin: "1rem 0 0.5rem" }}>You're In!</h2>
          <p style={{ color: "#aaa", marginBottom: "1rem" }}>Welcome! Continue to your test.</p>
          <button onClick={onClose} style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", background: "linear-gradient(135deg, #f97316, #ea580c)", color: "white", border: "none", fontWeight: "600", cursor: "pointer" }}>
            Start Test →
          </button>
        </div>
      </div>
    );
  }

  const inputStyle = { width: "100%", padding: "0.7rem", borderRadius: "8px", border: "2px solid #333", background: "#0f0f1a", color: "#fff", marginBottom: "0.5rem", fontSize: "0.9rem", boxSizing: "border-box" as const };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.92)" }}>
      <div style={{ background: "#1a1a2e", padding: "1.5rem", borderRadius: "16px", maxWidth: "360px", width: "100%" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer" }}>×</button>
        
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <div style={{ fontSize: "2.5rem" }}>📝</div>
          <h2 style={{ fontSize: "1.3rem" }}>Get Access to All Tests</h2>
          <p style={{ color: "#888", fontSize: "0.85rem" }}>Enter details to unlock 8 more tests</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input required placeholder="Parent's Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle} />
          <input required type="email" placeholder="Email *" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
          <input required type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={inputStyle} />
          <select required value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value })} style={inputStyle}>
            <option value="">Select Year *</option>
            <option value="Year 3">Year 3</option>
            <option value="Year 4">Year 4</option>
            <option value="Year 5">Year 5</option>
            <option value="Year 6">Year 6</option>
            <option value="Year 7">Year 7</option>
            <option value="Year 8">Year 8</option>
            <option value="Year 9">Year 9</option>
          </select>
          <button type="submit" style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", background: "linear-gradient(135deg, #f97316, #ea580c)", color: "white", border: "none", fontWeight: "600", cursor: "pointer", fontSize: "1rem", marginTop: "0.5rem" }}>
            Get Access →
          </button>
        </form>
        <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#666", marginTop: "1rem" }}>🔒 We respect your privacy.</p>
      </div>
    </div>
  );
}

export function TestCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [pendingTest, setPendingTest] = useState<{category: string, level: string, testNum: number} | null>(null);
  const [unlockedTests, setUnlockedTests] = useState<string[]>([]);
  const [completedTests, setCompletedTests] = useState<string[]>([]);

  // Load from localStorage
  useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ignitemind_unlocked');
      if (saved) setUnlockedTests(JSON.parse(saved));
      const completed = localStorage.getItem('ignitemind_completed');
      if (completed) setCompletedTests(JSON.parse(completed));
    }
  });

  const isTestLocked = (category: string, level: string, testNum: number) => {
    if (testNum <= FREE_TEST_LIMIT) return false;
    const key = `${category}-${level}-${testNum}`;
    return !unlockedTests.includes(key);
  };

  const handleTestClick = (category: string, level: string, testNum: number) => {
    const key = `${category}-${level}-${testNum}`;
    const completedCount = completedTests.filter(t => t.startsWith(`${category}-${level}`)).length;
    
    // Check if locked
    if (testNum > FREE_TEST_LIMIT && !unlockedTests.includes(key)) {
      // Need lead capture first if completed 2 free tests
      if (completedCount >= FREE_TEST_LIMIT) {
        setPendingTest({ category, level, testNum });
        setShowLeadModal(true);
        return;
      }
      // Show access code modal
      setPendingTest({ category, level, testNum });
      setShowAccessModal(true);
      return;
    }
    
    // Check if need lead capture after 2 free tests
    if (completedCount >= FREE_TEST_LIMIT && !localStorage.getItem('ignitemind_lead')) {
      setPendingTest({ category, level, testNum });
      setShowLeadModal(true);
      return;
    }

    // Go to test
    const url = category === 'naplan' 
      ? `/test/naplan?grade=${level}&test=${testNum}`
      : `/test/olympiad?subject=${level}&test=${testNum}`;
    window.location.href = url;
  };

  const handleAccessCodeSubmit = (code: string) => {
    if (pendingTest) {
      const { category, level, testNum } = pendingTest;
      // Unlock all tests for this category
      const newUnlocked = [...unlockedTests];
      for (let i = 1; i <= 10; i++) {
        const key = `${category}-${level}-${i}`;
        if (!newUnlocked.includes(key)) newUnlocked.push(key);
      }
      setUnlockedTests(newUnlocked);
      localStorage.setItem('ignitemind_unlocked', JSON.stringify(newUnlocked));
      setShowAccessModal(false);
      
      // Go to test
      const url = category === 'naplan'
        ? `/test/naplan?grade=${level}&test=${testNum}`
        : `/test/olympiad?subject=${level}&test=${testNum}`;
      window.location.href = url;
    }
  };

  const handleLeadSubmit = (data: any) => {
    setShowLeadModal(false);
    if (pendingTest) {
      const { category, level, testNum } = pendingTest;
      const url = category === 'naplan'
        ? `/test/naplan?grade=${level}&test=${testNum}`
        : `/test/olympiad?subject=${level}&test=${testNum}`;
      window.location.href = url;
    }
  };

  return (
    <div>
      <AccessCodeModal 
        isOpen={showAccessModal} 
        onClose={() => setShowAccessModal(false)} 
        onSubmit={handleAccessCodeSubmit}
        category={selectedCategory || ''}
      />
      <LeadModal 
        isOpen={showLeadModal} 
        onClose={() => setShowLeadModal(false)} 
        onSubmit={handleLeadSubmit}
      />

      {/* Category Selection */}
      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {category.levels.slice(0, 4).map((level) => (
                    <span key={level.id} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                      {level.name}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : !selectedLevel ? (
        <div>
          <button onClick={() => setSelectedCategory(null)} className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900">
            ← Back to Categories
          </button>

          {testCategories.filter(c => c.id === selectedCategory).map((category) => (
            <div key={category.id} className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">{category.icon}</div>
                <h2 className="text-2xl font-bold text-slate-900">{category.name} Tests</h2>
                <p className="text-slate-600">{category.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.levels.map((level) => {
                  const completedCount = completedTests.filter(t => t.startsWith(`${category.id}-${level.id}`)).length;
                  return (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-orange-300"
                    >
                      <div className="text-2xl font-bold text-slate-900">{level.name}</div>
                      <div className="text-sm text-slate-500 mt-1">⏱️ {level.timing} min</div>
                      <div className="mt-3 inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        {completedCount}/10 Tests
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedLevel(null)} className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900">
            ← Back to Levels
          </button>

          {testCategories.filter(c => c.id === selectedCategory).map((category) => {
            const level = category.levels.find(l => l.id === selectedLevel);
            return (
              <div key={category.id} className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">{level?.name}</div>
                  <p className="text-slate-600">Select a test to begin</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[...Array(10)].map((_, i) => {
                    const testNum = i + 1;
                    const isFree = testNum <= FREE_TEST_LIMIT;
                    const isLocked = isTestLocked(category.id, selectedLevel!, testNum);
                    const isCompleted = completedTests.includes(`${category.id}-${selectedLevel}-${testNum}`);
                    
                    return (
                      <button
                        key={testNum}
                        onClick={() => handleTestClick(category.id, selectedLevel!, testNum)}
                        disabled={isLocked}
                        className={`p-4 rounded-xl text-center transition-all ${
                          isLocked 
                            ? 'bg-slate-100 border-2 border-slate-200 cursor-not-allowed opacity-60'
                            : isFree 
                              ? 'bg-green-50 border-2 border-green-200 hover:border-green-400 hover:shadow-md'
                              : 'bg-orange-50 border-2 border-orange-200 hover:border-orange-400 hover:shadow-md'
                        }`}
                      >
                        <div className="text-lg font-bold">{testNum}</div>
                        <div className="text-xs mt-1">
                          {isLocked ? '🔒 Locked' : isCompleted ? '✅ Done' : isFree ? '⭐ Free' : '🔓'}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💡</div>
                    <div>
                      <p className="font-medium text-blue-900">How it works</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Tests 1-2 are FREE. After completing 2 tests, enter your details to unlock more. 
                        Locked tests require a teacher access code (NAPLAN2026, OLYMPIAD2026, or ALLACCESS2026).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                  <div className="text-center p-3">
                    <div className="text-green-500 font-bold">⭐ {FREE_TEST_LIMIT}</div>
                    <div className="text-xs text-slate-500">Free</div>
                  </div>
                  <div className="text-center p-3">
                    <div className="text-orange-500 font-bold">{10 - FREE_TEST_LIMIT}</div>
                    <div className="text-xs text-slate-500">Locked</div>
                  </div>
                  <div className="text-center p-3">
                    <div className="text-slate-700 font-bold">{level?.timing}</div>
                    <div className="text-xs text-slate-500">Minutes</div>
                  </div>
                </div>
              </div>
            );
          })}
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
          <div className="font-semibold text-slate-900">Real Exam Timing</div>
          <div className="text-xs text-slate-500">40-60 Minutes</div>
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
