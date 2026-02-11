"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const yearLevels = [
  {
    year: "Year 3",
    age: "8-9 years",
    subjects: ["Reading", "Writing", "Numeracy"],
    topics: ["Basic Grammar", "Comprehension", "Number Sense"],
    color: "from-orange-400 to-yellow-400",
  },
  {
    year: "Year 5",
    age: "10-11 years",
    subjects: ["Reading", "Writing", "Numeracy", "Spelling"],
    topics: ["Narrative Writing", "Algebra Basics", "Data Interpretation"],
    color: "from-red-400 to-orange-400",
  },
  {
    year: "Year 7",
    age: "12-13 years",
    subjects: ["Reading", "Writing", "Numeracy", "Grammar"],
    topics: ["Persuasive Text", "Fractions & Decimals", "Measurement"],
    color: "from-pink-400 to-red-400",
  },
  {
    year: "Year 9",
    age: "14-15 years",
    subjects: ["Reading", "Writing", "Numeracy", "Grammar"],
    topics: ["Extended Responses", "Linear Equations", "Geometry"],
    color: "from-purple-400 to-pink-400",
  },
];

export default function YearCards() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your <span className="text-orange-500">Year Level</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tailored NAPLAN preparation for every stage of your academic journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {yearLevels.map((level, index) => (
            <motion.div
              key={level.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/naplan?year=${level.year}`}>
                <motion.div
                  className="relative group h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity rounded-2xl" />

                  {/* Main Card */}
                  <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full">
                    {/* Color Bar */}
                    <div className={`h-2 bg-gradient-to-r ${level.color}`} />

                    <div className="p-6">
                      {/* Year Badge */}
                      <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 mb-4">
                        <span className="text-2xl font-bold text-gray-900">
                          {level.year}
                        </span>
                        <span className="text-sm text-gray-500">{level.age}</span>
                      </div>

                      {/* Subjects */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {level.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>

                      {/* Hidden Topic Reveal */}
                      <motion.div
                        initial={false}
                        animate={{ height: 0, opacity: 0 }}
                        whileHover={{ height: "auto", opacity: 1 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-xs font-semibold text-gray-500 mb-2">
                            Key Topics:
                          </p>
                          <ul className="space-y-1">
                            {level.topics.map((topic) => (
                              <li
                                key={topic}
                                className="text-sm text-gray-600 flex items-center gap-2"
                              >
                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>

                      {/* CTA */}
                      <div className="mt-4 flex items-center text-orange-500 font-semibold text-sm group-hover:text-orange-600">
                        <span>Explore NAPLAN Prep</span>
                        <svg
                          className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${level.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl`}
                    />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
