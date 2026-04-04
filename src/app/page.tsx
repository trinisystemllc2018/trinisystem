import type { Metadata } from "next";
import Link from "next/link";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";
import { StickyCTA } from "@/components/ui/Button";
import { GoogleReviewsSection } from "@/components/sections/GoogleTrustSection";

export const metadata: Metadata = {
  title: "Fix Printer, GPS & PC Problems in Minutes | Trini System LLC",
  description: "Is your printer offline? GPS not updating? PC running slow? Get instant remote help from real technicians. HP, Canon, Epson, Brother. Free diagnosis. Call 347-953-1531.",
  keywords: [
    "printer repair near me","hp printer offline fix","epson printer not printing",
    "canon printer repair","garmin gps update help","computer running slow fix",
    "tech support 24/7","printer repair nyc","senior tech support","remote printer repair",
  ],
};

// FAQ Schema for LLM + Google rich results
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I fix my HP printer showing offline?",
      "acceptedAnswer": { "@type": "Answer", "text": "Restart your printer and router. On Windows go to Settings → Printers → right-click HP → See what's printing → Printer menu → uncheck Use Printer Offline. If still offline, call 347-953-1531 for a free 15-minute remote fix." }},
    { "@type": "Question", "name": "Why is my Epson EcoTank showing an ink error when tanks are full?",
      "acceptedAnswer": { "@type": "Answer", "text": "EcoTank ink errors are almost never real ink shortages — they're sensor calibration issues. Run Head Cleaning from the Epson Utility. If it persists, the ink counter needs a software reset which we do remotely in 15 minutes." }},
    { "@type": "Question", "name": "How do I update my Garmin GPS maps?",
      "acceptedAnswer": { "@type": "Answer", "text": "Download Garmin Express from garmin.com/express, connect your GPS via USB, sign in with a free Garmin account, then click Add Map Updates. The download takes 30-90 minutes. We walk you through it remotely if needed." }},
    { "@type": "Question", "name": "Why is my computer so slow?",
      "acceptedAnswer": { "@type": "Answer", "text": "Slow PCs are almost always caused by junk files, too many startup programs, or a full disk. Download our free TriniCleaner to fix this in 5 minutes without any technical knowledge." }},
    { "@type": "Question", "name": "How much does remote printer repair cost?",
      "acceptedAnswer": { "@type": "Answer", "text": "Remote printer repair starts from $49. We offer a free diagnosis — if we can't fix it, you don't pay. Most issues are resolved in under 30 minutes. Call 347-953-1531." }},
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Fix HP Printer Offline",
  "description": "Step-by-step guide to fix HP printer showing offline in Windows",
  "step": [
    { "@type": "HowToStep", "name": "Restart devices", "text": "Power off HP printer and WiFi router. Unplug both for 30 seconds." },
    { "@type": "HowToStep", "name": "Restart in order", "text": "Plug in router first, wait 60 seconds, then power on HP printer." },
    { "@type": "HowToStep", "name": "Remove offline flag", "text": "Windows: Settings → Printers → click HP → Open queue → Printer menu → uncheck Use Printer Offline." },
    { "@type": "HowToStep", "name": "Test print", "text": "Click Print a test page. If it prints, problem solved." },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* ── HERO ──────────────────────────────────────────── */}
      <HeroSection />

      {/* ── PROBLEM PICKER (primary CTA) ──────────────────── */}
      <ProblemPicker />

      {/* ── TRUST BAR ─────────────────────────────────────── */}
      <TrustBar />

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <HowItWorks />

      {/* ── BRAND QUICK-SELECT ────────────────────────────── */}
      <BrandsSection />

      {/* ── GOOGLE REVIEWS ────────────────────────────────── */}
      <GoogleReviewsSection />

      {/* ── FAQ (LLM + Google rich results) ───────────────── */}
      <FAQSection />

      {/* ── VS GEEK SQUAD ─────────────────────────────────── */}
      <ComparisonStrip />

      {/* ── DOWNLOAD CTA ──────────────────────────────────── */}
      <DownloadCTA />

      <StickyCTA />
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   HERO — Pain-first headline, one dominant action
════════════════════════════════════════════════════════════ */
function HeroSection() {
  const problems = [
    "Printer shows offline",
    "Won't connect to WiFi",
    "GPS maps out of date",
    "Computer running slow",
    "Error code on screen",
    "Ink error after refill",
  ];

  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-blue-950 to-blue-900 text-white overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-sm font-semibold px-4 py-2 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Technician available now · Avg response &lt; 5 min
        </div>

        {/* Pain-first headline */}
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
          Tech Problem?
          <span className="block text-blue-300 mt-1">Fixed in Minutes.</span>
        </h1>

        <p className="text-blue-100 text-xl md:text-2xl mb-4 max-w-2xl mx-auto leading-relaxed">
          Real technicians fix your printer, GPS, or PC remotely — while you watch.
          <span className="text-white font-semibold"> No fix = no fee.</span>
        </p>

        {/* Scrolling problems */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {problems.map(p => (
            <span key={p} className="text-xs bg-white/10 border border-white/20 text-blue-200 px-3 py-1.5 rounded-full">
              {p}
            </span>
          ))}
        </div>

        {/* ONE dominant CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href={PHONE_HREF}
            className="flex items-center gap-3 bg-white text-blue-900 font-black text-xl px-10 py-5 rounded-2xl shadow-2xl hover:bg-blue-50 transition-all active:scale-95 w-full sm:w-auto justify-center">
            📞 Call 347-953-1531
            <span className="text-sm font-normal text-blue-600">Free diagnosis</span>
          </a>
          <Link href="/fix"
            className="flex items-center gap-2 bg-blue-600 border-2 border-blue-400 text-white font-bold text-lg px-8 py-5 rounded-2xl hover:bg-blue-500 transition-all w-full sm:w-auto justify-center">
            🔧 Diagnose My Problem
          </Link>
        </div>

        <p className="text-blue-300 text-sm mt-5">
          8 years · 5,000+ devices fixed · All 50 states · HP · Canon · Epson · Brother · Garmin
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   PROBLEM PICKER — The most important UX element for 40+ users
   Large buttons, plain language, one click to solution
════════════════════════════════════════════════════════════ */
function ProblemPicker() {
  const problems = [
    { icon: "🖨️", title: "My Printer Won't Work",    sub: "Offline, error, won't print",   href: "/fix",              color: "border-blue-200   hover:border-blue-500   hover:bg-blue-50"   },
    { icon: "📵", title: "Printer Shows Offline",      sub: "HP, Canon, Epson, Brother",    href: "/fix",              color: "border-red-200    hover:border-red-500    hover:bg-red-50"    },
    { icon: "🗺️", title: "GPS Maps Need Update",      sub: "Garmin all models",             href: "/fix",              color: "border-amber-200  hover:border-amber-500  hover:bg-amber-50"  },
    { icon: "🐌", title: "Computer Running Slow",      sub: "Windows 10 & 11",              href: "/fix",              color: "border-purple-200 hover:border-purple-500 hover:bg-purple-50" },
    { icon: "🦠", title: "Virus or Pop-Ups",           sub: "Safe malware removal",         href: "/virus-removal",    color: "border-red-200    hover:border-red-500    hover:bg-red-50"    },
    { icon: "📶", title: "WiFi Won't Connect",         sub: "Printer or device",             href: "/fix",              color: "border-teal-200   hover:border-teal-500   hover:bg-teal-50"   },
    { icon: "❌", title: "Error Code on Screen",       sub: "OXc19a0035, B200, E03, 49",    href: "/fix",              color: "border-orange-200 hover:border-orange-500 hover:bg-orange-50" },
    { icon: "💻", title: "Windows 11 Problems",        sub: "Crashes, updates, drivers",    href: "/fix",              color: "border-blue-200   hover:border-blue-500   hover:bg-blue-50"   },
    { icon: "📞", title: "Not Sure? Just Call Us",     sub: "Free diagnosis — no pressure", href: PHONE_HREF,          color: "border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 col-span-1 sm:col-span-2 lg:col-span-1" },
  ];

  return (
    <section className="py-16 md:py-20 bg-white" id="problems">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            What's your problem?
          </h2>
          <p className="text-gray-500 text-lg">Tap your issue — get an instant fix guide or we'll call you</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map(p => (
            <a key={p.title} href={p.href}
              className={`group flex items-start gap-4 p-5 rounded-2xl border-2 bg-white transition-all cursor-pointer ${p.color}`}>
              <span className="text-3xl mt-0.5 group-hover:scale-110 transition-transform">{p.icon}</span>
              <div>
                <p className="font-black text-gray-900 text-base mb-0.5">{p.title}</p>
                <p className="text-gray-500 text-sm">{p.sub}</p>
              </div>
              <span className="ml-auto text-gray-300 group-hover:text-gray-600 group-hover:translate-x-1 transition-all mt-1">→</span>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">Don't see your problem?</p>
          <Link href="/fix" className="text-blue-600 font-semibold hover:underline text-sm">
            Search any tech problem → get instant steps
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   TRUST BAR — Safety reassurance for 40+ users
════════════════════════════════════════════════════════════ */
function TrustBar() {
  const items = [
    { icon: "🏆", value: "8 Years", label: "In Business" },
    { icon: "⭐", value: "4.9★",    label: "Google Rating" },
    { icon: "✅", value: "5,000+",  label: "Devices Fixed" },
    { icon: "💰", value: "No Fix",  label: "= No Fee" },
    { icon: "🔒", value: "Safe",    label: "Remote Access" },
    { icon: "🗺️", value: "All 50", label: "US States" },
  ];

  return (
    <section className="py-10 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
          {items.map(item => (
            <div key={item.label}>
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="font-black text-gray-900 text-lg leading-none">{item.value}</div>
              <div className="text-gray-500 text-xs mt-1">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-6 max-w-lg mx-auto">
          We connect to your device remotely — you can watch everything we do on your screen. We never access anything without your permission.
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   HOW IT WORKS — 3 steps, dead simple for 40+ users
════════════════════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { num: "1", icon: "📞", title: "You call or click", detail: "Call 347-953-1531 or tap any button. A real person picks up — no bots, no hold music, no call center." },
    { num: "2", icon: "🖥️", title: "We connect remotely", detail: "We'll ask you to click a small link. This lets us see your screen and control it — just like sitting next to you. You watch everything." },
    { num: "3", icon: "✅", title: "Problem fixed", detail: "We fix it while you watch. Most issues resolved in under 30 minutes. You only pay if we solve it — guaranteed." },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">How it works</h2>
          <p className="text-gray-500 text-lg">Three simple steps. No technical knowledge needed.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gray-200 -translate-x-1/2 z-0" />
              )}
              <div className="relative z-10 inline-flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-3xl mb-4 shadow-lg">
                  {step.icon}
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-black flex items-center justify-center">
                  {step.num}
                </span>
              </div>
              <h3 className="font-black text-gray-900 text-lg mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href={PHONE_HREF}
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg px-10 py-4 rounded-2xl shadow-lg transition-all active:scale-95">
            📞 Start Now — Call 347-953-1531
          </a>
          <p className="text-gray-400 text-sm mt-3">Free diagnosis · Available 24/7 · No appointment needed</p>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   BRANDS SECTION — SEO + navigation
════════════════════════════════════════════════════════════ */
function BrandsSection() {
  const brands = [
    { name: "HP",      color: "#0096D6", bg: "#e8f4fd", href: "/hp-printer-repair",    issues: ["Printer offline","WiFi error","OXc19a0035","Cartridge error"] },
    { name: "Canon",   color: "#CC0000", bg: "#fde8e8", href: "/canon-printer-repair", issues: ["Error B200","E03/E04","Not printing","Driver issue"] },
    { name: "Epson",   color: "#007AB8", bg: "#e8f4fb", href: "/epson-printer-repair", issues: ["Ink error","Nozzle clog","WiFi drops","Scan missing"] },
    { name: "Brother", color: "#004B9C", bg: "#e8eef8", href: "/fix",                  issues: ["Windows 11 driver","AirPrint error","Drum error","Fax issue"] },
    { name: "Garmin",  color: "#007DCE", bg: "#e8f4fd", href: "/fix",                  issues: ["Maps out of date","GPS stuck","Express error","No satellite"] },
    { name: "Windows", color: "#0078D4", bg: "#e8f4fd", href: "/fix",                  issues: ["PC running slow","Won't start","Windows 11 error","Virus/malware"] },
  ];

  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
          All major brands — supported and repaired
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {brands.map(b => (
            <Link key={b.name} href={b.href}
              className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-200 p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center font-black text-sm"
                style={{ background: b.bg, color: b.color }}>
                {b.name[0]}
              </div>
              <p className="font-black text-gray-900 text-sm mb-2 group-hover:text-blue-700 transition-colors">{b.name}</p>
              <div className="space-y-0.5">
                {b.issues.slice(0, 2).map(issue => (
                  <p key={issue} className="text-xs text-gray-400 truncate">{issue}</p>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   FAQ — Structured for Google Rich Results + LLM indexing
   This is the #1 LLM SEO element on the page
════════════════════════════════════════════════════════════ */
function FAQSection() {
  const faqs = [
    {
      q: "How do I fix my HP printer showing offline?",
      a: "Restart your printer and WiFi router. On Windows, go to Settings → Bluetooth & Devices → Printers → click your HP printer → Open print queue → Printer menu → uncheck 'Use Printer Offline.' If still offline, visit 123.hp.com to reinstall the driver. We fix HP offline errors remotely in under 15 minutes — call 347-953-1531.",
    },
    {
      q: "Why is my Epson EcoTank showing an ink error when tanks are full?",
      a: "EcoTank ink errors are almost never real ink shortages — they're internal sensor issues. Run Head Cleaning from the Epson Printer Utility on your PC. If the error persists, the ink counter needs a software reset (Epson Adjustment Program) which we run remotely in 15 minutes. Do not download Adjustment Program from random sites — most are malware.",
    },
    {
      q: "What does Canon B200 error mean and how do I fix it?",
      a: "Canon B200 is a printhead overheating error. The fix: power off and unplug the printer, slide the cartridge to the center position, leave the lid open for 15 minutes, then hold Stop/Reset while pressing Power, release Stop/Reset after 1 second, hold Power for 5 more seconds. 76% of B200 errors are fixed this way without any new parts.",
    },
    {
      q: "How do I update my Garmin GPS maps?",
      a: "Download Garmin Express from garmin.com/express. Connect your Garmin GPS to your computer via USB (make sure it's powered on). Sign in to a free Garmin account, then click 'Add Map Updates.' The download is 4-8GB and takes 30-90 minutes. Do not disconnect the GPS during the update. We do Garmin map updates remotely — call 347-953-1531.",
    },
    {
      q: "Why is my Windows computer running so slow?",
      a: "Slow Windows PCs are almost always caused by junk files, too many startup programs, or a full disk — not hardware failure. Download our free TriniCleaner tool, run a full scan, and use the Startup Manager to disable unnecessary programs. 97% of slow PC issues are fixed this way. If still slow after cleaning, call us for a free remote diagnosis.",
    },
    {
      q: "Is remote tech support safe?",
      a: "Yes. We use industry-standard remote access tools where you can see everything we do on your screen in real time. You grant permission and can disconnect at any moment. We never access anything without your approval. Trini System LLC has been in business since 2016 with a 4.9-star Google rating and 5,000+ satisfied customers.",
    },
    {
      q: "How much does printer repair cost?",
      a: "Remote printer repair starts from $49. We offer a completely free diagnosis — if we can't fix it, you pay nothing. Most issues are resolved in under 30 minutes. This is significantly cheaper than Best Buy Geek Squad ($150+) and you never have to leave your home.",
    },
    {
      q: "Can you fix Brother printer driver issues on Windows 11?",
      a: "Yes — Brother printer driver issues after Windows 11 updates are one of our most common calls. We download the correct driver from support.brother.com and configure it properly via remote session. This typically takes 20-30 minutes. Call 347-953-1531 for immediate help.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Common questions</h2>
          <p className="text-gray-500">Answers that actually help — written for real people, not technicians</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
        <div className="mt-10 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <p className="font-bold text-gray-900 mb-1">Didn't find your answer?</p>
          <p className="text-gray-600 text-sm mb-4">Call us — we answer every question for free, no obligation.</p>
          <a href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors">
            📞 Call 347-953-1531 — Free Answer
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-white border-2 border-gray-100 hover:border-blue-200 rounded-2xl transition-colors">
      <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none">
        <h3 className="font-bold text-gray-900 text-base pr-4">{q}</h3>
        <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 text-xl">↓</span>
      </summary>
      <div className="px-6 pb-5">
        <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
        <a href={PHONE_HREF} className="inline-flex items-center gap-1.5 mt-3 text-blue-600 text-sm font-semibold hover:underline">
          📞 Get help: 347-953-1531
        </a>
      </div>
    </details>
  );
}

/* ════════════════════════════════════════════════════════════
   COMPARISON STRIP — vs Geek Squad
════════════════════════════════════════════════════════════ */
function ComparisonStrip() {
  const rows = [
    { label: "Cost",          us: "From $49",       them: "$149–$299" },
    { label: "Wait time",     us: "< 30 minutes",   them: "3–7 days"  },
    { label: "Leave home",    us: "Never",           them: "Yes"       },
    { label: "Available",     us: "24/7",            them: "Store hours"},
    { label: "Free tools",    us: "TriniCleaner ✓",  them: "None"      },
  ];

  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-black text-center mb-6">
          Trini System vs. Geek Squad
        </h2>
        <div className="bg-gray-800 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-700 px-5 py-3 text-xs font-bold uppercase tracking-widest">
            <span className="text-gray-400">Feature</span>
            <span className="text-blue-400 text-center">Trini System</span>
            <span className="text-gray-500 text-right">Geek Squad</span>
          </div>
          {rows.map((row, i) => (
            <div key={row.label} className={`grid grid-cols-3 px-5 py-3.5 border-t border-gray-700 ${i % 2 === 1 ? "bg-gray-750" : ""}`}>
              <span className="text-gray-400 text-sm">{row.label}</span>
              <span className="text-emerald-400 font-bold text-sm text-center">{row.us}</span>
              <span className="text-gray-500 text-sm text-right">{row.them}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <a href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-black px-8 py-4 rounded-2xl hover:bg-gray-100 transition-colors">
            📞 Choose Trini System — Call 347-953-1531
          </a>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   DOWNLOAD CTA
════════════════════════════════════════════════════════════ */
function DownloadCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-700 text-white text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-5xl mb-4">⚡</div>
        <h2 className="text-3xl font-black mb-3">PC Running Slow? Fix It Free.</h2>
        <p className="text-emerald-100 text-lg mb-6">TriniCleaner removes gigabytes of junk in 60 seconds. No subscription. No sign-up.</p>
        <a href={DOWNLOAD_URL}
          className="inline-flex items-center gap-3 bg-white text-emerald-700 font-black text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
          ⬇ Download TriniCleaner — Free
        </a>
        <p className="text-emerald-200 text-sm mt-3">Windows 7, 8, 10 & 11 · No sign-up · Instant download</p>
      </div>
    </section>
  );
}
