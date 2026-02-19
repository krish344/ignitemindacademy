"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🎮",
    title: "Gamified Learning",
    description: "Earn points, badges, and climb leaderboards while mastering NAPLAN concepts.",
    color: "from-orange-400 to-red-400",
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    description: "Learn anywhere, anytime on any device with our responsive platform.",
    color: "from-blue-400 to-cyan-400",
  },
  {
    icon: "📊",
    title: "Progress Analytics",
    description: "Detailed insights into your strengths and areas for growth.",
    color: "from-green-400 to-emerald-400",
  },
  {
    icon: "👨‍🏫",
    title: "Expert Tutors",
    description: "Learn from qualified teachers with years of NAPLAN coaching experience.",
    color: "from-purple-400 to-violet-400",
  },
  {
    icon: "⚡",
    title: "Instant Feedback",
    description: "Get immediate answers and explanations to accelerate your learning.",
    color: "from-yellow-400 to-orange-400",
  },
  {
    icon: "📚",
    title: "Complete Curriculum",
    description: "Comprehensive coverage of all NAPLAN topics and question types.",
    color: "from-pink-400 to-rose-400",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-orange-500">IgniteMind</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with proven teaching methods
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full relative overflow-hidden">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>

                {/* Hover Arrow */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                  >
                    <svg
                      className="w-5 h-5 text-white"
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
