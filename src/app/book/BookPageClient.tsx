"use client";

import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

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
    <SiteLayout>
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Book Now" title="Free Diagnostic & Trial Class">
            Fill out the form below and we will confirm your booking via email.
          </SectionHeading>

          <div className="mx-auto mt-10 max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              {/* Booking Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  What would you like to book? *
                </label>
                <div className="grid grid-cols-2 gap-4">
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
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Parent/Guardian Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      placeholder="0412 345 678"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Suburb *</label>
                    <input
                      type="text"
                      name="suburb"
                      value={formData.suburb}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      placeholder="Melbourne, VIC"
                    />
                  </div>
                </div>
              </div>

              {/* Student Details */}
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Student Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Student Name *</label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Year Level *</label>
                    <select
                      name="yearLevel"
                      value={formData.yearLevel}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    >
                      <option value="">Select year...</option>
                      <option value="Year 3">Year 3</option>
                      <option value="Year 5">Year 5</option>
                      <option value="Year 7">Year 7</option>
                      <option value="Year 9">Year 9</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Current School (Optional)</label>
                    <input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      placeholder="Melbourne Primary School"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Date of Birth (Optional)</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* NAPLAN Details */}
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">NAPLAN Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Last NAPLAN Score (if available)</label>
                    <select
                      name="naplanScore"
                      value={formData.naplanScore}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    >
                      <option value="">Not available</option>
                      <option value="Band 10+">Band 10+ (Exceeding)</option>
                      <option value="Band 8-9">Band 8-9 (Strong)</option>
                      <option value="Band 6-7">Band 6-7 (Developing)</option>
                      <option value="Band 4-5">Band 4-5 (Building)</option>
                      <option value="Below Band 4">Below Band 4</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Areas to Focus On</label>
                    <select
                      name="focusArea"
                      value={formData.focusArea}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    >
                      <option value="">General preparation</option>
                      <option value="Numeracy">Numeracy</option>
                      <option value="Reading">Reading</option>
                      <option value="Writing">Writing</option>
                      <option value="Grammar">Grammar &amp; Language</option>
                      <option value="All Areas">All Areas</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Scheduling */}
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Preferred Schedule</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Preferred Day</label>
                    <select
                      name="preferredDay"
                      value={formData.preferredDay}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    >
                      <option value="">Any day</option>
                      <option value="Weekday Morning">Weekday Morning</option>
                      <option value="Weekday Afternoon">Weekday Afternoon</option>
                      <option value="Saturday Morning">Saturday Morning</option>
                      <option value="Saturday Afternoon">Saturday Afternoon</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Preferred Time</label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    >
                      <option value="">Any time</option>
                      <option value="Morning (9AM-12PM)">Morning (9AM-12PM)</option>
                      <option value="Afternoon (12PM-5PM)">Afternoon (12PM-5PM)</option>
                      <option value="Evening (5PM-8PM)">Evening (5PM-8PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="border-t border-slate-100 pt-6">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Additional Information or Special Requirements
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none"
                  placeholder="Tell us about your childs learning goals, any challenges, or questions you have..."
                ></textarea>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-200"
                />
                <label htmlFor="terms" className="text-sm text-slate-600">
                  I agree to receive communications from IgniteMind Academy regarding my booking and tutoring
                  services. *
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:from-orange-600 hover:to-red-600 hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span> Submitting...
                  </>
                ) : (
                  <>
                    <span>📅</span> Book Now
                  </>
                )}
              </button>

              {/* Success/Error Messages */}
              {message && (
                <div className={`text-center p-4 rounded-lg border ${message.type === "success" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}>
                  {message.type === "success" ? "✅ " : "❌ "}
                  {message.text}
                </div>
              )}
            </form>

            <p className="mt-4 text-center text-xs text-slate-500">
              We will confirm your booking within 24 hours via email.
            </p>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
