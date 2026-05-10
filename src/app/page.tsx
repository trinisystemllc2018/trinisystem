import { Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PHONE, PHONE_HREF } from "@/lib/utils";
import { HeroSearchIsland } from "@/components/sections/HeroSearchIsland";
import { ScrollRevealClient } from "@/components/sections/ScrollRevealClient";
import { LiveStatusStrip } from "@/components/sections/LiveStatusStrip";
import { SectionSkeleton, GridSkeleton } from "@/components/ui/Skeletons";

/* ════════════════════════════════════════════════════════════════
   TRINI SYSTEM — Optimized Homepage (Server Component)

   Performance strategy:
   1. Hero is fully server-rendered → LCP element (H1) in initial HTML
   2. Only HeroSearchIsland hydrates immediately (tiny client chunk)
   3. ScrollRevealClient runs at idle (doesn't block LCP)
   4. Below-fold sections load via dynamic import (separate JS chunk)
   5. Service cards use CSS-only 3D tilt — no JS handlers
   6. No three.js, no framer-motion, no gsap on this route

   Target: 90+ PageSpeed mobile, LCP < 2.5s
═══════════════════════════════════════════════════════════════════ */

// Below-the-fold sections — separate chunk, keeps initial bundle tiny
const BelowFoldSections = dynamic(
  () => import("@/components/sections/BelowFoldSections"),
  { ssr: true }
);

const SERVICES = [
  { icon: "🖨️", label: "Printer Help",        sub: "HP · Canon · Epson · Brother",   href: "/printer-support",        color: "#3b82f6", glow: "rgba(59,130,246,0.5)"  },
  { icon: "💻", label: "Computer Help",       sub: "Slow PC · Windows errors",        href: "/computer-help",          color: "#8b5cf6", glow: "rgba(139,92,246,0.5)"  },
  { icon: "🛡️", label: "Virus Removal",      sub: "Malware · Pop-ups · Hijacks",     href: "/virus-removal",          color: "#ef4444", glow: "rgba(239,68,68,0.5)"   },
  { icon: "🔌", label: "Printer Offline Fix", sub: "HP offline · Any brand",          href: "/hp-printer-offline",     color: "#06b6d4", glow: "rgba(6,182,212,0.5)"   },
  { icon: "🚫", label: "Printer Won't Print", sub: "Stuck queue · Driver fix",        href: "/printer-wont-print",     color: "#f97316", glow: "rgba(249,115,22,0.5)"  },
  { icon: "🐌", label: "Win 11 Slow Fix",     sub: "Speed up PC · Free tools",        href: "/windows-11-slow-fix",    color: "#10b981", glow: "rgba(16,185,129,0.5)"  },
  { icon: "🔵", label: "Brother Printer",     sub: "MFC · HL · DCP series",           href: "/brother-printer-repair", color: "#004B9C", glow: "rgba(0,75,156,0.5)"    },
  { icon: "🗺️", label: "GPS Help",           sub: "Garmin · Maps · Updates",         href: "/garmin-gps-help",        color: "#0ea5e9", glow: "rgba(14,165,233,0.5)"  },
  { icon: "✉️", label: "Gmail & Email",      sub: "Login · Recovery · Setup",        href: "/how-to/gmail-help",      color: "#fb923c", glow: "rgba(251,146,60,0.5)"  },
  { icon: "⚡", label: "Free PC Cleaner",    sub: "TriniCleaner — download free",     href: "/products",               color: "#f97316", glow: "rgba(249,115,22,0.5)"  },
];

const TRUST_STATS = [
  { val: "4.9★", label: "Google Rating",  color: "#fb923c" },
  { val: "47",   label: "5-Star Reviews", color: "#10b981" },
  { val: "20+",  label: "Years Exp.",     color: "#3b82f6" },
  { val: "50",   label: "US States",      color: "#8b5cf6" },
];

const TICKER_ITEMS = [
  "⭐ 4.9 Google Rating",
  "🛡️ No Fix = No Fee",
  "🌎 All 50 US States",
  "📞 24/7 Live Support",
  "🔒 Never Asks Passwords",
  "⚡ Under 15 Min Response",
  "👴 Senior-Friendly",
  "💰 50% Less Than Geek Squad",
];

