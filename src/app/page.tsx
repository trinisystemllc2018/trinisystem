"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SmartProblemFinder } from "@/components/features/SmartProblemFinder";
import { ReviewsCarousel, TrustSection } from "@/components/sections/ReviewsSection";
import { StickyCTA } from "@/components/ui/Button";
import { EightYearTrustBanner, GoogleReviewsSection } from "@/components/sections/GoogleTrustSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { BRANDS, SERVICES, DOWNLOAD_URL, PHONE_HREF, PHONE } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE — Hero inlined here so it always deploys correctly
═══════════════════════════════════════════════════════════════ */

const CATS = [
  { id:"printer",  label:"Printer",       sub:"HP · Canon · Epson · Brother",  href:"/fix?cat=printer",  glow:"59,130,246",  from:"#2563eb", to:"#1d4ed8", icon:"🖨️" },
  { id:"gps",      label:"GPS",           sub:"Garmin · TomTom · Magellan",    href:"/gps-help",         glow:"20,184,166",  from:"#0d9488", to:"#059669", icon:"🗺️" },
  { id:"computer", label:"Computer",      sub:"Dell · HP · Lenovo · Gateway",  href:"/computer-help",    glow:"139,92,246",  from:"#7c3aed", to:"#6d28d9", icon:"💻" },
  { id:"virus",    label:"Virus Removal", sub:"Norton · McAfee · Avast · AVG", href:"/virus-removal",   glow:"239,68,68",   from:"#dc2626", to:"#b91c1c", icon:"🛡️" },
];

const HINTS = [
  "HP DeskJet 4155e offline...","Garmin map won't update...",
  "Dell laptop running slow...","I think I have a virus...",
  "Canon printer error B200...","Epson EcoTank ink error...",
  "TomTom GPS not turning on...","McAfee keeps popping up...",
  "Brother printer not found...","Windows 11 running slow...",
];

const KEYWORDS: Record<string,string> = {
  printer:"hp canon epson brother offline ink paper cartridge not printing error printer",
  gps:"gps garmin tomtom magellan maps navigation update signal satellite",
  computer:"computer pc laptop windows slow dell lenovo gateway freeze crash boot",
  virus:"virus malware norton mcafee avast avg malwarebytes ccleaner security scam hacked pop",
};

// ── Printer card animation ──
function PrinterAnim() {
  return (
    <div className="flex flex-col items-center gap-1 mb-1 h-16 justify-end">
      <motion.div animate={{ y:[0,-5,0] }} transition={{ duration:0.9, repeat:Infinity, ease:"easeInOut" }}
        className="w-16 h-11 rounded-xl border-2 border-white/40 flex items-end justify-center pb-1.5"
        style={{ background:"rgba(255,255,255,0.15)" }}>
        <div className="w-11 h-1.5 rounded bg-white/70" />
      </motion.div>
      <motion.div
        initial={{ scaleX:0, opacity:0 }} animate={{ scaleX:[0,1,1,0], opacity:[0,1,1,0] }}
        transition={{ duration:2, repeat:Infinity, repeatDelay:0.3, ease:"easeInOut" }}
        style={{ originX:0 }}
        className="w-11 h-2.5 bg-white/85 rounded shadow-sm"
      />
    </div>
  );
}

// ── GPS card animation ──
function GpsAnim() {
  return (
    <div className="flex items-center justify-center mb-1 h-16">
      <div className="relative">
        <div className="w-12 h-16 rounded-xl border-2 border-white/40 flex items-center justify-center shadow-md" style={{ background:"rgba(255,255,255,0.15)" }}>
          <span className="text-xl">📍</span>
        </div>
        {[0,1,2].map(i=>(
          <motion.div key={i} className="absolute inset-0 rounded-xl border-2 border-white/60"
            animate={{ scale:[1,2.4], opacity:[0.7,0] }}
            transition={{ duration:1.8, repeat:Infinity, delay:i*0.6, ease:"easeOut" }} />
        ))}
      </div>
    </div>
  );
}

// ── Computer card animation ──
function ComputerAnim() {
  return (
    <div className="flex flex-col items-center gap-0.5 mb-1 h-16 justify-end">
      <div className="w-20 h-12 rounded-lg border-2 border-white/40 flex items-center justify-center overflow-hidden" style={{ background:"rgba(255,255,255,0.15)" }}>
        <motion.div animate={{ x:["-130%","130%"] }} transition={{ duration:1.5, repeat:Infinity, ease:"linear" }}
          className="w-8 h-1.5 bg-white/80 rounded-full" style={{ filter:"blur(1px)" }} />
      </div>
      <div className="w-20 h-1 bg-white/25 rounded-full" />
      <div className="w-12 h-1.5 bg-white/15 rounded-full" />
    </div>
  );
}

