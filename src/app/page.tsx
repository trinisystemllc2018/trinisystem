"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";

/* ══════════════════════════════════════════════════════════════
   TRINI SYSTEM — Zero-WebGL Homepage
   Dark + bright. CSS-only 3D cards. Scroll reveals.
   Target: 90+ PageSpeed mobile.
══════════════════════════════════════════════════════════════ */

const SERVICES = [
  { icon: "🖨️", label: "Printer Help",      sub: "HP · Canon · Epson · Brother",   href: "/printer-support",      color: "#3b82f6", glow: "rgba(59,130,246,0.5)"  },
  { icon: "💻", label: "Computer Help",     sub: "Slow PC · Windows errors",        href: "/computer-help",        color: "#8b5cf6", glow: "rgba(139,92,246,0.5)"  },
  { icon: "🛡️", label: "Virus Removal",    sub: "Malware · Pop-ups · Hijacks",     href: "/virus-removal",        color: "#ef4444", glow: "rgba(239,68,68,0.5)"   },
  { icon: "🗺️", label: "GPS Help",         sub: "Garmin · Maps · Updates",         href: "/garmin-gps-help",      color: "#06b6d4", glow: "rgba(6,182,212,0.5)"   },
  { icon: "✉️", label: "Gmail & Email",    sub: "Login · Recovery · Setup",        href: "/how-to/gmail-help",    color: "#f97316", glow: "rgba(249,115,22,0.5)"  },
  { icon: "👥", label: "Facebook Help",    sub: "Hacked · Recovery · Privacy",     href: "/how-to/facebook-help", color: "#1877f2", glow: "rgba(24,119,242,0.5)"  },
  { icon: "⌚", label: "Garmin Devices",   sub: "GPS · Watch · Marine",            href: "/garmin-gps-help",      color: "#0ea5e9", glow: "rgba(14,165,233,0.5)"  },
  { icon: "📖", label: "How-To Guides",   sub: "Step-by-step for seniors",         href: "/how-to",               color: "#f59e0b", glow: "rgba(245,158,11,0.5)"  },
  { icon: "⚡", label: "Free PC Cleaner", sub: "TriniCleaner — download free",     href: "/products",             color: "#10b981", glow: "rgba(16,185,129,0.5)"  },
  { icon: "🌎", label: "All Services",    sub: "Full list of what we fix",         href: "/services",             color: "#a855f7", glow: "rgba(168,85,247,0.5)"  },
];

const SEARCH_MAP: [string[], string][] = [
  [["printer","hp","canon","epson","brother","offline","ink","jam","not printing","cartridge"], "/printer-support"],
  [["virus","malware","popup","pop-up","spyware","scam","hacked","slow"],                       "/virus-removal"],
  [["garmin","nuvi","drivesmart","dezl","fenix","forerunner","gps watch"],                      "/how-to/garmin-express"],
  [["gmail","google account","email login","google password"],                                  "/how-to/gmail-help"],
  [["facebook","fb","instagram","account recovery","account hacked"],                           "/how-to/facebook-help"],
  [["gps","map","navigation","satellite","tomtom","magellan"],                                  "/gps-help"],
  [["computer","slow pc","windows","laptop","freeze","crash","blue screen"],                    "/computer-help"],
  [["wifi","internet","router","not connecting","network"],                                     "/how-to"],
];

const QUICK_FIXES = [
  { label: "🖨️ Printer offline",  href: "/printer-support" },
  { label: "💻 Slow PC",           href: "/computer-help" },
  { label: "🗺️ Garmin update",    href: "/how-to/garmin-express" },
  { label: "✉️ Gmail locked",     href: "/how-to/gmail-help" },
  { label: "👥 Facebook hacked",  href: "/how-to/facebook-help" },
  { label: "🛡️ Virus removal",   href: "/virus-removal" },
  { label: "⚡ Free PC Cleaner",  href: "/products" },
  { label: "📖 All guides",       href: "/how-to" },
];

const TRUST_STATS = [
  { val: "4.9★", label: "Google Rating",  color: "#f59e0b" },
  { val: "47",   label: "5-Star Reviews", color: "#10b981" },
  { val: "20+",  label: "Years Exp.",     color: "#3b82f6" },
  { val: "50",   label: "US States",      color: "#8b5cf6" },
];

