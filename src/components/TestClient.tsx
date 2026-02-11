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
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center">
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
                className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Start Test
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-500">
            Your results will be sent to your email and our team after completion.
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
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-indigo-600">Welcome, {loginData.name}</div>
            <div className="mt-1 text-lg font-semibold text-slate-900">
              Grade {grade.replace("year", "")} NAPLAN {testType === "numeracy" ? "Numeracy" : "English Grammar"}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLoginData(null)}
              className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
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
                ? "border-indigo-600 bg-indigo-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="font-semibold text-slate-900">{t.name}</div>
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
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              g === grade
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-900 hover:bg-slate-200"
            }`}
          >
            {gradeLabels[g]}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-600">
          Progress:{" "}
          <span className="font-semibold text-slate-900">
            {Math.min(index + 1, questions.length)}
          </span>{" "}
          / {questions.length}
        </div>
        <div className="text-sm text-slate-600">
          Score: <span className="font-semibold text-slate-900">{correctCount}</span> /{" "}
          {questions.length} ({pct(correctCount, questions.length)}%)
        </div>
      </div>

      {/* Question */}
      {!current ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div className="text-lg font-semibold text-slate-900">No questions found</div>
          <p className="mt-2 text-slate-600">No questions available for this test type and grade.</p>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-semibold text-slate-900">
              Question {index + 1} of {questions.length}
            </div>
            <div className="mt-2 text-lg font-semibold text-slate-900">{current.prompt}</div>
          </div>

          <fieldset className="mt-5 space-y-3">
            <legend className="sr-only">Choose an answer</legend>
            {current.choices.map((c, i) => {
              const isChosen = answers[current.id] === i;
              const isCorrect = i === current.answerIndex;
              const showState = answers[current.id] !== null && answers[current.id] !== undefined;

              const base =
                "w-full rounded-2xl border px-4 py-4 text-left text-base font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

              let cls = "border-slate-200 bg-white hover:bg-slate-50";

              if (showState) {
                if (isCorrect) cls = "border-emerald-200 bg-emerald-50";
                else if (isChosen) cls = "border-rose-200 bg-rose-50";
              } else if (isChosen) {
                cls = "border-slate-900 bg-slate-50";
              }

              return (
                <button
                  key={c}
                  type="button"
                  className={`${base} ${cls}`}
                  onClick={() => setAnswers((prev) => ({ ...prev, [current.id]: i }))}
                >
                  <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {c}
                </button>
              );
            })}
          </fieldset>

          {answers[current.id] !== null && answers[current.id] !== undefined ? (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-sm font-semibold text-indigo-600">Explanation</div>
              <p className="mt-2 text-sm leading-6 text-slate-700">{current.explanation}</p>
            </div>
          ) : null}

          {/* Navigation */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200"
              onClick={() => {
                setAnswers({});
                setIndex(0);
                setShowReview(false);
                setEmailSent(false);
              }}
            >
              Restart Test
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 disabled:opacity-50"
                onClick={() => setIndex((v) => Math.max(0, v - 1))}
                disabled={index === 0}
              >
                Previous
              </button>
              {index < questions.length - 1 ? (
                <button
                  type="button"
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  onClick={() => setIndex((v) => Math.min(questions.length - 1, v + 1))}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                  onClick={() => setShowReview(true)}
                >
                  Finish Test
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results Page */}
      {showReview ? (
        <div className="mt-8 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">Test Complete!</div>
              <div className="mt-2 text-lg text-slate-600">
                {testType === "numeracy" ? "Numeracy" : "English Grammar"} - Grade {grade.replace("year", "")}
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-indigo-50 p-6 text-center">
              <div className="text-5xl font-bold text-indigo-600">
                {pct(correctCount, questions.length)}%
              </div>
              <div className="mt-2 text-slate-600">
                {correctCount} out of {questions.length} correct
              </div>
            </div>

            {/* Email notification */}
            {sendingResults ? (
              <div className="mt-4 rounded-xl bg-amber-50 p-4 text-center">
                <div className="text-sm text-amber-700">Sending results to your email...</div>
              </div>
            ) : emailSent ? (
              <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-center">
                <div className="text-sm text-emerald-700">Results sent to your email!</div>
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                <div className="text-sm text-slate-600">Correct</div>
                <div className="mt-1 text-2xl font-bold text-emerald-600">{correctCount}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                <div className="text-sm text-slate-600">Incorrect</div>
                <div className="mt-1 text-2xl font-bold text-rose-600">
                  {questions.length - correctCount}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                <div className="text-sm text-slate-600">Total Questions</div>
                <div className="mt-1 text-2xl font-bold text-slate-900">{questions.length}</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold">Review Answers</div>
            <div className="mt-4 space-y-4">
              {questions.map((q, qi) => {
                const a = answers[q.id];
                const isRight = a === q.answerIndex;
                return (
                  <div
                    key={q.id}
                    className={`rounded-2xl border p-4 ${
                      isRight ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-semibold">
                        Q{qi + 1}: {q.prompt}
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          isRight
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {isRight ? "Correct" : "Incorrect"}
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-slate-600">Your answer: </span>
                      <span className={isRight ? "text-emerald-600" : "text-rose-600"}>
                        {a === null || a === undefined ? "(not answered)" : q.choices[a]}
                      </span>
                      {!isRight && (
                        <>
                          <span className="mx-2 text-slate-400">|</span>
                          <span className="text-emerald-600">Correct: {q.choices[q.answerIndex]}</span>
                        </>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-slate-600">
                      <span className="font-medium">Explanation:</span> {q.explanation}
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
              className="flex-1 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={() => setLoginData(null)}
              className="flex-1 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Different Test
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
