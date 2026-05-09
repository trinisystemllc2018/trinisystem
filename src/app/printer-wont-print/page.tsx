import type { Metadata } from "next";
import Link from "next/link";
import { StickyCTA } from "@/components/ui/Button";
import { PHONE, PHONE_HREF } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Printer Won't Print — Fix Any Brand in Minutes",
  description:
    "Printer not printing? Fix HP, Canon, Epson, Brother — clear print queue, restart spooler, update drivers. Free guide + expert remote help. Call 347-953-1531.",
  keywords: [
    "printer wont print","printer not printing","printer won't print anything",
    "my printer won't print","printer not working","why won't my printer print",
    "hp printer won't print","canon printer not printing","epson printer won't print",
    "printer printing but nothing comes out","printer stuck not printing",
  ],
  alternates: { canonical: "https://trinisystem.vercel.app/printer-wont-print" },
};

const BASE = "https://trinisystem.vercel.app";

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Printer Support", item: `${BASE}/printer-support` },
      { "@type": "ListItem", position: 3, name: "Printer Won't Print", item: `${BASE}/printer-wont-print` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Fix a Printer That Won't Print",
    totalTime: "PT8M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
    step: [
      { "@type": "HowToStep", position: 1, name: "Check Printer Status", text: "Ensure printer is on, has paper, has ink/toner, and shows 'Ready' on its display — not an error code." },
      { "@type": "HowToStep", position: 2, name: "Clear the Print Queue", text: "Open Printers & Scanners → click your printer → Open print queue → select all jobs → Delete. Restart the printer." },
      { "@type": "HowToStep", position: 3, name: "Restart Print Spooler", text: "Win+R → services.msc → Print Spooler → right-click Restart. Then try printing again." },
      { "@type": "HowToStep", position: 4, name: "Check Default Printer", text: "Settings → Printers & Scanners → make sure your printer is set as default — not 'Microsoft Print to PDF'." },
      { "@type": "HowToStep", position: 5, name: "Update or Reinstall Driver", text: "Device Manager → Printers → right-click your printer → Update driver. Or visit manufacturer's site for latest driver." },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why is my printer not printing even though it's connected?",
        acceptedAnswer: { "@type": "Answer", text: "The most common reasons a connected printer won't print: a stuck print job clogging the queue (fix: clear queue in Printers & Scanners), the Print Spooler service crashed (fix: restart in services.msc), the wrong printer is set as default (fix: set correct printer as default), or a driver conflict after a Windows Update (fix: reinstall driver from manufacturer's website)." },
      },
      {
        "@type": "Question",
        name: "How do I clear a stuck print job?",
        acceptedAnswer: { "@type": "Answer", text: "Go to Settings → Printers & Scanners → click your printer → Open print queue. Select all jobs with Ctrl+A and press Delete. If jobs won't delete, restart the Print Spooler service: press Win+R, type services.msc, find Print Spooler, right-click Restart. Then try deleting the jobs again." },
      },
      {
        "@type": "Question",
        name: "Printer is online but still won't print — what do I do?",
        acceptedAnswer: { "@type": "Answer", text: "If the printer shows Online but won't print: 1) Check it has paper and ink. 2) Clear the print queue. 3) Restart Print Spooler. 4) Make sure it's set as default printer. 5) Print a test page from the printer itself (not from Windows) — if the test page prints, the issue is Windows-side. Call Trini System at 347-953-1531 for a free diagnosis." },
      },
    ],
  },
];

const CAUSES = [
  { icon: "📋", title: "Stuck Print Queue", fix: "Clear all jobs in Printers & Scanners → Open print queue", color: "#ef4444", pct: "35%" },
  { icon: "⚙️", title: "Print Spooler Crashed", fix: "Restart Print Spooler in services.msc", color: "#f59e0b", pct: "25%" },
  { icon: "🖨️", title: "Wrong Default Printer", fix: "Set correct printer as default (not PDF printer)", color: "#8b5cf6", pct: "20%" },
  { icon: "💻", title: "Outdated Driver", fix: "Reinstall driver from manufacturer's website", color: "#3b82f6", pct: "12%" },
  { icon: "🔌", title: "Connection Lost", fix: "Reconnect via WiFi settings on printer display", color: "#10b981", pct: "8%" },
];

const STEPS = [
  { num: "01", icon: "🔍", title: "Check the Basics First", color: "#3b82f6", time: "1 min",
    detail: "Is the printer ON? Does it have paper? Does it have ink or toner? Is there an error code on the printer display? Fix any of these first — they account for 15% of 'won't print' calls we receive." },
  { num: "02", icon: "🗑️", title: "Clear the Print Queue", color: "#ef4444", time: "2 min",
    detail: "Settings → Printers & Scanners → click your printer → Open print queue. Select all jobs (Ctrl+A) → press Delete. A single stuck job can block ALL printing. Restart the printer after clearing." },
  { num: "03", icon: "⚙️", title: "Restart Print Spooler", color: "#10b981", time: "1 min",
    detail: "Press Win+R → type services.msc → press Enter. Find 'Print Spooler' in the list. Right-click → Restart. This resets the Windows print service that communicates with your printer. Works 90% of the time when combined with Step 2." },
  { num: "04", icon: "🏠", title: "Check Default Printer", color: "#f59e0b", time: "1 min",
    detail: "Settings → Printers & Scanners → make sure your actual printer is set as default — not 'Microsoft Print to PDF' or 'OneNote'. Windows sometimes switches the default after updates. This is the #1 overlooked cause." },
  { num: "05", icon: "🔄", title: "Reinstall or Update Driver", color: "#8b5cf6", time: "10 min",
    detail: "Device Manager → Printers → right-click your printer → Update driver. Or visit your printer brand's website (hp.com, canon.com, epson.com, brother.com) and download the latest full driver package for your exact model and Windows version." },
];

