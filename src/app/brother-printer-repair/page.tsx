import type { Metadata } from "next";
import Link from "next/link";
import { StickyCTA } from "@/components/ui/Button";
import { PHONE, PHONE_HREF } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Brother Printer Repair — MFC, HL, DCP Series",
  description:
    "Brother printer not printing? Fix MFC-L2710DW, HL-L2350DW, DCP drivers, AirPrint, Windows 11 issues. Remote repair from $49. Call 347-953-1531.",
  keywords: [
    "brother printer repair","brother printer not printing","brother printer offline",
    "brother printer driver unavailable","brother mfc repair","brother hl printer fix",
    "brother printer windows 11","brother printer airprint not working",
    "brother printer toner error","brother printer setup",
  ],
  alternates: { canonical: "https://trinisystem.vercel.app/brother-printer-repair" },
};

const BASE = "https://trinisystem.vercel.app";

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE}/services` },
      { "@type": "ListItem", position: 3, name: "Brother Printer Repair", item: `${BASE}/brother-printer-repair` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I fix 'Brother printer driver unavailable' in Windows 11?",
        acceptedAnswer: { "@type": "Answer", text: "Windows 11 often marks Brother drivers as unavailable after updates. Fix: Device Manager → Printers → right-click Brother printer → Uninstall device (check 'Delete driver'). Then go to support.brother.com, download the latest full driver package for your exact model and Windows 11, run the installer. This fixes 95% of Brother driver errors. If it fails, call Trini System at 347-953-1531 — we fix Brother driver issues remotely in under 20 minutes." },
      },
      {
        "@type": "Question",
        name: "Why is my Brother printer offline?",
        acceptedAnswer: { "@type": "Answer", text: "Brother printers go offline for the same reasons as HP: WiFi IP change, Print Spooler crash, or the 'Use Printer Offline' flag. Fix: restart the printer and router, then in Windows Settings → Printers & Scanners → click Brother printer → Open print queue → Printer menu → uncheck 'Use Printer Offline'. If still offline after this, call 347-953-1531." },
      },
      {
        "@type": "Question",
        name: "How do I fix Brother AirPrint not working on iPhone?",
        acceptedAnswer: { "@type": "Answer", text: "AirPrint issues on Brother printers are usually caused by being on different WiFi bands (phone on 5GHz, printer on 2.4GHz) or the Bonjour service being disabled. Fix: make sure your iPhone and Brother printer are on the same WiFi network (same SSID). On the printer, print a network config page to verify IP. On some routers, disable 'AP Isolation' or 'Client Isolation' in router settings." },
      },
    ],
  },
];

const MODELS = [
  { name: "MFC-L2710DW", type: "Laser Multifunction", issues: "Driver unavailable, WiFi setup, toner", color: "#3b82f6" },
  { name: "MFC-J995DW", type: "Inkjet Multifunction", issues: "INKvestment cartridge errors, AirPrint", color: "#8b5cf6" },
  { name: "HL-L2350DW", type: "Laser Printer", issues: "Drum end soon, Windows 11 driver", color: "#10b981" },
  { name: "HL-L3270CDW", type: "Color Laser", issues: "Color calibration, replace drum", color: "#f59e0b" },
  { name: "DCP-L2550DW", type: "Laser Copier/Printer", issues: "Scan not working, paper feed", color: "#ef4444" },
  { name: "MFC-L8900CDW", type: "Color MFC", issues: "Fuser error, drum unit, color output", color: "#06b6d4" },
];

const COMMON_ERRORS = [
  { error: "Driver Unavailable", cause: "Windows Update broke the driver", fix: "Uninstall completely → reinstall from support.brother.com", severity: "high" },
  { error: "Printer Offline", cause: "WiFi IP change or spooler crash", fix: "Restart router + printer, clear offline flag in Windows", severity: "high" },
  { error: "AirPrint Not Working", cause: "iPhone/printer on different WiFi bands", fix: "Ensure same SSID; disable AP Isolation on router", severity: "medium" },
  { error: "Toner Low / Replace", cause: "Toner below threshold (or sensor error)", fix: "Replace toner or reset toner counter if recently replaced", severity: "medium" },
  { error: "Drum End Soon", cause: "Drum life counter at limit", fix: "Replace drum unit or reset drum counter", severity: "low" },
  { error: "Mopria Not Connecting", cause: "Mopria app configuration", fix: "Enable Mopria in Brother printer menu → Network settings", severity: "low" },
];

export default function BrotherPrinterRepairPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* HERO */}
      <section className="relative py-16 px-4"
        style={{ background: "linear-gradient(135deg,#050d1a 0%,#001a3d 60%,#050d1a 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono tracking-widest uppercase mb-6"
            style={{ background: "rgba(0,75,156,0.2)", border: "1px solid rgba(0,75,156,0.5)", color: "#60a5fa" }}>
            🖨️ Brother Printer Repair · Remote
          </div>
          <h1 className="font-black text-white leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            Brother Printer Not Working?<br />
            <span style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              We Fix It Remotely.
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8 speakable-summary">
            Expert remote repair for all Brother MFC, HL, and DCP series printers.
            Driver errors, offline issues, AirPrint, Windows 11 — fixed while you watch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-black"
              style={{ background: "linear-gradient(135deg,#f59e0b,#fb923c)", boxShadow: "0 0 30px rgba(249,115,22,0.4)" }}>
              📞 {PHONE} — Call Free
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/40 font-mono">
            <span>✓ From $49</span>
            <span>✓ No fix = no fee</span>
            <span>✓ Under 20 min</span>
            <span>✓ All 50 states</span>
          </div>
        </div>
      </section>

      {/* MODELS */}
      <section className="py-16 px-4" style={{ background: "#0a0f1e" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-white text-center mb-10">Brother Models We Repair Daily</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {MODELS.map((m) => (
              <div key={m.name} className="rounded-2xl p-5"
                style={{ background: "#0f172a", border: `1px solid ${m.color}33` }}>
                <div className="font-black text-white text-lg mb-1" style={{ color: m.color }}>{m.name}</div>
                <div className="text-xs text-white/40 mb-2 font-mono">{m.type}</div>
                <div className="text-xs text-white/55 leading-relaxed">{m.issues}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON ERRORS */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(180deg,#020817 0%,#0a0f1e 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-12">Common Brother Printer Errors — Fixed</h2>
          <div className="flex flex-col gap-4">
            {COMMON_ERRORS.map((e) => (
              <div key={e.error} className="rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4"
                style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div>
                  <div className="font-black text-white text-lg">{e.error}</div>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full mt-1 inline-block ${e.severity === "high" ? "bg-red-500/20 text-red-400" : e.severity === "medium" ? "bg-amber-500/20 text-amber-400" : "bg-green-500/20 text-green-400"}`}>
                    {e.severity} priority
                  </span>
                </div>
                <div>
                  <div className="text-xs font-mono text-white/40 mb-1">CAUSE</div>
                  <div className="text-white/70 text-sm">{e.cause}</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-white/40 mb-1">FIX</div>
                  <div className="text-white/70 text-sm">{e.fix}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl p-8 text-center"
            style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)" }}>
            <h3 className="text-white font-black text-xl mb-3">Don&apos;t want to do it yourself?</h3>
            <p className="text-white/55 mb-5">We&apos;ve fixed thousands of Brother printers remotely. Call us and we&apos;ll have it working in under 20 minutes.</p>
            <a href={PHONE_HREF}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-black"
              style={{ background: "linear-gradient(135deg,#f59e0b,#fb923c)" }}>
              📞 {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-12 px-4" style={{ background: "#050d1a" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white font-black text-xl mb-6 text-center">More Printer Help</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "HP Printer Repair", href: "/hp-printer-repair" },
              { label: "Canon Printer Repair", href: "/canon-printer-repair" },
              { label: "Epson Printer Repair", href: "/epson-printer-repair" },
              { label: "All Printer Support", href: "/printer-support" },
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
