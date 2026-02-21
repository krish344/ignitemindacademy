"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Lead capture form
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
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.92)"
      }}>
        <div style={{
          background: "#1a1a2e", padding: "2rem", borderRadius: "16px",
          textAlign: "center", maxWidth: "340px"
        }}>
          <div style={{ fontSize: "3rem" }}>🎉</div>
          <h2 style={{ fontSize: "1.5rem", margin: "1rem 0 0.5rem" }}>You're In!</h2>
          <p style={{ color: "#aaa", marginBottom: "1rem" }}>Welcome! {formData.email}</p>
          <button
            onClick={onClose}
            style={{
              width: "100%", padding: "0.8rem", borderRadius: "8px",
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              color: "white", border: "none", fontWeight: "600", cursor: "pointer"
            }}
          >
            Start Test →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.92)"
    }}>
      <div style={{
        background: "#1a1a2e", padding: "1.5rem", borderRadius: "16px",
        maxWidth: "360px", width: "100%"
      }}>
        <button
          onClick={onClose}
          style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer" }}
        >
          ×
        </button>
        
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <div style={{ fontSize: "2.5rem" }}>📝</div>
          <h2 style={{ fontSize: "1.3rem" }}>Free NAPLAN Test</h2>
          <p style={{ color: "#888", fontSize: "0.85rem" }}>Join 500+ students</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            required
            placeholder="Parent's Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={inputStyle}
          />
          <input
            required
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={inputStyle}
          />
          <input
            required
            type="tel"
            placeholder="Phone *"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={inputStyle}
          />
          <select
            required
            value={formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            style={inputStyle}
          >
            <option value="">Select Year *</option>
            <option value="Year 3">Year 3</option>
            <option value="Year 4">Year 4</option>
            <option value="Year 5">Year 5</option>
            <option value="Year 6">Year 6</option>
            <option value="Year 7">Year 7</option>
            <option value="Year 8">Year 8</option>
            <option value="Year 9">Year 9</option>
          </select>
          <button type="submit" style={submitBtnStyle}>
            Continue →
          </button>
        </form>
        <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#666", marginTop: "1rem" }}>
          🔒 We respect your privacy. No spam.
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "0.7rem", borderRadius: "8px",
  border: "2px solid #333", background: "#0f0f1a", color: "#fff",
  marginBottom: "0.5rem", boxSizing: "border-box" as const,
  fontSize: "0.9rem"
};

const submitBtnStyle = {
  width: "100%", padding: "0.8rem", borderRadius: "8px",
  background: "linear-gradient(135deg, #f97316, #ea580c)",
  color: "white", border: "none", fontWeight: "600" as const,
  cursor: "pointer", fontSize: "1rem", marginTop: "0.5rem"
};

// Sample questions for demo
const sampleQuestions = [
  { id: 1, question: "What is 7 × 8?", options: ["54", "56", "58", "64"], correct: 1 },
  { id: 2, question: "Which is the largest: 345, 453, 534, 435?", options: ["345", "453", "534", "435"], correct: 2 },
  { id: 3, question: "What is 25% of 200?", options: ["25", "50", "75", "100"], correct: 1 },
  { id: 4, question: "Complete: 12, 15, 18, 21, ?", options: ["22", "23", "24", "25"], correct: 2 },
  { id: 5, question: "What is 144 ÷ 12?", options: ["10", "11", "12", "14"], correct: 2 },
  { id: 6, question: "Which fraction is biggest: 1/2, 1/3, 1/4, 1/5?", options: ["1/2", "1/3", "1/4", "1/5"], correct: 0 },
  { id: 7, question: "What is the perimeter of a 5cm × 4cm rectangle?", options: ["18cm", "20cm", "9cm", "22cm"], correct: 0 },
  { id: 8, question: "What is 3² + 4²?", options: ["12", "25", "49", "7"], correct: 1 },
];

interface ExamInterfaceProps {
  category: string;
  grade: string;
  testNum: string;
  title: string;
  icon: string;
  color: string;
}

