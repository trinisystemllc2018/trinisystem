"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { PHONE, PHONE_HREF } from "@/lib/utils";

export function FloatingSupport() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Show after scrolling 400px
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2 no-print">
      {/* Expanded menu */}
      {expanded && (
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 w-72 mb-1 animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between mb-4">
            <p className="font-black text-gray-900">How can we help?</p>
            <button
              onClick={() => setExpanded(false)}
              className="text-gray-400 hover:text-gray-700 p-1"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-2">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3.5 rounded-2xl transition-colors"
            >
              <span className="text-xl">📞</span>
              <div className="text-left">
                <p className="text-sm font-black leading-tight">Call Now — Free Help</p>
                <p className="text-xs text-blue-200">{PHONE}</p>
              </div>
            </a>

            <Link
              href="/fix"
              onClick={() => setExpanded(false)}
              className="flex items-center gap-3 w-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold px-4 py-3.5 rounded-2xl transition-colors"
            >
              <span className="text-xl">🔧</span>
              <div className="text-left">
                <p className="text-sm font-black leading-tight">Use Free Diagnostic Tool</p>
                <p className="text-xs text-emerald-600">Find your fix instantly</p>
              </div>
            </Link>

            <Link
              href="/hp-printer-repair"
              onClick={() => setExpanded(false)}
              className="flex items-center gap-3 w-full bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-700 font-semibold px-4 py-3 rounded-2xl transition-colors"
            >
              <span className="text-lg">🖨️</span>
              <p className="text-sm">HP Printer Help</p>
            </Link>

            <Link
              href="/epson-printer-repair"
              onClick={() => setExpanded(false)}
              className="flex items-center gap-3 w-full bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-700 font-semibold px-4 py-3 rounded-2xl transition-colors"
            >
              <span className="text-lg">🖨️</span>
              <p className="text-sm">Epson Printer Help</p>
            </Link>

            <Link
              href="/canon-printer-repair"
              onClick={() => setExpanded(false)}
              className="flex items-center gap-3 w-full bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-700 font-semibold px-4 py-3 rounded-2xl transition-colors"
            >
              <span className="text-lg">🖨️</span>
              <p className="text-sm">Canon Printer Help</p>
            </Link>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            No fix = no fee · Remote · All 50 states
          </p>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-label={expanded ? "Close support menu" : "Open support menu"}
        className={`relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white text-2xl transition-all hover:scale-110 active:scale-95 ${
          expanded
            ? "bg-gray-700 hover:bg-gray-800"
            : "bg-blue-600 hover:bg-blue-700 animate-glow-pulse"
        }`}
      >
        {expanded ? "×" : "💬"}

        {/* Pulse ring when collapsed */}
        {!expanded && (
          <span className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-60" />
        )}
      </button>
    </div>
  );
}
