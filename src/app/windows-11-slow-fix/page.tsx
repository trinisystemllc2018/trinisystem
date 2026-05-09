import type { Metadata } from "next";
import Link from "next/link";
import { StickyCTA } from "@/components/ui/Button";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Windows 11 Running Slow — 10 Proven Fixes",
  description:
    "Windows 11 slow? Disable startup apps, clear temp files, adjust power plan, update drivers. Free TriniCleaner speeds up any PC. Call 347-953-1531.",
  keywords: [
    "windows 11 slow","windows 11 running slow","why is my windows 11 so slow",
    "speed up windows 11","windows 11 slow fix","windows 11 performance fix",
    "windows 11 slow after update","make windows 11 faster","pc slow fix",
    "computer running slow windows 11","laptop slow windows 11",
  ],
  alternates: { canonical: "https://trinisystem.vercel.app/windows-11-slow-fix" },
};

const BASE = "https://trinisystem.vercel.app";

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Computer Help", item: `${BASE}/computer-help` },
      { "@type": "ListItem", position: 3, name: "Windows 11 Slow Fix", item: `${BASE}/windows-11-slow-fix` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Speed Up Windows 11",
    totalTime: "PT15M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
    step: [
      { "@type": "HowToStep", position: 1, name: "Disable Startup Programs", text: "Task Manager → Startup apps → disable everything you don't need launching at boot." },
      { "@type": "HowToStep", position: 2, name: "Change Power Plan to High Performance", text: "Settings → System → Power → Power mode → set to Best performance." },
      { "@type": "HowToStep", position: 3, name: "Clear Temp Files", text: "Settings → System → Storage → Temporary files → check all boxes → Remove files." },
      { "@type": "HowToStep", position: 4, name: "Disable Visual Effects", text: "Search 'Adjust the appearance and performance of Windows' → select 'Adjust for best performance'." },
      { "@type": "HowToStep", position: 5, name: "Run Disk Cleanup", text: "Search 'Disk Cleanup' → run it → click 'Clean up system files' for deeper clean." },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why is Windows 11 so slow on my PC?",
        acceptedAnswer: { "@type": "Answer", text: "Windows 11 runs slow due to: too many startup programs (fix: Task Manager → Startup), wrong power plan (fix: Settings → Power → Best performance), a full C: drive (fix: Disk Cleanup or TriniCleaner), or outdated drivers (fix: Windows Update). Windows 11 also uses more RAM than Windows 10 — 8GB minimum for smooth performance." },
      },
      {
        "@type": "Question",
        name: "How do I make Windows 11 faster for free?",
        acceptedAnswer: { "@type": "Answer", text: "Free ways to speed up Windows 11: 1) Disable startup apps in Task Manager. 2) Set power mode to 'Best performance'. 3) Clear temp files in Settings → Storage. 4) Download free TriniCleaner from trinisystem.vercel.app/products — it cleans junk files and speeds up boot time automatically." },
      },
      {
        "@type": "Question",
        name: "Windows 11 slowed down after an update — how do I fix it?",
        acceptedAnswer: { "@type": "Answer", text: "Post-update slowness is usually caused by background indexing (wait 30 minutes after the update completes) or driver conflicts. Fix: Settings → Windows Update → Advanced options → Optional updates — install all driver updates. If still slow after 30 minutes, call Trini System at 347-953-1531 — we fix post-update slowness remotely." },
      },
    ],
  },
];

const FIXES = [
  {
    num: "01", icon: "🚀", title: "Disable Startup Programs", color: "#3b82f6", impact: "HIGH",
    detail: "Task Manager (Ctrl+Shift+Esc) → Startup apps tab. Disable everything except your antivirus and essential tools. Zoom, Teams, Discord, Spotify — all can be opened manually when needed. This is the single biggest speed improvement for most computers.",
    time: "3 min",
  },
  {
    num: "02", icon: "⚡", title: "Set Power Plan to High Performance", color: "#f59e0b", impact: "HIGH",
    detail: "Settings → System → Power → Power mode → change to 'Best performance'. Most laptops default to 'Balanced' which throttles CPU speed. This change alone can make Windows 11 feel 30–40% faster on older hardware.",
    time: "1 min",
  },
  {
    num: "03", icon: "🗑️", title: "Clear Temporary Files", color: "#10b981", impact: "MED",
    detail: "Settings → System → Storage → Temporary files. Check all boxes: Temporary files, Thumbnails, Delivery Optimization Files, Recycle Bin. Click 'Remove files'. For a deeper clean, use TriniCleaner (free download below) which finds hidden junk files Windows misses.",
    time: "2 min",
  },
  {
    num: "04", icon: "🎨", title: "Disable Visual Effects", color: "#8b5cf6", impact: "MED",
    detail: "Search 'Adjust the appearance and performance of Windows' in the Start menu → select 'Adjust for best performance' → Apply. This disables animations, shadows, and transparency effects that use GPU resources. Essential on PCs with less than 8GB RAM.",
    time: "2 min",
  },
  {
    num: "05", icon: "💾", title: "Run Disk Cleanup", color: "#ef4444", impact: "MED",
    detail: "Search 'Disk Cleanup' → select C: drive → Run. Then click 'Clean up system files' for deeper cleaning including old Windows update files (can free 5–20GB). If C: drive is above 85% full, this is critical — Windows needs 15–20% free space to perform well.",
    time: "5 min",
  },
  {
    num: "06", icon: "🔄", title: "Update Drivers via Windows Update", color: "#06b6d4", impact: "VARIES",
    detail: "Settings → Windows Update → Advanced options → Optional updates → Driver updates. Install all available driver updates. Outdated graphics and chipset drivers are a major cause of Windows 11 slowness, especially after major Windows updates.",
    time: "10 min",
  },
  {
    num: "07", icon: "🌐", title: "Disable Background Apps", color: "#a855f7", impact: "LOW-MED",
    detail: "Settings → Apps → Installed apps → click any app → Advanced options → Background app permissions → Never. Do this for OneDrive, Edge, any app you don't need running constantly. Background apps silently use CPU and RAM.",
    time: "3 min",
  },
  {
    num: "08", icon: "🛡️", title: "Check for Malware", color: "#ec4899", impact: "VARIES",
    detail: "Windows Security → Virus & threat protection → Quick scan. Malware is a common hidden cause of slowness. If Windows Security finds nothing but the PC is still slow, call Trini System — we run deeper scans that catch malware Windows Security misses.",
    time: "5 min",
  },
];

