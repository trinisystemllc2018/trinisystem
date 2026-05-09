import type { Metadata } from "next";
import Link from "next/link";
import { StickyCTA } from "@/components/ui/Button";
import { PHONE, PHONE_HREF } from "@/lib/utils";
import { notFound } from "next/navigation";

const BASE = "https://trinisystem.vercel.app";

// Error code database — brand → code → data
const ERROR_DB: Record<string, Record<string, {
  title: string;
  meaning: string;
  causes: string[];
  fixes: { step: string; detail: string }[];
  severity: "high" | "medium" | "low";
  successRate: number;
}>> = {
  hp: {
    "OXc19a0035": {
      title: "HP Error OXc19a0035 — Ink System Failure",
      meaning: "Ink system failure. The printer detected a problem with the ink delivery system.",
      causes: ["Clogged ink tubes", "Faulty ink cartridge", "Printhead failure", "Air in ink lines"],
      fixes: [
        { step: "Power cycle", detail: "Turn off the printer completely. Unplug from wall for 60 seconds. Plug back in and power on." },
        { step: "Reseat cartridges", detail: "Open cartridge door, remove ALL ink cartridges. Wait 30 seconds. Reinstall each one firmly until it clicks." },
        { step: "Run printer cleanup", detail: "On the printer display: Setup → Tools → Clean Printhead (or Ink Cartridge Levels → Clean). Run 2 cycles." },
        { step: "Update firmware", detail: "On Windows: open HP Smart app → your printer → Update. Or visit support.hp.com and search your model." },
      ],
      severity: "high",
      successRate: 88,
    },
    "49": {
      title: "HP Error 49 — Firmware / Communication Error",
      meaning: "A firmware error or corrupt print job caused an internal communication failure.",
      causes: ["Corrupt print job in queue", "Outdated firmware", "Postscript driver issue", "Third-party software conflict"],
      fixes: [
        { step: "Clear print queue", detail: "Settings → Printers & Scanners → open queue → delete all jobs. Restart printer." },
        { step: "Power cycle", detail: "Turn off printer, unplug for 60 seconds, plug back in." },
        { step: "Update firmware", detail: "Visit hp.com/support → enter model → Drivers & Software → Firmware → download and install." },
        { step: "Reinstall driver", detail: "Uninstall HP printer from Windows → download full driver from 123.hp.com → reinstall." },
      ],
      severity: "high",
      successRate: 91,
    },
    "79": {
      title: "HP Error 79 — Critical Firmware Error",
      meaning: "A critical printer error. Usually caused by corrupt firmware or a bad print job.",
      causes: ["Corrupt firmware update", "Incompatible print job", "Third-party ink cartridge", "Memory error"],
      fixes: [
        { step: "Power cycle hard reset", detail: "Power off → unplug from wall (not just button) → wait 60 seconds → plug back in." },
        { step: "Clear print queue", detail: "Cancel all print jobs before the printer turns on. A corrupt job will re-trigger the error." },
        { step: "Update firmware", detail: "Download latest firmware from support.hp.com for your exact model." },
        { step: "Remove third-party cartridges", detail: "If using non-HP cartridges, replace with genuine HP. Error 79 is frequently triggered by incompatible cartridges." },
      ],
      severity: "high",
      successRate: 85,
    },
    "offline": {
      title: "HP Printer Offline Error",
      meaning: "Windows cannot communicate with the printer. The printer shows as 'Offline' in Printers & Scanners.",
      causes: ["WiFi IP address changed", "Print Spooler crashed", "'Use Printer Offline' flag set", "Driver conflict"],
      fixes: [
        { step: "Restart router + printer", detail: "Unplug router and printer from wall for 30 seconds. Restart router first, wait 60 sec, then restart printer." },
        { step: "Clear Offline flag", detail: "Settings → Printers & Scanners → click HP → Open print queue → Printer menu → uncheck 'Use Printer Offline'." },
        { step: "Restart Print Spooler", detail: "Win+R → services.msc → Print Spooler → right-click Restart." },
        { step: "Reinstall printer", detail: "Remove from Printers & Scanners → download full driver from 123.hp.com → reinstall." },
      ],
      severity: "medium",
      successRate: 94,
    },
  },
  epson: {
    "0x97": {
      title: "Epson Error 0x97 — Fatal Hardware Error",
      meaning: "A fatal hardware error. The printer has detected an internal failure.",
      causes: ["Motherboard failure", "Printhead driver board issue", "Power surge damage", "Extended use without maintenance"],
      fixes: [
        { step: "Hard power reset", detail: "Hold power button for 30 seconds while unplugged. Plug back in while still holding button, then release." },
        { step: "Print head cleaning", detail: "On printer: Menu → Maintenance → Head Cleaning. Run 2 full cycles." },
        { step: "Reset to factory defaults", detail: "Menu → Setup → Restore Default Settings. Note: this clears WiFi settings." },
        { step: "Call Trini System", detail: "0x97 often requires a hardware reset sequence that must be performed remotely by a technician. Call 347-953-1531." },
      ],
      severity: "high",
      successRate: 72,
    },
    "ink-system-error": {
      title: "Epson Ink System Error",
      meaning: "The printer detected a problem with the ink delivery system. Common on EcoTank models.",
      causes: ["Air in ink lines", "Overfilled ink tank", "Clogged printhead", "Ink tube kink"],
      fixes: [
        { step: "Check ink levels", detail: "Open ink tank cover and check levels. EcoTank: don't overfill above the max line." },
        { step: "Run head cleaning", detail: "On printer display: Menu → Maintenance → Head Cleaning. Run once, print test page." },
        { step: "Power flush (advanced)", detail: "Menu → Maintenance → Power Cleaning. Uses significant ink but clears serious clogs." },
        { step: "Check ink tubes", detail: "With printer open, inspect ink tubes for kinks or air bubbles. Straighten if kinked." },
      ],
      severity: "medium",
      successRate: 89,
    },
  },
  canon: {
    "b200": {
      title: "Canon Error B200 — Printhead / Temperature Error",
      meaning: "Printhead temperature exceeded normal range, or a printhead circuit error occurred.",
      causes: ["Faulty printhead", "Dried ink blocking printhead", "Incompatible cartridge", "Firmware bug"],
      fixes: [
        { step: "Power reset sequence", detail: "Open the cover while the printer is on. Unplug the power cable while the carriage is in the middle. Plug back in, close cover, turn on." },
        { step: "Clean printhead manually", detail: "Remove printhead (if removable on your model) and soak in warm water for 10 minutes. Dry completely before reinstalling." },
        { step: "Replace cartridges", detail: "Install brand-new genuine Canon cartridges — not refilled or third-party. B200 is frequently caused by bad cartridges." },
        { step: "Update firmware", detail: "Visit usa.canon.com/support → your model → Drivers → Firmware → install latest." },
      ],
      severity: "high",
      successRate: 78,
    },
    "e03": {
      title: "Canon Error E03 — Paper Feed Error",
      meaning: "The printer cannot feed paper properly. Paper jam or feed roller issue.",
      causes: ["Paper jam (visible or hidden)", "Dirty feed rollers", "Wrong paper type", "Multiple sheets fed"],
      fixes: [
        { step: "Clear paper jam", detail: "Open all covers. Remove all paper from tray. Gently pull any jammed paper straight out — never tear. Check inside near rollers." },
        { step: "Clean feed rollers", detail: "Dampen a lint-free cloth with water (not alcohol). Wipe the rubber rollers with gentle pressure. Let dry before feeding paper." },
        { step: "Check paper type", detail: "Use standard 20lb copy paper, not glossy or cardstock (unless printer supports it). Fan the paper before loading." },
        { step: "Reset printer", detail: "Power off → hold Resume button → power on while holding → release after 5 seconds." },
      ],
      severity: "medium",
      successRate: 95,
    },
  },
  brother: {
    "driver-unavailable": {
      title: "Brother Printer — 'Driver Unavailable' Error",
      meaning: "Windows cannot find or load the correct driver for your Brother printer. Common after Windows 10/11 updates.",
      causes: ["Windows Update removed or corrupted driver", "Incompatible driver version", "Print Spooler corruption", "USB/network port change"],
      fixes: [
        { step: "Uninstall driver completely", detail: "Device Manager → Printers → right-click Brother → Uninstall device → check 'Delete the driver software' → OK." },
        { step: "Download correct driver", detail: "Go to support.brother.com → select your exact model → Downloads → choose your OS (Windows 10 or 11) → download Full Driver & Software Package." },
        { step: "Run installer", detail: "Run the downloaded installer as Administrator. Choose 'Network' or 'Wireless' setup type. Follow prompts to reconnect to WiFi." },
        { step: "Restart Print Spooler", detail: "Win+R → services.msc → Print Spooler → right-click Restart → try printing." },
      ],
      severity: "high",
      successRate: 97,
    },
  },
};

