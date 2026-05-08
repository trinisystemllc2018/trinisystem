"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PHONE, PHONE_HREF } from "@/lib/utils";

// Heavy 3D scene loaded lazily — doesn't block LCP
const Scene3D = lazy(() => import("@/components/3d/TriniLanding3D"));

const QUICK_TOPICS = [
  { label: "Printer offline",  href: "/printer-support" },
  { label: "Slow PC",          href: "/computer-help" },
  { label: "Garmin update",    href: "/how-to/garmin-express" },
  { label: "Gmail login",      href: "/how-to/gmail-help" },
  { label: "Facebook hacked",  href: "/how-to/facebook-help" },
  { label: "Virus removal",    href: "/virus-removal" },
];

const NAV_LINKS = [
  { label: "SERVICES", href: "/services" },
  { label: "PRINTERS", href: "/printer-support" },
  { label: "GUIDES",   href: "/how-to" },
  { label: "PRODUCTS", href: "/products" },
  { label: "ABOUT",    href: "/about" },
  { label: "CONTACT",  href: "/contact" },
];

export default function Home() {
  const [time, setTime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showScene, setShowScene] = useState(false);
  const [animationOn, setAnimationOn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    document.body.setAttribute("data-page", "home");
    return () => { document.body.removeAttribute("data-page"); };
  }, []);

  // Defer 3D scene by one tick so LCP text renders first
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShowScene(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York", hour: "2-digit", minute: "2-digit", hour12: false,
      }).format(now));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    if (q.includes("printer") || q.includes("hp") || q.includes("canon") || q.includes("epson") || q.includes("brother")) {
      router.push("/printer-support");
    } else if (q.includes("virus") || q.includes("malware") || q.includes("popup")) {
      router.push("/virus-removal");
    } else if (q.includes("garmin") || q.includes("nuvi") || q.includes("dezl") || q.includes("drivesmart")) {
      router.push("/how-to/garmin-express");
    } else if (q.includes("gmail")) {
      router.push("/how-to/gmail-help");
    } else if (q.includes("facebook") || q.includes("fb")) {
      router.push("/how-to/facebook-help");
    } else if (q.includes("gps") || q.includes("map")) {
      router.push("/gps-help");
    } else if (q.includes("computer") || q.includes("slow") || q.includes("pc") || q.includes("windows")) {
      router.push("/computer-help");
    } else {
      router.push("/how-to");
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden text-white" style={{ backgroundColor: "#1a0f08" }}>

      {/* ── 3D SCENE (deferred for LCP) ── */}
      {showScene && animationOn ? (
        <Suspense fallback={<StaticBackground />}>
          <Scene3D />
        </Suspense>
      ) : (
        <StaticBackground />
      )}

      {/* CSS vignette */}
      <div className="fixed inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/55" />

      {/* ── BRAND (top-left) ── */}
      <div className="fixed top-6 left-6 z-30 pointer-events-none">
        {/* LCP element — must paint first, so no heavy animation */}
        <div className="text-3xl md:text-4xl font-black tracking-tight leading-none text-white">
          TRINI<span className="text-amber-400">.</span>SYSTEM
        </div>
        <div className="text-[11px] text-amber-200/70 mt-1.5 font-mono tracking-widest">
          THE WORKSHOP — SENIOR TECH HELP
        </div>
        <div className="text-[11px] text-white/40 font-mono tracking-widest">
          NYC · EST 2016 · ALL 50 STATES
        </div>
      </div>

      {/* ── NAV (desktop, top-center) ── */}
      <nav className="fixed top-7 left-1/2 -translate-x-1/2 z-30 hidden lg:flex gap-7" aria-label="Main navigation">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-xs font-mono tracking-widest text-white/65 hover:text-amber-300 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* ── PHONE CTA (top-right) ── */}
      <a
        href={PHONE_HREF}
        className="fixed top-6 right-6 z-30 group flex items-center gap-3 px-6 py-3.5 rounded-full bg-amber-400 text-black font-bold text-base md:text-lg shadow-[0_0_40px_rgba(251,191,36,0.6)] hover:shadow-[0_0_60px_rgba(251,191,36,0.9)] hover:scale-105 transition-all"
        aria-label={`Call us: ${PHONE}`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
        <span>📞 {PHONE}</span>
        <span className="hidden md:inline text-xs font-mono opacity-70 border-l border-black/30 pl-3 ml-1">
          FREE FIRST CALL
        </span>
      </a>

      {/* ── HEADLINE (top-center) ── */}
      <div className="fixed top-28 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none px-4 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          Your tech, on the bench.
        </h1>
        <p className="text-base md:text-lg text-white/80 mt-3 font-light">
          Click any device below — or tell us what&apos;s broken.
        </p>
        <div className="mt-3 text-[10px] font-mono tracking-[0.4em] text-amber-300/80">
          ↓ POINT · CLICK · GET HELP ↓
        </div>
      </div>

      {/* ── SEARCH (bottom-center) ── */}
      <div className="fixed bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 z-30 w-full max-w-3xl px-4">
        <form onSubmit={handleSearch} className="relative" role="search" aria-label="Tech problem search">
          <div className="absolute inset-0 bg-amber-400/25 blur-3xl rounded-full pointer-events-none" />
          <div className="relative">
            {/* Tape strips */}
            <div className="absolute -top-2 left-8 w-12 h-4 bg-amber-200/40 rotate-[-4deg] rounded-sm pointer-events-none" />
            <div className="absolute -top-2 right-8 w-12 h-4 bg-amber-200/40 rotate-[3deg] rounded-sm pointer-events-none" />

            <div className="flex items-center gap-2 bg-[#fff8e7] rounded-lg p-2 border-2 border-amber-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
              <div className="px-4 text-amber-700 text-2xl" aria-hidden="true">🔍</div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What's broken? — printer offline, gmail login, slow PC, garmin update…"
                className="flex-1 bg-transparent text-stone-800 placeholder:text-stone-500 text-base md:text-lg focus:outline-none py-3 font-medium"
                autoComplete="off"
                aria-label="Describe your tech problem"
              />
              <button
                type="submit"
                className="px-6 md:px-8 py-3 md:py-3.5 rounded-md bg-stone-800 text-amber-300 font-bold text-sm md:text-base hover:bg-stone-900 transition-colors shadow-lg"
              >
                FIX IT →
              </button>
            </div>
          </div>
        </form>

        {/* Quick fixes */}
        <div className="flex flex-wrap gap-2 justify-center mt-4" aria-label="Quick fix shortcuts">
          <span className="text-[10px] font-mono tracking-widest text-white/55 self-center mr-2">QUICK FIXES:</span>
          {QUICK_TOPICS.map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className="px-3 py-1.5 rounded-full bg-white/8 hover:bg-amber-400/20 border border-white/15 text-xs text-white/85 hover:text-amber-200 transition-all backdrop-blur-md"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── STATUS (bottom-left) ── */}
      <div className="fixed bottom-6 left-6 z-30 text-[11px] font-mono tracking-wider">
        <div className="flex items-center gap-2 text-white/65">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          <span>OPEN · NEW YORK {time}</span>
        </div>
        <div className="mt-1.5 text-white/45">
          ANIMATION{" "}
          <button
            onClick={() => setAnimationOn(true)}
            className={animationOn ? "text-amber-400 font-bold" : "hover:text-white/70 underline"}
            aria-pressed={animationOn}
          >ON</button>{" "}/{" "}
          <button
            onClick={() => setAnimationOn(false)}
            className={!animationOn ? "text-amber-400 font-bold" : "hover:text-white/70 underline"}
            aria-pressed={!animationOn}
          >OFF</button>
        </div>
      </div>

      {/* ── TRUST STRIP (bottom-center) ── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:flex gap-6 text-[11px] font-mono tracking-wider text-white/55">
        <span>★★★★★ 4.9 / 5 · 47 REVIEWS</span>
        <span className="opacity-50">·</span>
        <span>20+ YEARS</span>
        <span className="opacity-50">·</span>
        <span>NEVER ASKS FOR PASSWORDS</span>
      </div>

      {/* ── SKIP LINK (bottom-right) ── */}
      <Link
        href="/services"
        className="fixed bottom-6 right-6 z-30 hidden lg:flex items-center gap-2 text-[11px] font-mono tracking-widest text-white/45 hover:text-white transition-colors"
      >
        <span>SKIP TO TEXT VERSION</span><span>→</span>
      </Link>

      {/* ── SEO SEMANTIC CONTENT (screen-reader only) ── */}
      <SemanticContent />
    </main>
  );
}

