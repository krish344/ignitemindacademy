import type { Metadata } from "next";
import { SiteLayout } from "@/components/SiteLayout";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "About Us | IgniteMind Academy",
  description:
    "Learn about IgniteMind Academy's approach to NAPLAN tutoring in Melbourne, Victoria. Expert tutors helping students excel in Years 3, 5, 7 & 9.",
};

export default function AboutPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px'}} />
        <Container>
          <div className="relative z-10 text-center">
            <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🇦🇺 Melbourne-Based NAPLAN Experts
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Building Foundations That
              <span className="block text-orange-400">Last Beyond the Test</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              We believe true NAPLAN success comes from genuine understanding — not just test-taking tricks.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <div className="bg-white shadow-xl -mt-10 relative z-20 mx-4 rounded-2xl max-w-5xl mx-auto">
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

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Our Approach */}
            <div>
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Our Approach</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                Structured Learning for Measurable Results
              </h2>
              <div className="space-y-6 text-gray-600">
                <p>
                  IgniteMind Academy was founded on a simple principle: every student can excel in NAPLAN when given the right guidance, structured practice, and confidence-building strategies.
                </p>
                <p>
                  Based in Melbourne, we specialize exclusively in NAPLAN preparation for Years 3, 5, 7, and 9. Our tutors understand the Australian curriculum and the specific skills each year level demands.
                </p>
              </div>

              {/* Key Pillars */}
              <div className="mt-8 space-y-4">
                {[
                  { icon: "🎯", title: "Targeted Skill Development", desc: "We identify knowledge gaps and build strong foundations in literacy and numeracy." },
                  { icon: "📝", title: "Authentic Practice", desc: "NAPLAN-style questions and timed assessments prepare students for the real test environment." },
                  { icon: "💪", title: "Test Confidence", desc: "We teach strategies to manage exam anxiety and perform under pressure." },
                  { icon: "📊", title: "Transparent Progress", desc: "Regular reports keep parents informed every step of the way." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Why Choose Us */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Why Melbourne Parents Choose Us</h3>
                <ul className="space-y-4">
                  {[
                    "Experienced tutors with Victorian curriculum expertise",
                    "Personalised learning plans tailored to each student",
                    "Flexible scheduling — weekday and weekend sessions available",
                    "Proven track record of score improvements",
                    "Supportive, encouraging learning environment",
                    "Convenient online and in-person options",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-white/80">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex gap-1 text-orange-500 mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 italic mb-4">
                  "After just 8 weeks with IgniteMind, my daughter's NAPLAN confidence skyrocketed. She went from anxious to excited about the tests. The structured approach made all the difference."
                </p>
                <p className="font-semibold text-gray-900">— Michael T., Melbourne</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Child's Journey?
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Book a free diagnostic assessment and discover exactly where your child stands — with no obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/book"
                className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors"
              >
                📅 Book Free Diagnostic
              </a>
              <a
                href="https://wa.me/917007525681"
                className="px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20BE5A] transition-colors flex items-center gap-2"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
