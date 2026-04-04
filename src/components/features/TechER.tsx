"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════
   TECH ER — Interactive Diagnostic Engine
   Used on: /fix  /hp-printer-repair  /epson-printer-repair
            /canon-printer-repair  /reparacion-impresoras
   Props:
     brandFilter  — pre-selects a brand (skips first question)
     pageTrending — array of trending search strings to show
═══════════════════════════════════════════════════════════════ */

export type BrandFilter = "HP" | "Canon" | "Epson" | "Brother" | undefined;

interface TechERProps {
  brandFilter?: BrandFilter;
  pageTrending?: string[];
}

type Severity = "easy" | "medium" | "urgent";

interface Fix {
  title: string;
  summary: string;
  severity: Severity;
  successRate: number;
  avgTime: string;
  steps: { icon: string; title: string; detail: string }[];
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

/* ── Fix Knowledge Base ─────────────────────────────────────── */
const FIXES: Record<string, Fix> = {
  hp_offline: {
    title: "HP Printer Showing Offline",
    summary: "Your PC lost contact with the printer — usually a stale IP address or driver glitch. Fixes itself 9 out of 10 times without hardware replacement.",
    severity: "easy", successRate: 94, avgTime: "8 min",
    steps: [
      { icon: "🔌", title: "Hard reset both devices", detail: "Power off your HP printer completely. Unplug the power cord from the wall for 30 seconds. Do the same with your WiFi router." },
      { icon: "📶", title: "Restart in the correct order", detail: "Plug in the router first. Wait a full 60 seconds. Then plug in and power on the HP printer." },
      { icon: "🖥️", title: "Remove the offline flag in Windows", detail: "Go to Start → Settings → Bluetooth & Devices → Printers & Scanners. Click your HP printer → Open print queue → click 'Printer' menu → uncheck 'Use Printer Offline'." },
      { icon: "🖨️", title: "Set as default and test print", detail: "In Printers & Scanners, click your HP printer → Set as Default → Print a test page." },
      { icon: "⚙️", title: "Still offline? Reinstall the driver", detail: "Visit 123.hp.com, enter your model, download HP Smart App. Choose Wireless setup. This creates a completely fresh connection." },
    ],
    cta: { label: "📞 Call Us — We Fix This in 15 Min", href: PHONE_HREF },
    ctaSecondary: { label: "View HP Repair Page →", href: "/hp-printer-repair" },
  },
  hp_error: {
    title: "HP Printer Error Code",
    summary: "HP error codes like OXc19a0035 or 0x6100004a look scary but are almost always fixable remotely — no hardware replacement needed in 90% of cases.",
    severity: "medium", successRate: 88, avgTime: "20 min",
    steps: [
      { icon: "📋", title: "Note the exact error code", detail: "Write down or photograph the error code shown on your printer display or HP Smart app." },
      { icon: "🔌", title: "Full power cycle", detail: "Turn the printer fully off (not sleep). Unplug from the wall for 60 seconds — this clears memory and resets the system." },
      { icon: "🖨️", title: "Remove and reseat ink cartridges", detail: "Open the cartridge door. Remove all cartridges. Wait 30 seconds. Reinstall them firmly until they click." },
      { icon: "💻", title: "Update printer firmware", detail: "Open HP Smart app → select your printer → Printer Settings → Printer Updates → Check for Updates." },
    ],
    cta: { label: "📞 Call — HP Error Code Expert", href: PHONE_HREF },
    ctaSecondary: { label: "HP Repair Page →", href: "/hp-printer-repair" },
  },
  canon_b200: {
    title: "Canon B200 Error — Don't Replace It Yet",
    summary: "The Canon B200 error signals a print head issue, but 80% of B200 errors are caused by overheating and ARE fixable without buying a new printer.",
    severity: "urgent", successRate: 80, avgTime: "30 min",
    steps: [
      { icon: "🔌", title: "Full power off + unplug", detail: "Power off the printer completely and unplug it from the wall. Wait 15 minutes — the print head needs to cool down fully." },
      { icon: "🖨️", title: "Cartridge reset position", detail: "Open the printer lid. Manually slide the cartridge carrier to the center of the printer. Close the lid slowly." },
      { icon: "🔄", title: "Power on with Stop held", detail: "Plug in the printer. Hold the Stop/Reset button while pressing Power. Release both when the printer starts up. This triggers a maintenance reset." },
      { icon: "💻", title: "Run Canon My Printer tool", detail: "Download 'Canon My Printer' from usa.canon.com/support. Run Maintenance → Head Cleaning → Nozzle Check." },
    ],
    cta: { label: "📞 Canon B200 Specialist — Call Now", href: PHONE_HREF },
    ctaSecondary: { label: "Canon Repair Page →", href: "/canon-printer-repair" },
  },
  canon_wifi: {
    title: "Canon Printer WiFi / Offline Fix",
    summary: "Canon PIXMA and imageCLASS printers lose WiFi connection most often after a router change or Windows update. Completely fixable in one session.",
    severity: "easy", successRate: 95, avgTime: "12 min",
    steps: [
      { icon: "🔄", title: "Restart printer and router", detail: "Power off both the Canon printer and your WiFi router. Wait 30 seconds. Plug in the router first, wait 60 seconds, then power on the printer." },
      { icon: "📱", title: "Use Canon PRINT app", detail: "Download Canon PRINT Inkjet/SELPHY app on your phone. Tap '+' to add a printer. The app uses Bluetooth to reconnect your printer to WiFi automatically." },
      { icon: "🖥️", title: "Reinstall driver on PC", detail: "Go to usa.canon.com/support, search your model, download the MP Drivers. Run the installer and select 'Wireless LAN connection' when prompted." },
    ],
    cta: { label: "📞 Call — Canon WiFi Fix", href: PHONE_HREF },
    ctaSecondary: { label: "Canon Repair Page →", href: "/canon-printer-repair" },
  },
  epson_ink: {
    title: "Epson Ink System Error — Even With Full Tanks",
    summary: "Epson EcoTank ink errors are almost always a sensor calibration issue, not real ink problem. We reset this remotely in under 15 minutes.",
    severity: "medium", successRate: 92, avgTime: "15 min",
    steps: [
      { icon: "🔌", title: "Power cycle the printer", detail: "Turn off the Epson printer. Unplug the power cable from the back of the printer (not just the wall outlet). Wait 60 seconds. Plug back in and power on." },
      { icon: "💻", title: "Run Epson Print and Scan Doctor", detail: "Download 'Epson Print and Scan Doctor' from epson.com/support. Run it — it automatically detects and fixes the most common ink sensor errors." },
      { icon: "🧹", title: "Run Head Cleaning utility", detail: "Open Epson Printer Utility on your PC → Maintenance → Head Cleaning → Run up to 3 cycles → Print Nozzle Check after each cycle." },
      { icon: "🔧", title: "If error persists — Adjustment Program", detail: "We use the Epson Adjustment Program remotely to reset the ink counter. This is a 10-minute fix that clears all ink system errors permanently." },
    ],
    cta: { label: "📞 Epson Ink Error Specialist", href: PHONE_HREF },
    ctaSecondary: { label: "Epson Repair Page →", href: "/epson-printer-repair" },
  },
  epson_wifi: {
    title: "Epson Printer WiFi / Offline Fix",
    summary: "Epson WorkForce and EcoTank printers lose WiFi connection most often after a router change or Windows update. Back online in minutes.",
    severity: "easy", successRate: 96, avgTime: "10 min",
    steps: [
      { icon: "🔄", title: "Restart printer and router", detail: "Turn off both devices. Restart the router first, wait 60 seconds, then power on the Epson printer." },
      { icon: "📶", title: "Run Wireless Setup on printer", detail: "On the printer's control panel: Settings → Wi-Fi Setup → Wi-Fi Setup Wizard. Enter your WiFi password carefully (they're case-sensitive)." },
      { icon: "💻", title: "Reinstall using Epson Connect Setup", detail: "Download 'Epson Connect Printer Setup' from epson.com. Run it and choose 'Wireless LAN' connection. It completely rebuilds the WiFi connection." },
    ],
    cta: { label: "📞 Call — Epson WiFi Fix", href: PHONE_HREF },
    ctaSecondary: { label: "Epson Repair Page →", href: "/epson-printer-repair" },
  },
  brother_driver: {
    title: "Brother Printer Driver Issue (Windows 11)",
    summary: "Brother printer driver unavailable is the #1 complaint after Windows 11 updates. The fix involves downloading the correct full driver package.",
    severity: "medium", successRate: 97, avgTime: "18 min",
    steps: [
      { icon: "🗑️", title: "Remove the old driver completely", detail: "Go to Settings → Bluetooth & Devices → Printers. Right-click your Brother printer → Remove device. Then go to Device Manager and remove any Brother entries under Print queues." },
      { icon: "⬇", title: "Download Full Driver from Brother", detail: "Go to support.brother.com. Search your model. Download the 'Full Driver & Software Package'. Do NOT use Windows Update drivers — always use the official Brother package." },
      { icon: "🔌", title: "Install via USB first, then switch to WiFi", detail: "Connect your Brother printer to your PC via USB cable. Run the installer. After installation is complete, switch to wireless in the Brother Wireless Setup Wizard." },
    ],
    cta: { label: "📞 Call — Brother Driver Specialist", href: PHONE_HREF },
    ctaSecondary: { label: "View All Services →", href: "/services" },
  },
  pc_slow: {
    title: "Slow PC — Free Fix with TriniCleaner",
    summary: "A slow Windows PC is almost always caused by junk files, registry errors, or too many startup programs. TriniCleaner fixes this in one click — completely free.",
    severity: "easy", successRate: 98, avgTime: "5 min",
    steps: [
      { icon: "⬇", title: "Download TriniCleaner for free", detail: "Download TriniCleaner from our website — no subscription, no sign-up, no credit card ever required." },
      { icon: "🔍", title: "Run a full system scan", detail: "Open TriniCleaner and click 'Full Scan'. It takes about 45 seconds. Average users find 4–8 GB of junk files." },
      { icon: "🧹", title: "Clean and restart", detail: "Review the scan results, click 'Clean Now'. Restart your PC when prompted. Most users notice immediate improvement on startup." },
      { icon: "🚀", title: "Disable startup programs", detail: "In TriniCleaner, go to Startup Manager. Disable programs you don't need at startup (common ones: Teams, Spotify, OneDrive, Adobe). This alone can cut boot time in half." },
    ],
    cta: { label: "⬇ Download TriniCleaner — Free", href: DOWNLOAD_URL },
    ctaSecondary: { label: "Still slow? Call us →", href: PHONE_HREF },
  },
  pc_virus: {
    title: "Virus or Malware — Urgent Help",
    summary: "Don't panic. Most viruses and malware can be fully removed remotely. Our techs will scan your entire system and eliminate threats without losing any files.",
    severity: "urgent", successRate: 99, avgTime: "45 min",
    steps: [
      { icon: "🚫", title: "Stop what you're doing immediately", detail: "Do NOT enter any passwords, credit card numbers, or banking information on the affected computer until it's been cleaned." },
      { icon: "📵", title: "Disconnect from the internet if possible", detail: "Unplug your ethernet cable or turn off WiFi. This prevents malware from sending data or downloading more malicious files." },
      { icon: "📞", title: "Call us — virus removal starts same day", detail: "Our technicians connect remotely, run Malwarebytes + Windows Defender full scans, and remove all threats while you watch." },
      { icon: "🔒", title: "Change passwords after cleaning", detail: "Once the computer is clean, change your email, banking, and important passwords from a clean device first." },
    ],
    cta: { label: "📞 Call Now — Urgent Virus Help", href: PHONE_HREF },
    ctaSecondary: { label: "Learn About Virus Removal →", href: "/virus-removal" },
  },
  gps_update: {
    title: "Garmin GPS Map Update",
    summary: "Garmin map updates can be confusing. We do this every single day — remotely while you watch, or walk you through it step by step over the phone.",
    severity: "easy", successRate: 100, avgTime: "30-90 min",
    steps: [
      { icon: "⬇", title: "Download Garmin Express", detail: "Visit garmin.com/express on your computer. Download and install Garmin Express (it's free)." },
      { icon: "🔌", title: "Connect GPS via USB", detail: "Connect your Garmin GPS to your computer using the micro-USB cable that came with it. Garmin Express will detect it automatically." },
      { icon: "👤", title: "Sign in to your Garmin account", detail: "Sign in or create a free Garmin account. This activates your map subscriptions and shows available updates." },
      { icon: "🗺️", title: "Download map updates", detail: "Click 'Add Map Updates' and let it run. Map updates can take 30–90 minutes depending on your internet speed." },
    ],
    cta: { label: "📞 Get GPS Update Help — We Do It For You", href: PHONE_HREF },
    ctaSecondary: { label: "View Step-by-Step Guides →", href: "/guides" },
  },
};

/* ── Brand-specific question trees ─────────────────────────── */
const BRAND_QUESTIONS: Record<string, { question: string; options: { label: string; icon: string; fixKey: string }[] }> = {
  HP: {
    question: "What's the issue with your HP Printer?",
    options: [
      { label: "Printer shows Offline", icon: "📵", fixKey: "hp_offline" },
      { label: "Error code on screen", icon: "❌", fixKey: "hp_error" },
      { label: "Not printing / queue stuck", icon: "🔄", fixKey: "hp_offline" },
      { label: "Won't connect to WiFi", icon: "📶", fixKey: "hp_offline" },
    ],
  },
  Canon: {
    question: "What's the issue with your Canon Printer?",
    options: [
      { label: "Error B200", icon: "🔴", fixKey: "canon_b200" },
      { label: "Error E03 / E04 / 5100", icon: "❌", fixKey: "canon_wifi" },
      { label: "Not printing at all", icon: "🔇", fixKey: "canon_wifi" },
      { label: "WiFi / wireless issue", icon: "📶", fixKey: "canon_wifi" },
    ],
  },
  Epson: {
    question: "What's the issue with your Epson Printer?",
    options: [
      { label: "Ink error (tanks are full)", icon: "💧", fixKey: "epson_ink" },
      { label: "Won't print at all", icon: "🔇", fixKey: "epson_wifi" },
      { label: "WiFi / network problem", icon: "📶", fixKey: "epson_wifi" },
      { label: "Error code showing", icon: "❌", fixKey: "epson_ink" },
    ],
  },
  Brother: {
    question: "What's the issue with your Brother Printer?",
    options: [
      { label: "Driver unavailable (Win 11)", icon: "⚠️", fixKey: "brother_driver" },
      { label: "AirPrint not working", icon: "📱", fixKey: "brother_driver" },
      { label: "Toner / drum error", icon: "🖤", fixKey: "brother_driver" },
      { label: "Won't connect to WiFi", icon: "📶", fixKey: "brother_driver" },
    ],
  },
};

const GENERAL_OPTIONS = [
  { label: "HP Printer", icon: "🖨️", brand: "HP" as BrandFilter },
  { label: "Canon Printer", icon: "🖨️", brand: "Canon" as BrandFilter },
  { label: "Epson Printer", icon: "🖨️", brand: "Epson" as BrandFilter },
  { label: "Brother Printer", icon: "🖨️", brand: "Brother" as BrandFilter },
  { label: "PC / Laptop Slow", icon: "💻", fixKey: "pc_slow" },
  { label: "Virus / Malware", icon: "🦠", fixKey: "pc_virus" },
  { label: "Garmin GPS", icon: "🗺️", fixKey: "gps_update" },
];

const SEVERITY_STYLES: Record<Severity, { bg: string; border: string; badge: string; label: string }> = {
  easy:   { bg: "bg-emerald-50", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700", label: "🟢 Easy Fix" },
  medium: { bg: "bg-amber-50",   border: "border-amber-200",   badge: "bg-amber-100 text-amber-700",   label: "🟡 Moderate" },
  urgent: { bg: "bg-red-50",     border: "border-red-200",     badge: "bg-red-100 text-red-700",       label: "🔴 Urgent" },
};

/* ── Main Component ─────────────────────────────────────────── */
export function TechER({ brandFilter, pageTrending }: TechERProps) {
  // If brand is pre-selected, skip straight to brand questions
  const [stage, setStage] = useState<"brand" | "issue" | "result">(brandFilter ? "issue" : "brand");
  const [selectedBrand, setSelectedBrand] = useState<BrandFilter>(brandFilter);
  const [fix, setFix] = useState<Fix | null>(null);

  const reset = () => {
    setStage(brandFilter ? "issue" : "brand");
    setSelectedBrand(brandFilter);
    setFix(null);
  };

  const chooseBrand = (brand: BrandFilter, fixKey?: string) => {
    if (fixKey) { setFix(FIXES[fixKey]); setStage("result"); return; }
    setSelectedBrand(brand);
    setStage("issue");
  };

  const chooseIssue = (fixKey: string) => {
    setFix(FIXES[fixKey]);
    setStage("result");
  };

  const brandQ = selectedBrand ? BRAND_QUESTIONS[selectedBrand] : null;
  const sev = fix ? SEVERITY_STYLES[fix.severity] : null;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-sky-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-blue-200">
            🧠 Smart Diagnostic Tool
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            What&apos;s the Problem?
            <span className="block text-gradient"> We&apos;ll Find the Fix.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            {brandFilter
              ? `Select your ${brandFilter} printer issue and get an instant step-by-step fix — or connect to a technician.`
              : "Answer 2 quick questions and get an instant solution — or connect directly to a technician."}
          </p>
        </div>

        {/* Trending pills */}
        {pageTrending && pageTrending.length > 0 && stage !== "result" && (
          <div className="mb-6 flex flex-wrap gap-2 justify-center">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest self-center">🔥 Trending:</span>
            {pageTrending.map(t => (
              <span key={t} className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Wizard Card */}
        <div className="bg-white rounded-3xl shadow-soft-xl border border-gray-100 overflow-hidden">
          {/* Progress bar */}
          <div className="h-1.5 bg-gray-100">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
              animate={{ width: stage === "result" ? "100%" : stage === "issue" ? "50%" : "10%" }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="p-7 md:p-10">
            <AnimatePresence mode="wait">

              {/* Stage 1: Choose brand or category */}
              {stage === "brand" && (
                <motion.div key="brand"
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2 text-center">Step 1</p>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">
                    What device are you having trouble with?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {GENERAL_OPTIONS.map(opt => (
                      <motion.button key={opt.label}
                        onClick={() => chooseBrand(opt.brand, (opt as any).fixKey)}
                        whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50/60 transition-all text-left group">
                        <span className="text-3xl">{opt.icon}</span>
                        <span className="font-semibold text-gray-800 group-hover:text-blue-700 text-base">{opt.label}</span>
                        <svg className="ml-auto w-5 h-5 text-gray-300 group-hover:text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-400 mt-6">
                    Or call directly: <a href={PHONE_HREF} className="text-blue-600 font-semibold hover:underline">{PHONE}</a> — available 24/7
                  </p>
                </motion.div>
              )}

              {/* Stage 2: Brand-specific issue */}
              {stage === "issue" && brandQ && (
                <motion.div key="issue"
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2 text-center">Step 2</p>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">{brandQ.question}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {brandQ.options.map(opt => (
                      <motion.button key={opt.label}
                        onClick={() => chooseIssue(opt.fixKey)}
                        whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50/60 transition-all text-left group">
                        <span className="text-3xl">{opt.icon}</span>
                        <span className="font-semibold text-gray-800 group-hover:text-blue-700 text-base">{opt.label}</span>
                        <svg className="ml-auto w-5 h-5 text-gray-300 group-hover:text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                      </motion.button>
                    ))}
                  </div>
                  {!brandFilter && (
                    <button onClick={() => { setStage("brand"); setSelectedBrand(undefined); }}
                      className="mt-6 text-sm text-gray-400 hover:text-gray-700 flex items-center gap-1 mx-auto transition-colors">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                      Back
                    </button>
                  )}
                </motion.div>
              )}

              {/* Stage 3: Result with fix steps */}
              {stage === "result" && fix && sev && (
                <motion.div key="result"
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${sev.badge}`}>
                        {sev.label}
                      </span>
                      <span className="text-xs text-gray-400 font-semibold">{fix.successRate}% success rate · ~{fix.avgTime}</span>
                    </div>
                    <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                      Start over
                    </button>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3">{fix.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{fix.summary}</p>

                  {/* Steps */}
                  <div className={`rounded-2xl p-5 ${sev.bg} border ${sev.border} mb-6`}>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Step-by-Step Fix Guide</p>
                    <ol className="space-y-4">
                      {fix.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${sev.badge}`}>
                            {i + 1}
                          </span>
                          <div>
                            <p className="font-bold text-gray-900 text-sm mb-0.5">{step.icon} {step.title}</p>
                            <p className="text-sm text-gray-600 leading-relaxed">{step.detail}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href={fix.cta.href}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-2xl shadow-brand transition-all">
                      {fix.cta.label}
                    </a>
                    {fix.ctaSecondary && (
                      <Link href={fix.ctaSecondary.href}
                        className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold py-4 px-6 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all">
                        {fix.ctaSecondary.label}
                      </Link>
                    )}
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Or call us: <a href={PHONE_HREF} className="text-blue-600 font-semibold hover:underline">{PHONE}</a> — 24/7, no fix = no fee
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
