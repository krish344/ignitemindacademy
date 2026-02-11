"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

function getWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${site.phoneE164}?text=${encodedMessage}`;
}

export function ContactCTASection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-semibold mb-6">
            📱 Have Questions?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Chat with us on WhatsApp
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Get instant answers about NAPLAN tutoring, pricing, and more. 
            Our team is ready to help you!
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          {/* Primary CTA - Quick Chat */}
          <motion.a
            href={getWhatsAppUrl("Hi! I have a question about NAPLAN tutoring.")}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 px-6 py-4 bg-white text-emerald-700 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl group-hover:scale-110 transition-transform">
              💬
            </span>
            <div className="text-left">
              <div className="text-sm font-medium text-emerald-600">Quick Chat</div>
              <div className="text-emerald-800">on WhatsApp</div>
            </div>
            <svg
              className="w-5 h-5 ml-2 text-emerald-600 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.a>

          {/* Secondary CTA - Book a Call */}
          <motion.a
            href={getWhatsAppUrl("Hi! I'd like to schedule a call to discuss tutoring options.")}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 px-6 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-2xl shadow-xl hover:bg-white/30 transition-all duration-300 w-full sm:w-auto border border-white/30"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl group-hover:scale-110 transition-transform">
              📞
            </span>
            <div className="text-left">
              <div className="text-sm font-medium text-white/80">Book a Call</div>
              <div className="text-white">via WhatsApp</div>
            </div>
            <svg
              className="w-5 h-5 ml-2 text-white group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.a>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Quick responses
          </span>
          <span className="hidden sm:block">•</span>
          <span className="flex items-center gap-2">
            <span>📱</span>
            {site.phoneDisplay}
          </span>
          <span className="hidden sm:block">•</span>
          <span className="flex items-center gap-2">
            <span>✨</span>
            Free consultation
          </span>
        </motion.div>
      </div>
    </section>
  );
}
