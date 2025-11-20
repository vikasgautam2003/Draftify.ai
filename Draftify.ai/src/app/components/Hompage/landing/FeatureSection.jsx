"use client";

import Card from "../ui/Card";
import { Zap, Code2, Eye, Edit3, Server } from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      title: "AI-Powered Component Generation",
      desc: "Generate clean, production-ready React and Next.js components instantly. Draftify transforms your ideas into polished UI code that's easy to read, extend, and integrate.",
      icon: <Zap className="text-yellow-400" />,
    },
    {
      title: "Chat-Based Clarification & Iteration",
      desc: "Ask questions, refine features, and request improvements directly through Draftify’s conversational engine. Collaborate with an AI that understands intent and context.",
      icon: <Code2 className="text-indigo-400" />,
    },
    {
      title: "Live Preview for Every Component",
      desc: "Render your generated components instantly in a live preview environment. Validate layouts, animations, interactions, and states before exporting.",
      icon: <Eye className="text-blue-400" />,
    },
    {
      title: "Editable In-Browser Code Editor",
      desc: "Modify generated components directly within Draftify’s integrated editor. Make quick changes, extend functionality, and maintain full control of your code.",
      icon: <Edit3 className="text-purple-400" />,
    },
    {
      title: "Mock Backend & API Simulation",
      desc: "Generate mock APIs, data structures, and backend simulations to test components with real data flow—perfect for rapid prototyping and UX validation.",
      icon: <Server className="text-green-400" />,
    },
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Everything You Need To Build  
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Stunning Interfaces Faster
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            Draftify gives developers a focused, AI-powered workspace to generate reliable React components, preview UI instantly, refine logic through chat, and simulate backend interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <Card
              key={i}
              className="p-8 hover:bg-white/5 transition-all duration-300 cursor-pointer border border-white/10 rounded-2xl"
            >
              <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {f.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