const REVIEWS = [
  { name: "Corey Hawkins",  loc: "New York, NY",   text: "James fixed my HP DeskJet offline in 20 minutes. The best tech support I've ever had!",       device: "HP DeskJet 4155e" },
  { name: "Leslie Park",    loc: "Dallas, TX",     text: "Fixed my Canon PIXMA B200 error. Quick and effective — saved me $200 on a new printer.",     device: "Canon PIXMA MX922" },
  { name: "Mary Steil",     loc: "Chicago, IL",    text: "Outstanding help with my Epson EcoTank ink error and reconnecting to my new router.",          device: "Epson EcoTank ET-2720" },
  { name: "Mark Starrett",  loc: "Phoenix, AZ",    text: "Above and beyond for my Garmin GPS update. Professional and MUCH cheaper than Best Buy.",     device: "Garmin DriveSmart 65" },
  { name: "Patricia Walsh", loc: "Miami, FL",      text: "TriniCleaner made my old laptop run like new. I was about to buy a new computer!",             device: "Windows 11 Laptop" },
  { name: "Robert Chen",    loc: "Seattle, WA",    text: "Fixed my Brother printer driver after Windows 11 update — in under 30 minutes remotely.",     device: "Brother MFC-L2710DW" },
];

const HOW_IT_WORKS = [
  { step: "01", icon: "🔍", title: "Describe your problem",  desc: "Type it in the search box below or call us directly — no tech jargon needed." },
  { step: "02", icon: "📞", title: "Get connected instantly", desc: "A real technician picks up in under 5 minutes, 24 hours a day, 7 days a week." },
  { step: "03", icon: "🖥️", title: "We fix it while you watch", desc: "With your permission we connect remotely — you see everything on your screen." },
  { step: "04", icon: "✅", title: "Guaranteed or free",      desc: "No fix means no charge. We don't stop until your device works perfectly." },
];

/* ════════════════════════════════════════════════════════
   SEARCH ENGINE
════════════════════════════════════════════════════════ */
function useSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [hint, setHint] = useState(0);
  const hints = ["HP printer offline…", "Garmin map won't update…", "My PC is running slow…", "Gmail login problem…", "Facebook account hacked…", "Virus / pop-up ads…", "Canon error B200…", "Epson ink error…"];

  useEffect(() => {
    const t = setInterval(() => setHint(h => (h + 1) % hints.length), 2800);
    return () => clearInterval(t);
  }, []);

  const submit = useCallback((q: string) => {
    const lower = q.trim().toLowerCase();
    if (!lower) return;
    for (const [keywords, href] of SEARCH_MAP) {
      if (keywords.some(k => lower.includes(k))) { router.push(href); return; }
    }
    router.push("/how-to");
  }, [router]);

  return { query, setQuery, hint: hints[hint], submit };
}

/* ════════════════════════════════════════════════════════
   SCROLL REVEAL HOOK
════════════════════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ════════════════════════════════════════════════════════
   SERVICE CARD (CSS 3D tilt on hover)
════════════════════════════════════════════════════════ */
function ServiceCard({ s, idx }: { s: typeof SERVICES[0]; idx: number }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.04)`;
    el.style.boxShadow = `0 20px 60px ${s.glow}, 0 0 0 1px rgba(255,255,255,0.06)`;
  };
  const handleLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(700px) rotateX(0) rotateY(0) scale(1)";
    el.style.boxShadow = `0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)`;
  };

  return (
    <Link
      ref={ref}
      href={s.href}
      className="reveal group relative block rounded-2xl p-5 overflow-hidden"
      style={{
        animationDelay: `${idx * 0.06}s`,
        background: `linear-gradient(135deg, #0f172a 0%, #1e293b 100%)`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
        transition: "transform 0.12s ease-out, box-shadow 0.2s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Animated glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${s.glow} 0%, transparent 65%)` }} />
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />

      <div className="relative">
        {/* Icon with pulse */}
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200 inline-block">{s.icon}</div>
        <div className="font-black text-white text-lg mb-1">{s.label}</div>
        <div className="text-white/50 text-xs font-mono tracking-wide">{s.sub}</div>
        {/* Arrow */}
        <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: s.color }}>
          <span>Open guide</span>
          <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
        </div>
      </div>
    </Link>
  );
}

