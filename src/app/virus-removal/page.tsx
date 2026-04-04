import type { Metadata } from "next";
import Link from "next/link";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Virus & Malware Removal — Remote Same Day | Trini System LLC",
  description: "Professional virus, malware, spyware and ransomware removal. Remote service — we clean your PC while you watch. No data loss. All 50 states. Call 347-953-1531.",
  keywords: [
    "virus removal near me","malware removal service","computer virus removal","remove virus from pc",
    "ransomware removal","spyware removal","virus removal cost","online virus removal",
    "remote virus removal","computer virus fix","tech support virus","antivirus setup",
  ],
};

const PHONE_HREF = "tel:+13479531531";
const PHONE = "347-953-1531";

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://trinisystem.vercel.app" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://trinisystem.vercel.app/services" },
      { "@type": "ListItem", "position": 3, "name": "Virus Removal", "item": "https://trinisystem.vercel.app/virus-removal" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I know if my computer has a virus?",
        "acceptedAnswer": { "@type": "Answer", "text": "Common signs include: sudden slowdowns, pop-up ads appearing even when not browsing, programs opening or closing on their own, browser homepage changed without your permission, unusual hard drive activity, and antivirus being disabled. If you notice any of these, call Trini System at 347-953-1531 immediately." }
      },
      {
        "@type": "Question",
        "name": "How much does virus removal cost?",
        "acceptedAnswer": { "@type": "Answer", "text": "Trini System's remote virus removal starts at $49 — significantly less than Geek Squad's $149+ fee. We remove all viruses, malware, spyware, and ransomware remotely while you watch. No fix = no fee." }
      },
      {
        "@type": "Question",
        "name": "Will virus removal delete my files?",
        "acceptedAnswer": { "@type": "Answer", "text": "No. Our remote virus removal process is designed to preserve all your personal files, photos, and documents. We target and remove only malicious files. In 8+ years and 5,000+ sessions, we have never caused data loss during a virus removal." }
      },
      {
        "@type": "Question",
        "name": "What if I was scammed online?",
        "acceptedAnswer": { "@type": "Answer", "text": "If you gave someone remote access to your computer or paid a fake tech support company, call Trini System immediately at 347-953-1531. We will secure your computer, remove any software they installed, and advise you on protecting your accounts and financial information." }
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Virus & Malware Removal Service",
    "provider": { "@type": "LocalBusiness", "name": "Trini System LLC", "telephone": "+13479531531" },
    "areaServed": "United States",
    "serviceType": "Virus Removal",
    "offers": { "@type": "Offer", "price": "49", "priceCurrency": "USD" },
  },
];

const WARNING_SIGNS = [
  { icon: "🐌", title: "Sudden slowdown", desc: "Your PC was fine last week but now takes 10 minutes to start up." },
  { icon: "💥", title: "Pop-up ads everywhere", desc: "Ads appear even when you're not on a website — even on your desktop." },
  { icon: "🔒", title: "Browser hijacked", desc: "Your homepage or search engine changed to something you didn't set." },
  { icon: "🔇", title: "Antivirus turned off", desc: "Windows Defender or your antivirus stopped working or was disabled." },
  { icon: "📧", title: "Friends getting weird emails", desc: "People say they're getting strange emails from your account." },
  { icon: "💸", title: "Tech support scam pop-up", desc: "A scary pop-up says your computer is infected and to call a number." },
];

const PROCESS_STEPS = [
  { step: "01", icon: "📞", title: "Call Us", desc: "Call 347-953-1531. A real technician answers — not a bot. We assess your situation in 2 minutes." },
  { step: "02", icon: "🔗", title: "We Connect Remotely", desc: "We give you a simple link to click. This lets us view your screen. You watch everything we do, live." },
  { step: "03", icon: "🔍", title: "Full System Scan", desc: "We run Malwarebytes, Windows Defender full scan, and check startup programs, browser extensions, and system processes." },
  { step: "04", icon: "🧹", title: "Remove All Threats", desc: "We remove every virus, malware, spyware, or adware found — and uninstall any suspicious programs the scammer may have installed." },
  { step: "05", icon: "🛡️", title: "Secure & Protect", desc: "We install proper antivirus protection, adjust security settings, and advise you on protecting your accounts going forward." },
  { step: "06", icon: "✅", title: "Verify & Done", desc: "We run a final scan to confirm zero threats remain. You only pay if we fully solve the problem." },
];

