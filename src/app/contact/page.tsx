import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | IgniteMind Academy",
  description:
    "Contact IgniteMind Academy to book a free diagnostic or trial class for NAPLAN tutoring in Melbourne, Victoria. Call us or message on WhatsApp.",
};

function getWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${site.phoneE164}?text=${encodedMessage}`;
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px'}} />
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
        
        <Container>
          <div className="relative z-10 text-center">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🇦🇺 Melbourne, Victoria
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Get in Touch
              <span className="block text-orange-200">Start Your Child's Success Story</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Reach out via any channel below.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Email Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">We'll respond within 24 hours</p>
              <a
                href={`mailto:${site.email}`}
                className="text-orange-600 font-semibold hover:underline"
              >
                {site.email}
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📞</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Mon-Fri, 9AM-6PM AEST</p>
              <a
                href={`tel:${site.phoneE164}`}
                className="text-green-600 font-semibold hover:underline"
              >
                {site.phoneDisplay}
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#25D366]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Quick responses, any time</p>
              <a
                href={getWhatsAppUrl("Hi! I'd like to learn more about NAPLAN tutoring.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] font-semibold hover:underline"
              >
                Start Chat
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                📝 Send Us a Message
              </h2>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="0412 345 678"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student's Year Level</label>
                  <select className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:outline-none bg-white">
                    <option>Select year...</option>
                    <option>Year 3</option>
                    <option>Year 5</option>
                    <option>Year 7</option>
                    <option>Year 9</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your child's learning goals..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                >
                  🚀 Send Message
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-6">
              <div className="bg-slate-900 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">📍 Our Location</h3>
                <p className="text-slate-300 mb-4">
                  We serve students across Melbourne and throughout Victoria with both online and in-person tutoring options.
                </p>
                <div className="flex items-start gap-3">
                  <span>🏛️</span>
                  <div>
                    <p className="font-semibold">Melbourne, Victoria</p>
                    <p className="text-sm text-slate-400">Australia</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">💡 What to Include</h3>
                <p className="text-white/90 mb-4">
                  For the fastest response, please include:
                </p>
                <ul className="space-y-2 text-white/90">
                  <li>• Your child's current year level (3, 5, 7, or 9)</li>
                  <li>• Your suburb or area in Melbourne</li>
                  <li>• Whether you're interested in a diagnostic or trial class</li>
                  <li>• Any specific areas you'd like to focus on</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4">🕐 Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                  <p><span className="font-medium">Saturday:</span> 9:00 AM - 2:00 PM</p>
                  <p><span className="font-medium">Sunday:</span> By appointment</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-gray-50">
        <Container>
          <div className="text-center">
            <p className="text-gray-600 mb-6">Prefer to take action now?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/book"
                className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors"
              >
                📅 Book Free Diagnostic
              </a>
              <a
                href="/pricing"
                className="px-8 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-colors"
              >
                💰 View Pricing
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