/* ════════════════════════════════════════════════════════
   ANIMATED SEARCH BOX
════════════════════════════════════════════════════════ */
function HeroSearch() {
  const { query, setQuery, hint, submit } = useSearch();
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Large senior-friendly label */}
      <p className="text-white/60 text-sm font-mono tracking-widest text-center mb-4 uppercase">
        ↓ Type your problem or tap a quick fix below ↓
      </p>

      {/* Search bar */}
      <form onSubmit={e => { e.preventDefault(); submit(query); }} role="search">
        <div
          className="relative flex items-center rounded-2xl overflow-hidden transition-all duration-300"
          style={{
            background: focused ? "#fff" : "#f1f5f9",
            boxShadow: focused
              ? "0 0 0 3px rgba(245,158,11,0.5), 0 20px 60px rgba(0,0,0,0.4)"
              : "0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          <span className="pl-5 text-2xl shrink-0 select-none" aria-hidden>🔍</span>

          {/* Input with animated placeholder */}
          <div className="relative flex-1 min-w-0">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={e => e.key === "Enter" && submit(query)}
              className="w-full px-4 py-5 text-base md:text-lg text-gray-900 font-semibold bg-transparent outline-none"
              placeholder=" "
              autoComplete="off"
              aria-label="Describe your tech problem"
            />
            {/* Animated hint when empty */}
            {!query && !focused && (
              <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                <span key={hint} className="text-gray-400 text-base font-medium truncate animate-fade-in">
                  {hint}
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="m-2 px-6 md:px-8 py-3.5 rounded-xl text-white font-black text-sm md:text-base btn-glow shrink-0 transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", boxShadow: "0 4px 20px rgba(245,158,11,0.5)" }}
          >
            FIX IT →
          </button>
        </div>
      </form>

      {/* Quick fix chips — large, tap-friendly for seniors */}
      <div className="flex flex-wrap gap-2 justify-center mt-5">
        {QUICK_FIXES.map(q => (
          <Link
            key={q.label}
            href={q.href}
            className="px-4 py-2.5 rounded-full border border-white/15 text-sm text-white/80 hover:text-white hover:bg-amber-400/20 hover:border-amber-400/40 transition-all backdrop-blur-sm font-medium"
          >
            {q.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ANIMATED TRUST TICKER
════════════════════════════════════════════════════════ */
function TrustTicker() {
  const items = [
    "⭐ 4.9 Google Rating",
    "🛡️ No Fix = No Fee",
    "🌎 All 50 US States",
    "📞 24/7 Live Support",
    "🔒 Never Asks Passwords",
    "⚡ Under 15 Min Response",
    "👴 Senior-Friendly",
    "💰 50% Less Than Geek Squad",
  ];
  return (
    <div className="overflow-hidden py-3 border-y border-white/10" style={{ background: "rgba(245,158,11,0.08)" }}>
      <div className="flex gap-10 whitespace-nowrap" style={{ animation: "shimmer 0s", animationFillMode: "none" }}>
        {/* Duplicate for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-amber-300/80 font-mono text-xs tracking-widest uppercase shrink-0">
            {item} <span className="text-amber-400/30 mx-3">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   HOW IT WORKS STEP
════════════════════════════════════════════════════════ */
function HowItWorksStep({ step, idx }: { step: typeof HOW_IT_WORKS[0]; idx: number }) {
  return (
    <div className={`reveal flex flex-col items-center text-center`} style={{ animationDelay: `${idx * 0.12}s` }}>
      <div className="relative mb-6">
        {/* Outer ring */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
          style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)", border: "2px solid rgba(245,158,11,0.3)", boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 8px rgba(245,158,11,0.04)" }}>
          {step.icon}
        </div>
        {/* Step number */}
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-black"
          style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)" }}>
          {step.step}
        </div>
        {/* Connector line (except last) */}
        {idx < HOW_IT_WORKS.length - 1 && (
          <div className="hidden md:block absolute top-10 left-full w-full h-px -translate-y-1/2"
            style={{ background: "linear-gradient(90deg, rgba(245,158,11,0.4), transparent)", marginLeft: "8px" }} />
        )}
      </div>
      <h3 className="text-white font-black text-lg mb-2">{step.title}</h3>
      <p className="text-white/55 text-sm leading-relaxed max-w-xs">{step.desc}</p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   REVIEW CARD
════════════════════════════════════════════════════════ */
function ReviewCard({ r, idx }: { r: typeof REVIEWS[0]; idx: number }) {
  return (
    <div className="reveal rounded-2xl p-6" style={{
      animationDelay: `${idx * 0.08}s`,
      background: "linear-gradient(135deg, #1e293b, #0f172a)",
      border: "1px solid rgba(255,255,255,0.07)",
      boxShadow: "0 4px 24px rgba(0,0,0,0.3)"
    }}>
      {/* Stars */}
      <div className="text-amber-400 text-lg mb-3">★★★★★</div>
      {/* Quote */}
      <p className="text-white/80 text-sm leading-relaxed mb-4 italic">"{r.text}"</p>
      {/* Meta */}
      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white"
          style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
          {r.name.charAt(0)}
        </div>
        <div>
          <div className="text-white font-bold text-sm">{r.name}</div>
          <div className="text-white/40 text-xs">{r.loc} · {r.device}</div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
export default function Home() {
  useReveal();

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="relative bg-hero bg-grid overflow-hidden min-h-screen flex flex-col" aria-label="Hero">
        {/* Animated background orbs */}
        <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)", filter: "blur(60px)", animation: "float 8s ease-in-out infinite" }} />
        <div className="absolute bottom-20 right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-15"
          style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)", filter: "blur(60px)", animation: "float 10s ease-in-out infinite reverse" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none opacity-10"
          style={{ background: "radial-gradient(ellipse, #8b5cf6, transparent 70%)", filter: "blur(80px)", animation: "float 12s ease-in-out infinite 3s" }} />

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-4 pt-10 pb-16">

          {/* Live badge */}
          <div className="animate-fade-up flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-mono tracking-widest uppercase"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-white/70">Technician Available Now · {PHONE}</span>
            </div>
          </div>

          {/* Main headline */}
          <div className="text-center mb-6">
            <h1 className="animate-fade-up delay-100 font-black text-white leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.6rem,7vw,5rem)" }}>
              Your Tech Problem,
              <span className="block text-gradient-gold" style={{ fontSize: "clamp(2.6rem,7vw,5rem)" }}>
                Fixed Today.
              </span>
            </h1>
            <p className="animate-fade-up delay-200 text-white/55 text-lg md:text-xl mt-5 max-w-2xl mx-auto">
              Real technicians fix printers, slow computers, GPS devices, Gmail, and Facebook — remotely in minutes. Senior-friendly. 24/7.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a href={PHONE_HREF}
              className="btn-glow touch-target flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-black transition-all hover:scale-105 active:scale-95 animate-pulse-glow"
              style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)", boxShadow: "0 0 40px rgba(245,158,11,0.5), 0 8px 32px rgba(0,0,0,0.3)" }}>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              📞 {PHONE} — Call Free
            </a>
            <Link href="/how-to"
              className="btn-glow touch-target flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-white transition-all hover:scale-105 active:scale-95"
              style={{ background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
              📖 Browse Free Guides →
            </Link>
          </div>

          {/* Search box */}
          <div className="animate-fade-up delay-400">
            <HeroSearch />
          </div>

          {/* Trust stats */}
          <div className="animate-fade-up delay-500 flex flex-wrap justify-center gap-6 mt-10">
            {TRUST_STATS.map(t => (
              <div key={t.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black" style={{ color: t.color }}>{t.val}</div>
                <div className="text-white/40 text-xs font-mono tracking-wider mt-0.5">{t.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25 animate-bounce-arrow">
          <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M19 9l-7 7-7-7"/></svg>
        </div>
      </section>

      {/* ══ TRUST TICKER ═══════════════════════════════════ */}
      <TrustTicker />

      {/* ══ SERVICES GRID ══════════════════════════════════ */}
      <section className="bg-section-dark py-20 px-4" aria-label="Services">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6 text-xs font-mono tracking-widest uppercase"
              style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", color: "#f59e0b" }}>
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
            {SERVICES.map((s, i) => <ServiceCard key={s.href + s.label} s={s} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, #020817 0%, #0a0f1e 100%)" }} aria-label="How it works">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              How it works
            </h2>
            <p className="text-white/50 text-lg">From your first call to a fixed device — here's what to expect.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4 relative">
            {HOW_IT_WORKS.map((step, i) => <HowItWorksStep key={step.step} step={step} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ══ SENIOR GUIDES SPOTLIGHT ════════════════════════ */}
      <section className="py-20 px-4 bg-section-dark" aria-label="Senior guides">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 reveal">
            <div className="text-5xl mb-4">👴👵</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Guides written for seniors
            </h2>
            <p className="text-white/55 text-lg max-w-2xl mx-auto">
              Large text. Plain English. Step-by-step screens. No tech jargon. Every guide has a free practice mode you can try before doing it for real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "✉️", title: "Gmail Help",      desc: "Login problems, account recovery, setting up Gmail for the first time, password reset, two-step verification.", href: "/how-to/gmail-help",    color: "#f97316", topics: ["Gmail login", "Forgot password", "Recovery phone", "Two-factor auth", "New account setup"] },
              { icon: "👥", title: "Facebook Help",   desc: "Account hacked, recovery, privacy settings, scam alerts, blocking people, family photo sharing.", href: "/how-to/facebook-help",  color: "#1877f2", topics: ["Account hacked", "Forgot password", "Privacy settings", "Scam alerts", "Messenger help"] },
              { icon: "🗺️", title: "Garmin GPS Help", desc: "Map updates, Garmin Express setup, GPS watch updates, satellite issues, device frozen.", href: "/how-to/garmin-express",  color: "#06b6d4", topics: ["Map update", "Garmin Express", "Watch update", "Satellite fix", "Device frozen"] },
            ].map((guide, i) => (
              <div key={guide.href} className="reveal rounded-2xl overflow-hidden" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="p-6" style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-5xl mb-4">{guide.icon}</div>
                  <h3 className="text-xl font-black text-white mb-2">{guide.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-4">{guide.desc}</p>
                  {/* Topic tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {guide.topics.map(t => (
                      <span key={t} className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{ background: `${guide.color}22`, color: guide.color, border: `1px solid ${guide.color}44` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link href={guide.href}
                    className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-black text-white transition-all hover:scale-105 active:scale-95 btn-glow"
                    style={{ background: `linear-gradient(135deg, ${guide.color}cc, ${guide.color})`, boxShadow: `0 4px 20px ${guide.color}44` }}>
                    Open guide — large text →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 reveal">
            <Link href="/how-to"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-white transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.2)" }}>
              📖 View All How-To Guides →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FREE TOOLS BAND ════════════════════════════════ */}
      <section className="py-16 px-4" style={{ background: "linear-gradient(135deg, #064e3b, #065f46)" }} aria-label="Free tools">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 reveal">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-400/20 border border-emerald-400/30 rounded-full px-4 py-2 text-emerald-300 text-xs font-mono tracking-widest uppercase mb-4">
              ⚡ 100% Free · No Subscription Ever
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              TriniCleaner — Free PC Optimizer
            </h2>
            <p className="text-emerald-100/70 text-lg mb-2">
              Removes junk files, fixes startup slowdowns, speeds up your PC in one click. Works on Windows 7, 8, 10, 11.
            </p>
            <p className="text-emerald-300/60 text-sm">Built by Trini System LLC · 5,000+ downloads · Virus-free</p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
              className="btn-glow touch-target flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-white transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 8px 32px rgba(16,185,129,0.5)" }}>
              ⬇ Download Free — Windows
            </a>
            <Link href="/products"
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-emerald-200 transition-all hover:text-white"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)" }}>
              Learn more about TriniCleaner →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background: "#020817" }} aria-label="Customer reviews">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 reveal">
            <div className="text-4xl mb-3">⭐⭐⭐⭐⭐</div>
            <h2 className="text-4xl font-black text-white mb-2">4.9 on Google · 47 reviews</h2>
            <p className="text-white/50">Real customers, real fixes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => <ReviewCard key={r.name} r={r} idx={i} />)}
          </div>
          <div className="text-center mt-8 reveal">
            <a href="https://share.google/1mtrJVk8Ya0PkjG76" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-amber-400 hover:text-amber-300 transition-colors"
              style={{ border: "1px solid rgba(245,158,11,0.3)" }}>
              ⭐ Read all reviews on Google ↗
            </a>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══════════════════════════════════════ */}
      <section className="py-20 px-4 bg-hero bg-grid text-center" aria-label="Call to action">
        <div className="max-w-3xl mx-auto reveal">
          <div className="text-5xl mb-6 animate-float">📞</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ready to get help?
          </h2>
          <p className="text-white/60 text-xl mb-8">
            Call free — a real technician answers in under 5 minutes, 24 hours a day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF}
              className="btn-glow touch-target flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-xl text-black transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)", boxShadow: "0 0 60px rgba(245,158,11,0.5)" }}>
              📞 {PHONE} — Call Free Now
            </a>
            <Link href="/contact"
              className="btn-glow touch-target flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-xl text-white transition-all hover:scale-105 active:scale-95"
              style={{ background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.25)" }}>
              📋 Book Online →
            </Link>
          </div>
          <p className="text-white/30 text-sm mt-6 font-mono tracking-wider">
            NO FIX = NO FEE · NEVER ASKS FOR PASSWORDS · EST. 2016
          </p>
        </div>
      </section>

      {/* ══ SEO SEMANTIC CONTENT ═══════════════════════════ */}
      <div className="sr-only" aria-hidden="false">
        <h1>Trini System LLC — Senior-Friendly Tech Support USA</h1>
        <p>Trini System LLC provides expert remote tech support for seniors across all 50 US states. We fix HP, Canon, Epson, and Brother printers, slow Windows computers, Garmin GPS devices, Gmail login problems, and Facebook account recovery. Free first call. Call 347-953-1531.</p>
        <h2>Our Services</h2>
        <ul>
          <li><a href="/printer-support">Printer Help — HP, Canon, Epson, Brother repair and setup</a></li>
          <li><a href="/computer-help">Computer Help — slow PC, Windows errors, startup fix</a></li>
          <li><a href="/virus-removal">Virus Removal — malware, pop-ups, ransomware removal</a></li>
          <li><a href="/garmin-gps-help">Garmin GPS Help — map updates, Garmin Express, device setup</a></li>
          <li><a href="/how-to/gmail-help">Gmail Help — login, password reset, account recovery</a></li>
          <li><a href="/how-to/facebook-help">Facebook Help — hacked account, privacy, Messenger</a></li>
          <li><a href="/products">TriniCleaner — free Windows PC optimizer download</a></li>
          <li><a href="/how-to">How-To Guides — step-by-step senior-friendly tech help</a></li>
        </ul>
        <p>Free phone support: <a href="tel:+13479531531">347-953-1531</a>. Based in Corona, Queens, New York. Remote support nationwide.</p>
        <h2>Frequently Asked Questions</h2>
        <dl>
          <dt>How much does printer repair cost?</dt><dd>Printer repair starts at $49. Free diagnosis. No fix, no fee.</dd>
          <dt>Do you offer remote support?</dt><dd>Yes. We connect remotely to your computer with your permission and fix the problem while you watch.</dd>
          <dt>What brands of printers do you fix?</dt><dd>HP, Canon, Epson, and Brother. All models including DeskJet, PIXMA, EcoTank, and MFC series.</dd>
          <dt>Is TriniCleaner safe?</dt><dd>Yes. TriniCleaner is built by Trini System LLC, virus-free, and 100% free with no subscription.</dd>
          <dt>Do you help seniors with technology?</dt><dd>Yes. All our guides and support calls are senior-friendly with plain English instructions.</dd>
        </dl>
      </div>
    </>
  );
}
