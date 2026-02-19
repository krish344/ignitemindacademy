import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "NAPLAN Tutoring Melbourne | IgniteMind Academy",
  description:
    "Expert NAPLAN tutoring for Years 3, 5, 7 & 9 in Melbourne. Build skills + strategy for reading, writing, language conventions and numeracy.",
};

export default function NaplanPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px'}} />
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
        
        <Container>
          <div className="relative z-10 text-center">
            <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🇦🇺 Melbourne's #1 NAPLAN Tutoring
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Master NAPLAN with
              <span className="block text-orange-400">Skills + Strategy</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              Build strong foundations in literacy and numeracy, then practice with authentic NAPLAN-style questions. 
              Our proven approach helps students approach test day with confidence.
            </p>
            
            {/* Year Levels */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { year: "Year 3", label: "Ages 8-9" },
                { year: "Year 5", label: "Ages 10-11" },
                { year: "Year 7", label: "Ages 12-13" },
                { year: "Year 9", label: "Ages 14-15" },
              ].map((item) => (
                <div key={item.year} className="bg-white/10 backdrop-blur rounded-xl px-6 py-3">
                  <div className="font-bold text-white">{item.year}</div>
                  <div className="text-xs text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/book"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                📅 Book Free Diagnostic
              </a>
              <a
                href="/test"
                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                📝 Try a Practice Test
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <div className="bg-white shadow-xl -mt-8 relative z-20 mx-4 rounded-2xl max-w-5xl mx-auto">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          {[
            { value: "500+", label: "Students Trained", icon: "👨‍🎓" },
            { value: "4.9★", label: "Average Rating", icon: "⭐" },
            { value: "95%", label: "Score Gains", icon: "📈" },
          ].map((stat, i) => (
            <div key={i} className="py-6 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-orange-600">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What We Cover */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="text-center mb-12">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">What We Cover</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Comprehensive NAPLAN Preparation</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We cover all four domains assessed in NAPLAN, building both skills and test-taking strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "📖",
                title: "Reading",
                description: "Comprehension strategies for both literal and inferential questions",
                topics: ["Finding information", "Interpreting texts", "Vocabulary in context"],
              },
              {
                icon: "✍️",
                title: "Writing",
                description: "Structured approaches to persuasive and narrative writing",
                topics: ["Essay structure", "Paragraph development", "Language choices"],
              },
              {
                icon: "📝",
                title: "Language Conventions",
                description: "Grammar, punctuation, and spelling mastery",
                topics: ["Sentence structure", "Punctuation rules", "Spelling strategies"],
              },
              {
                icon: "🔢",
                title: "Numeracy",
                description: "Mathematical thinking and problem-solving skills",
                topics: ["Number sense", "Algebra", "Measurement & geometry"],
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <ul className="space-y-1">
                  {item.topics.map((topic, j) => (
                    <li key={j} className="text-xs text-gray-500 flex items-center gap-2">
                      <span className="text-orange-500">•</span> {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How We Teach */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Our Approach</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                How We Help Students Succeed
              </h2>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Diagnostic Assessment", desc: "We assess your child's current level to identify strengths and gaps." },
                  { step: "02", title: "Targeted Learning Plan", desc: "Create a personalised plan focusing on areas that need the most attention." },
                  { step: "03", title: "Skill Building", desc: "Explicit teaching of core concepts with guided practice." },
                  { step: "04", title: "NAPLAN-Style Practice", desc: "Regular practice with authentic test questions under exam conditions." },
                  { step: "05", title: "Strategy Development", desc: "Learn time management and test-taking strategies for exam day." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Why Choose IgniteMind?</h3>
                <ul className="space-y-4">
                  {[
                    "Experienced Victorian tutors",
                    "Personalised learning plans",
                    "Proven results",
                    "Flexible scheduling",
                    "Online or in-person",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-white/80">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* NAPLAN Dates Banner */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-600">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-2">📅 NAPLAN 2026 Dates</h2>
            <p className="text-white/90 mb-4">Mark your calendar! NAPLAN testing window:</p>
            <div className="inline-block bg-white/20 backdrop-blur rounded-xl px-8 py-4">
              <span className="text-xl font-bold">March 12-14, 2026</span>
            </div>
            <p className="mt-4 text-white/80 text-sm">
              Start preparing now to build confidence and achieve your best results.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Child's NAPLAN Journey?
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Book a free diagnostic assessment and discover exactly where your child stands — with a clear path to improvement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/book"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                📅 Book Free Diagnostic
              </a>
              <a
                href="https://wa.me/917007525681"
                className="px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20BE5A] transition-colors"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
