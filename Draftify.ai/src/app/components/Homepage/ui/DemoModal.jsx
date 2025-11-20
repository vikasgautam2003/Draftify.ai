"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DemoModel({ open, setOpen }) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Draftify Understands Your Prompts",
      desc: "Tell Draftify what you want to build. The system instantly interprets your idea.",
    },
    {
      title: "AI Generates Production-Grade Code",
      desc: "High-quality, scalable React, Tailwind, and Next.js code — generated in seconds.",
    },
    {
      title: "Built-In Editor for Instant Changes",
      desc: "Modify the generated code directly inside Draftify's powerful editor.",
    },
    {
      title: "Live Preview of Your UI",
      desc: "See the component or full UI come alive instantly without running anything locally.",
    },
  ];

  useEffect(() => {
    if (!open) return;
    setStep(0);

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 12000);

    return () => clearInterval(interval);
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-[92vw] h-[88vh] rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden flex items-center justify-center"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700"
          >
            <X size={18} />
          </button>

          <div className="w-full h-full flex items-center justify-center bg-black">
            <video
              src="/ai1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="absolute bottom-14 left-1/2 -translate-x-1/2 w-full max-w-xl text-center px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-3xl font-semibold text-white mb-3">
                {steps[step].title}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {steps[step].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full transition-all ${
                  step === i ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
