"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimerProps {
  duration: number; // in minutes
  onTimeUp: () => void;
  isActive: boolean;
}

export default function Timer({ duration, onTimeUp, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  useEffect(() => {
    setIsWarning(timeLeft < 60); // Warning when less than 1 minute
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = (timeLeft / (duration * 60)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-20 right-4 z-50 rounded-2xl p-4 shadow-lg ${
        isWarning ? "bg-red-500 animate-pulse" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`text-2xl font-bold ${isWarning ? "text-white" : "text-gray-900"}`}>
          {formatTime(minutes, seconds)}
        </div>
        
        {/* Progress Bar */}
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            className={`h-full ${isWarning ? "bg-white" : "bg-orange-500"}`}
          />
        </div>

        {/* Warning Icon */}
        {isWarning && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-white text-xl"
          >
            ⏰
          </motion.div>
        )}
      </div>

      {/* Time indicator */}
      <AnimatePresence>
        {isWarning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-white text-xs mt-2 text-center"
          >
            Time's almost up!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
