"use client";

import { useMemo, useState } from "react";
import {
  gradeLabels,
  GradeKey,
  mcqsForGrade,
  Mcq,
  TopicKey,
  topicLabels,
  topics,
} from "@/lib/quiz";

function pct(n: number, d: number) {
  if (d === 0) return 0;
  return Math.round((n / d) * 100);
}

export function QuizClient({ initialGrade }: { initialGrade: GradeKey }) {
  const [grade, setGrade] = useState<GradeKey>(initialGrade);
  const [topic, setTopic] = useState<TopicKey>("all");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [showReview, setShowReview] = useState(false);

  const questions = useMemo(() => mcqsForGrade(grade, topic), [grade, topic]);
  const gradeAll = useMemo(() => mcqsForGrade(grade, "all"), [grade]);
  const current = questions[index];

  const correctCount = useMemo(() => {
    return questions.reduce((acc, q) => {
      const a = answers[q.id];
      if (a === q.answerIndex) return acc + 1;
      return acc;
    }, 0);
  }, [answers, questions]);

  const breakdown = useMemo(() => {
    type QuizTopicKey = 'number' | 'algebra' | 'measurement' | 'geometry' | 'statistics' | 'grammar';
    
    const perTopic: Record<QuizTopicKey, { total: number; correct: number; answered: number }> = {
      number: { total: 0, correct: 0, answered: 0 },
      algebra: { total: 0, correct: 0, answered: 0 },
      measurement: { total: 0, correct: 0, answered: 0 },
      geometry: { total: 0, correct: 0, answered: 0 },
      statistics: { total: 0, correct: 0, answered: 0 },
      grammar: { total: 0, correct: 0, answered: 0 },
    };

    for (const q of gradeAll) {
      const topicKey = q.topic as QuizTopicKey;
      if (!perTopic[topicKey]) continue;
      const bucket = perTopic[topicKey];
      bucket.total += 1;
      const a = answers[q.id];
      if (a !== null && a !== undefined) bucket.answered += 1;
      if (a === q.answerIndex) bucket.correct += 1;
    }

    return perTopic;
  }, [answers, gradeAll]);

  function reset(nextGrade: GradeKey) {
    setGrade(nextGrade);
    setTopic("all");
    setIndex(0);
    setAnswers({});
    setShowReview(false);
  }

  function resetTopic(nextTopic: TopicKey) {
    // Keep answers when switching topics so we can show a topic-wise breakdown.
    setTopic(nextTopic);
    setIndex(0);
    setShowReview(false);
  }

  function selectAnswer(q: Mcq, choiceIndex: number) {
    setAnswers((prev) => ({ ...prev, [q.id]: choiceIndex }));
  }

  const answered = current ? answers[current.id] : null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-indigo-600">
            Interactive Maths Quiz
          </div>
          <div className="mt-1 text-xl font-semibold">{gradeLabels[grade]}</div>
          <div className="mt-1 text-sm text-slate-600">{topicLabels[topic]}</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["year3", "year5", "year7", "year9"] as GradeKey[]).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => reset(g)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                g === grade
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              }`}
            >
              {gradeLabels[g]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => resetTopic(t)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              t === topic
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-900 hover:bg-slate-200"
            }`}
          >
            {topicLabels[t]}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

      {!current ? (
        <p className="mt-6 text-sm text-slate-600">
          No questions found for this selection.
        </p>
      ) : (
        <div className="mt-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-semibold text-slate-900">
              Question {index + 1}
            </div>
            <div className="mt-2 text-base font-semibold">{current.prompt}</div>
          </div>

          <fieldset className="mt-5 space-y-3">
            <legend className="sr-only">Choose an answer</legend>
            {current.choices.map((c, i) => {
              const isChosen = answered === i;
              const isCorrect = i === current.answerIndex;
              const showState = answered !== null && answered !== undefined;

              const base =
                "w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

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
                  onClick={() => selectAnswer(current, i)}
                >
                  {c}
                </button>
              );
            })}
          </fieldset>

          {answered !== null && answered !== undefined ? (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-sm font-semibold">Explanation</div>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {current.explanation}
              </p>
            </div>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200"
              onClick={() => {
                setAnswers({});
                setIndex(0);
                setShowReview(false);
              }}
            >
              Restart selection
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 disabled:opacity-50"
                onClick={() => setIndex((v) => Math.max(0, v - 1))}
                disabled={index === 0}
              >
                Previous
              </button>
              {index < questions.length - 1 ? (
                <button
                  type="button"
                  className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  onClick={() =>
                    setIndex((v) => Math.min(questions.length - 1, v + 1))
                  }
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  onClick={() => setShowReview(true)}
                >
                  Finish
                </button>
              )}
            </div>
          </div>

          {showReview ? (
            <div className="mt-8 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-lg font-semibold">Results</div>
                <p className="mt-1 text-sm text-slate-600">
                  Score (current selection): {correctCount}/{questions.length} ({pct(correctCount, questions.length)}%)
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {(
                    [
                      "number",
                      "algebra",
                      "measurement",
                      "geometry",
                      "statistics",
                    ] as const
                  ).map((t) => {
                    const b = breakdown[t];
                    const percent = pct(b.correct, b.total);
                    return (
                      <div
                        key={t}
                        className="rounded-2xl border border-slate-200 bg-white p-4"
                      >
                        <div className="text-xs font-semibold text-slate-500">Topic</div>
                        <div className="mt-1 text-sm font-semibold">{topicLabels[t]}</div>
                        <div className="mt-2 text-2xl font-semibold">
                          {b.correct}/{b.total}
                        </div>
                        <div className="mt-1 text-xs text-slate-600">
                          {percent}% correct • {b.answered}/{b.total} answered
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Tip: Switch topics and keep practicing - your progress is kept for the current grade.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-lg font-semibold">
                  Review questions (current selection)
                </div>

                <div className="mt-5 space-y-4">
                  {questions.map((q, qi) => {
                    const a = answers[q.id];
                    const isRight = a === q.answerIndex;
                    return (
                      <div
                        key={q.id}
                        className="rounded-2xl border border-slate-200 bg-white p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
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
                            {isRight ? "Correct" : "Needs work"}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-slate-700">
                          Your answer:{" "}
                          {a === null || a === undefined
                            ? "(not answered)"
                            : q.choices[a]}
                          <br />
                          Correct answer: {q.choices[q.answerIndex]}
                        </div>
                        <div className="mt-2 text-sm text-slate-600">
                          {q.explanation}
                        </div>
                        <div className="mt-3">
                          <button
                            type="button"
                            className="text-sm font-semibold underline"
                            onClick={() => {
                              setIndex(qi);
                              setShowReview(false);
                            }}
                          >
                            Go to question
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
