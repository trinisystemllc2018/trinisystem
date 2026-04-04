"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PHONE, PHONE_HREF } from "@/lib/utils";

// ── Base Button ───────────────────────────────────────────────
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:   "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-brand hover:from-blue-700 hover:to-blue-800",
    secondary: "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600",
    ghost:     "text-blue-600 hover:bg-blue-50",
    danger:    "bg-red-600 text-white hover:bg-red-700",
  };
  const sizes = {
    sm:  "text-sm px-4 py-2",
    md:  "text-base px-6 py-3",
    lg:  "text-lg px-8 py-4",
  };
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

// ── Sticky CTA bar (bottom of pages) ─────────────────────────
export function StickyCTA() {
  return (
    <div className="py-16 md:py-20 bg-gradient-to-r from-blue-700 to-blue-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Still Need Help? We&apos;re One Call Away.
        </h2>
        <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
          Our remote technicians fix printer, PC, and GPS problems across all 50 states — fast, affordable, and no fix = no fee.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-black text-xl px-10 py-5 rounded-2xl hover:bg-blue-50 transition-colors shadow-xl"
          >
            📞 {PHONE}
          </a>
          <Link
            href="/fix"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 border-2 border-blue-400 text-white font-bold text-lg px-8 py-5 rounded-2xl hover:bg-blue-500 transition-colors"
          >
            🔧 Try Free Tool First →
          </Link>
        </div>
        <p className="text-blue-300 text-sm mt-6">
          No fix = no fee · Remote service · All 50 states · Est. 2016
        </p>
      </div>
    </div>
  );
}
