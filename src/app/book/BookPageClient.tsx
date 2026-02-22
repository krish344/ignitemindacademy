"use client";

import { useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function trackEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}
import { Container } from "@/components/Container";

export default function BookPageClient() {
  const [formData, setFormData] = useState({
    bookingType: "",
    parentName: "",
    email: "",
    phone: "",
    suburb: "",
    studentName: "",
    yearLevel: "",
    school: "",
    dob: "",
    naplanScore: "",
    focusArea: "",
    preferredDay: "",
    preferredTime: "",
    additionalInfo: "",
    terms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        trackEvent('book_diagnostic_submit', {
          booking_type: formData.bookingType || 'unknown',
          year_level: formData.yearLevel || 'unknown',
        });

        setMessage({
          type: "success",
          text: "Booking Submitted! Check your email for confirmation. We will contact you within 24 hours.",
        });
        setFormData({
          bookingType: "",
          parentName: "",
          email: "",
          phone: "",
          suburb: "",
          studentName: "",
          yearLevel: "",
          school: "",
          dob: "",
          naplanScore: "",
          focusArea: "",
          preferredDay: "",
          preferredTime: "",
          additionalInfo: "",
          terms: false,
        });
      } else {
        throw new Error(result.error || "Failed to submit");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setMessage({
        type: "error",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 py-16 sm:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px'}} />        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '1s'}} />        
        <Container>
          <div className="text-center relative z-10">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🇦🇺 Melbourne's #1 NAPLAN Tutoring
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Book Your Free
              <span className="block text-orange-200">Diagnostic Assessment</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join 500+ students who've improved their NAPLAN scores. 
              Get a clear picture of your child's strengths and gaps.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span>Free Assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span>No Obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span>95% Score Gain</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <div className="bg-white shadow-xl -mt-8 relative z-20 mx-4 rounded-2xl max-w-5xl mx-auto">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          {[
            { value: "500+", label: "Students", icon: "👨‍🎓" },
            { value: "4.9★", label: "Rating", icon: "⭐" },
            { value: "95%", label: "Improved", icon: "📈" },
          ].map((stat, i) => (
            <div key={i} className="py-6 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-orange-600">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Benefits */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  🎯 What's Included
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>45-minute comprehensive skills assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Detailed strengths & gaps analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Personalised learning path</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Free NAPLAN practice resources</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  💬 Have Questions?
                </h3>
                <p className="text-white/90 mb-4">
                  Our team is here to help!
                </p>
                <a
                  href="https://wa.me/917007525681"
                  className="block w-full py-3 bg-white text-orange-600 rounded-xl font-bold text-center hover:bg-gray-100 transition-colors"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>

              {/* Testimonial */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex gap-1 text-orange-500 mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 italic mb-4">
                  "The diagnostic was eye-opening! We finally understood exactly where my daughter needed help. Her NAPLAN result improved from Developing to Strong proficiency level within just 2 months!"
                </p>
                <p className="font-semibold text-gray-900">— Sarah M., Melbourne</p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xl">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                    📅 Book Now
                  </h2>
                  <p className="text-gray-600">Fill out the form and we'll confirm within 24 hours</p>
                </div>

                {/* Booking Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    What would you like to book? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className={`relative flex cursor-pointer items-center justify-center rounded-xl border-2 p-4 transition-all ${formData.bookingType === "diagnostic" ? "border-orange-500 bg-orange-100" : "border-orange-200 bg-orange-50 hover:border-orange-500"}`}>
                      <input
                        type="radio"
                        name="bookingType"
                        value="diagnostic"
                        checked={formData.bookingType === "diagnostic"}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      <div className="text-center">
                        <div className="text-2xl mb-1">🎯</div>
                        <div className="font-semibold text-slate-900">Free Diagnostic</div>
                        <div className="text-xs text-slate-600 mt-1">Assess skills</div>
                      </div>
                    </label>
                    <label className={`relative flex cursor-pointer items-center justify-center rounded-xl border-2 p-4 transition-all ${formData.bookingType === "trial" ? "border-green-500 bg-green-100" : "border-green-200 bg-green-50 hover:border-green-500"}`}>
                      <input
                        type="radio"
                        name="bookingType"
                        value="trial"
                        checked={formData.bookingType === "trial"}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      <div className="text-center">
                        <div className="text-2xl mb-1">🚀</div>
                        <div className="font-semibold text-slate-900"> Trial Class</div>
                        <div className="text-xs text-slate-600 mt-1">Experience tutoring</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Parent Details */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    👤 Parent/Guardian Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="John Smith"
                        required
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0412 345 678"
                        required
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Suburb *</label>
                      <input
                        type="text"
                        name="suburb"
                        value={formData.suburb}
                        onChange={handleChange}
                        placeholder="Melbourne, VIC"
                        required
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Student Details */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    👨‍🎓 Student Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Student Name *</label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        required
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Year Level *</label>
                      <select
                        name="yearLevel"
                        value={formData.yearLevel}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-orange-500 focus:outline-none bg-white"
                      >
                        <option value="">Select year...</option>
                        <option value="Year 1">Year 1</option>
                        <option value="Year 2">Year 2</option>
                        <option value="Year 3">Year 3</option>
                        <option value="Year 4">Year 4</option>
                        <option value="Year 5">Year 5</option>
                        <option value="Year 6">Year 6</option>
                        <option value="Year 7">Year 7</option>
                        <option value="Year 8">Year 8</option>
                        <option value="Year 9">Year 9</option>
                        <option value="Year 10">Year 10</option>
                        <option value="Year 11">Year 11</option>
                        <option value="Year 12">Year 12</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Current School (Optional)</label>
                      <input
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        placeholder="Melbourne Primary School"
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth (Optional)</label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* NAPLAN Details */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    📊 NAPLAN Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Last NAPLAN Score (if available)</label>
                      <select
                        name="naplanScore"
                        value={formData.naplanScore}
                        onChange={handleChange}
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-orange-500 focus:outline-none bg-white"
                      >
                        <option value="">Not available / Haven't taken NAPLAN</option>
                        <option value="Exceeding">Exceeding expectations</option>
                        <option value="Strong">Strong proficiency</option>
                        <option value="Developing">Developing skills</option>
                        <option value="Beginning">Needs extra support</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Areas to Focus On</label>
                      <select
                        name="focusArea"
                        value={formData.focusArea}
                        onChange={handleChange}
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-orange-500 focus:outline-none bg-white"
                      >
                        <option value="">Select area...</option>
                        <option value="General preparation">General preparation</option>
                        <option value="Numeracy">Numeracy</option>
                        <option value="Reading">Reading</option>
                        <option value="Writing">Writing</option>
                        <option value="Grammar & Language">Grammar & Language</option>
                        <option value="All Areas">All Areas</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Preferred Schedule */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    📅 Preferred Schedule
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Day</label>
                      <select
                        name="preferredDay"
                        value={formData.preferredDay}
                        onChange={handleChange}
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-orange-500 focus:outline-none bg-white"
                      >
                        <option value="">Any day</option>
                        <option value="Weekday Morning">Weekday Morning</option>
                        <option value="Weekday Afternoon">Weekday Afternoon</option>
                        <option value="Saturday Morning">Saturday Morning</option>
                        <option value="Saturday Afternoon">Saturday Afternoon</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Time</label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-orange-500 focus:outline-none bg-white"
                      >
                        <option value="">Any time</option>
                        <option value="Morning">Morning (9AM-12PM)</option>
                        <option value="Afternoon">Afternoon (12PM-5PM)</option>
                        <option value="Evening">Evening (5PM-8PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Additional Information</label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us about your child's learning goals, any challenges, or questions you have..."
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    required
                    className="mt-1 w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <label className="text-sm text-slate-600">
                    I agree to receive communications from IgniteMind Academy regarding my booking and tutoring services. *
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>📅 Book Now</>
                  )}
                </button>

                {/* Success/Error Message */}
                {message && (
                  <div className={`p-4 rounded-xl ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message.text}
                  </div>
                )}

                <p className="text-center text-gray-500 text-sm">
                  🔒 We respect your privacy. Your information is secure.
                </p>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
