"use client";
import { useState } from "react";
import Link from "next/link";
import { PHONE_HREF, PHONE, DOWNLOAD_URL } from "@/lib/utils";
import { CallbackButton } from "@/components/ui/CallbackModal";

/* Pure CSS transitions — no framer-motion = faster load */
export function FloatingSupport() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Panel */}
      <div
        className="w-72 rounded-3xl overflow-hidden"
        style={{
          background: "#0f172a",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          opacity: open ? 1 : 0,
          transform: open ? "scale(1) translateY(0)" : "scale(0.9) translateY(16px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          transformOrigin: "bottom right",
        }}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center gap-3"
          style={{ background: "linear-gradient(135deg, #1e3a8a, #1d4ed8)" }}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-sm">TS</div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-blue-900" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">Trini System Support</p>
            <p className="text-blue-200 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Online · Responding fast
            </p>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <p className="text-white/60 text-sm px-1 pb-2">👋 Need help with your printer, PC, or GPS?</p>

          <a href={PHONE_HREF}
            className="flex items-center gap-3 p-3 rounded-2xl group transition-colors"
            style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)" }}>
            <span className="text-2xl">📞</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-blue-300">Call Now — Free</p>
              <p className="text-xs text-blue-400/70">{PHONE} · 24/7</p>
            </div>
            <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
          </a>

          <CallbackButton className="flex items-center gap-3 p-3 rounded-2xl w-full text-left group transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" } as any}>
            <span className="text-2xl">📅</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Request Callback</p>
              <p className="text-xs text-white/40">We call you in under 5 min</p>
            </div>
            <span className="text-white/40 group-hover:translate-x-1 transition-transform">→</span>
          </CallbackButton>

          <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl group transition-colors"
            style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
            <span className="text-2xl">⚡</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-emerald-300">Free PC Cleaner</p>
              <p className="text-xs text-emerald-400/70">TriniCleaner · Windows</p>
            </div>
            <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
          </a>

          <Link href="/how-to"
            className="flex items-center gap-3 p-3 rounded-2xl group transition-colors"
            style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)" }}>
            <span className="text-2xl">📖</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-amber-300">Free Guides</p>
              <p className="text-xs text-amber-400/70">Gmail · Facebook · Garmin</p>
            </div>
            <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="relative w-16 h-16 rounded-full text-white flex items-center justify-center border-4 border-white/10 transition-all hover:scale-110 active:scale-95 focus:outline-none"
        style={{
          background: open
            ? "linear-gradient(135deg, #dc2626, #b91c1c)"
            : "linear-gradient(135deg, #2563eb, #1d4ed8)",
          boxShadow: open
            ? "0 0 0 0 transparent"
            : "0 0 40px rgba(37,99,235,0.5), 0 8px 32px rgba(0,0,0,0.4)",
        }}
        aria-label={open ? "Close support menu" : "Open support menu"}
      >
        {/* Pulse ring when closed */}
        {!open && <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />}
        <span className="text-2xl transition-transform duration-200" style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}>
          {open ? "✕" : "💬"}
        </span>
      </button>
    </div>
  );
}
