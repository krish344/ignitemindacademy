import type { Metadata } from "next";
import { SiteLayout } from "@/components/SiteLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | IgniteMind Academy",
  description: "Privacy Policy - How we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <SiteLayout>
      {/* Header 1: Trust Banner */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">🔒 Your Privacy Matters to Us</h2>
          <p className="text-slate-600">We are committed to safeguarding your personal information and ensuring a safe learning environment for your child.</p>
        </div>
      </div>

      {/* Header 2: Quick Contact Banner */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center">
          <p className="text-lg">
            Have questions about your data?{" "}
            <a href="tel:+917007525681" className="text-orange-400 hover:text-orange-300 font-semibold underline">
              Call us at +91 7007525681
            </a>
          </p>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
          <p className="text-slate-600 mb-4">Last updated: February 2026</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-slate-600">
                IgniteMind Academy ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile application, or engage our tutoring services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Personal Information</h3>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Parent/guardian name and contact information</li>
                <li>Student name, year level, and school</li>
                <li>Email address and phone number</li>
                <li>Payment information (processed securely through third parties)</li>
                <li>NAPLAN scores and academic performance data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>To provide tutoring services and educational support</li>
                <li>To communicate with you about bookings, schedules, and progress</li>
                <li>To send educational materials and updates</li>
                <li>To improve our services and website functionality</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information Sharing</h2>
              <p className="text-slate-600">
                We do not sell, trade, or otherwise transfer your personal information to outside parties except:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                <li>Trusted third parties who assist in operating our website and conducting our business</li>
                <li>When required by law or to protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
              <p className="text-slate-600">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Children's Privacy</h2>
              <p className="text-slate-600">
                Our services are designed for students under the age of 18. We collect information about students only with parental consent. Parents can review, update, or delete their child's information by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Your Rights</h2>
              <p className="text-slate-600">You have the right to:</p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Contact Us</h2>
              <p className="text-slate-600">
                If you have questions about this Privacy Policy, please contact us at:
                <br />
                <strong>Email:</strong> ignitemind60@gmail.com
                <br />
                <strong>Phone:</strong> +91 7007525681
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Footer 1: Contact CTA */}
      <div className="bg-orange-50 border-t border-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-10 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-3">Need Help or Have Concerns?</h3>
          <p className="text-slate-600 mb-4">Our team is here to address any privacy-related questions you may have.</p>
          <a
            href="tel:+917007525681"
            className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:shadow-lg transition-all"
          >
            Call +91 7007525681
          </a>
        </div>
      </div>

      {/* Footer 2: Closing Statement */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-lg font-medium mb-2">Thank you for trusting IgniteMind Academy</p>
          <p className="text-slate-400 text-sm">We are committed to protecting your family's privacy while helping your child succeed in their studies.</p>
          <p className="text-slate-500 text-xs mt-4">© 2026 IgniteMind Academy. All rights reserved.</p>
        </div>
      </div>
    </SiteLayout>
  );
}
