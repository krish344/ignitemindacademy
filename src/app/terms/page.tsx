import type { Metadata } from "next";
import { SiteLayout } from "@/components/SiteLayout";

export const metadata: Metadata = {
  title: "Terms of Service | IgniteMind Academy",
  description: "Terms and Conditions for using IgniteMind Academy's tutoring services.",
};

export default function TermsPage() {
  return (
    <SiteLayout>
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
          <p className="text-slate-600 mb-4">Last updated: February 2026</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600">
                By accessing and using IgniteMind Academy's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Services</h2>
              <p className="text-slate-600">
                IgniteMind Academy provides online NAPLAN tutoring and educational support services for students in Years 3-12. Our services include:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                <li>One-on-one tutoring sessions</li>
                <li>Mock test preparation</li>
                <li>Diagnostic assessments</li>
                <li>Progress tracking and reporting</li>
                <li>Access to learning materials and resources</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Accounts and Registration</h2>
              <p className="text-slate-600">
                To access certain features, you may need to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Booking and Payment</h2>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Bookings</h3>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Bookings can be made through our online booking system</li>
                <li>A confirmation email will be sent upon successful booking</li>
                <li>Please arrive or log in at least 5 minutes before scheduled sessions</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-2 mt-6">Payments</h3>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Payments are processed securely through third-party providers</li>
                <li>Pricing is clearly displayed before payment</li>
                <li>Refunds are available as per our refund policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Cancellations and Rescheduling</h2>
              <p className="text-slate-600">
                We understand that circumstances may change. Our cancellation policy:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                <li>Cancellations made 24+ hours before the session: Full refund</li>
                <li>Cancellations made 12-24 hours before: 50% refund</li>
                <li>Cancellations made less than 12 hours before: No refund</li>
                <li>You can reschedule once without penalty with 12 hours notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Code of Conduct</h2>
              <p className="text-slate-600">All users agree to:</p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                <li>Treat tutors and staff with respect and courtesy</li>
                <li>Not engage in abusive, harassing, or inappropriate behavior</li>
                <li>Not share account credentials with others</li>
                <li>Not use our services for any unlawful purpose</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Intellectual Property</h2>
              <p className="text-slate-600">
                All content, materials, and resources provided through our services are the intellectual property of IgniteMind Academy. You may not reproduce, distribute, or create derivative works without our written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-slate-600">
                Our services are provided "as is" without any representations or warranties. We do not guarantee that our services will meet your expectations or that results will be achieved.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-slate-600">
                IgniteMind Academy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Indemnification</h2>
              <p className="text-slate-600">
                You agree to indemnify, defend, and hold harmless IgniteMind Academy from any claims, damages, liabilities, costs, or expenses arising from your use of our services or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Termination</h2>
              <p className="text-slate-600">
                We may terminate or suspend your access to our services immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users or our business.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Governing Law</h2>
              <p className="text-slate-600">
                These Terms of Service shall be governed by and construed in accordance with the laws of Victoria, Australia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Changes to Terms</h2>
              <p className="text-slate-600">
                We reserve the right to modify these terms at any time. Your continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Contact Us</h2>
              <p className="text-slate-600">
                If you have questions about these Terms of Service, please contact us at:
                <br />
                <strong>Email:</strong> ignitemind60@gmail.com
                <br />
                <strong>Phone:</strong> +61 400 123 456
              </p>
            </section>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
