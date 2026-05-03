"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PHONE, PHONE_HREF } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════════
   HOMEPAGE — Wonderland-inspired 3D scroll landing.

   Layout:
     - Full-screen 3D Canvas (TriniLanding3D, dynamically imported, no SSR)
     - HUD overlay above the canvas:
         - Top-left: brand mark
         - Left sidebar: numbered nav (1 HOME / 2 SERVICES / ... / 7 CONTACT)
         - Bottom-left: status bar (LIVE / NYC time)
         - Top-right: phone CTA
         - Bottom-center: search box (powers /how-to redirects)
         - Top-center: scroll progress hint

   For SEO: a hidden <SemanticContent /> block ships real HTML inside
   the page so Google/Bing crawlers see content even though canvas is
   JS-driven. Schema markup lives in layout.tsx.
═════════════════════════════════════════════════════════════════════ */

const Scene3D = dynamic(() => import("@/components/3d/TriniLanding3D"), {
  ssr: false,
  loading: () => <LoadingFallback />,
});

const NAV_LINKS = [
  { num: "1", label: "HOME",       href: "/" },
  { num: "2", label: "SERVICES",   href: "/services" },
  { num: "3", label: "PRINTERS",   href: "/printer-support" },
  { num: "4", label: "GUIDES",     href: "/how-to" },
  { num: "5", label: "PRODUCTS",   href: "/products" },
  { num: "6", label: "ABOUT",      href: "/about" },
  { num: "7", label: "CONTACT",    href: "/contact" },
];