// ── Virus/Shield card animation ──
function VirusAnim() {
  return (
    <div className="flex items-center justify-center mb-1 h-16">
      <div className="relative">
        <motion.div animate={{ scale:[1,1.15,1], rotate:[0,4,-4,0] }} transition={{ duration:2.2, repeat:Infinity, ease:"easeInOut" }}
          className="text-5xl select-none">🛡️</motion.div>
        <motion.div animate={{ rotate:360 }} transition={{ duration:4, repeat:Infinity, ease:"linear" }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-white/35" style={{ transform:"scale(1.7)" }} />
      </div>
    </div>
  );
}

const CARD_ANIMS: Record<string, ()=>React.ReactElement> = {
  printer: PrinterAnim, gps: GpsAnim, computer: ComputerAnim, virus: VirusAnim,
};

// ══════════════════════════════════════════════════════════════
// HERO SECTION
// ══════════════════════════════════════════════════════════════
function HomeHero() {
  const router = useRouter();
  const [query, setQuery]     = useState("");
  const [hint, setHint]       = useState(0);
  const [focused, setFocused] = useState(false);
  const [matchId, setMatchId] = useState<string|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    const t = setInterval(()=>setHint(h=>(h+1)%HINTS.length), 2600);
    return ()=>clearInterval(t);
  },[]);

  useEffect(()=>{
    if(!query.trim()){ setMatchId(null); return; }
    const q = query.toLowerCase();
    const found = CATS.find(c=>KEYWORDS[c.id].split(" ").some(k=>q.includes(k)));
    setMatchId(found?.id ?? null);
  },[query]);

  const go = (href:string) => router.push(href);
  const matched = CATS.find(c=>c.id===matchId) ?? null;

  const handleSearch = ()=>{
    if(matched){ go(matched.href); return; }
    if(query.trim()){ go(`/fix?q=${encodeURIComponent(query)}`); return; }
    go("/fix");
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20"
      style={{ background:"linear-gradient(135deg,#0f172a 0%,#1e1b4b 45%,#0f172a 100%)" }}>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.055]" style={{ backgroundImage:"linear-gradient(#818cf8 1px,transparent 1px),linear-gradient(90deg,#818cf8 1px,transparent 1px)", backgroundSize:"56px 56px" }} />

      {/* Glow blobs */}
      <motion.div animate={{ scale:[1,1.35,1], opacity:[0.12,0.3,0.12] }} transition={{ duration:7, repeat:Infinity }}
        className="absolute top-16 left-8 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle,#3b82f6,transparent 70%)", filter:"blur(70px)" }} />
      <motion.div animate={{ scale:[1,1.2,1], opacity:[0.08,0.22,0.08] }} transition={{ duration:9, repeat:Infinity, delay:3 }}
        className="absolute bottom-16 right-8 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle,#8b5cf6,transparent 70%)", filter:"blur(70px)" }} />
      <motion.div animate={{ scale:[1,1.45,1], opacity:[0.06,0.18,0.06] }} transition={{ duration:11, repeat:Infinity, delay:5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(ellipse,#06b6d4,transparent 70%)", filter:"blur(90px)" }} />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">

        {/* Live indicator */}
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55 }}
          className="inline-flex items-center gap-2.5 border border-white/15 rounded-full px-5 py-2 mb-10 backdrop-blur-sm"
          style={{ background:"rgba(255,255,255,0.06)" }}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span className="text-white/70 text-xs font-semibold tracking-widest uppercase">Technician Available Now · {PHONE}</span>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1, ease:[0.16,1,0.3,1] }}>
          <h1 className="font-black text-white tracking-tight leading-[1.0] mb-4" style={{ fontSize:"clamp(2.8rem,7vw,5.5rem)" }}>
            Tech Problem?
          </h1>
          <h1 className="font-black tracking-tight leading-[1.0] mb-6" style={{ fontSize:"clamp(2.8rem,7vw,5.5rem)", background:"linear-gradient(90deg,#60a5fa 0%,#34d399 35%,#a78bfa 65%,#60a5fa 100%)", backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"shimmerText 4s linear infinite" }}>
            Search Solution Below
          </h1>
        </motion.div>

        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.35 }}
          className="text-white/45 text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Type your problem or tap a category — instant fix guide
        </motion.p>

        {/* ── SEARCH BAR ── */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.45 }} className="mb-4">
          <div className="flex items-center bg-white rounded-2xl"
            style={{ boxShadow: focused ? "0 0 0 4px rgba(99,102,241,0.4),0 24px 64px rgba(0,0,0,0.45)" : "0 24px 64px rgba(0,0,0,0.4)" }}>
            <span className="pl-5 text-2xl shrink-0 select-none">🔍</span>
            <div className="relative flex-1 min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e=>setQuery(e.target.value)}
                onFocus={()=>setFocused(true)}
                onBlur={()=>setFocused(false)}
                onKeyDown={e=>e.key==="Enter"&&handleSearch()}
                className="w-full px-4 py-5 text-base md:text-lg text-gray-900 font-semibold bg-transparent outline-none"
                style={{ caretColor:"#2563eb" }}
                placeholder=" "
                autoComplete="off"
              />
              {!query && !focused && (
                <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                  <AnimatePresence mode="wait">
                    <motion.span key={hint}
                      initial={{ opacity:0, y:5 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-5 }}
                      transition={{ duration:0.35 }} className="text-gray-400 text-base font-medium truncate">
                      {HINTS[hint]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
            </div>
            <AnimatePresence>
              {matched && (
                <motion.span initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.7 }}
                  className="flex items-center gap-1.5 mx-2 px-3 py-1.5 rounded-xl text-white text-xs font-black whitespace-nowrap"
                  style={{ background:`linear-gradient(135deg,${matched.from},${matched.to})` }}>
                  {matched.icon} {matched.label}
                </motion.span>
              )}
            </AnimatePresence>
            <button onClick={handleSearch}
              className="m-2 text-white font-black px-5 md:px-7 py-3.5 rounded-xl transition-all active:scale-95 text-sm md:text-base shrink-0"
              style={{ background:"linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow:"0 4px 18px rgba(79,70,229,0.55)" }}>
              Fix It →
            </button>
          </div>

          {/* Quick search chips */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {["Printer offline","GPS map update","Slow computer","Virus removal","HP error code","Garmin not working"].map(chip=>(
              <button key={chip} onClick={()=>{ setQuery(chip); inputRef.current?.focus(); }}
                className="text-xs text-white/50 hover:text-white/90 border border-white/10 hover:border-white/25 px-3 py-1.5 rounded-full transition-all"
                style={{ background:"rgba(255,255,255,0.04)" }}>
                {chip}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── 4 BRIGHT CATEGORY CARDS ── */}
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {CATS.map((cat, i)=>{
            const Anim = CARD_ANIMS[cat.id];
            return (
              <motion.button key={cat.id} onClick={()=>go(cat.href)}
                initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65+i*0.08 }}
                whileHover={{ y:-7, scale:1.05 }} whileTap={{ scale:0.96 }}
                className="relative overflow-hidden rounded-3xl p-5 text-left flex flex-col cursor-pointer"
                style={{
                  background:`linear-gradient(140deg,${cat.from},${cat.to})`,
                  boxShadow:`0 8px 32px rgba(${cat.glow},0.55),0 2px 8px rgba(0,0,0,0.3)`,
                  minHeight:"200px",
                }}>
                {/* Shimmer */}
                <motion.div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background:"linear-gradient(135deg,rgba(255,255,255,0.12) 0%,rgba(255,255,255,0) 60%)" }} />
                {/* Corner glow */}
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-25"
                  style={{ background:"radial-gradient(circle,white,transparent)" }} />

                {/* Animation */}
                <Anim />

                {/* Text */}
                <p className="font-black text-white text-xl md:text-2xl leading-tight mt-1">{cat.label}</p>
                <p className="text-white/55 text-xs mt-1 leading-snug">{cat.sub}</p>

                {/* Arrow */}
                <div className="mt-auto pt-4 flex items-center gap-1.5 text-white/65 hover:text-white text-sm font-bold transition-colors">
                  Fix now
                  <motion.span animate={{ x:[0,5,0] }} transition={{ duration:1.3, repeat:Infinity, ease:"easeInOut" }}>→</motion.span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Trust strip */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.0 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10 text-white/25 text-sm">
          {["⚡ Avg response < 15 min","🛡️ No fix = no fee","🌎 All 50 US states","⭐ 4.9 Google rating",`📞 ${PHONE}`].map(b=>(
            <span key={b} className="font-medium">{b}</span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2.2, repeat:Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ color:"rgba(255,255,255,0.18)" }}>
        <span className="text-xs font-medium uppercase tracking-widest">scroll down</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M19 9l-7 7-7-7"/></svg>
      </motion.div>

      <style>{`@keyframes shimmerText{0%{background-position:0% center}100%{background-position:200% center}}`}</style>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// REST OF HOME PAGE SECTIONS (unchanged)
// ══════════════════════════════════════════════════════════════

function BrandsSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
          All Major Printer Brands — Supported &amp; Repaired
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {BRANDS.map((b) => (
            <Link key={b.name} href={b.href}
              className="group flex flex-col gap-4 p-6 rounded-3xl border-2 border-gray-100 hover:border-blue-200 bg-white hover:bg-blue-50/40 transition-all hover:-translate-y-1 hover:shadow-soft">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-black"
                style={{ background: b.bgColor, color: b.color }}>{b.name[0]}</div>
              <div>
                <h3 className="font-black text-gray-900 text-lg mb-1 group-hover:text-blue-700 transition-colors">{b.name}</h3>
                <div className="space-y-1">
                  {b.models.slice(0,3).map(m=>(<p key={m} className="text-xs text-gray-500 font-mono">{m}</p>))}
                </div>
              </div>
              <div className="text-xs text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">View support →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const colorMap: Record<string,string> = {
    blue:"bg-blue-50 border-blue-100 text-blue-600",green:"bg-emerald-50 border-emerald-100 text-emerald-600",
    purple:"bg-purple-50 border-purple-100 text-purple-600",orange:"bg-orange-50 border-orange-100 text-orange-600",
    red:"bg-red-50 border-red-100 text-red-600",teal:"bg-teal-50 border-teal-100 text-teal-600",
  };
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 flex items-center gap-2">
              <span className="w-5 h-px bg-blue-400 inline-block" />Our Services
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Every tech problem.<br />One trusted team.</h2>
          </div>
          <Link href="/services" className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 transition-colors shrink-0">View all services →</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s)=>(
            <Link key={s.title} href={s.href}
              className="group relative bg-white rounded-3xl p-7 border-2 border-gray-100 hover:border-blue-200 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
              {s.popular&&(<div className="absolute top-5 right-5 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">Popular</div>)}
              <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-2xl mb-5 ${colorMap[s.color]}`}>{s.icon}</div>
              <h3 className="font-black text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.description}</p>
              <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">Learn more <span>→</span></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const rows = [
    { label:"Average Cost",        trini:"From $49",     geek:"$149+" },
    { label:"Wait Time",           trini:"< 30 minutes", geek:"3–7 days" },
    { label:"Leave Home Required", trini:"Never",        geek:"Yes" },
    { label:"Available Hours",     trini:"24/7",         geek:"Store hours" },
    { label:"Free Tools",          trini:"Yes — TriniCleaner", geek:"None" },
    { label:"Personal Technician", trini:"Yes — always", geek:"Varies" },
  ];
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-red-200">📊 Comparison</div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Trini System vs. Geek Squad</h2>
          <p className="text-lg text-gray-600">Same-day service at half the price — without leaving your home.</p>
        </div>
        <div className="bg-white rounded-3xl shadow-soft-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
            <div className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Feature</div>
            <div className="p-4 text-center"><div className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-sm font-bold px-3 py-1.5 rounded-full">TS Trini System</div></div>
            <div className="p-4 text-center"><div className="text-sm font-semibold text-gray-400">Geek Squad</div></div>
          </div>
          {rows.map((r,i)=>(
            <div key={r.label} className={`grid grid-cols-3 border-b border-gray-50 ${i%2===0?"":"bg-gray-50/50"}`}>
              <div className="p-4 text-sm font-medium text-gray-700 flex items-center">{r.label}</div>
              <div className="p-4 text-center flex items-center justify-center">
                <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100">✓ {r.trini}</span>
              </div>
              <div className="p-4 text-center flex items-center justify-center"><span className="text-sm text-gray-400">{r.geek}</span></div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-brand hover:from-blue-700 hover:to-blue-800 transition-all">📞 Call {PHONE} — Available Now</a>
          <Link href="/contact" className="flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold py-4 px-8 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all">Book Online →</Link>
        </div>
      </div>
    </section>
  );
}

function DownloadCTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-emerald-600 to-teal-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage:"radial-gradient(circle, white 1px, transparent 1px)", backgroundSize:"24px 24px" }} />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-6xl mb-4">⚡</div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Is Your PC Running Slow?</h2>
        <p className="text-emerald-100 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">Download TriniCleaner free — removes gigabytes of junk in 60 seconds. No subscription, no upsells, no nonsense.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href={DOWNLOAD_URL} className="flex items-center gap-3 bg-white text-emerald-700 font-black text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all active:scale-95">
            <span className="text-2xl">⬇</span>Download TriniCleaner — Free
          </a>
          <div className="text-emerald-200 text-sm">Works on Windows 7, 8, 10 &amp; 11<br />No sign-up. Instant download.</div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <EightYearTrustBanner />
      <BrandsSection />
      <SmartProblemFinder />
      <ServicesGrid />
      <TrustSection />
      <GoogleReviewsSection />
      <SocialProofSection />
      <ComparisonSection />
      <DownloadCTASection />
      <StickyCTA />
    </>
  );
}
