"use client";
import { Sparkles } from "lucide-react";

export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
      <Sparkles className="w-3 h-3 mr-1" />
      {children}
    </span>
  );
}
