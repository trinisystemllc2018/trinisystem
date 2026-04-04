"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE, PHONE_HREF } from "@/lib/utils";

const CATEGORIES = [
  { id: "printer", emoji: "🖨️", label: "Printer",           sub: "HP · Canon · Epson · Brother",    href: "/fix?cat=printer",  keywords: ["printer","hp","canon","epson","brother","offline","ink","paper","not printing"] },
  { id: "gps",     emoji: "🗺️", label: "GPS",               sub: "Garmin · TomTom · Magellan",       href: "/fix?cat=gps",      keywords: ["gps","garmin","tomtom","magellan","maps","navigation","update"] },
  { id: "computer",emoji: "💻", label: "Computer",          sub: "Dell · HP · Lenovo · Gateway",     href: "/fix?cat=computer", keywords: ["computer","pc","laptop","windows","slow","dell","lenovo","gateway","freeze","crash"] },
  { id: "virus",   emoji: "🛡️", label: "Virus & Security",  sub: "Norton · McAfee · Avast · AVG",    href: "/fix?cat=virus",    keywords: ["virus","malware","norton","mcafee","avast","avg","malwarebytes","ccleaner","security","scam","hacked"] },
];

const SEARCH_HINTS = [
  "HP DeskJet 4155e offline...", "Garmin map won't update...",
  "Dell laptop running slow...", "I think I have a virus...",
  "Canon printer error B200...", "Epson EcoTank ink error...",
  "TomTom GPS not turning on...", "McAfee keeps popping up...",
];

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [hint, setHint] = useState(0);
  const [focused, setFocused] = useState(false);
  const [matched, setMatched] = useState<typeof CATEGORIES[0] | null>(null);

  useEffect(() => {
    const t = setInterval(() => setHint(h => (h + 1) % SEARCH_HINTS.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!query.trim()) { setMatched(null); return; }
    const q = query.toLowerCase();
    setMatched(CATEGORIES.find(c => c.keywords.some(k => q.includes(k))) ?? null);
  }, [query]);

  const go = (href: string) => router.push(href);
  const handleSearch = () => {
    if (matched) { go(matched.href); return; }
    if (query.trim()) { go(`/fix?q=${encodeURIComponent(query)}`); return; }
    go("/fix");
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-gray-950 px-4">
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#60a5fa 1px,transparent 1px),linear-gradient(90deg,#60a5fa 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
      {/* Glow blobs */}
      <motion.div animate={{ scale:[1,1.15,1], opacity:[0.3,0.5,0.3] }} transition={{ duration:6, repeat:Infinity }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <motion.div animate={{ scale:[1,1.2,1], opacity:[0.2,0.4,0.2] }} transition={{ duration:8, repeat:Infinity, delay:2 }} className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">Technician Available Now · {PHONE}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }} className="text-5xl md:text-7xl font-black text-white leading-[1.02] tracking-tight mb-4">
          Fix Your<span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">Tech Problem</span>Right Now.
        </motion.h1>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }} className="text-white/50 text-lg mb-10">
          Search your problem below — or pick a category to start your fix
        </motion.p>

        {/* Search */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }} className="relative mb-4">
          <div className={`flex items-center bg-white rounded-2xl shadow-2xl transition-all duration-300 ${focused ? "ring-4 ring-blue-500/40" : ""}`}>
            <span className="pl-5 text-2xl shrink-0">🔍</span>
            <div className="relative flex-1">
              <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
                className="w-full px-4 py-5 text-lg text-gray-900 font-medium bg-transparent outline-none" placeholder=" " />
              {!query && (
                <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                  <AnimatePresence mode="wait">
                    <motion.span key={hint} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.4 }} className="text-gray-400 text-base font-medium">
                      {SEARCH_HINTS[hint]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
            </div>
            {matched && (
              <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} className="px-3 py-1.5 mx-2 rounded-xl bg-blue-600 text-white text-xs font-bold whitespace-nowrap">
                {matched.emoji} {matched.label}
              </motion.div>
            )}
            <button onClick={handleSearch} className="m-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black px-6 py-3 rounded-xl transition-all shrink-0 text-base">
              Fix It →
            </button>
          </div>
        </motion.div>

        {/* Category tiles */}
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }} className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {CATEGORIES.map((cat, i) => (
            <motion.button key={cat.id} onClick={() => go(cat.href)}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.55 + i * 0.07 }}
              whileHover={{ y:-4, scale:1.03 }} whileTap={{ scale:0.97 }}
              className="group relative border-2 rounded-2xl p-4 text-left transition-all duration-200 bg-white/5 border-white/10 hover:bg-white/12 hover:border-white/30 backdrop-blur">
              <div className="text-4xl mb-2">{cat.emoji}</div>
              <p className="font-black text-white text-lg leading-tight">{cat.label}</p>
              <p className="text-white/40 text-xs mt-1 leading-snug">{cat.sub}</p>
              <div className="absolute top-3 right-3 text-white/20 group-hover:text-white/60 transition-colors text-sm">→</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Trust row */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.85 }} className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-white/30 text-sm">
          {["⚡ Under 15 min", "🛡️ No fix = no fee", "🌎 All 50 states", "⭐ 4.9 rating", `📞 ${PHONE}`].map(b => (
            <span key={b} className="font-medium">{b}</span>
          ))}
        </motion.div>
      </div>

      <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2, repeat:Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-xs flex flex-col items-center gap-1">
        <span>scroll</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7"/></svg>
      </motion.div>
    </section>
  );
}