export default function Windows11SlowFixPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* HERO */}
      <section className="relative py-16 px-4"
        style={{ background: "linear-gradient(135deg,#050d1a 0%,#0f1a2e 60%,#050d1a 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono tracking-widest uppercase mb-6"
            style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399" }}>
            💻 PC Speed Fix · Free Guide
          </div>
          <h1 className="font-black text-white leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            Windows 11 Running Slow?<br />
            <span style={{ background: "linear-gradient(135deg,#fbbf24,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Fix It in 15 Minutes — Free.
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8 speakable-summary">
            8 proven fixes that actually work. Disable startup bloat, set the right power plan,
            clean temp files — and download our free TriniCleaner for a full speed boost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={DOWNLOAD_URL}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-black"
              style={{ background: "linear-gradient(135deg,#10b981,#34d399)", boxShadow: "0 0 30px rgba(16,185,129,0.4)" }}>
              ⚡ Free TriniCleaner Download
            </a>
            <a href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-white"
              style={{ background: "rgba(255,255,255,0.07)", border: "2px solid rgba(255,255,255,0.15)" }}>
              📞 {PHONE} — Call for Help
            </a>
          </div>
        </div>
      </section>

      {/* QUICK ANSWER */}
      <section className="py-10 px-4" style={{ background: "#0a1628" }}>
        <div className="max-w-3xl mx-auto">
          <div className="speakable-summary rounded-2xl p-6"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)" }}>
            <div className="text-xs font-mono tracking-widest uppercase text-green-400 mb-3">Quick Answer</div>
            <p className="text-white/85 text-lg leading-relaxed">
              <strong className="text-white">To speed up Windows 11:</strong> open Task Manager → Startup apps → disable
              everything unnecessary. Then go to Settings → System → Power → change to &quot;Best performance&quot;.
              Finally, go to Settings → Storage → Temporary files → remove all temp files.
              These 3 steps take 6 minutes and speed up most Windows 11 computers by 30–50%.
            </p>
          </div>
        </div>
      </section>

      {/* FIXES */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(180deg,#020817 0%,#0a0f1e 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">8 Fixes for Windows 11 Slowness</h2>
            <p className="text-white/50">From fastest to most involved · All free · No software required</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FIXES.map((fix) => (
              <div key={fix.num} className="rounded-2xl p-6"
                style={{ background: "linear-gradient(135deg,#1e293b,#0f172a)", border: `1px solid ${fix.color}33` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `${fix.color}18` }}>
                    {fix.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold mr-2" style={{ color: fix.color }}>#{fix.num}</span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${fix.impact === "HIGH" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"}`}>
                      {fix.impact} impact
                    </span>
                  </div>
                </div>
                <h3 className="text-white font-black text-lg mb-2 step-description">{fix.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-3">{fix.detail}</p>
                <div className="text-xs text-white/30 font-mono">~{fix.time}</div>
              </div>
            ))}
          </div>

          {/* TriniCleaner CTA */}
          <div className="mt-12 rounded-2xl p-8 text-center"
            style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.12),rgba(59,130,246,0.08))", border: "1px solid rgba(16,185,129,0.25)" }}>
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-white font-black text-2xl mb-3">Do All 8 Steps Automatically — Free</h3>
            <p className="text-white/60 mb-6 max-w-xl mx-auto">
              TriniCleaner runs all these optimizations automatically. Removes junk files, disables startup bloat,
              clears registry errors. Free download — no subscription, no tricks.
            </p>
            <a href={DOWNLOAD_URL}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-white"
              style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}>
              ⬇️ Download TriniCleaner Free
            </a>
            <div className="text-white/30 text-sm mt-3 font-mono">Windows 10 &amp; 11 · 100% Free · No subscription</div>
          </div>
        </div>
      </section>

      {/* STILL SLOW CTA */}
      <section className="py-16 px-4" style={{ background: "#050d1a" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-black text-white mb-4">Still slow after all these fixes?</h2>
          <p className="text-white/55 mb-8 text-lg">
            If your PC is still slow, the cause is deeper — malware, bad RAM, dying hard drive, or a corrupted Windows install.
            We diagnose and fix remotely in under 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-black"
              style={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)" }}>
              📞 Call Free — {PHONE}
            </a>
            <Link href="/computer-help"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-white"
              style={{ background: "rgba(255,255,255,0.07)", border: "2px solid rgba(255,255,255,0.15)" }}>
              More PC Help →
            </Link>
          </div>
          <div className="text-white/25 text-sm mt-4 font-mono">No fix = no fee · Remote · From $49</div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
