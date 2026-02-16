"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { site } from "@/lib/site";
import Image from "next/image";

// Components
import Hero from "@/components/home/Hero";
import YearCards from "@/components/home/YearCards";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import { ContactCTASection } from "@/components/ui/ContactCTASection";

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "IgniteMind Academy",
  "description": "Premier NAPLAN tutoring for Years 3, 5, 7 & 9 in Melbourne. Expert tutors, personalized learning, 95% improvement rate.",
  "url": "https://ignitemindacademy.com",
  "logo": "https://ignitemindacademy.com/logo.png",
  "image": "https://ignitemindacademy.com/hero-image.jpg",
  "telephone": site.phoneE164,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Melbourne",
    "addressCountry": "AU",
    "addressRegion": "Victoria"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Melbourne, Victoria, Australia"
  },
  "sameAs": [
    site.socials.instagram,
    site.socials.whatsapp
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": site.phoneE164,
    "contactType": "customer service",
    "availableLanguage": "English",
    "areaServed": "Melbourne"
  },
  "offers": {
    "@type": "Offer",
    "name": "Free NAPLAN Diagnostic Assessment",
    "description": "Comprehensive diagnostic to identify strengths and areas for improvement",
    "price": "0",
    "priceCurrency": "AUD"
  }
};

// Stats Component
function StatsBar() {
  const stats = [
    { value: 500, suffix: "+", label: "Students Enrolled", duration: 2000 },
    { value: 4.9, suffix: "★", label: "Average Rating", duration: 1500 },
    { value: 95, suffix: "%", label: "Improvement Rate", duration: 2000 },
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-orange-600 to-red-600">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <AnimatedCounter key={stat.label} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({
  value,
  suffix,
  label,
  duration,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  duration: number;
  index: number;
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  useTransform(scrollYProgress, (progress) => {
    if (progress > 0.5 && !hasAnimated) {
      setHasAnimated(true);
    }
    return progress;
  });

  const displayValue = hasAnimated ? value : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {typeof value === "number" && !Number.isInteger(value)
          ? displayValue.toFixed(1)
          : Math.floor(displayValue)}
        {suffix}
      </div>
      <div className="text-white/80">{label}</div>
    </motion.div>
  );
}