export default function Home() {
  const [time, setTime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [animationOn, setAnimationOn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    document.body.setAttribute("data-page", "home");
    return () => {
      document.body.removeAttribute("data-page");
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTime(formatter.format(now));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    if (q.includes("printer") || q.includes("hp") || q.includes("canon") || q.includes("epson")) {
      router.push("/printer-support");
    } else if (q.includes("virus") || q.includes("malware")) {
      router.push("/virus-removal");
    } else if (q.includes("garmin") || q.includes("nuvi") || q.includes("dezl")) {
      router.push("/how-to/garmin-express");
    } else if (q.includes("gmail")) {
      router.push("/how-to/gmail-help");
    } else if (q.includes("facebook")) {
      router.push("/how-to/facebook-help");
    } else if (q.includes("gps") || q.includes("map")) {
      router.push("/gps-help");
    } else if (q.includes("computer") || q.includes("slow") || q.includes("pc")) {
      router.push("/computer-help");
    } else {
      router.push("/how-to");
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* 3D scene */}
      {animationOn ? <Scene3D /> : <StaticFallback />}

      {/* ─── HUD OVERLAY ────────────────────────────────────────────── */}

      {/* Top-left: brand mark */}
      <div className="fixed top-6 left-6 z-30 pointer-events-none">
        <div className="text-2xl md:text-3xl font-black tracking-tight">TRINI SYSTEM</div>
        <div className="text-xs text-white/60 mt-1 leading-tight">
          SENIOR-FRIENDLY TECH SUPPORT<br />
          NYC | EST. 2024 | PHONE-FIRST
        </div>
      </div>

      {/* Left sidebar: numbered nav */}
      <nav className="fixed top-32 left-6 z-30 hidden md:block">
        <ul className="space-y-2">
          {NAV_LINKS.map((link) => (
            <li key={link.num}>
              <Link
                href={link.href}
                className="group flex items-center gap-3 text-sm font-mono tracking-wider text-white/70 hover:text-white transition-colors"
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-full border border-white/30 text-xs group-hover:border-white group-hover:bg-white/10">
                  {link.num}
                </span>
                <span className="font-semibold">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom-left: status bar */}
      <div className="fixed bottom-6 left-6 z-30 text-xs font-mono text-white/60 pointer-events-auto">
        <div>
          ANIMATION{" "}
          <button
            onClick={() => setAnimationOn(true)}
            className={animationOn ? "text-white font-bold" : "hover:text-white/80"}
          >
            ON
          </button>{" "}
          /{" "}
          <button
            onClick={() => setAnimationOn(false)}
            className={!animationOn ? "text-white font-bold" : "hover:text-white/80"}
          >
            OFF
          </button>
        </div>
        <div className="mt-1">NEW YORK EST {time}</div>
      </div>

      {/* Top-right: phone CTA */}
      <a
        href={PHONE_HREF}
        className="fixed top-6 right-6 z-30 px-5 py-3 rounded-full bg-amber-500 text-black font-bold text-base md:text-lg shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.8)] transition-shadow"
      >
        📞 {PHONE}
      </a>

      {/* Top-center: scroll hint */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-30 hidden lg:block text-xs font-mono text-white/50 tracking-widest pointer-events-none">
        SCROLL TO ENTER ↓
      </div>

      {/* Bottom-center: search */}
      <form
        onSubmit={handleSearch}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4"
      >
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you need help with? (e.g. printer offline, gmail login)"
            className="w-full px-5 py-3.5 pr-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-amber-400 focus:bg-black/80 transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center hover:bg-amber-400 transition-colors"
            aria-label="Search"
          >
            →
          </button>
        </div>
      </form>

      {/* Bottom-right: skip link to indexed pages */}
      <Link
        href="/services"
        className="fixed bottom-6 right-6 z-30 hidden md:block text-xs font-mono text-white/50 hover:text-white tracking-widest"
      >
        SKIP TO TEXT VERSION →
      </Link>

      {/* SEO content for crawlers (hidden visually) */}
      <SemanticContent />
    </main>
  );
}

/* ════════════════════════════════════════════════════════════════════
   LOADING FALLBACK
═════════════════════════════════════════════════════════════════════ */

function LoadingFallback() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-10">
      <div className="text-3xl font-black tracking-tight mb-4 text-white">TRINI SYSTEM</div>
      <div className="text-sm text-white/60 font-mono mb-8">Loading 3D experience...</div>
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-amber-500 animate-pulse" style={{ width: "60%" }} />
      </div>
      <a href="tel:+13479531531" className="mt-12 text-sm text-amber-400 font-bold">
        Or call 347-953-1531 now
      </a>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   STATIC FALLBACK (when animation is off — same content as text version)
═════════════════════════════════════════════════════════════════════ */

const SERVICE_CARDS = [
  { title: "PRINTER HELP",       sub: "HP · Canon · Epson · Brother",  href: "/printer-support",       color: "from-blue-500 to-blue-700" },
  { title: "COMPUTER HELP",      sub: "Slow PC · Windows fix",         href: "/computer-help",         color: "from-violet-500 to-violet-700" },
  { title: "GPS HELP",           sub: "Maps · Updates · Routing",      href: "/gps-help",              color: "from-emerald-500 to-emerald-700" },
  { title: "VIRUS REMOVAL",      sub: "Malware · Pop-ups · Speed",     href: "/virus-removal",         color: "from-red-500 to-red-700" },
  { title: "GARMIN GPS",         sub: "Nuvi · DriveSmart · Watch",     href: "/garmin-gps-help",       color: "from-sky-500 to-sky-700" },
  { title: "GMAIL HELP",         sub: "Login · Recovery · Setup",      href: "/how-to/gmail-help",     color: "from-blue-500 to-blue-700" },
  { title: "FACEBOOK HELP",      sub: "Hacked · Recovery · Privacy",   href: "/how-to/facebook-help",  color: "from-blue-600 to-blue-800" },
  { title: "GARMIN APPS",        sub: "Express · Connect · Pilot",     href: "/how-to/garmin-express", color: "from-cyan-600 to-cyan-800" },
  { title: "HOW-TO GUIDES",      sub: "All step-by-step help",         href: "/how-to",                color: "from-amber-500 to-amber-700" },
  { title: "FREE PC CLEANER",    sub: "TriniCleaner download",         href: "/products",              color: "from-teal-500 to-teal-700" },
];

function StaticFallback() {
  return (
    <div className="absolute inset-0 overflow-y-auto bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-12">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
          Senior-friendly tech help. Real people.
        </h1>
        <p className="text-xl text-white/70 mb-10 max-w-2xl">
          Free guides for printers, computers, GPS, Gmail, Facebook, and Garmin. Or call a real person — under 15 minutes free.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {SERVICE_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`block rounded-2xl p-6 bg-gradient-to-br ${card.color} hover:scale-[1.02] transition-transform`}
            >
              <div className="text-2xl font-black mb-1">{card.title}</div>
              <div className="text-sm text-white/80">{card.sub}</div>
              <div className="text-xs mt-3 font-mono text-white/60">Open →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SEMANTIC CONTENT — hidden visually but visible to crawlers
═════════════════════════════════════════════════════════════════════ */

function SemanticContent() {
  return (
    <div className="sr-only" aria-hidden="false">
      <h1>Trini System — Senior-Friendly Tech Support USA</h1>
      <p>
        Trini System provides senior-friendly tech support across all 50 US states. Real
        technicians fix HP, Canon, Epson, and Brother printers remotely in minutes. We help
        seniors with slow computers, virus removal, Garmin GPS map updates, Gmail login
        problems, Facebook account recovery, and more. Free phone support under 15 minutes.
      </p>
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
      <p>
        Call <a href="tel:+13479531531">347-953-1531</a> for free senior tech support.
      </p>
    </div>
  );
}