export default function Home() {
  return (
    <>
      {/* ══ HERO ════════════════════════════════════════════════════════
         Fully server-rendered. The H1 is the LCP element, ships in HTML. */}
      <section className="relative bg-hero bg-grid overflow-hidden flex flex-col" style={{ minHeight: "100dvh" }} aria-label="Hero">
        {/* Aurora ribbon — animated conic gradient */}
        <div className="aurora" aria-hidden="true" />

        {/* Decorative orbs — pure CSS, animation disabled on mobile via media query */}
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="hero-orb hero-orb-3" aria-hidden="true" />
        <div className="hero-orb hero-orb-4" aria-hidden="true" />

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-4 pt-10 pb-16">

          {/* Live status badge */}
          <div className="animate-fade-up flex justify-center mb-8">
            <div className="glass-card inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-xs font-mono tracking-widest uppercase">
              <span className="pulse-dot" aria-hidden="true" />
              <span className="text-white/80">Technician Available Now · {PHONE}</span>
            </div>
          </div>

          {/* Main headline — LCP element. No animation delay on the critical text. */}
          <div className="text-center mb-6">
            <h1 className="font-black text-white leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.6rem,7vw,5rem)", textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
              Your Tech Problem,
              <span className="block text-gradient-gold-shimmer" style={{ fontSize: "clamp(2.8rem,7.5vw,5.5rem)" }}>
                Fixed Today.
              </span>
            </h1>
            <p className="animate-fade-up delay-200 text-white/65 text-lg md:text-xl mt-5 max-w-2xl mx-auto">
              Real technicians fix printers, slow computers, GPS devices, Gmail, and Facebook — remotely in minutes. Senior-friendly. 24/7.
            </p>
          </div>

          {/* Primary CTAs */}
          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a href={PHONE_HREF}
              className="cta-glow-ring touch-target flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-black transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)", boxShadow: "0 8px 32px rgba(239,68,68,0.5)" }}>
              <span className="relative flex h-3 w-3" aria-hidden="true">
                <span className="hidden md:block animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              📞 {PHONE} — Call Free
            </a>
            <Link href="/how-to"
              className="glass-card touch-target flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-white transition-all hover:scale-105 active:scale-95 hover:bg-white/10">
              📖 Browse Free Guides →
            </Link>
          </div>

          {/* Search box — only client island on initial paint */}
          <div className="animate-fade-up delay-400">
            <HeroSearchIsland />
          </div>

          {/* Trust stats — 3D depth with glass background */}
          <div className="animate-fade-up delay-500 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-10 max-w-3xl mx-auto">
            {TRUST_STATS.map(t => (
              <div key={t.label} className="glass-card text-center rounded-2xl py-4 px-3">
                <div className="stat-3d text-2xl md:text-3xl font-black" style={{ color: t.color }}>{t.val}</div>
                <div className="text-white/45 text-[11px] font-mono tracking-wider mt-1 uppercase">{t.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25 animate-bounce-arrow">
          <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true"><path d="M19 9l-7 7-7-7"/></svg>
        </div>
      </section>

      {/* ══ TRUST TICKER — pure CSS marquee ══════════════════════ */}
      <div className="overflow-hidden py-3 border-y border-white/10" style={{ background: "rgba(249,115,22,0.08)" }}>
        <div className="flex gap-10 whitespace-nowrap animate-marquee">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-orange-300/80 font-mono text-xs tracking-widest uppercase shrink-0">
              {item} <span className="text-orange-400/30 mx-3">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ SERVICES GRID — server-rendered, CSS-only 3D tilt ════ */}
      <section className="bg-section-dark py-20 px-4" aria-label="Services">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6 text-xs font-mono tracking-widest uppercase"
              style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", color: "#fb923c" }}>
              Remote Support · All 50 States
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              What can we fix<br />
              <span className="text-gradient-gold">for you today?</span>
            </h2>
            <p className="text-white/50 mt-4 text-lg max-w-xl mx-auto">
              Hover any card to see details. Click to go straight to the guide or solution.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SERVICES.map((s, idx) => (
              <Link
                key={s.href + s.label}
                href={s.href}
                className="service-card scroll-reveal magnetic click-ripple group relative block rounded-2xl p-5 overflow-hidden"
                style={{
                  animationDelay: `${idx * 0.06}s`,
                  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                  ["--card-color" as any]: s.color,
                  ["--card-glow" as any]: s.glow,
                }}
              >
                <div className="service-card-glow" aria-hidden="true" />
                <div className="service-card-accent" aria-hidden="true" />
                <div className="relative">
                  <div className="text-4xl mb-3 service-card-icon inline-block">{s.icon}</div>
                  <div className="font-black text-white text-lg mb-1">{s.label}</div>
                  <div className="text-white/50 text-xs font-mono tracking-wide">{s.sub}</div>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold" style={{ color: s.color }}>
                    <span>Open guide</span>
                    <span className="service-card-arrow">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Live status strip — streaming via Suspense ══ */}
      <LiveStatusStrip />

      {/* ══ Below-fold sections — streamed via Suspense ══ */}
      <div className="cv-auto">
        <Suspense fallback={<><SectionSkeleton /><div className="px-4 py-12" style={{ background: "#020005" }}><div className="max-w-6xl mx-auto"><GridSkeleton count={6} /></div></div></>}>
          <BelowFoldSections />
        </Suspense>
      </div>

      {/* ══ Hidden H1 for additional SEO context ══ */}
      <div className="sr-only">
        <h2>Trini System LLC — Senior-Friendly Tech Support USA</h2>
        <p>Trini System LLC provides expert remote tech support for seniors across all 50 US states. We fix HP, Canon, Epson, and Brother printers, slow Windows computers, Garmin GPS devices, Gmail login problems, and Facebook account recovery. Free first call. Call 347-953-1531.</p>
      </div>

      {/* Scroll reveal observer — runs at idle */}
      <ScrollRevealClient />
    </>
  );
}
