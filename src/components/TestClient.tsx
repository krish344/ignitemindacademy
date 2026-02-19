"use client";

import { useState } from "react";
import { gradeLabels, GradeKey, grammarMcqs, mcqs, testTypes } from "@/lib/quiz";

function pct(n: number, d: number) {
  if (d === 0) return 0;
  return Math.round((n / d) * 100);
}

type LoginData = {
  name: string;
  email: string;
};

export function TestClient() {
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const [testType, setTestType] = useState<"numeracy" | "grammar">("numeracy");
  const [grade, setGrade] = useState<GradeKey>("year3");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [showReview, setShowReview] = useState(false);
  const [sendingResults, setSendingResults] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const questions = testType === "grammar" 
    ? grammarMcqs.filter((q) => q.grade === grade)
    : mcqs.filter((q) => q.grade === grade && q.topic !== "grammar");
  
  const current = questions[index];
  const correctCount = questions.reduce((acc, q) => {
    const a = answers[q.id];
    if (a === q.answerIndex) return acc + 1;
    return acc;
  }, 0);

  // Send results to API
  const sendResults = async () => {
    if (!loginData || sendingResults) return;
    
    setSendingResults(true);
    try {
      const response = await fetch("/api/send-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: loginData.name,
          studentEmail: loginData.email,
          testType,
          grade,
          correctCount,
          totalQuestions: questions.length,
          percentage: pct(correctCount, questions.length),
          answers,
          questions: questions.map((q) => ({
            id: q.id,
            topic: q.topic,
            prompt: q.prompt,
            choices: q.choices,
            answerIndex: q.answerIndex,
            explanation: q.explanation,
          })),
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error("Failed to send results:", error);
    } finally {
      setSendingResults(false);
    }
  };

  // Login Form
  if (!loginData) {
    return (
      <div className="max-w-md mx-auto">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📝</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">Student Login</div>
            <div className="mt-2 text-slate-600">Enter your details to start the NAPLAN test</div>
          </div>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const name = (form.elements.namedItem("name") as HTMLInputElement).value;
              const email = (form.elements.namedItem("email") as HTMLInputElement).value;
              if (name && email) {
                setLoginData({ name, email });
              }
            }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 focus:border-orange-500 focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 focus:border-orange-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-4 font-bold text-white transition hover:shadow-lg hover:from-orange-600 hover:to-red-600"
            >
              🚀 Start Test
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-500">
            Your results will be sent to your email after completion.
          </p>
        </div>
      </div>
    );
  }

  // When showing review, send results
  if (showReview && !emailSent && !sendingResults) {
    sendResults();
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-4 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-orange-400">Welcome, {loginData.name}</div>
              <div className="text-lg font-bold text-white">
                Grade {grade.replace("year", "")} NAPLAN {testType === "numeracy" ? "Numeracy" : "English"}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLoginData(null)}
              className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Test Type Selection */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        {testTypes.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTestType(t.id as "numeracy" | "grammar");
              setIndex(0);
              setAnswers({});
              setShowReview(false);
              setEmailSent(false);
            }}
            className={`flex-1 rounded-2xl border-2 p-4 text-left transition ${
              testType === t.id
                ? "border-orange-500 bg-orange-50"
                : "border-slate-200 bg-white hover:border-orange-300"
            }`}
          >
            <div className="font-bold text-slate-900">{t.name}</div>
            <div className="mt-1 text-sm text-slate-600">{t.description}</div>
          </button>
        ))}
      </div>

      {/* Grade Selection */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(["year3", "year5", "year7", "year9"] as GradeKey[]).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => {
              setGrade(g);
              setIndex(0);
              setAnswers({});
              setShowReview(false);
              setEmailSent(false);
            }}
            className={`rounded-full px-5 py-2 text-sm font-bold transition ${
              g === grade
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                : "bg-slate-100 text-slate-900 hover:bg-slate-200"
            }`}
          >
            {gradeLabels[g]}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-6 rounded-full bg-slate-100 h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
          style={{ width: `${(questions.length > 0 ? (index + 1) / questions.length : 0) * 100}%` }}
        />
      </div>

      {/* Progress Info */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-600">
            Question <span className="font-bold text-slate-900">{Math.min(index + 1, questions.length)}</span> of {questions.length}
          </div>
          <div className="h-4 w-px bg-slate-300"></div>
          <div className="text-sm text-slate-600">
            Score: <span className="font-bold text-orange-600">{correctCount}</span>
          </div>
        </div>
        <div className="text-sm font-bold text-orange-600">
          {pct(correctCount, questions.length)}% Complete
        </div>
      </div>

      {/* Question */}
      {!current ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div className="text-lg font-semibold text-slate-900">No questions found</div>
          <p className="mt-2 text-slate-600">No questions available for this test type and grade.</p>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
          {/* Question Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold">
              {index + 1}
            </div>
            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              {current.topic}
            </div>
          </div>

          {/* Question Text */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-6">
            <div className="text-xl font-bold text-slate-900 leading-relaxed">{current.prompt}</div>
          </div>

          {/* Answer Options */}
          <fieldset className="mt-6 space-y-3">
            <legend className="sr-only">Choose an answer</legend>
            {current.choices.map((c, i) => {
              const isChosen = answers[current.id] === i;
              const isCorrect = i === current.answerIndex;
              const showState = answers[current.id] !== null && answers[current.id] !== undefined;

              let cls = "border-slate-200 bg-white hover:bg-orange-50 hover:border-orange-300 hover:shadow-md";

              if (showState) {
                if (isCorrect) cls = "border-green-400 bg-green-50 shadow-md";
                else if (isChosen) cls = "border-red-400 bg-red-50 shadow-md";
              } else if (isChosen) {
                cls = "border-orange-500 bg-orange-50 shadow-md";
              }

              return (
                <button
                  key={c}
                  type="button"
                  className={`w-full rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold transition flex items-center gap-4 ${cls}`}
                  onClick={() => setAnswers((prev) => ({ ...prev, [current.id]: i }))}
                >
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${
                    isChosen ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-700"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{c}</span>
                  {showState && isCorrect && <span className="text-green-500 text-xl">✓</span>}
                  {showState && isChosen && !isCorrect && <span className="text-red-500 text-xl">✗</span>}
                </button>
              );
            })}
          </fieldset>

          {/* Explanation */}
          {answers[current.id] !== null && answers[current.id] !== undefined ? (
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-700 mb-2">
                💡 Explanation
              </div>
              <p className="text-sm leading-relaxed text-slate-700">{current.explanation}</p>
            </div>
          ) : null}

          {/* Navigation */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200"
              onClick={() => {
                setAnswers({});
                setIndex(0);
                setShowReview(false);
                setEmailSent(false);
              }}
            >
              🔄 Restart Test
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-700 ring-2 ring-slate-200 hover:bg-slate-50 disabled:opacity-50"
                onClick={() => setIndex((v) => Math.max(0, v - 1))}
                disabled={index === 0}
              >
                ← Previous
              </button>
              {index < questions.length - 1 ? (
                <button
                  type="button"
                  className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-bold text-white hover:shadow-lg"
                  onClick={() => setIndex((v) => Math.min(questions.length - 1, v + 1))}
                >
                  Next →
                </button>
              ) : (
                <button
                  type="button"
                  className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 text-sm font-bold text-white hover:shadow-lg"
                  onClick={() => setShowReview(true)}
                >
                  ✅ Finish Test
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results Page */}
      {showReview ? (
        <div className="mt-8 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎉</span>
              </div>
              <div className="text-3xl font-bold text-slate-900">Test Complete!</div>
              <div className="mt-2 text-lg text-slate-600">
                {testType === "numeracy" ? "Numeracy" : "English Grammar"} - Grade {grade.replace("year", "")}
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center text-white">
              <div className="text-6xl font-bold">
                {pct(correctCount, questions.length)}%
              </div>
              <div className="mt-2 text-white/90">
                {correctCount} out of {questions.length} correct
              </div>
            </div>

            {/* Email notification */}
            {sendingResults ? (
              <div className="mt-6 rounded-xl bg-amber-50 p-4 text-center">
                <div className="text-sm text-amber-700">📧 Sending results to your email...</div>
              </div>
            ) : emailSent ? (
              <div className="mt-6 rounded-xl bg-green-50 p-4 text-center">
                <div className="text-sm text-green-700">✅ Results sent to your email!</div>
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-4 text-center">
                <div className="text-sm text-green-700 font-semibold">Correct</div>
                <div className="mt-1 text-3xl font-bold text-green-600">{correctCount}</div>
              </div>
              <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-4 text-center">
                <div className="text-sm text-red-700 font-semibold">Incorrect</div>
                <div className="mt-1 text-3xl font-bold text-red-600">
                  {questions.length - correctCount}
                </div>
              </div>
              <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 text-center">
                <div className="text-sm text-slate-600 font-semibold">Total</div>
                <div className="mt-1 text-3xl font-bold text-slate-900">{questions.length}</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              📋 Review Answers
            </div>
            <div className="space-y-4">
              {questions.map((q, qi) => {
                const a = answers[q.id];
                const isRight = a === q.answerIndex;
                return (
                  <div
                    key={q.id}
                    className={`rounded-2xl border-2 p-5 ${
                      isRight ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${
                          isRight ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        }`}>
                          {qi + 1}
                        </span>
                        <span className="text-sm font-semibold text-slate-700">{q.topic}</span>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          isRight
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {isRight ? "✓ Correct" : "✗ Incorrect"}
                      </span>
                    </div>
                    <div className="text-base font-semibold text-slate-900 ml-9">{q.prompt}</div>
                    <div className="mt-3 ml-9 text-sm">
                      <div className={`${isRight ? "text-green-700" : "text-red-700"}`}>
                        <span className="font-medium">Your answer: </span>
                        {a === null || a === undefined ? "(not answered)" : q.choices[a]}
                      </div>
                      {!isRight && (
                        <div className="text-green-700 mt-1">
                          <span className="font-medium">Correct: </span>{q.choices[q.answerIndex]}
                        </div>
                      )}
                    </div>
                    <div className="mt-3 ml-9 text-sm text-slate-600 bg-white/50 rounded-lg p-3">
                      <span className="font-medium">💡 Explanation:</span> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setIndex(0);
                setShowReview(false);
                setEmailSent(false);
              }}
              className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-4 font-bold text-white hover:shadow-lg"
            >
              🔄 Try Again
            </button>
            <button
              type="button"
              onClick={() => setLoginData(null)}
              className="flex-1 rounded-xl border-2 border-slate-300 px-5 py-4 font-bold text-slate-700 hover:bg-slate-50"
            >
              Different Test
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
