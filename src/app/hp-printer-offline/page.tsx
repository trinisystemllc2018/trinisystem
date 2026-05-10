import type { Metadata } from "next";
import Link from "next/link";
import { StickyCTA } from "@/components/ui/Button";
import { PHONE, PHONE_HREF } from "@/lib/utils";

// ISR — page revalidates every 1 hour, so FAQ updates appear without redeploy
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "HP Printer Offline Fix — Works in 5 Minutes",
  description:
    "HP printer showing offline? Fix it in minutes: restart spooler, clear offline flag, reinstall driver. Free guide + 24/7 expert help. Call 347-953-1531.",
  keywords: [
    "hp printer offline","fix hp printer offline","hp printer says offline",
    "hp printer offline windows 10","hp printer offline windows 11",
    "hp deskjet offline","hp envy offline","hp officejet offline",
    "hp printer showing offline how to fix","why is my hp printer offline",
  ],
  alternates: { canonical: "https://trinisystem.vercel.app/hp-printer-offline" },
  openGraph: {
    title: "HP Printer Offline Fix — Trini System",
    description: "Fix your HP printer offline error in under 5 minutes. Free step-by-step guide. 24/7 expert help from $49.",
    url: "https://trinisystem.vercel.app/hp-printer-offline",
  },
};

const BASE = "https://trinisystem.vercel.app";

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "HP Printer Repair", item: `${BASE}/hp-printer-repair` },
      { "@type": "ListItem", position: 3, name: "HP Printer Offline Fix", item: `${BASE}/hp-printer-offline` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Fix HP Printer Offline",
    description: "Step-by-step guide to fix an HP printer that shows Offline in Windows 10 or Windows 11.",
    totalTime: "PT5M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
    step: [
      { "@type": "HowToStep", position: 1, name: "Restart Both Devices", text: "Turn off the HP printer and WiFi router. Unplug both for 30 seconds. Restart router first, wait 60 seconds, then restart printer." },
      { "@type": "HowToStep", position: 2, name: "Remove the Offline Flag", text: "Settings → Bluetooth & Devices → Printers & Scanners → click HP → Open print queue → Printer menu → uncheck 'Use Printer Offline'." },
      { "@type": "HowToStep", position: 3, name: "Restart Print Spooler", text: "Press Win+R → type services.msc → find Print Spooler → right-click Restart." },
      { "@type": "HowToStep", position: 4, name: "Set as Default Printer", text: "Printers & Scanners → click HP → Set as Default → Print a test page." },
      { "@type": "HowToStep", position: 5, name: "Reinstall Driver", text: "Remove the printer from Windows. Visit 123.hp.com, download Full Software, reinstall via Wireless setup." },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why does my HP printer keep going offline?",
        acceptedAnswer: { "@type": "Answer", text: "Most common causes: WiFi IP address changes (fix: restart router), Windows Print Spooler error (fix: restart service in services.msc), or the 'Use Printer Offline' flag accidentally set. A router restart fixes 70% of HP offline errors in under 2 minutes." },
      },
      {
        "@type": "Question",
        name: "How do I fix HP printer offline on Windows 11?",
        acceptedAnswer: { "@type": "Answer", text: "Settings → Bluetooth & Devices → Printers & Scanners → click HP → More device and printer settings → right-click → See what's printing → Printer menu → uncheck 'Use Printer Offline'. Also restart Print Spooler in services.msc." },
      },
      {
        "@type": "Question",
        name: "My HP printer shows offline but is connected to WiFi — why?",
        acceptedAnswer: { "@type": "Answer", text: "Windows lost the communication path even though the printer is on WiFi. Remove the HP printer from Printers & Scanners and re-add it. If that fails, call us at 347-953-1531 — we fix this remotely in under 10 minutes." },
      },
      {
        "@type": "Question",
        name: "Is there a free tool to fix HP printer offline?",
        acceptedAnswer: { "@type": "Answer", text: "Yes — HP Print and Scan Doctor (free at support.hp.com). Run it and it auto-fixes most HP offline errors. If it can't fix it, call Trini System at 347-953-1531 for free diagnosis." },
      },
    ],
  },
];

const STEPS = [
  { num: "01", icon: "🔌", title: "Restart Both Devices", color: "#3b82f6", time: "2 min",
    detail: "Turn off the HP printer AND your WiFi router. Unplug both from the wall for 30 seconds. Restart the router first, wait 60 seconds, then restart the printer. This fixes 70% of HP offline errors." },
  { num: "02", icon: "🖥️", title: "Remove the Offline Flag", color: "#8b5cf6", time: "1 min",
    detail: "Windows 11: Settings → Bluetooth & Devices → Printers & Scanners → click HP → Open print queue → Printer menu → uncheck 'Use Printer Offline'. Windows 10: Control Panel → Devices & Printers → right-click HP → See what's printing → Printer menu → uncheck." },
  { num: "03", icon: "⚙️", title: "Restart Print Spooler", color: "#10b981", time: "1 min",
    detail: "Press Win+R → type services.msc → Enter. Find 'Print Spooler' in the list. Right-click → Restart. This clears stuck print jobs and resets the Windows print service that talks to your HP printer." },
  { num: "04", icon: "🏠", title: "Set as Default Printer", color: "#f59e0b", time: "1 min",
    detail: "Settings → Printers & Scanners → click your HP printer → click 'Set as Default'. Then Print a test page. This often clears ghost offline states caused by Windows keeping an old printer as default." },
  { num: "05", icon: "🔄", title: "Reinstall Driver (Last Resort)", color: "#ef4444", time: "10 min",
    detail: "Remove the printer from Printers & Scanners. Go to 123.hp.com, enter your exact model number, download the Full Software Solution. Run installer → choose Wireless setup → reconnect to your WiFi. This is the permanent fix for stubborn offline issues." },
];

