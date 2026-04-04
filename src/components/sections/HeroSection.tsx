"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { DOWNLOAD_URL, PHONE_HREF, PHONE } from "@/lib/utils";
import { useTyping } from "@/hooks/useAnimations";

const TYPING_WORDS = [
  "HP DeskJet 4155e offline?",
  "Canon PIXMA not printing?",
  "Epson EcoTank ink error?",
  "Brother WiFi not connecting?",
  "PC running slow?",
  "Virus on your computer?",
];

function ScannerMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glow */}
      <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-75 translate-y-8" />

      {/* Window frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.16,1,0.3,1] }}
        className="relative bg-white rounded-3xl shadow-soft-xl border border-gray-100 overflow-hidden"
      >
        {/* Title bar */}
        <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-gray-500 font-medium mx-auto">TriniCleaner Pro — System Scan</span>
        </div>

        {/* Scan body */}
        <div className="p-5 relative overflow-hidden">
          {/* Scan line */}
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan opacity-60 z-10" style={{ top: 0 }} />

          {/* Status */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Scanning System…</span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>

          {/* Metrics */}
          {[
            { label: "Junk Files", value: "2.4 GB", pct: 78, color: "bg-blue-500" },
            { label: "Registry Errors", value: "147", pct: 61, color: "bg-orange-400" },
            { label: "Startup Items", value: "23", pct: 44, color: "bg-purple-500" },
            { label: "Browser Cache", value: "3.1 GB", pct: 89, color: "bg-blue-400" },
            { label: "Temp Files", value: "890 MB", pct: 55, color: "bg-teal-500" },
          ].map((m, i) => (
            <div key={m.label} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600 font-medium">{m.label}</span>
                <span className="text-gray-800 font-bold">{m.value}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${m.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${m.pct}%` }}
                  transition={{ delay: 0.8 + i * 0.15, duration: 1.2, ease: [0.16,1,0.3,1] }}
                />
              </div>
            </div>
          ))}

          {/* Alert */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-2"
          >
            <span className="text-lg">⚠️</span>
            <div>
              <p className="text-xs font-bold text-amber-800">6.4 GB of clutter found</p>
              <p className="text-xs text-amber-600">Click Clean Now to free up space</p>
            </div>
            <button className="ml-auto text-xs bg-amber-500 text-white px-3 py-1.5 rounded-xl font-semibold hover:bg-amber-600 transition-colors">
              Clean
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-2xl shadow-lg"
      >
        ✓ 100% Free
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-3 -left-4 bg-white border border-gray-100 text-xs font-semibold px-3 py-2 rounded-2xl shadow-lg text-gray-700"
      >
        🇺🇸 All 50 States
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const typedText = useTyping(TYPING_WORDS, 70, 2200);

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white pt-8 pb-20 md:pt-12 md:pb-28">
      {/* Background decorations */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute top-32 right-1/4 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/2 w-[600px] h-60 bg-blue-100/40 rounded-full blur-3xl -translate-x-1/2" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }} />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Copy */}
          <motion.div style={{ opacity }}>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-blue-200"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Trusted by 5,000+ users across USA & Canada
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16,1,0.3,1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-gray-900 mb-4"
            >
              Tech Help That
              <span className="block text-gradient mt-1">
                Actually Works.
              </span>
            </motion.h1>

            {/* Typing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-soft border border-gray-100 mb-6 min-h-[52px]"
            >
              <span className="text-lg">🔍</span>
              <span className="text-gray-600 text-base md:text-lg font-medium min-h-[1.5em]">
                {typedText}
                <span className="inline-block w-0.5 h-5 bg-blue-500 ml-0.5 animate-pulse align-middle" />
              </span>
            </motion.div>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg"
            >
              Printer repair, free PC optimizer, GPS updates and more — remote sessions start in under 15 minutes.
              <span className="font-semibold text-gray-800"> No tech knowledge required.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <a
                href={DOWNLOAD_URL}
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-lg px-7 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <span className="text-xl">⬇</span>
                Free PC Cleaner Download
              </a>
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2.5 bg-white hover:bg-blue-50 text-blue-700 font-bold text-lg px-7 py-4 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all active:scale-95"
              >
                <span className="text-xl">📞</span>
                {PHONE}
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 items-center"
            >
              {[
                { icon: "⚡", text: "< 15 min response" },
                { icon: "🛡️", text: "No fix, no fee" },
                { icon: "🌎", text: "All 50 states" },
                { icon: "⭐", text: "4.9 star rating" },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16,1,0.3,1] }}
          >
            <ScannerMockup />
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "5,000+", label: "Devices Fixed", icon: "🔧" },
            { value: "24/7",   label: "Support Available", icon: "⏰" },
            { value: "< 30m",  label: "Average Fix Time", icon: "⚡" },
            { value: "4.9★",   label: "Customer Rating", icon: "⭐" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.08 }}
              className="bg-white rounded-2xl p-5 shadow-soft border border-gray-100 text-center hover:shadow-soft-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-black text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
