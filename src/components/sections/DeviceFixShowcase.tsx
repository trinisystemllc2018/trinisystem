"use client";

/* ════════════════════════════════════════════════════════════════
   DEVICE FIX SHOWCASE — scroll-pinned typewriter + photo sequence
   As the section scrolls through the viewport, a typewriter line
   cycles through real search phrases, and a matching photo/copy
   card crossfades in sync. Section is pinned (sticky) for the
   scroll duration, then releases to the next section normally.

   IMAGES: paths below point to /public/images/fixes/*.jpg — add
   your own licensed photography or product shots there (own photos,
   or properly licensed stock — do not hot-link images from search
   results into production). 1200x900 or similar landscape crops
   work best.
═══════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";

const FIXES = [
  {
    phrase: "How to update Garmin GPS maps",
    title: "GPS map & firmware updates",
    body: "Garmin and TomTom map data and firmware updated live over the call — no dealer visit, no lost route.",
    tag: "Garmin · TomTom",
    image: "/images/fixes/gps-update.jpg",
    alt: "Garmin GPS device being updated",
    accent: "#0d9488",
  },
  {
    phrase: "How to fix HP printer offline errors",
    title: "Printer offline & jam fixes",
    body: "Clears queue jams, driver conflicts and 'offline' errors on HP, Canon, Epson and Brother printers.",
    tag: "HP · Canon · Epson · Brother",
    image: "/images/fixes/printer-repair.jpg",
    alt: "Technician repairing a printer",
    accent: "#2563eb",
  },
  {
    phrase: "How to fix Canon printer error codes",
    title: "Printer error code diagnosis",
    body: "Canon B200, paper-sensor faults and cartridge errors diagnosed and resolved remotely, step by step.",
    tag: "Canon · Error codes",
    image: "/images/fixes/canon-diagnostics.jpg",
    alt: "Canon printer diagnostics on screen",
    accent: "#dc2626",
  },
  {
    phrase: "How to speed up a slow Dell laptop",
    title: "Laptop speed & tune-up",
    body: "Startup bloat, malware scans and disk cleanup on Dell, Lenovo and HP laptops — while you watch.",
    tag: "Dell · Lenovo · HP",
    image: "/images/fixes/laptop-tuneup.jpg",
    alt: "Dell laptop being tuned up",
    accent: "#7c3aed",
  },
];

function useTypewriter(text: string) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    setDisplay("");
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, 32);
    return () => clearInterval(iv);
  }, [text]);
  return display;
}

export function DeviceFixShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(FIXES.length - 1, Math.floor(v * FIXES.length));
    setIndex((prev) => (prev === i ? prev : i));
  });

  const typed = useTypewriter(FIXES[index].phrase);
  const current = FIXES[index];

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${FIXES.length * 100}vh` }}
      aria-label="What we fix"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4"
        style={{ background: "#050008" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(249,115,22,0.10), transparent 55%), radial-gradient(circle at 75% 80%, rgba(139,92,246,0.08), transparent 55%)",
          }}
          aria-hidden="true"
        />

        <p className="relative text-xs font-mono tracking-[0.25em] uppercase text-white/35 mb-6">
          Every fix, one search away
        </p>

        <div className="relative h-14 md:h-16 flex items-center justify-center mb-10 px-4 text-center">
          <h2 className="font-black text-white leading-none" style={{ fontSize: "clamp(1.4rem, 4vw, 2.6rem)" }}>
            {typed}
            <span className="inline-block w-[3px] h-[0.9em] bg-orange-500 ml-1 align-[-0.1em] animate-pulse" />
          </h2>
        </div>

        <div className="relative w-full max-w-4xl h-[260px] md:h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col md:flex-row items-center gap-6 md:gap-10 justify-center"
            >
              <div
                className="w-full md:w-[320px] h-[180px] md:h-[240px] rounded-2xl overflow-hidden shrink-0 relative"
                style={{ boxShadow: `0 20px 50px ${current.accent}33` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.image}
                  alt={current.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    // Graceful fallback while real photography isn't uploaded yet
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div
                  className="absolute inset-0 -z-10"
                  style={{ background: `linear-gradient(135deg, ${current.accent}55, ${current.accent}11)` }}
                />
              </div>

              <div className="text-center md:text-left max-w-md">
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">{current.title}</h3>
                <p className="text-white/55 text-sm md:text-base leading-relaxed">{current.body}</p>
                <span
                  className="inline-block mt-4 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: `${current.accent}22`, color: current.accent }}
                >
                  {current.tag}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative flex gap-2 mt-10">
          {FIXES.map((f, i) => (
            <span
              key={f.title}
              className="h-[6px] rounded-full transition-all duration-300"
              style={{
                width: i === index ? 22 : 6,
                background: i === index ? "#f97316" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