const BRANDS = [
  { name: "HP", href: "/hp-printer-repair", color: "#0096D6", issues: "Offline, error OXc19a0035, 49/79 error" },
  { name: "Canon", href: "/canon-printer-repair", color: "#CC0000", issues: "B200 error, E03/E04, ink absorber" },
  { name: "Epson", href: "/epson-printer-repair", color: "#007AB8", issues: "Ink system error, nozzle clog, 0x97" },
  { name: "Brother", href: "/printer-support", color: "#004B9C", issues: "Driver unavailable, Windows 11 fix" },
];

export default function PrinterWontPrintPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* HERO */}
      <section className="relative py-16 px-4"
        style={{ background: "linear-gradient(135deg,#050d1a 0%,#120820 60%,#050d1a 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono tracking-widest uppercase mb-6"
            style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>
            🖨️ Printer Help · All Brands
          </div>
          <h1 className="font-black text-white leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            Printer Won&apos;t Print?<br />
            <span style={{ background: "linear-gradient(135deg,#fbbf24,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Here&apos;s the Real Fix.
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8 speakable-summary">
            Works for HP, Canon, Epson, and Brother printers on Windows 10 &amp; 11.
            5 steps, 8 minutes, no tech knowledge needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-black"
              style={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)", boxShadow: "0 0 30px rgba(245,158,11,0.4)" }}>
              📞 {PHONE} — Call Free
            </a>
            <a href="#fix-steps"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-white"
              style={{ background: "rgba(255,255,255,0.07)", border: "2px solid rgba(255,255,255,0.15)" }}>
              📖 Fix It Myself ↓
            </a>
          </div>
        </div>
      </section>

      {/* QUICK ANSWER */}
      <section className="py-10 px-4" style={{ background: "#0a1628" }}>
        <div className="max-w-3xl mx-auto">
          <div className="speakable-summary rounded-2xl p-6"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}>
            <div className="text-xs font-mono tracking-widest uppercase text-red-400 mb-3">Quick Answer</div>
            <p className="text-white/85 text-lg leading-relaxed">
              <strong className="text-white">When a printer won&apos;t print:</strong> first clear the print queue
              (Printers & Scanners → open queue → delete all jobs), then restart the Print Spooler service
              (Win+R → services.msc → Print Spooler → Restart), and verify your printer is set as the default device.
              This 3-step sequence fixes 80% of &quot;printer won&apos;t print&quot; cases in under 3 minutes on any brand.
            </p>
          </div>
        </div>
      </section>

      {/* TOP CAUSES */}
      <section className="py-16 px-4" style={{ background: "#020817" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-white text-center mb-10">Why Printers Stop Printing</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {CAUSES.map((c) => (
              <div key={c.title} className="rounded-2xl p-4 text-center"
                style={{ background: "#0f172a", border: `1px solid ${c.color}33` }}>
                <div className="text-3xl mb-2">{c.icon}</div>
                <div className="font-black text-white text-sm mb-1">{c.title}</div>
                <div className="text-xs text-white/40 mb-2">{c.fix}</div>
                <div className="text-lg font-black" style={{ color: c.color }}>{c.pct}</div>
                <div className="text-xs text-white/30">of cases</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section id="fix-steps" className="py-20 px-4"
        style={{ background: "linear-gradient(180deg,#0a0f1e 0%,#050d1a 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Fix Your Printer Step by Step</h2>
            <p className="text-white/50">All brands · Windows 10 &amp; 11 · ~8 minutes total</p>
          </div>
          <div className="flex flex-col gap-5">
            {STEPS.map((step) => (
              <div key={step.num} className="rounded-2xl p-6"
                style={{ background: "linear-gradient(135deg,#1e293b,#0f172a)", border: `1px solid ${step.color}33` }}>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${step.color}18`, border: `1px solid ${step.color}44` }}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono font-bold" style={{ color: step.color }}>STEP {step.num}</span>
                      <span className="text-xs font-mono text-white/30">~{step.time}</span>
                    </div>
                    <h3 className="text-white font-black text-xl mb-2 step-description">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND LINKS */}
      <section className="py-16 px-4" style={{ background: "#050d1a" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-white text-center mb-8">Brand-Specific Repair Guides</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BRANDS.map((b) => (
              <Link key={b.name} href={b.href}
                className="block rounded-2xl p-5 hover:scale-105 transition-transform"
                style={{ background: "#0f172a", border: `1px solid ${b.color}33` }}>
                <div className="font-black text-white text-lg mb-1" style={{ color: b.color }}>{b.name}</div>
                <div className="text-white/40 text-xs leading-relaxed">{b.issues}</div>
                <div className="mt-3 text-sm font-semibold" style={{ color: b.color }}>Fix it →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
