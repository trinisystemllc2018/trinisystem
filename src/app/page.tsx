"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PHONE, PHONE_HREF } from "@/lib/utils";

const Scene3D = dynamic(() => import("@/components/3d/TriniLanding3D"), {
  ssr: false,
  loading: () => <LoadingFallback />,
});

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
  const [animationOn, setAnimationOn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    document.body.setAttribute("data-page", "home");
    return () => { document.body.removeAttribute("data-page"); };
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
      {animationOn ? <Scene3D /> : <StaticFallback />}

      {/* Vignette overlay for HUD readability */}
      <div className="fixed inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/55" />

      {/* TOP-LEFT BRAND */}
      <div className="fixed top-6 left-6 z-30 pointer-events-none">
        <div className="text-3xl md:text-4xl font-black tracking-tight leading-none text-white">
          TRINI<span className="text-amber-400">.</span>SYSTEM
        </div>
        <div className="text-[11px] text-amber-200/70 mt-1.5 font-mono tracking-widest">
          THE WORKSHOP — SENIOR TECH HELP
        </div>
        <div className="text-[11px] text-white/40 font-mono tracking-widest">
          NYC · EST 2024 · ALL 50 STATES
        </div>
      </div>

      {/* TOP CENTER NAV */}
      <nav className="fixed top-7 left-1/2 -translate-x-1/2 z-30 hidden lg:flex gap-7">
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

      {/* TOP-RIGHT PHONE CTA */}
      <a
        href={PHONE_HREF}
        className="fixed top-6 right-6 z-30 group flex items-center gap-3 px-6 py-3.5 rounded-full bg-amber-400 text-black font-bold text-base md:text-lg shadow-[0_0_40px_rgba(251,191,36,0.6)] hover:shadow-[0_0_60px_rgba(251,191,36,0.9)] hover:scale-105 transition-all"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
        <span>📞 {PHONE}</span>
        <span className="hidden md:inline text-xs font-mono opacity-70 border-l border-black/30 pl-3 ml-1">
          FREE FIRST CALL
        </span>
      </a>

      {/* HEADLINE */}
      <div className="fixed top-28 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none px-4 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          Your tech, on the bench.
        </h1>
        <p className="text-base md:text-lg text-white/80 mt-3 font-light">
          Click any device below — or tell us what's broken.
        </p>
        <div className="mt-3 text-[10px] font-mono tracking-[0.4em] text-amber-300/80">
          ↓ POINT · CLICK · GET HELP ↓
        </div>
      </div>

      {/* STICKY-NOTE SEARCH (bottom-center) */}
      <div className="fixed bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 z-30 w-full max-w-3xl px-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-0 bg-amber-400/25 blur-3xl rounded-full pointer-events-none"></div>
          <div className="relative">
            {/* Tape strips */}
            <div className="absolute -top-2 left-8 w-12 h-4 bg-amber-200/40 rotate-[-4deg] rounded-sm pointer-events-none"></div>
            <div className="absolute -top-2 right-8 w-12 h-4 bg-amber-200/40 rotate-[3deg] rounded-sm pointer-events-none"></div>

            <div className="flex items-center gap-2 bg-[#fff8e7] rounded-lg p-2 border-2 border-amber-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
              <div className="px-4 text-amber-700 text-2xl">🔍</div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What's broken? — printer offline, gmail login, slow PC, garmin update…"
                className="flex-1 bg-transparent text-stone-800 placeholder:text-stone-500 text-base md:text-lg focus:outline-none py-3 font-medium"
                autoComplete="off"
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

        <div className="flex flex-wrap gap-2 justify-center mt-4">
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

      {/* BOTTOM-LEFT STATUS */}
      <div className="fixed bottom-6 left-6 z-30 text-[11px] font-mono tracking-wider">
        <div className="flex items-center gap-2 text-white/65">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span>OPEN · NEW YORK {time}</span>
        </div>
        <div className="mt-1.5 text-white/45">
          ANIMATION{" "}
          <button
            onClick={() => setAnimationOn(true)}
            className={animationOn ? "text-amber-400 font-bold" : "hover:text-white/70 underline"}
          >ON</button>{" "}/{" "}
          <button
            onClick={() => setAnimationOn(false)}
            className={!animationOn ? "text-amber-400 font-bold" : "hover:text-white/70 underline"}
          >OFF</button>
        </div>
      </div>

      {/* BOTTOM-CENTER MICRO TRUST STRIP */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:flex gap-6 text-[11px] font-mono tracking-wider text-white/55">
        <span>★★★★★ 4.9 / 5 · 47 REVIEWS</span>
        <span className="opacity-50">·</span>
        <span>20+ YEARS</span>
        <span className="opacity-50">·</span>
        <span>NEVER ASKS FOR PASSWORDS</span>
      </div>

      {/* BOTTOM-RIGHT SKIP */}
      <Link
        href="/services"
        className="fixed bottom-6 right-6 z-30 hidden lg:flex items-center gap-2 text-[11px] font-mono tracking-widest text-white/45 hover:text-white transition-colors"
      >
        <span>SKIP TO TEXT VERSION</span><span>→</span>
      </Link>

      <SemanticContent />
    </main>
  );
}