// How It Works Component
function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Diagnostic Assessment",
      description: "Take our comprehensive diagnostic test to identify strengths and areas for improvement.",
      icon: "📊",
    },
    {
      step: "02",
      title: "Personalized Learning Plan",
      description: "Receive a customized study plan tailored to your specific needs and NAPLAN goals.",
      icon: "📋",
    },
    {
      step: "03",
      title: "Excel in NAPLAN",
      description: "Master every concept with targeted practice and achieve your best possible results.",
      icon: "🏆",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It <span className="text-orange-500">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our proven three-step process guarantees NAPLAN success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-1 bg-gradient-to-r from-orange-300 via-orange-500 to-red-500" />

          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative text-center"
            >
              {/* Step Circle */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-xl relative z-10 cursor-pointer"
              >
                <span className="text-4xl">{item.icon}</span>
              </motion.div>

              {/* Step Number */}
              <div className="text-6xl font-bold text-orange-100 -mt-16 mb-4 relative z-0">
                {item.step}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 px-4">{item.description}</p>

              {/* Arrow (except on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-12 -right-4 z-10">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg"
                  >
                    →
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Component
function FAQSection() {
  const faqs = [
    {
      question: "What is NAPLAN and why is it important?",
      answer: "NAPLAN (National Assessment Program - Literacy and Numeracy) is an annual assessment for Australian students in Years 3, 5, 7, and 9. It measures fundamental skills in reading, writing, language conventions, and numeracy. NAPLAN results help identify students' strengths and areas for improvement, and are used by schools and education systems to support teaching and learning."
    },
    {
      question: "How can IgniteMind Academy help improve NAPLAN scores?",
      answer: "IgniteMind Academy provides personalized tutoring tailored to each student's needs. Our expert tutors identify knowledge gaps, teach effective strategies, and provide extensive practice with NAPLAN-style questions. With our structured approach and regular progress tracking, students typically see significant improvement in their scores within 2-3 months."
    },
    {
      question: "What age groups do you tutor for NAPLAN?",
      answer: "We tutor students for all NAPLAN year levels: Year 3, Year 5, Year 7, and Year 9. Each age group has specialized curriculum and teaching methods designed to be age-appropriate and engaging."
    },
    {
      question: "How long are the tutoring sessions?",
      answer: "Our standard sessions are 60 minutes, which we find is the optimal length for maintaining focus while covering substantial material. We also offer intensive preparation programs and flexible scheduling to accommodate your family's needs."
    },
    {
      question: "Do you offer online or in-person tutoring?",
      answer: "We offer both online and in-person tutoring options. Our online sessions are conducted via interactive video platforms with shared whiteboards and real-time feedback. In-person sessions are available at our Melbourne center. Many students also opt for a mix of both for maximum flexibility."
    },
    {
      question: "How do you track my child's progress?",
      answer: "We provide a comprehensive dashboard where parents and students can track progress in real-time. You'll see quiz scores, topic mastery levels, time spent learning, and detailed performance reports after each assessment. Regular parent-tutor conferences ensure everyone stays aligned on goals."
    },
    {
      question: "What makes IgniteMind Academy different from other tutoring centers?",
      answer: "What sets us apart is our personalized approach—we don't use a one-size-fits-all method. Each student receives a customized learning plan based on their diagnostic results. Our tutors are NAPLAN specialists with proven track records, and our platform includes gamification elements that make learning engaging for students."
    },
    {
      question: "How do I book a free diagnostic assessment?",
      answer: "Booking a free diagnostic is easy! Click the 'Book a Free Diagnostic' button on any page, or contact us directly via WhatsApp, email, or phone. The diagnostic takes about 45 minutes and helps us understand your child's current level and identify areas for improvement."
    },
    {
      question: "What is your refund or cancellation policy?",
      answer: "We offer a satisfaction guarantee—if you're not happy after the first session, we'll provide a full refund. For ongoing bookings, we require 24 hours notice for cancellations to reschedule at no extra cost. We want to ensure our tutoring is a positive experience for every family."
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our NAPLAN tutoring services
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  className="text-orange-500 text-2xl flex-shrink-0"
                >
                  ↓
                </motion.span>
              </button>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Contact Us →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function trackEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;
  (window as any).gtag('event', name, params);
}

// CTA Section Component with Email Form
function CTASection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [yearLevel, setYearLevel] = useState("Year 5");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/send-kit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, yearLevel }),
      });

      if (response.ok) {
        trackEvent('kit_request_submit', {
          year_level: yearLevel,
        });
        setDownloadUrl(`/api/download-kit?level=${encodeURIComponent(yearLevel)}`);
        setIsSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="py-20 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur rounded-3xl p-8 md:p-12"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">✅</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Check Your Email!
            </h2>
            <p className="text-white/90 text-lg mb-6">
              We've sent your <strong>NAPLAN Preparation Kit</strong> to{" "}
              <span className="font-semibold text-yellow-300">{email}</span>
            </p>
            <div className="bg-white/10 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-white mb-3">📦 What's Inside:</h3>
              <div className="grid grid-cols-2 gap-2 text-left text-white/80 text-sm">
                <div>✅ 50+ Practice Questions PDF</div>
                <div>✅ Answer Key Included</div>
                <div>✅ Study Tips</div>
                <div>✅ Exam Strategies</div>
              </div>
            </div>
            
            {/* Direct Download Button */}
            <a
              href={downloadUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-100 transition-colors mb-4"
            >
              📥 Download PDF Now
            </a>
            
            <p className="text-white/70 text-sm">
              Email not arrived? Download directly above.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-4 block">
            Free Resources
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Your Free NAPLAN Prep Kit
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Download our comprehensive kit with practice questions, study tips, and
            exam strategies!
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            {/* Logo */}
            <div className="relative h-12 w-auto mx-auto mb-6">
              <Image
                src="/logo.png"
                alt={site.name}
                fill
                className="object-contain"
              />
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <select
                  value={yearLevel}
                  onChange={(e) => setYearLevel(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                >
                  <option value="Year 3">Year 3</option>
                  <option value="Year 5">Year 5</option>
                  <option value="Year 7">Year 7</option>
                  <option value="Year 9">Year 9</option>
                </select>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "📧 Send Me the Kit + PDF"
                )}
              </motion.button>
            </div>
          </form>

          <p className="text-white/70 text-sm mt-6">
            Join 2,000+ parents who've received the kit!
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold mb-4 block">
              IgniteMind<span className="text-orange-500"> Academy</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Empowering students to excel in NAPLAN through innovative,
              personalized learning experiences.
            </p>
            <div className="flex gap-4">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-1.791-2.209 4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={site.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-gray-400 hover:text-white transition-colors">
                  Practice Quizzes
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Year Levels */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Year Levels</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/naplan?year=Year 3" className="text-gray-400 hover:text-white transition-colors">
                  Year 3 NAPLAN
                </Link>
              </li>
              <li>
                <Link href="/naplan?year=Year 5" className="text-gray-400 hover:text-white transition-colors">
                  Year 5 NAPLAN
                </Link>
              </li>
              <li>
                <Link href="/naplan?year=Year 7" className="text-gray-400 hover:text-white transition-colors">
                  Year 7 NAPLAN
                </Link>
              </li>
              <li>
                <Link href="/naplan?year=Year 9" className="text-gray-400 hover:text-white transition-colors">
                  Year 9 NAPLAN
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <a href={`tel:${site.phoneE164}`} className="hover:text-white transition-colors">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>{site.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 IgniteMind Academy. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Stats Bar */}
      <StatsBar />

      {/* Year Level Cards */}
      <YearCards />

      {/* How It Works */}
      <HowItWorks />

      {/* FAQ Section */}
      <FAQSection />

      {/* Features Grid */}
      <Features />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <CTASection />

      {/* WhatsApp Contact CTA Section */}
      <ContactCTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
