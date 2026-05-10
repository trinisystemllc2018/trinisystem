import Link from "next/link";
import dynamic from "next/dynamic";
import { BRANDS, SERVICES, REVIEWS, PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";

const SmartProblemFinder = dynamic(
  () => import("@/components/features/SmartProblemFinder").then((m) => m.SmartProblemFinder),
  { ssr: false }
);

/* ════════════════════════════════════════════════════════════════
   1. EIGHT-YEAR TRUST BANNER  ·  scroll-reveal staggered stats
═══════════════════════════════════════════════════════════════════ */
function EightYearTrustBanner() {
  const stats = [
    { num: "8+",     label: "Years in Business" },
    { num: "5,000+", label: "Devices Fixed" },
    { num: "47",     label: "5-Star Reviews" },
    { num: "50",     label: "US States" },
  ];
  return (
    <section className="relative py-14 px-4 overflow-hidden border-y border-orange-500/15"
      style={{ background: "linear-gradient(90deg, #0a0505 0%, #1a0a00 50%, #0a0505 100%)" }}>
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 40%), radial-gradient(circle at 80% 50%, #ef4444 0%, transparent 40%)",
        }} />
      <div className="relative max-w-6xl mx-auto">
        <p className="reveal-from-top text-center text-xs font-mono tracking-[0.25em] uppercase text-orange-300/80 mb-6">
          ⚡ Trusted Across America Since 2016 ⚡
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {stats.map((s, i) => (
            <div key={s.label}
              className="reveal-zoom text-center glass-card rounded-2xl py-5 px-2 card-hover-lift"
              data-stagger={i + 1}>
              <div className="big-number text-3xl md:text-4xl mb-1">{s.num}</div>
              <div className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-white/55">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   2. BRAND MARQUEE — infinite scrolling logos (uses .marquee-track)
═══════════════════════════════════════════════════════════════════ */
function BrandMarquee() {
  const items = [
    "🖨️ HP", "🔴 Canon", "🔵 Epson", "🔷 Brother", "🗺️ Garmin",
    "🪟 Windows", "🍎 macOS", "📱 iPhone", "🤖 Android", "📷 Logitech",
  ];
  return (
    <section className="py-10 px-0 overflow-hidden border-y border-white/5"
      style={{ background: "#000" }}>
      <p className="reveal-fade text-center text-[11px] font-bold uppercase tracking-[0.3em] text-orange-400 mb-6">
        We fix all your devices
      </p>
      <div className="marquee-mask">
        <div className="marquee-track marquee-track-slow text-2xl md:text-3xl font-black text-white/40 hover:text-white/70 transition-colors">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center gap-3 whitespace-nowrap">
              {item}
              <span className="text-orange-500/50 text-3xl">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   3. BRANDS SECTION — staggered tilt cards
═══════════════════════════════════════════════════════════════════ */
function BrandsSection() {
  const directions = ["reveal-from-left", "reveal-from-bottom", "reveal-from-bottom", "reveal-from-right"];
  return (
    <section className="py-16 md:py-20 px-4 spotlight" style={{ background: "#020005" }} aria-label="Brands">
      <div className="max-w-7xl mx-auto">
        <p className="reveal-fade text-center text-xs font-bold uppercase tracking-[0.3em] text-orange-400 mb-3">
          ━━━ All Major Printer Brands ━━━
        </p>
        <h2 className="reveal-from-top text-center text-3xl md:text-4xl font-black text-white mb-12">
          Supported &amp; <span className="text-gradient-sweep">Repaired Daily</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BRANDS.map((b, i) => (
            <Link key={b.name} href={b.href}
              className={`${directions[i]} card-hover-lift card-tilt click-ripple group flex flex-col gap-4 p-6 rounded-2xl transition-all`}
              data-stagger={i + 1}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black transition-transform group-hover:scale-110 group-hover:rotate-6"
                style={{
                  background: `${b.color}20`,
                  color: b.color,
                  border: `1px solid ${b.color}40`,
                  boxShadow: `0 0 20px ${b.color}30`,
                }}>
                {b.name[0]}
              </div>
              <div>
                <h3 className="font-black text-white text-lg mb-2 group-hover:text-orange-400 transition-colors">
                  {b.name}
                </h3>
                <div className="space-y-1">
                  {b.models.slice(0, 3).map((m) => (
                    <p key={m} className="text-xs text-white/40 font-mono">{m}</p>
                  ))}
                </div>
              </div>
              <div className="text-xs text-orange-400 font-semibold group-hover:translate-x-1 transition-transform">
                View support →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   4. CINEMATIC HERO STRIP — Ken Burns "video" panel
═══════════════════════════════════════════════════════════════════ */
function CinematicStrip() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] kb-frame kb-zoom-in kb-overlay overflow-hidden"
      aria-label="Real technicians, real fixes">
      {/* Background uses CSS-generated gradient that imitates a tech support workspace photo.
          Replace this background with a real <img className="kb-img" /> when you have hero photography. */}
      <div className="kb-img"
        style={{
          background:
            "linear-gradient(135deg, #200b00 0%, #3a1500 30%, #1a0500 70%, #000 100%), " +
            "radial-gradient(circle at 30% 30%, rgba(249,115,22,0.5) 0%, transparent 50%), " +
            "radial-gradient(circle at 70% 70%, rgba(239,68,68,0.4) 0%, transparent 50%)",
          backgroundBlendMode: "screen",
        }}
        aria-hidden="true" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <div className="reveal-from-top inline-block chip mb-6">
          🎯 Real People · Real Fixes
        </div>
        <h2 className="reveal-from-bottom font-black text-white leading-[1.05] mb-4"
          style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}>
          Behind every fix is a<br />
          <span className="text-gradient-sweep">real human technician.</span>
        </h2>
        <p className="reveal-from-bottom text-white/75 text-lg max-w-2xl mb-8" data-stagger="2">
          Not a chatbot. Not a script. A trained tech who&apos;ll stay on the line until your problem is solved.
        </p>
        <a href={PHONE_HREF}
          className="reveal-from-bottom cta-glow-ring click-ripple inline-flex items-center gap-3 font-black text-lg px-10 py-5 rounded-2xl text-white transition-all hover:scale-105"
          data-stagger="4"
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
            boxShadow: "0 12px 40px rgba(239,68,68,0.6)",
          }}>
          📞 Talk to a Technician — {PHONE}
        </a>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   5. SMART PROBLEM FINDER
═══════════════════════════════════════════════════════════════════ */
function SmartFinderSection() {
  return (
    <section className="py-16 px-4 spotlight" style={{ background: "#050008" }} aria-label="Smart problem finder">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className="reveal-fade text-xs font-bold uppercase tracking-[0.3em] text-orange-400 mb-3">
            ━━━ Diagnose in 30 Seconds ━━━
          </p>
          <h2 className="reveal-from-bottom text-3xl md:text-4xl font-black text-white mb-3">
            Tell us what&apos;s broken &mdash; we&apos;ll show the fix
          </h2>
        </div>
        <div className="reveal-zoom">
          <SmartProblemFinder />
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   6. SERVICES GRID — alternating directional reveals
═══════════════════════════════════════════════════════════════════ */
function ServicesGrid() {
  const colorMap: Record<string, string> = {
    blue: "#3b82f6", green: "#10b981", purple: "#a855f7",
    orange: "#f97316", red: "#ef4444", teal: "#14b8a6",
  };
  const dirs = [
    "reveal-from-left", "reveal-from-bottom", "reveal-from-right",
    "reveal-from-left", "reveal-from-bottom", "reveal-from-right",
    "reveal-from-left", "reveal-from-bottom", "reveal-from-right",
  ];
  return (
    <section className="py-20 px-4 relative mesh-bg spotlight" style={{ background: "#020005" }} aria-label="All services">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="reveal-from-left text-xs font-bold uppercase tracking-[0.3em] text-orange-400 mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-orange-500 inline-block" />Our Services
            </p>
            <h2 className="reveal-from-left text-3xl md:text-4xl font-black text-white" data-stagger="1">
              Every tech problem.<br />
              <span className="text-gradient-sweep">One trusted team.</span>
            </h2>
          </div>
          <Link href="/services"
            className="reveal-from-right text-orange-400 font-semibold hover:text-orange-300 flex items-center gap-1 transition-colors shrink-0">
            View all services →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.slice(0, 9).map((s, i) => {
            const c = colorMap[s.color] ?? "#f97316";
            return (
              <Link key={s.title} href={s.href}
                className={`${dirs[i]} card-hover-lift card-tilt click-ripple group relative rounded-2xl p-7 transition-all`}
                data-stagger={(i % 3) + 1}
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}>
                {s.popular && (
                  <div className="absolute top-5 right-5 text-[10px] font-black px-3 py-1 rounded-full text-white"
                    style={{ background: "linear-gradient(135deg, #f97316, #ef4444)", boxShadow: "0 0 12px rgba(239,68,68,0.5)" }}>
                    POPULAR
                  </div>
                )}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    background: `${c}15`,
                    border: `1px solid ${c}40`,
                    boxShadow: `0 0 16px ${c}30`,
                  }}>
                  {s.icon}
                </div>
                <h3 className="font-black text-white text-lg mb-2 group-hover:text-orange-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{s.description}</p>
                <div className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                  style={{ color: c }}>
                  Learn more <span className="service-card-arrow">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   7. HOW IT WORKS — alternating step cards
═══════════════════════════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { n: "01", icon: "📞", title: "Call or Click",        desc: "Reach us 24/7 — phone, web form, or click-to-callback." },
    { n: "02", icon: "🔍", title: "Free Diagnosis",       desc: "We diagnose the issue remotely while you watch — no charge." },
    { n: "03", icon: "🛠️", title: "Fix It Together",     desc: "Approve the fix, we do the work. Most issues take 15–30 min." },
    { n: "04", icon: "✅", title: "Pay Only When Fixed",  desc: "No fix = no fee. Pay only after you confirm it's working." },
  ];
  const dirs = ["reveal-from-left", "reveal-from-top", "reveal-from-bottom", "reveal-from-right"];
  return (
    <section className="py-20 px-4 spotlight" style={{ background: "linear-gradient(180deg, #020005 0%, #0a0505 100%)" }} aria-label="How it works">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="reveal-fade text-xs font-bold uppercase tracking-[0.3em] text-orange-400 mb-3">
            ━━━ How It Works ━━━
          </p>
          <h2 className="reveal-from-bottom text-4xl md:text-5xl font-black text-white mb-4">
            Fixed in <span className="text-gradient-sweep">4 simple steps</span>
          </h2>
          <p className="reveal-from-bottom text-white/55 text-lg" data-stagger="2">
            No technical knowledge needed · Senior-friendly
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.n}
              className={`${dirs[i]} card-hover-lift card-tilt relative rounded-2xl p-6 group`}
              data-stagger={i + 1}
              style={{
                background: "linear-gradient(135deg, rgba(249,115,22,0.04), rgba(0,0,0,0.4))",
                border: "1px solid rgba(249,115,22,0.15)",
              }}>
              <div className="absolute -top-3 -left-3 px-3 py-1 rounded-full text-xs font-black"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ef4444)",
                  color: "#fff",
                  boxShadow: "0 0 16px rgba(239,68,68,0.5)",
                }}>
                STEP {s.n}
              </div>
              <div className="text-5xl mb-4 mt-2 transition-transform group-hover:scale-110 group-hover:-translate-y-1">{s.icon}</div>
              <h3 className="font-black text-white text-xl mb-2">{s.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   8. AUTO-CAROUSEL — Recent Fixes (CSS scroll-snap, native)
═══════════════════════════════════════════════════════════════════ */
function RecentFixesCarousel() {
  const fixes = [
    { device: "HP DeskJet 4155e",  problem: "Offline error",          time: "12 min", icon: "🖨️", color: "#3b82f6" },
    { device: "Canon PIXMA MX922", problem: "B200 printhead error",   time: "18 min", icon: "🔴", color: "#ef4444" },
    { device: "Windows 11 laptop", problem: "Slow boot, junk files",  time: "25 min", icon: "💻", color: "#10b981" },
    { device: "Garmin DriveSmart", problem: "Maps failed to update",  time: "15 min", icon: "🗺️", color: "#0ea5e9" },
    { device: "Epson ET-2720",     problem: "Ink system error",       time: "22 min", icon: "🔵", color: "#007AB8" },
    { device: "Brother MFC-L2710", problem: "Driver unavailable",     time: "20 min", icon: "🔷", color: "#004B9C" },
    { device: "Gmail account",     problem: "Locked out, recovery",   time: "10 min", icon: "✉️", color: "#fb923c" },
    { device: "Facebook account",  problem: "Hacked, recovery",       time: "30 min", icon: "👥", color: "#a855f7" },
  ];

  return (
    <section className="py-20 px-4 spotlight" style={{ background: "#050008" }} aria-label="Recent fixes carousel">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="reveal-from-left text-xs font-bold uppercase tracking-[0.3em] text-orange-400 mb-3 flex items-center gap-2">
              <span className="pulse-dot" />Live Today
            </p>
            <h2 className="reveal-from-left text-3xl md:text-4xl font-black text-white">
              Fixes happening <span className="text-gradient-sweep">right now →</span>
            </h2>
          </div>
          <p className="reveal-from-right text-white/40 text-sm font-mono">
            Swipe →
          </p>
        </div>

        <div className="auto-carousel marquee-mask -mx-4 px-4">
          {fixes.map((f, i) => (
            <article key={i}
              className="reveal-from-bottom card-hover-lift relative rounded-2xl overflow-hidden"
              data-stagger={(i % 6) + 1}
              style={{
                width: "min(85vw, 320px)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                border: `1px solid ${f.color}33`,
                boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 8px 32px ${f.color}15`,
              }}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
                    {f.icon}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded-full"
                    style={{ background: "rgba(16,185,129,0.15)", color: "#34d399" }}>
                    ✓ FIXED
                  </span>
                </div>
                <h3 className="font-black text-white text-lg mb-1">{f.device}</h3>
                <p className="text-white/55 text-sm mb-4 leading-relaxed">{f.problem}</p>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-xs font-mono text-white/40">⏱ {f.time}</span>
                  <span className="text-xs font-bold" style={{ color: f.color }}>Today</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   9. SOCIAL PROOF — vertical marquee + activity cards
═══════════════════════════════════════════════════════════════════ */
function SocialProof() {
  const events = [
    { time: "2 min ago",  loc: "Brooklyn, NY",    msg: "HP DeskJet 4155e — fixed offline error" },
    { time: "8 min ago",  loc: "Dallas, TX",      msg: "Canon PIXMA B200 — resolved" },
    { time: "14 min ago", loc: "Chicago, IL",     msg: "Epson EcoTank ink reset complete" },
    { time: "23 min ago", loc: "Phoenix, AZ",     msg: "Garmin DriveSmart 65 — maps updated" },
    { time: "31 min ago", loc: "Miami, FL",       msg: "Windows 11 slow PC — TriniCleaner deployed" },
    { time: "47 min ago", loc: "Seattle, WA",     msg: "Brother MFC-L2710DW driver fixed" },
  ];
  const dirs = ["reveal-from-left", "reveal-from-right", "reveal-from-left",
                "reveal-from-right", "reveal-from-left", "reveal-from-right"];
  return (
    <section className="py-16 px-4 overflow-hidden" style={{ background: "#050008" }} aria-label="Recent activity">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="reveal-fade text-xs font-bold uppercase tracking-[0.3em] text-orange-400 mb-3">
            ━━━ Live Activity ━━━
          </p>
          <h2 className="reveal-from-bottom text-3xl md:text-4xl font-black text-white mb-2">
            Fixed in <span className="text-gradient-sweep">the last hour</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {events.map((e, i) => (
            <div key={i}
              className={`${dirs[i]} card-hover-lift flex items-center gap-3 px-5 py-3 rounded-xl`}
              data-stagger={(i % 4) + 1}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(16,185,129,0.15)",
              }}>
              <div className="pulse-dot flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white truncate">{e.msg}</div>
                <div className="text-[11px] text-white/40 font-mono mt-0.5">{e.time} · {e.loc}</div>
              </div>
              <span className="text-emerald-400 text-lg flex-shrink-0">✓</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   10. GOOGLE REVIEWS — horizontal auto-carousel + grid mix
═══════════════════════════════════════════════════════════════════ */
function GoogleReviewsSection() {
  const dirs = ["reveal-from-left", "reveal-from-bottom", "reveal-from-right",
                "reveal-from-left", "reveal-from-bottom", "reveal-from-right"];
  return (
    <section className="py-20 px-4 relative mesh-bg spotlight" style={{ background: "#020005" }} aria-label="Customer reviews">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="reveal-from-top inline-flex items-center gap-3 px-5 py-2 rounded-full mb-4"
            style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)" }}>
            <span className="text-orange-400 text-2xl">★★★★★</span>
            <span className="text-white font-black">4.9 / 5.0</span>
            <span className="text-white/40 text-sm font-mono">· 47 reviews</span>
          </div>
          <h2 className="reveal-from-bottom text-3xl md:text-4xl font-black text-white mb-3">
            What our <span className="text-gradient-sweep">customers say</span>
          </h2>
          <p className="reveal-from-bottom text-white/55 text-lg" data-stagger="2">
            Real Google reviews · Verified by Google Business
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.slice(0, 6).map((r, i) => (
            <div key={r.name}
              className={`${dirs[i]} card-hover-lift card-tilt review-card rounded-2xl p-6`}
              data-stagger={(i % 3) + 1}>
              <div className="text-orange-400 text-lg mb-3">{"★".repeat(r.stars)}</div>
              <p className="text-white/70 text-sm leading-relaxed mb-4 italic">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white"
                  style={{ background: "linear-gradient(135deg, #f97316, #ef4444)" }}>
                  {r.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-sm">{r.name}</div>
                  <div className="text-white/40 text-xs">{r.location}</div>
                </div>
              </div>
              <div className="mt-3 text-[10px] font-mono uppercase tracking-widest text-orange-400/70">
                Device: {r.device}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   11. COMPARISON — Trini vs Geek Squad with row-by-row reveals
═══════════════════════════════════════════════════════════════════ */
function ComparisonSection() {
  const rows = [
    { label: "Average Cost",         trini: "From $49",          geek: "$149+" },
    { label: "Wait Time",            trini: "< 30 minutes",      geek: "3–7 days" },
    { label: "Leave Home Required",  trini: "Never",             geek: "Yes" },
    { label: "Available Hours",      trini: "24/7",              geek: "Store hours" },
    { label: "Free Tools",           trini: "Yes — TriniCleaner", geek: "None" },
    { label: "Personal Technician",  trini: "Yes — always",      geek: "Varies" },
  ];
  return (
    <section className="py-20 px-4 spotlight" style={{ background: "linear-gradient(180deg, #050008 0%, #020005 100%)" }} aria-label="Comparison">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="reveal-from-top inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
            <span className="text-red-400 text-xs font-black uppercase tracking-widest">📊 Comparison</span>
          </div>
          <h2 className="reveal-from-bottom text-3xl md:text-4xl font-black text-white mb-3">
            Trini System <span className="text-gradient-sweep">vs</span> <span className="text-white/40">Geek Squad</span>
          </h2>
          <p className="reveal-from-bottom text-white/55 text-lg" data-stagger="2">
            Same-day service at half the price — without leaving your home.
          </p>
        </div>
        <div className="reveal-zoom rounded-3xl overflow-hidden card-hover-lift"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
            border: "1px solid rgba(249,115,22,0.2)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
          }}>
          <div className="grid grid-cols-3 border-b border-white/5"
            style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.08), transparent)" }}>
            <div className="p-4 text-[11px] font-mono font-bold uppercase tracking-widest text-white/40">Feature</div>
            <div className="p-4 text-center">
              <div className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full text-white"
                style={{ background: "linear-gradient(135deg, #f97316, #ef4444)" }}>
                ⚡ TRINI SYSTEM
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-xs font-semibold text-white/30">Geek Squad</div>
            </div>
          </div>
          {rows.map((r, i) => (
            <div key={r.label}
              className={`reveal-from-${i % 2 === 0 ? "left" : "right"} grid grid-cols-3 border-b border-white/5 transition-colors hover:bg-orange-500/5 ${i % 2 === 0 ? "" : "bg-black/20"}`}
              data-stagger={(i % 4) + 1}>
              <div className="p-4 text-sm font-medium text-white/70 flex items-center">{r.label}</div>
              <div className="p-4 text-center flex items-center justify-center">
                <span className="text-xs font-bold text-emerald-300 px-3 py-1.5 rounded-lg"
                  style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
                  ✓ {r.trini}
                </span>
              </div>
              <div className="p-4 text-center flex items-center justify-center">
                <span className="text-sm text-white/35">{r.geek}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href={PHONE_HREF}
            className="reveal-from-bottom cta-glow-ring click-ripple flex items-center justify-center gap-2 font-black py-4 px-8 rounded-2xl text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
              boxShadow: "0 8px 32px rgba(239,68,68,0.5)",
            }}>
            📞 Call {PHONE} — Available Now
          </a>
          <Link href="/contact"
            className="reveal-from-bottom glass-card click-ripple flex items-center justify-center gap-2 font-semibold py-4 px-8 rounded-2xl text-white transition-all hover:scale-105"
            data-stagger="2">
            Book Online →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   12. SENIOR-FRIENDLY GUIDES
═══════════════════════════════════════════════════════════════════ */
function GuidesSection() {
  const guides = [
    { icon: "✉️", title: "Gmail Help Center",     count: "47 guides", href: "/how-to/gmail-help",     color: "#ef4444" },
    { icon: "👥", title: "Facebook Help Center",  count: "38 guides", href: "/how-to/facebook-help",  color: "#f97316" },
    { icon: "🗺️", title: "Garmin GPS Help",      count: "31 guides", href: "/how-to/garmin-express", color: "#fb923c" },
    { icon: "🖨️", title: "Printer Setup Guides", count: "24 guides", href: "/how-to",                color: "#ef4444" },
  ];
  const dirs = ["reveal-from-left", "reveal-from-bottom", "reveal-from-bottom", "reveal-from-right"];
  return (
    <section className="py-20 px-4 spotlight" style={{ background: "#050008" }} aria-label="Senior guides">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="reveal-fade text-xs font-bold uppercase tracking-[0.3em] text-orange-400 mb-3">
            ━━━ Free Step-by-Step Guides ━━━
          </p>
          <h2 className="reveal-from-bottom text-4xl md:text-5xl font-black text-white mb-4">
            Written for <span className="text-gradient-sweep">seniors</span>
          </h2>
          <p className="reveal-from-bottom text-white/55 text-lg max-w-2xl mx-auto" data-stagger="2">
            Big text, clear screenshots, no jargon. Follow along at your own pace.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {guides.map((g, i) => (
            <Link key={g.title} href={g.href}
              className={`${dirs[i]} card-hover-lift card-tilt click-ripple group block rounded-2xl p-6 text-center transition-all`}
              data-stagger={i + 1}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                border: `1px solid ${g.color}25`,
              }}>
              <div className="text-4xl mb-3 transition-transform group-hover:scale-110 group-hover:rotate-6">{g.icon}</div>
              <h3 className="font-black text-white mb-1 group-hover:text-orange-400 transition-colors">{g.title}</h3>
              <div className="text-xs font-mono text-white/40">{g.count}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   13. TRINICLEANER DOWNLOAD CTA — KB-style background
═══════════════════════════════════════════════════════════════════ */
function DownloadCTASection() {
  return (
    <section className="relative py-20 md:py-24 px-4 overflow-hidden kb-frame kb-zoom-in kb-overlay-brand"
      aria-label="Free download">
      <div className="kb-img"
        style={{
          background:
            "linear-gradient(135deg, #1a0a00 0%, #2d0a00 50%, #1a0a00 100%)," +
            "radial-gradient(circle at 30% 30%, rgba(249,115,22,0.6), transparent 50%)," +
            "radial-gradient(circle at 70% 70%, rgba(239,68,68,0.5), transparent 50%)",
          backgroundBlendMode: "screen",
        }}
        aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          zIndex: 1,
        }} />
      <div className="relative max-w-4xl mx-auto text-center" style={{ zIndex: 3 }}>
        <div className="reveal-from-top text-7xl mb-4 animate-float inline-block">⚡</div>
        <h2 className="reveal-from-bottom text-3xl md:text-5xl font-black text-white mb-4">
          Is your PC <span className="text-gradient-sweep">running slow?</span>
        </h2>
        <p className="reveal-from-bottom text-orange-100/80 text-xl mb-8 max-w-2xl mx-auto leading-relaxed" data-stagger="2">
          Download <strong className="text-white">TriniCleaner</strong> free — removes gigabytes of junk in 60 seconds.<br className="hidden md:block" />
          No subscription, no upsells, no nonsense.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href={DOWNLOAD_URL}
            className="reveal-zoom cta-glow-ring click-ripple flex items-center gap-3 font-black text-lg px-10 py-5 rounded-2xl text-white transition-all hover:scale-105"
            data-stagger="3"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
              boxShadow: "0 12px 48px rgba(239,68,68,0.6)",
            }}>
            <span className="text-2xl">⬇</span> Download TriniCleaner — Free
          </a>
          <div className="reveal-from-right text-orange-200/70 text-sm" data-stagger="4">
            Works on Windows 7, 8, 10 &amp; 11<br />No sign-up. Instant download.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   14. FINAL CTA — typewriter + gradient
═══════════════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="py-20 px-4 spotlight" style={{ background: "#000" }} aria-label="Final CTA">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="reveal-from-bottom text-4xl md:text-5xl font-black text-white mb-4">
          Ready to <span className="text-gradient-sweep">get help?</span>
        </h2>
        <p className="reveal-from-bottom text-white/60 text-lg mb-10" data-stagger="2">
          Real technicians waiting. Free first call. No fix = no fee.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={PHONE_HREF}
            className="reveal-from-left cta-glow-ring click-ripple flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-xl text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
              boxShadow: "0 12px 40px rgba(239,68,68,0.6)",
            }}>
            📞 {PHONE}
          </a>
          <Link href="/contact"
            className="reveal-from-right glass-card click-ripple flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-xl text-white transition-all hover:scale-105">
            Send a Message →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPOSED EXPORT
═══════════════════════════════════════════════════════════════════ */
export default function BelowFoldSections() {
  return (
    <>
      <EightYearTrustBanner />
      <BrandMarquee />
      <BrandsSection />
      <CinematicStrip />
      <SmartFinderSection />
      <ServicesGrid />
      <HowItWorks />
      <RecentFixesCarousel />
      <SocialProof />
      <GoogleReviewsSection />
      <ComparisonSection />
      <GuidesSection />
      <DownloadCTASection />
      <FinalCTA />
    </>
  );
}