function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-10" style={{ backgroundColor: "#1a0f08" }}>
      <div className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-white">
        TRINI<span className="text-amber-400">.</span>SYSTEM
      </div>
      <div className="text-xs text-amber-200/70 font-mono tracking-widest text-center mb-10">
        OPENING THE WORKSHOP...
      </div>
      <div className="w-64 h-px bg-white/10 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse"></div>
      </div>
      <a href="tel:+13479531531" className="mt-12 text-sm text-amber-400 font-bold hover:underline">
        Or call 347-953-1531 now →
      </a>
    </div>
  );
}

const SERVICE_CARDS = [
  { title: "PRINTER HELP", sub: "HP · Canon · Epson · Brother", href: "/printer-support", grad: "from-blue-500 to-blue-700", icon: "🖨" },
  { title: "COMPUTER HELP", sub: "Slow PC · Windows fix", href: "/computer-help", grad: "from-violet-500 to-violet-700", icon: "💻" },
  { title: "GPS HELP", sub: "Maps · Updates · Routing", href: "/gps-help", grad: "from-emerald-500 to-emerald-700", icon: "📍" },
  { title: "VIRUS REMOVAL", sub: "Malware · Pop-ups · Speed", href: "/virus-removal", grad: "from-red-500 to-red-700", icon: "🛡" },
  { title: "GARMIN GPS", sub: "Nuvi · DriveSmart · Watch", href: "/garmin-gps-help", grad: "from-sky-500 to-sky-700", icon: "⌚" },
  { title: "GMAIL HELP", sub: "Login · Recovery · Setup", href: "/how-to/gmail-help", grad: "from-blue-500 to-blue-700", icon: "✉" },
  { title: "FACEBOOK HELP", sub: "Hacked · Recovery · Privacy", href: "/how-to/facebook-help", grad: "from-blue-600 to-blue-800", icon: "ƒ" },
  { title: "GARMIN APPS", sub: "Express · Connect · Pilot", href: "/how-to/garmin-express", grad: "from-cyan-600 to-cyan-800", icon: "🧭" },
  { title: "HOW-TO GUIDES", sub: "All step-by-step help", href: "/how-to", grad: "from-amber-500 to-amber-700", icon: "📖" },
  { title: "FREE PC CLEANER", sub: "TriniCleaner download", href: "/products", grad: "from-teal-500 to-teal-700", icon: "⚡" },
];

function StaticFallback() {
  return (
    <div className="absolute inset-0 overflow-y-auto" style={{ backgroundColor: "#1a0f08" }}>
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-12">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-white">
          Your tech, on the bench.<br />
          <span className="text-amber-400">Real people fix it.</span>
        </h1>
        <p className="text-xl text-white/70 mb-10 max-w-2xl">
          Free guides for printers, computers, GPS, Gmail, Facebook, and Garmin. Or call a real person — under 15 minutes free.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {SERVICE_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`block rounded-2xl p-6 bg-gradient-to-br ${card.grad} hover:scale-[1.02] transition-transform`}
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <div className="text-2xl font-black mb-1">{card.title}</div>
              <div className="text-sm text-white/80">{card.sub}</div>
              <div className="text-xs mt-3 font-mono text-white/60">OPEN →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function SemanticContent() {
  return (
    <div className="sr-only" aria-hidden="false">
      <h1>Trini System — Senior-Friendly Tech Support USA</h1>
      <p>Trini System provides senior-friendly tech support across all 50 US states. Real technicians fix HP, Canon, Epson, and Brother printers remotely in minutes. We help seniors with slow computers, virus removal, Garmin GPS map updates, Gmail login problems, Facebook account recovery, and more. Free phone support under 15 minutes.</p>
      <h2>Services</h2>
      <ul>
        <li><a href="/printer-support">Printer help — HP, Canon, Epson, Brother</a></li>
        <li><a href="/computer-help">Computer help — slow PC, Windows fixes</a></li>
        <li><a href="/gps-help">GPS help — maps, updates, routing</a></li>
        <li><a href="/virus-removal">Virus removal — malware, pop-ups, speed restoration</a></li>
        <li><a href="/garmin-gps-help">Garmin GPS help — nuvi, DriveSmart, watches</a></li>
        <li><a href="/how-to/gmail-help">Gmail help — login, recovery, setup for seniors</a></li>
        <li><a href="/how-to/facebook-help">Facebook help — hacked accounts, privacy, scams</a></li>
        <li><a href="/how-to/garmin-express">Garmin Apps — Express, Connect, ActiveCaptain, Pilot</a></li>
        <li><a href="/how-to">All how-to guides</a></li>
        <li><a href="/products">Free PC Cleaner — TriniCleaner download</a></li>
      </ul>
      <p>Call <a href="tel:+13479531531">347-953-1531</a> for free senior tech support.</p>
    </div>
  );
}