export default function VirusRemovalPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Urgent top banner */}
      <div className="bg-red-700 text-white py-3 text-center text-sm font-semibold">
        🦠 Virus / Malware Removal — Remote Same Day · No Fix = No Fee ·{" "}
        <a href={PHONE_HREF} className="underline font-bold">Call {PHONE} Now</a>
      </div>

      {/* Hero */}
      <section className="pt-14 pb-16 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-red-200">
                🦠 Virus & Malware Removal
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5">
                Virus on Your Computer?
                <span className="block text-red-600">We Remove It Today.</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Remote virus removal while you watch — no appointment, no dropping off your computer. We clean it completely and restore your security. <strong>No fix = no fee.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a href={PHONE_HREF}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-lg px-7 py-4 rounded-2xl shadow-lg transition-all">
                  📞 {PHONE} — Call Now
                </a>
                <Link href="/fix"
                  className="flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold text-lg px-7 py-4 rounded-2xl border-2 border-gray-200 hover:border-red-300 transition-all">
                  Use Free Diagnosis →
                </Link>
              </div>
              <div className="flex flex-wrap gap-3">
                {["Starts at $49", "No data loss ever", "Remote — no drop-off", "All 50 states"].map(b => (
                  <span key={b} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />{b}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "🦠", title: "Viruses", sub: "All types removed" },
                { icon: "🕵️", title: "Spyware", sub: "Fully eliminated" },
                { icon: "💰", title: "Ransomware", sub: "Specialist help" },
                { icon: "📢", title: "Adware", sub: "Pop-ups gone" },
                { icon: "🔗", title: "Trojans", sub: "Detected & removed" },
                { icon: "🔒", title: "Scam Software", sub: "Uninstalled safely" },
              ].map(item => (
                <div key={item.title} className="bg-white rounded-2xl p-4 shadow-soft border border-gray-100 text-center">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="font-black text-gray-900 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Warning signs */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Is Your Computer Infected?</h2>
            <p className="text-gray-500 text-lg">These are the warning signs most people ignore until it's too late.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WARNING_SIGNS.map(sign => (
              <div key={sign.title} className="flex items-start gap-4 p-5 bg-red-50 rounded-2xl border border-red-100">
                <span className="text-3xl shrink-0">{sign.icon}</span>
                <div>
                  <p className="font-black text-gray-900 mb-1">{sign.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{sign.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4 text-lg">Recognize any of these? Don&apos;t wait — call us now.</p>
            <a href={PHONE_HREF}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-lg transition-all">
              📞 Call {PHONE} — Urgent Help
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">How Our Virus Removal Works</h2>
            <p className="text-gray-500 text-lg">6 steps. Average time: 45–90 minutes. You watch everything, live.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map(step => (
              <div key={step.step} className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{step.icon}</span>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Step {step.step}</span>
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Will virus removal delete my files?", a: "No. Our process targets and removes only malicious files. Your photos, documents, and personal files are completely safe. In 8+ years and 5,000+ sessions we have never caused data loss." },
              { q: "What if I was scammed by fake tech support?", a: "Call us immediately at 347-953-1531. We will disconnect the scammer, remove their software, change compromised passwords, and secure your computer. Time is critical — the sooner you call, the better." },
              { q: "How long does virus removal take?", a: "Most virus removals take 45–90 minutes remotely. Severe infections or ransomware may take longer. We stay on the session until your computer is completely clean." },
              { q: "Do I need to bring in my computer?", a: "Never. All our virus removal is done remotely — you stay home. We connect to your computer via a secure link. You watch everything we do on your screen in real time." },
            ].map(({ q, a }) => (
              <div key={q} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-black text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