/* Static background shown while 3D loads or animation is off */
function StaticBackground() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        background: "#1a0f08",
        backgroundImage: `
          radial-gradient(ellipse at 30% 40%, rgba(251,146,60,0.06) 0%, transparent 60%),
          radial-gradient(ellipse at 70% 60%, rgba(59,130,246,0.05) 0%, transparent 50%)
        `,
      }}
    />
  );
}

const SERVICE_CARDS = [
  { title: "PRINTER HELP",    sub: "HP · Canon · Epson · Brother", href: "/printer-support",   grad: "from-blue-500 to-blue-700",    icon: "🖨" },
  { title: "COMPUTER HELP",   sub: "Slow PC · Windows fix",        href: "/computer-help",     grad: "from-violet-500 to-violet-700", icon: "💻" },
  { title: "GPS HELP",        sub: "Maps · Updates · Routing",     href: "/gps-help",           grad: "from-emerald-500 to-emerald-700", icon: "📍" },
  { title: "VIRUS REMOVAL",   sub: "Malware · Pop-ups · Speed",    href: "/virus-removal",     grad: "from-red-500 to-red-700",      icon: "🛡" },
  { title: "GARMIN GPS",      sub: "Nuvi · DriveSmart · Watch",    href: "/garmin-gps-help",   grad: "from-sky-500 to-sky-700",      icon: "⌚" },
  { title: "GMAIL HELP",      sub: "Login · Recovery · Setup",     href: "/how-to/gmail-help", grad: "from-blue-500 to-blue-700",    icon: "✉" },
  { title: "FACEBOOK HELP",   sub: "Hacked · Recovery · Privacy",  href: "/how-to/facebook-help", grad: "from-blue-600 to-blue-800", icon: "ƒ" },
  { title: "GARMIN APPS",     sub: "Express · Connect · Pilot",    href: "/how-to/garmin-express", grad: "from-cyan-600 to-cyan-800", icon: "🧭" },
  { title: "HOW-TO GUIDES",   sub: "All step-by-step help",        href: "/how-to",            grad: "from-amber-500 to-amber-700",  icon: "📖" },
  { title: "FREE PC CLEANER", sub: "TriniCleaner download",        href: "/products",          grad: "from-teal-500 to-teal-700",    icon: "⚡" },
];

function SemanticContent() {
  return (
    <div className="sr-only" aria-hidden="false">
      <h1>Trini System — Senior-Friendly Tech Support USA</h1>
      <p>
        Trini System provides senior-friendly tech support across all 50 US states. Real technicians fix HP, Canon, Epson,
        and Brother printers remotely in minutes. We help seniors with slow computers, virus removal, Garmin GPS map
        updates, Gmail login problems, Facebook account recovery, and more. Free phone support under 15 minutes.
      </p>
      <h2>Services</h2>
      <ul>
        {SERVICE_CARDS.map(c => (
          <li key={c.href}><a href={c.href}>{c.title} — {c.sub}</a></li>
        ))}
      </ul>
      <p>Call <a href={PHONE_HREF}>{PHONE}</a> for free senior tech support.</p>
    </div>
  );
}
