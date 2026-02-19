import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ContactCTASection } from "@/components/ui/ContactCTASection";

export const metadata: Metadata = {
  title: "Pricing | IgniteMind Academy",
  description:
    "Transparent NAPLAN tutoring pricing for Years 3, 5, 7 & 9 in Melbourne, Victoria. Starting from $35/week. Flexible plans available.",
};

const plans = [
  {
    name: "Practice Plan",
    price: "$35",
    period: "/week",
    note: "Perfect for self-paced learners",
    features: [
      "📝 Unlimited practice quizzes",
      "📊 Progress tracking dashboard",
      "📱 Mobile access",
      "🎮 Gamified learning",
      "❓ 500+ NAPLAN questions",
    ],
    cta: "Get Started",
    popular: false,
    color: "from-gray-500 to-gray-600",
  },
  {
    name: "Tutoring Plan",
    price: "$49",
    period: "/week",
    note: "Most popular for NAPLAN success",
    features: [
      "👨‍🏫 Weekly live tutoring session",
      "📝 Unlimited practice quizzes",
      "📊 Progress tracking & reports",
      "📱 Mobile access",
      "🎮 Gamified learning",
      "❓ 1000+ NAPLAN questions",
      "💬 WhatsApp support",
    ],
    cta: "Start Free Trial",
    popular: true,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Intensive Plan",
    price: "$79",
    period: "/week",
    note: "Maximum results in minimum time",
    features: [
      "👨‍🏫 2x Weekly live tutoring",
      "📝 Unlimited practice quizzes",
      "📊 Detailed progress reports",
      "📱 Priority support",
      "🎮 Gamified learning",
      "❓ Full NAPLAN question bank",
      "💬 24/7 WhatsApp support",
      "🎯 Personalised study plan",
    ],
    cta: "Book Consultation",
    popular: false,
    color: "from-green-500 to-emerald-600",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px'}} />
        <Container>
          <div className="relative z-10 text-center">
            <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🇦🇺 Transparent Pricing
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Simple Plans for
              <span className="block text-orange-400">Every Need</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Choose the plan that fits your family. All plans include our satisfaction guarantee.
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col ${
                  plan.popular ? 'ring-4 ring-orange-500 md:-mt-4 md:mb-4' : ''
                }`}
              >
                {plan.popular && (
                  <div className={`bg-gradient-to-r ${plan.color} text-white text-center py-2 font-bold text-sm`}>
                    MOST POPULAR
                  </div>
                )}
                
                <div className="p-8 flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{plan.note}</p>
                  
                  <div className="flex items-baseline mt-6 mb-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">billed weekly</p>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-600">
                        <span className="text-green-500 text-lg">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 pt-0">
                  <a
                    href="/book"
                    className={`block w-full py-4 text-center font-bold rounded-xl transition-all ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg`
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>First session money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Secure payment via Stripe</span>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "What's included in the free diagnostic?",
                a: "Our 45-minute diagnostic assesses your child's current NAPLAN readiness in literacy and numeracy. You'll receive a detailed report outlining strengths, gaps, and a recommended learning path."
              },
              {
                q: "Can I change plans later?",
                a: "Absolutely! You can upgrade or downgrade your plan at any time. We'll pro-rate any differences and ensure a smooth transition."
              },
              {
                q: "Are online sessions available?",
                a: "Yes! All our tutoring is available online via video call, making it convenient for busy families across Melbourne and Victoria."
              },
              {
                q: "Do you offer sibling discounts?",
                a: "Yes, we offer 10% off for the second sibling enrolled. Contact us for more details."
              },
              {
                q: "What if my child misses a session?",
                a: "Life happens! Just give us 24 hours notice and we'll reschedule at no extra cost. Recordings of sessions are also available for review."
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-semibold text-gray-900 list-none">
                  <span>{faq.q}</span>
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Our team is here to help you find the right plan for your child.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/book"
                className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
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