const FAQS = [
  { q: "Why does my HP printer keep going offline?", a: "Most common causes: WiFi router IP address change (fix: restart router), Windows Print Spooler error (fix: restart the service in services.msc), or the 'Use Printer Offline' flag set accidentally. A router restart fixes 70% of cases in under 2 minutes." },
  { q: "HP printer shows offline but IS connected to WiFi — why?", a: "The printer is on WiFi but Windows lost the communication path. This happens after Windows Updates or router changes. Remove the printer from Printers & Scanners and re-add it fresh. If that fails, call us — we fix this in under 10 minutes remotely." },
  { q: "Is there a free HP tool to fix offline errors?", a: "Yes — HP Print and Scan Doctor (free at support.hp.com). It auto-detects and fixes most offline errors. If it can't fix it, call Trini System for free diagnosis at 347-953-1531." },
  { q: "How do I fix HP printer offline on Windows 11?", a: "Settings → Bluetooth & Devices → Printers & Scanners → click HP → More device and printer settings → right-click → See what's printing → Printer menu → uncheck 'Use Printer Offline'. Also restart Print Spooler in services.msc." },
];

export default function HPPrinterOfflinePage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* HERO */}
      <section className="relative overflow-hidden py-16 px-4"
        style={{ background: "linear-gradient(135deg,#050d1a 0%,#0f2040 60%,#050d1a 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono tracking-widest uppercase mb-6"
            style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)", color: "#60a5fa" }}>
            🖨️ HP Printer Help · Free Guide
          </div>
          <h1 className="font-black text-white leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            HP Printer Offline?<br />
            <span style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Fixed in 5 Minutes.
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8 speakable-summary">
            Follow our 5-step guide — works for HP DeskJet, OfficeJet, ENVY, LaserJet on Windows 10 &amp; 11.
            Still offline? We fix it remotely while you watch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-black"
              style={{ background: "linear-gradient(135deg,#f59e0b,#fb923c)", boxShadow: "0 0 30px rgba(249,115,22,0.4)" }}>
              📞 {PHONE} — Free Help
            </a>
            <a href="#fix-steps"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-white"
              style={{ background: "rgba(255,255,255,0.07)", border: "2px solid rgba(255,255,255,0.15)" }}>
              📖 See Fix Steps ↓
            </a>
          </div>
        </div>
      </section>

      {/* QUICK ANSWER — AEO speakable */}
      <section className="py-10 px-4" style={{ background: "#0a1628" }}>
        <div className="max-w-3xl mx-auto">
          <div className="speakable-summary rounded-2xl p-6"
            style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.25)" }}>
            <div className="text-xs font-mono tracking-widest uppercase text-blue-400 mb-3">Quick Answer</div>
            <p className="text-white/85 text-lg leading-relaxed">
              <strong className="text-white">To fix an HP printer showing offline:</strong> restart both the printer and WiFi router,
              then in Windows go to Settings → Printers & Scanners → open your HP printer&apos;s queue → Printer menu →
              uncheck &quot;Use Printer Offline&quot;. Finally, restart the Print Spooler service in services.msc.
              This resolves 94% of HP offline errors in under 5 minutes — no tech experience needed.
            </p>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section id="fix-steps" className="py-20 px-4"
        style={{ background: "linear-gradient(180deg,#020817 0%,#0a0f1e 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">5 Steps to Fix HP Printer Offline</h2>
            <p className="text-white/50 text-lg">Works for all HP models on Windows 10 &amp; 11 · Total time: under 5 minutes</p>
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

          <div className="mt-10 rounded-2xl p-8 text-center"
            style={{ background: "linear-gradient(135deg,rgba(245,158,11,0.12),rgba(59,130,246,0.08))", border: "1px solid rgba(249,115,22,0.25)" }}>
            <div className="text-4xl mb-3">🤷</div>
            <h3 className="text-white font-black text-2xl mb-3">Still offline after all 5 steps?</h3>
            <p className="text-white/60 mb-6 max-w-xl mx-auto">
              Some HP errors need a deeper driver fix or Windows registry repair. We fix these daily — remotely, while you watch.
            </p>
            <a href={PHONE_HREF}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-black"
              style={{ background: "linear-gradient(135deg,#f59e0b,#fb923c)" }}>
              📞 Call Free — {PHONE}
            </a>
            <div className="text-white/30 text-sm mt-3 font-mono">No fix = no charge · Remote · Under 15 min</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4" style={{ background: "#050d1a" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-12">HP Printer Offline — Common Questions</h2>
          <div className="flex flex-col gap-5">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-2xl p-6 faq-answer"
                style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h3 className="text-white font-black text-lg mb-3">{faq.q}</h3>
                <p className="text-white/60 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 px-4" style={{ background: "#020810" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white font-black text-xl mb-6 text-center">More HP Printer Help</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "HP Printer Repair", href: "/hp-printer-repair" },
              { label: "HP Error Codes", href: "/fix-printer/hp/error-code" },
              { label: "HP WiFi Setup", href: "/fix-printer/hp/wifi-setup" },
              { label: "All Printer Help", href: "/printer-support" },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                className="block rounded-xl p-4 text-center text-sm font-semibold text-white/70 hover:text-white transition-colors"
                style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.07)" }}>
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
