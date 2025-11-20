"use client";

import { motion } from "framer-motion";

export default function LogoTicker() {
  const logos = [
    "Hostel Committee",
    "Sentinel.ai",
    "Query.ai",
    "Minerva.ai",
    "Cognicare.ai",
    "Neurapost.ai",
    "OnePngAi",
    "Syntaxly.ai",
    "VidQuery.ai"
  ];

  const loop = [...logos, ...logos, ...logos];

  return (
    <section className="border-y border-white/5 py-16 bg-black overflow-hidden">
      <p className="text-center text-sm text-gray-500 mb-10 tracking-wide">
        POWERING THE NEXT GENERATION OF AI SYSTEMS
      </p>

      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-20 whitespace-nowrap"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear"
          }}
        >
          {loop.map((name, i) => (
            <div
              key={i}
              className="text-2xl font-semibold text-white/80 tracking-wide hover:text-white transition-colors select-none"
            >
              {name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
