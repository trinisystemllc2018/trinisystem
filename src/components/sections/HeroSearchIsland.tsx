"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ════════════════════════════════════════════════════════════════
   HERO SEARCH ISLAND
   Tiny client component — only the search box hydrates immediately.
   Everything else on the page stays as a static server-rendered shell
   so the LCP element (headline) is in the HTML on first paint.
═══════════════════════════════════════════════════════════════════ */

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

const HINTS = [
  "HP printer offline…",
  "Garmin map won't update…",
  "My PC is running slow…",
  "Gmail login problem…",
  "Facebook account hacked…",
  "Virus / pop-up ads…",
  "Canon error B200…",
  "Epson ink error…",
];

export function HeroSearchIsland() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [hint, setHint] = useState(0);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setHint(h => (h + 1) % HINTS.length), 2800);
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

  return (
    <div className="w-full max-w-3xl mx-auto">
      <p className="text-white/60 text-sm font-mono tracking-widest text-center mb-4 uppercase">
        ↓ Type your problem or tap a quick fix below ↓
      </p>

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
            {!query && !focused && (
              <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                <span key={hint} className="text-gray-400 text-base font-medium truncate animate-fade-in">
                  {HINTS[hint]}
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
