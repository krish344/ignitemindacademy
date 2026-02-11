"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";

type WhatsAppAction = {
  label: string;
  icon: string;
  message: string;
};

const actions: WhatsAppAction[] = [
  {
    label: "Book Free Diagnostic",
    icon: "📞",
    message: "Hi! I'd like to book a free diagnostic test for my child.",
  },
  {
    label: "Ask a Question",
    icon: "💬",
    message: "Hi! I have a question about NAPLAN tutoring.",
  },
  {
    label: "Schedule Call",
    icon: "📅",
    message: "Hi! I'd like to schedule a call to discuss tutoring options.",
  },
  {
    label: "Hello",
    icon: "👋",
    message: "Hi! I'm interested in IgniteMind Academy's NAPLAN tutoring.",
  },
];

function getWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${site.phoneE164}?text=${encodedMessage}`;
}

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#20BE5A] text-white shadow-2xl hover:shadow-[0_8px_30px_rgb(37,211,102,0.4)] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 md:bottom-8 md:right-8"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp menu"
      >
        {/* Pulse Animation */}
        <motion.span
          className="absolute inset-0 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* WhatsApp Icon */}
        <svg
          className="relative z-10 h-8 w-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.button>

      {/* Actions Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-40 flex flex-col-reverse gap-3 md:bottom-28 md:right-8"
          >
            {/* Action Buttons */}
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center gap-3"
              >
                {/* Tooltip */}
                <div className="hidden sm:block">
                  <div className="relative">
                    <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 whitespace-nowrap rounded-lg bg-slate-900/90 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
                      {action.label}
                      {/* Arrow */}
                      <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-slate-900/90" />
                    </div>
                  </div>
                </div>

                {/* Button */}
                <motion.a
                  href={getWhatsAppUrl(action.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-12 items-center gap-2 rounded-full bg-white px-4 pr-5 shadow-lg ring-1 ring-slate-200 hover:shadow-xl"
                  aria-label={action.label}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-lg">
                    {action.icon}
                  </span>
                  <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
                    {action.label}
                  </span>
                </motion.a>
              </motion.div>
            ))}

            {/* Mobile: Direct Chat Option */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 sm:hidden"
            >
              <motion.a
                href={getWhatsAppUrl("Hi! I have a question about NAPLAN tutoring.")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-12 items-center gap-2 rounded-full bg-white px-4 shadow-lg ring-1 ring-slate-200"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                  💬
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  Quick Chat
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-transparent sm:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
