"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      <p className="text-white/40 text-xs font-mono tracking-widest text-center mb-4 uppercase">
        ↓ Type your problem or tap a quick fix ↓
      </p>

      <form onSubmit={e => { e.preventDefault(); submit(query); }} role="search">
        <div
          className="relative flex items-center rounded-2xl overflow-hidden transition-all duration-300"
          style={{
            background: focused ? "#ffffff" : "#f8fafc",
            boxShadow: focused
              ? "0 0 0 3px rgba(249,115,22,0.5), 0 0 0 1px rgba(245,158,11,0.8), 0 24px 60px rgba(0,0,0,0.5)"
              : "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
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
            style={{
              background: "linear-gradient(135deg, #f97316, #c2410c)",
              boxShadow: "0 4px 20px rgba(249,115,22,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
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
            className="px-4 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(249,115,22,0.15)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.4)";
              (e.currentTarget as HTMLElement).style.color = "#fb923c";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
            }}
          >
            {q.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
