"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { site } from "@/lib/site";

export default function NAPLANKitPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [yearLevel, setYearLevel] = useState("Year 5");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/send-kit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          yearLevel,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send kit. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Check Your Email!</h1>
          <p className="text-gray-600 mb-6">
            We've sent the <strong>Comprehensive NAPLAN Preparation Kit</strong> to{" "}
            <span className="font-semibold text-orange-600 break-all">{email}</span>
          </p>
          <div className="bg-orange-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">What's Inside:</h3>
            <ul className="text-left text-gray-600 space-y-2 text-sm sm:text-base">
              <li>📚 50+ Practice Questions</li>
              <li>💡 Proven Study Tips</li>
              <li>🎯 Exam Strategies</li>
              <li>📅 Study Schedule Template</li>
            </ul>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Can't find the email? Check your spam folder or{" "}
            <button onClick={() => setIsSuccess(false)} className="text-orange-600 hover:underline">
              try again
            </button>
          </p>
          <Link
            href="/"
            className="inline-flex px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-6">
                🎯 Free Download
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Comprehensive <span className="text-orange-500">NAPLAN Preparation Kit</span>
              </h1>
              <p className="text-base sm:text-xl text-gray-600 mb-8">
                Get our complete preparation guide with practice questions, study tips, and exam strategies — everything your child needs to excel in NAPLAN!
              </p>

              <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📦 What's Inside the Kit:</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">50+ Practice Questions</h4>
                      <p className="text-sm text-gray-500">Real NAPLAN-style questions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Proven Study Tips</h4>
                      <p className="text-sm text-gray-500">Expert strategies that work</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Exam Strategies</h4>
                      <p className="text-sm text-gray-500">Time management & more</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Study Schedule</h4>
                      <p className="text-sm text-gray-500">4-week preparation plan</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-600 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span>2,000+ downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <span>95% improvement rate</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Get Your Free Kit</h2>
                <p className="text-gray-600">Enter your details and we'll email resource links instantly.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Year Level</label>
                  <select
                    value={yearLevel}
                    onChange={(e) => setYearLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
                  >
                    <option value="Year 3">Year 3</option>
                    <option value="Year 5">Year 5</option>
                    <option value="Year 7">Year 7</option>
                    <option value="Year 9">Year 9</option>
                  </select>
                </div>

                {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>📧 Send Me the Kit</>
                  )}
                </motion.button>

                <p className="text-xs text-gray-500 text-center">We respect your privacy. Unsubscribe anytime.</p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-4 pb-8 text-center text-sm">
        <Link href="/" className="text-gray-600 hover:text-orange-500">← Back to Home</Link>
      </div>
    </div>
  );
}