const BRAND_NAMES: Record<string, string> = {
  hp: "HP",
  epson: "Epson",
  canon: "Canon",
  brother: "Brother",
};

const BRAND_COLORS: Record<string, string> = {
  hp: "#0096D6",
  epson: "#007AB8",
  canon: "#CC0000",
  brother: "#004B9C",
};

type Props = {
  params: { brand: string; code: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = params.brand.toLowerCase();
  const code = params.code;
  const brandName = BRAND_NAMES[brand] ?? brand.toUpperCase();
  const errorData = ERROR_DB[brand]?.[code];

  if (!errorData) {
    return {
      title: `${brandName} Error ${code} Fix`,
      description: `Fix ${brandName} printer error code ${code}. Expert remote repair. Call 347-953-1531.`,
    };
  }

  return {
    title: `${errorData.title} | Trini System`,
    description: `${errorData.meaning} ${errorData.fixes[0].detail.substring(0, 80)}... Expert remote fix. Call 347-953-1531.`,
    alternates: { canonical: `${BASE}/error-code/${brand}/${code}` },
    keywords: [
      `${brandName.toLowerCase()} error ${code}`,
      `${brandName.toLowerCase()} error code ${code}`,
      `fix ${brandName.toLowerCase()} ${code}`,
      `${brandName.toLowerCase()} printer ${code} error`,
    ],
  };
}

export default function ErrorCodePage({ params }: Props) {
  const brand = params.brand.toLowerCase();
  const code = params.code;
  const brandName = BRAND_NAMES[brand] ?? brand.toUpperCase();
  const brandColor = BRAND_COLORS[brand] ?? "#3b82f6";
  const errorData = ERROR_DB[brand]?.[code];

  const faqSchema = errorData ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What does ${brandName} error ${code} mean?`,
        acceptedAnswer: { "@type": "Answer", text: errorData.meaning },
      },
      {
        "@type": "Question",
        name: `How do I fix ${brandName} error ${code}?`,
        acceptedAnswer: { "@type": "Answer", text: errorData.fixes.map((f, i) => `${i + 1}. ${f.step}: ${f.detail}`).join(" ") },
      },
    ],
  } : null;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: `${brandName} Printer Repair`, item: `${BASE}/${brand}-printer-repair` },
      { "@type": "ListItem", position: 3, name: `Error ${code}`, item: `${BASE}/error-code/${brand}/${code}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* HERO */}
      <section className="relative py-16 px-4"
        style={{ background: `linear-gradient(135deg,#050d1a 0%,${brandColor}22 60%,#050d1a 100%)` }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono tracking-widest uppercase mb-6"
            style={{ background: `${brandColor}20`, border: `1px solid ${brandColor}50`, color: brandColor }}>
            {brandName} Error Code · Free Fix Guide
          </div>
          <div className="inline-block px-6 py-3 rounded-2xl font-black text-3xl mb-4 font-mono"
            style={{ background: `${brandColor}18`, border: `2px solid ${brandColor}55`, color: brandColor }}>
            {brandName} Error: {code.toUpperCase()}
          </div>
          <h1 className="font-black text-white leading-tight mb-4" style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)" }}>
            {errorData?.title ?? `${brandName} Error ${code} — How to Fix It`}
          </h1>
          {errorData && (
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8 speakable-summary">
              {errorData.meaning} Our technicians fix this remotely with a{" "}
              <span style={{ color: "#10b981" }}>{errorData.successRate}% success rate</span> — usually in under 20 minutes.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-black"
              style={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)", boxShadow: "0 0 30px rgba(245,158,11,0.4)" }}>
              📞 {PHONE} — Fix It Now
            </a>
          </div>
        </div>
      </section>

      {errorData ? (
        <>
          {/* CAUSES */}
          <section className="py-12 px-4" style={{ background: "#0a1628" }}>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-black text-white mb-6">What Causes {brandName} Error {code}?</h2>
              <div className="grid grid-cols-2 gap-3">
                {errorData.causes.map((c, i) => (
                  <div key={i} className="rounded-xl p-4 flex items-center gap-3"
                    style={{ background: "#0f172a", border: `1px solid ${brandColor}33` }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-black flex-shrink-0"
                      style={{ background: brandColor }}>{i + 1}</div>
                    <div className="text-white/70 text-sm">{c}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FIX STEPS */}
          <section className="py-20 px-4" style={{ background: "linear-gradient(180deg,#020817 0%,#0a0f1e 100%)" }}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-black text-white text-center mb-12">
                How to Fix {brandName} Error {code}
              </h2>
              <div className="flex flex-col gap-5">
                {errorData.fixes.map((fix, i) => (
                  <div key={i} className="rounded-2xl p-6"
                    style={{ background: "linear-gradient(135deg,#1e293b,#0f172a)", border: `1px solid ${brandColor}33` }}>
                    <div className="flex items-start gap-5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-black flex-shrink-0"
                        style={{ background: brandColor }}>
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="text-white font-black text-lg mb-2 step-description">{fix.step}</h3>
                        <p className="text-white/60 leading-relaxed">{fix.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl p-8 text-center"
                style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}>
                <div className="text-3xl mb-3">🛠️</div>
                <h3 className="text-white font-black text-xl mb-3">Still getting the error?</h3>
                <p className="text-white/55 mb-5">
                  Some {brandName} {code} errors need a deep firmware reset or hardware diagnostic. We fix this daily — remotely in under 20 minutes.
                </p>
                <a href={PHONE_HREF}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-black"
                  style={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)" }}>
                  📞 {PHONE} — Free Diagnosis
                </a>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Fallback for unknown codes */
        <section className="py-20 px-4" style={{ background: "#020817" }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-6">🔍</div>
            <h2 className="text-2xl font-black text-white mb-4">
              We fix {brandName} error code {code.toUpperCase()} — call us
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Our technicians have seen every {brandName} error code. Call us free and we&apos;ll diagnose it in under 5 minutes.
            </p>
            <a href={PHONE_HREF}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-black"
              style={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)" }}>
              📞 {PHONE} — Free Diagnosis
            </a>
          </div>
        </section>
      )}

      {/* RELATED */}
      <section className="py-12 px-4" style={{ background: "#050d1a" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white font-black text-xl mb-6 text-center">More {brandName} Help</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: `${brandName} Printer Repair`, href: `/${brand}-printer-repair` },
              { label: "Printer Won't Print", href: "/printer-wont-print" },
              { label: "Printer Offline Fix", href: "/hp-printer-offline" },
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
