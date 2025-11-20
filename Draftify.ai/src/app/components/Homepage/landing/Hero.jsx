"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { Play } from "lucide-react";
import DemoModal from "../ui/DemoModal";

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative min-h-[calc(100vh-200px)] flex flex-col justify-center items-center text-center pt-24 overflow-hidden">

      <video
        src="/ai.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/20 blur-[120px] opacity-40" />

      <motion.div
        className="absolute inset-0 opacity-20 bg-[url('/noise.svg')]"
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
        className="relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Badge>Draftify 2.0 is live</Badge>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/30 mt-10 leading-[1.15]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          Build Software <br />

          <motion.span
            className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9 }}
          >
            At The Speed of Thought
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-gray-300 text-xl max-w-xl mx-auto mt-8 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9 }}
        >
          The first AI software engineer that builds entire applications.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="glow"
              className="h-14 px-8 text-base"
              onClick={() => (window.location.href = "/gen")}
            >
              Start Building
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="secondary"
              className="h-14 px-8 text-base flex items-center gap-2"
              onClick={() => setOpen(true)}
            >
              <Play size={16} /> Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-16 md:top-24 text-indigo-400/30 text-9xl font-black pointer-events-none select-none z-10"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        ✦
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-16 text-purple-400/20 text-8xl pointer-events-none select-none z-10"
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        ✹
      </motion.div>

      <DemoModal open={open} setOpen={setOpen} />
    </section>
  );
}
