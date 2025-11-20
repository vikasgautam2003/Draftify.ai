"use client";
export default function Card({ children, className }) {
  return (
    <div className={`bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-2xl ${className}`}>
      {children}
    </div>
  );
}