export function ExamInterface({ category, grade, testNum, title, icon, color }: ExamInterfaceProps) {
  const [showLeadModal, setShowLeadModal] = useState(true);
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(50 * 60); // 50 minutes

  const colorMap: Record<string, string> = {
    orange: "from-orange-500 to-red-500",
    purple: "from-purple-500 to-indigo-500",
    yellow: "from-yellow-500 to-orange-500",
    green: "from-green-500 to-emerald-500",
  };

  // Check if already submitted lead
  useEffect(() => {
    const savedLead = localStorage.getItem("ignitemind_lead");
    if (savedLead) {
      setShowLeadModal(false);
      setStarted(true);
    }
  }, []);

  // Timer
  useEffect(() => {
    if (!started || showResults) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, showResults]);

  const handleStart = () => {
    setShowLeadModal(false);
    setStarted(true);
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQ]: optionIndex });
  };

  const handleNext = () => {
    if (currentQ < sampleQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    sampleQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correct) correct++;
    });
    return correct;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Show lead modal
  if (showLeadModal) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f0f1a", padding: "2rem" }}>
        <LeadModal
          isOpen={showLeadModal}
          onClose={handleStart}
          onSubmit={() => {}}
        />
      </div>
    );
  }

  // Show results
  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / sampleQuestions.length) * 100);
    const band = percentage >= 90 ? "Band 10" : percentage >= 80 ? "Band 9" : percentage >= 70 ? "Band 8" : percentage >= 60 ? "Band 7" : percentage >= 50 ? "Band 6" : "Band 5";

    return (
      <div style={{ minHeight: "100vh", background: "#0f0f1a", padding: "2rem" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ 
            background: "#1a1a2e", padding: "2rem", borderRadius: "16px",
            background: `linear-gradient(135deg, rgba(249,115,22,0.2), rgba(234,88,12,0.1))`
          }}>
            <div style={{ fontSize: "1rem", color: "#aaa" }}>Your Result</div>
            <div style={{ fontSize: "4rem", fontWeight: "800", color: "#f97316" }}>{percentage}%</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "#fff" }}>{band}</div>
            <div style={{ color: "#888", marginTop: "0.5rem" }}>
              {score}/{sampleQuestions.length} correct
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", justifyContent: "center" }}>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: "0.8rem 1.5rem", borderRadius: "8px", background: "#fff", color: "#000", border: "none", fontWeight: "600", cursor: "pointer" }}
            >
              🔄 Retry
            </button>
            <a
              href="https://wa.me/917007525681"
              style={{ padding: "0.8rem 1.5rem", borderRadius: "8px", background: "#25D366", color: "#fff", textDecoration: "none", fontWeight: "600" }}
            >
              💬 WhatsApp
            </a>
          </div>

          <Link
            href="/test"
            style={{ display: "block", marginTop: "1.5rem", color: "#888", textDecoration: "underline" }}
          >
            ← Back to Tests
          </Link>
        </div>
      </div>
    );
  }

  // Exam view
  const question = sampleQuestions[currentQ];
  const answeredCount = Object.keys(answers).length;

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f1a", color: "#fff" }}>
      {/* Header */}
      <header style={{ 
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1rem 2rem", background: "#1a1a2e", borderBottom: "1px solid #333"
      }}>
        <Link href="/test" style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          ← Back
        </Link>
        <div style={{ 
          background: "#1a1a2e", padding: "0.5rem 1rem", borderRadius: "8px",
          color: "#f97316", fontWeight: "600"
        }}>
          ⏱️ {formatTime(timeLeft)}
        </div>
      </header>

      {/* Progress */}
      <div style={{ padding: "1rem 2rem" }}>
        <div style={{ 
          height: "4px", background: "#333", borderRadius: "2px", overflow: "hidden" 
        }}>
          <div style={{ 
            height: "100%", background: "#f97316", 
            width: `${((currentQ + 1) / sampleQuestions.length) * 100}%`,
            transition: "width 0.3s"
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", fontSize: "0.85rem", color: "#888" }}>
          <span>Part A • ❌ No Calculator</span>
          <span>{answeredCount}/{sampleQuestions.length} answered</span>
        </div>
      </div>

      {/* Question */}
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "1.5rem" }}>
        <div style={{ background: "#1a1a2e", padding: "1.5rem", borderRadius: "16px" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            <strong>Q{currentQ + 1}.</strong> {question.question}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  padding: "1rem", borderRadius: "12px",
                  background: answers[currentQ] === idx ? "rgba(249,115,22,0.2)" : "rgba(255,255,255,0.05)",
                  border: answers[currentQ] === idx ? "2px solid #f97316" : "2px solid transparent",
                  color: "#fff", cursor: "pointer", textAlign: "left",
                  transition: "all 0.2s"
                }}
              >
                <span style={{
                  width: "28px", height: "28px", borderRadius: "6px",
                  background: "#f97316", display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: "600", fontSize: "0.85rem"
                }}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
          <button
            onClick={handlePrev}
            disabled={currentQ === 0}
            style={{
              flex: 1, padding: "1rem", borderRadius: "10px",
              background: currentQ === 0 ? "#333" : "#444",
              color: "#fff", border: "none", cursor: currentQ === 0 ? "not-allowed" : "pointer",
              opacity: currentQ === 0 ? 0.5 : 1
            }}
          >
            ← Prev
          </button>
          {currentQ < sampleQuestions.length - 1 ? (
            <button
              onClick={handleNext}
              style={{
                flex: 1, padding: "1rem", borderRadius: "10px",
                background: "#f97316", color: "#fff", border: "none", fontWeight: "600", cursor: "pointer"
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              style={{
                flex: 1, padding: "1rem", borderRadius: "10px",
                background: "#22c55e", color: "#fff", border: "none", fontWeight: "600", cursor: "pointer"
              }}
            >
              Submit ✓
            </button>
          )}
        </div>

        {/* Question navigator */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "1.5rem" }}>
          {sampleQuestions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQ(idx)}
              style={{
                width: "32px", height: "32px", borderRadius: "6px", border: "none",
                fontSize: "0.75rem", cursor: "pointer",
                background: idx === currentQ ? "#f97316" : answers[idx] !== undefined ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.1)",
                color: "#fff"
              }}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
