"use client";
import React from "react";

export default function Button({ children, variant = "primary", className, ...props }) {
  const baseStyle =
    "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 rounded-full";

  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 shadow-xl",
    secondary: "bg-white/10 text-white border border-white/10 hover:bg-white/20",
    outline: "border border-gray-600 text-gray-300 hover:border-white hover:text-white",
    glow: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-105"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
