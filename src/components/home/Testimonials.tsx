"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Parent of Year 7 Student",
    rating: 5,
    text: "The diagnostic was eye-opening! We finally understood exactly where my daughter needed help. Her NAPLAN result improved to strong Band level within just 2 months of consistent practice.",
    year: "Year 7",
  },
  {
    name: "James Thompson",
    role: "Parent of Year 5 Student",
    rating: 5,
    text: "The gamified approach kept my son engaged for hours. He actually enjoys practicing for NAPLAN now! The progress tracking feature helps me see exactly where he needs support.",
    year: "Year 5",
  },
  {
    name: "Emily Chen",
    role: "Parent of Year 9 Student",
    rating: 5,
    text: "Outstanding results! My daughter's NAPLAN scores improved dramatically in just one term. The instant feedback system helped her identify and fix her weak spots quickly.",
    year: "Year 9",
  },
  {
    name: "Michael Roberts",
    role: "Parent of Year 3 Student",
    rating: 5,
    text: "Starting early was the best decision. IgniteMind makes learning fun for young kids. My son loves the interactive exercises and always asks to practice more.",
    year: "Year 3",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Parents <span className="text-orange-500">Say About Us</span>
          </h2>
          <p className="text-xl text-gray-600">
            Join hundreds of satisfied families who trust IgniteMind
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
              >
                {/* Quote Icon */}
                <div className="text-6xl text-orange-200 mb-4">"</div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-2xl text-yellow-400"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                {/* Text */}
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                  {testimonials[currentIndex].text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                      {testimonials[currentIndex].year}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-orange-500 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
