import type { Metadata } from "next";
import Link from "next/link";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";
import { PHONE, PHONE_HREF } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Virus & Malware Removal — Remote Same Day Fix | Trini System LLC",
  description: "Professional virus, malware, ransomware, spyware removal. Remote service — we clean your PC while you watch. No data loss. All 50 states. From $49. Call 347-953-1531.",
  keywords: [
    "virus removal near me","malware removal service","computer virus removal","remove virus from pc",
    "ransomware removal","spyware removal","virus removal cost","online virus removal",
    "remote virus removal","computer virus fix","tech support scam","fake virus popup",
    "browser hijacked fix","antivirus not working","malwarebytes help","norton virus removal",
    "mcafee not working","computer hacked help","tech support scam recovery","pc security fix",
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://trinisystem.vercel.app/services" },
      { "@type": "ListItem", position: 3, name: "Virus Removal", item: "https://trinisystem.vercel.app/virus-removal" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How do I know if my computer has a virus?",
        acceptedAnswer: { "@type": "Answer", text: "Signs your PC has a virus: sudden extreme slowdown, pop-up ads appearing even without a browser open, browser homepage or search engine changed without permission, antivirus keeps alerting or was turned off, strange emails being sent from your account, or a scary pop-up saying 'Call Microsoft'. If you notice any of these, call Trini System at 347-953-1531 immediately." } },
      { "@type": "Question", name: "How much does virus removal cost?",
        acceptedAnswer: { "@type": "Answer", text: "Trini System remote virus removal starts at $49 — significantly less than Geek Squad's $149+. We remove all viruses, malware, spyware, and ransomware remotely while you watch. No fix = no fee. We've never charged a customer for a failed removal." } },
      { "@type": "Question", name: "Will virus removal delete my files?",
        acceptedAnswer: { "@type": "Answer", text: "No. Trini System's remote virus removal is designed to preserve all your personal files, photos, and documents. We target and remove only malicious files and programs. In 8+ years and 5,000+ sessions, we have never caused data loss during a virus removal." } },
      { "@type": "Question", name: "That scary pop-up says to call Microsoft — is it real?",
        acceptedAnswer: { "@type": "Answer", text: "No — it is 100% a scam. Microsoft never shows pop-ups with phone numbers or calls you about viruses. Do NOT call the number. Close your browser (Ctrl+Alt+Delete → Task Manager → End Task on browser). Run Malwarebytes free scan. Call Trini System at 347-953-1531 if it comes back." } },
      { "@type": "Question", name: "What if I was scammed and gave someone remote access?",
        acceptedAnswer: { "@type": "Answer", text: "Call Trini System at 347-953-1531 immediately. We will connect remotely, check all programs installed by the scammer, remove their remote access software, check for keyloggers, and secure your accounts. Change your email and banking passwords from a different device as soon as possible." } },
      { "@type": "Question", name: "What is ransomware and can it be removed?",
        acceptedAnswer: { "@type": "Answer", text: "Ransomware encrypts your files and demands payment. Do NOT pay. Disconnect from the internet immediately. Call Trini System at 347-953-1531 — we assess ransomware recovery options, remove the ransomware, and help restore files from shadow copies or backups when possible." } },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Virus & Malware Removal Service",
    provider: { "@type": "LocalBusiness", name: "Trini System LLC", telephone: "+13479531531" },
    areaServed: "United States",
    serviceType: "Virus Removal",
    offers: { "@type": "Offer", price: "49", priceCurrency: "USD", description: "Remote virus removal — no fix no fee" },
  },
];

const WARNING_SIGNS = [
  { icon: "🐌", title: "Extreme Slowdown", urgency: "high", desc: "PC was normal last week, now takes 10+ minutes to start. Malware may be using your CPU in the background." },
  { icon: "💥", title: "Pop-Up Ads Everywhere", urgency: "high", desc: "Ads appear even on your desktop, not just in browsers. This is adware — it must be removed completely." },
  { icon: "🔒", title: "Browser Hijacked", urgency: "medium", desc: "Your homepage changed to something you didn't set. Search engine redirects you to unknown sites." },
  { icon: "🔇", title: "Antivirus Turned Off", urgency: "high", desc: "Windows Defender or your antivirus was disabled. Only malware does this — it disables protection to avoid removal." },
  { icon: "📧", title: "Spam Being Sent From You", urgency: "high", desc: "Friends say they're getting strange emails from your account. Your email may be compromised." },
  { icon: "📞", title: "Fake Microsoft Alert", urgency: "urgent", desc: "A scary pop-up says your computer is infected — call this number. DO NOT call. This is a scam 100% of the time." },
];

const THREAT_TYPES = [
  { name: "Virus", icon: "🦠", severity: "High", desc: "Self-replicating code that corrupts files and spreads to other programs. Can cause data loss and system crashes." },
  { name: "Malware", icon: "☣️", severity: "High", desc: "Umbrella term for malicious software including viruses, trojans, ransomware, and spyware." },
  { name: "Ransomware", icon: "🔒", severity: "Critical", desc: "Encrypts all your files and demands payment. Do NOT pay. Call us immediately for recovery options." },
  { name: "Spyware", icon: "👁️", severity: "High", desc: "Silently records your keystrokes, passwords, and banking information and sends it to criminals." },
  { name: "Adware", icon: "📢", severity: "Medium", desc: "Floods your screen with ads, hijacks your browser, and redirects searches to earn money for criminals." },
  { name: "Tech Support Scam", icon: "📞", severity: "Critical", desc: "Fake Microsoft/McAfee pop-ups with phone numbers. Scammers get remote access and steal money." },
];

const PROCESS_STEPS = [
  { n: "01", icon: "📞", title: "Call Us — We Answer Immediately", desc: "Call 347-953-1531. A real technician answers — not a phone tree. We assess your situation and tell you what we're dealing with in 2 minutes." },
  { n: "02", icon: "🔗", title: "Secure Remote Connection", desc: "We send you a link to click. You see everything we do on your screen — there are no surprises. We connect using industry-standard encrypted remote tools." },
  { n: "03", icon: "🔍", title: "Full System Threat Scan", desc: "We run Malwarebytes + Windows Defender full scan, check startup programs, browser extensions, running processes, and installed programs for anything suspicious." },
  { n: "04", icon: "🧹", title: "Remove All Threats", desc: "We remove every virus, malware, spyware, adware, and suspicious program — including any software a scammer may have installed." },
  { n: "05", icon: "🛡️", title: "Secure & Protect", desc: "We install proper antivirus protection (or fix your existing one), adjust Windows security settings, and advise on protecting your passwords and accounts." },
  { n: "06", icon: "✅", title: "Final Scan — Verify Clean", desc: "We run one final scan to confirm zero threats remain. You only pay if your computer is completely clean and secure." },
];

const REVIEWS = [
  { name: "Helen F.", stars: 5, text: "Got one of those scary Microsoft pop-ups. Called Trini System in a panic — they were so calm and professional. Fixed it in 25 minutes and explained the whole scam to me.", loc: "Phoenix, AZ" },
  { name: "George P.", stars: 5, text: "Ransomware locked all my photos. Trini System removed it and recovered 90% of my files from shadow copies. I thought they were all gone forever.", loc: "Houston, TX" },
  { name: "Nancy B.", stars: 5, text: "I accidentally called a scam support number and gave them access. Trini System found and removed everything they installed. Very thorough and honest.", loc: "Boston, MA" },
  { name: "Michael T.", stars: 5, text: "McAfee was alerting constantly but couldn't remove the threat. Trini System ran Malwarebytes alongside it and found 14 pieces of malware. All gone now.", loc: "Las Vegas, NV" },
];

export default function VirusRemovalPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1a0000 0%,#3b0000 40%,#500000 100%)" }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(252,165,165,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(252,165,165,0.8) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        {/* Pulse rings */}
        <div className="absolute right-10 top-12 opacity-15 pointer-events-none hidden lg:block">
          {[60, 100, 140, 180].map((r) => (
            <div key={r} className="absolute rounded-full border border-red-400 -translate-x-1/2 -translate-y-1/2 animate-ping" style={{ width: r, height: r, animationDuration: `${2 + r / 60}s`, animationDelay: `${r / 200}s` }} />
          ))}
          <div className="w-6 h-6 rounded-full bg-red-400 absolute -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-center">
            {/* Urgent badge */}
            <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-red-500/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              Virus Removal — Same Day Service
            </div>
            <h1 className="font-black text-white tracking-tight leading-[0.95] mb-5" style={{ fontSize: "clamp(2.6rem,6vw,5rem)" }}>
              Computer Infected?<br />
              <span style={{ background: "linear-gradient(90deg,#fca5a5,#f87171)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                We Remove It Completely
              </span>
            </h1>
            <p className="text-white/55 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Virus, malware, ransomware, tech support scams — remote removal while you watch. No files lost. No fix = no fee.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[["5,000+","PCs Secured"],["99%","Removal Success Rate"],["$49","Starting Price"],["8+ yrs","Zero Data Loss"]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <p className="text-2xl font-black text-white">{n}</p>
                  <p className="text-xs text-white/40 font-semibold uppercase tracking-widest">{l}</p>
                </div>
              ))}
            </div>
            {/* Emergency CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PHONE_HREF}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-lg px-8 py-4 rounded-2xl transition-all shadow-2xl"
                style={{ boxShadow: "0 0 40px rgba(239,68,68,0.5)" }}>
                🚨 Call Now — {PHONE} — Urgent Help
              </a>
              <a href="https://discord.gg/trinisystem" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all">
                💬 Discord — Free Virus Advice
              </a>
            </div>
            <p className="text-white/30 text-xs mt-4">Available 24/7 · All 50 US states · No fix = no fee</p>
          </div>
        </div>
      </section>

      {/* ── WARNING SIGNS ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">Know the Signs</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">6 Signs Your PC Has a Virus</h2>
            <p className="text-gray-500 mt-2">Recognizing these early prevents data loss and financial damage</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WARNING_SIGNS.map((w) => (
              <div key={w.title} className={`rounded-3xl p-6 border-2 ${w.urgency === "urgent" ? "bg-red-50 border-red-200" : w.urgency === "high" ? "bg-orange-50 border-orange-100" : "bg-amber-50 border-amber-100"}`}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{w.icon}</span>
                  <div>
                    <span className={`inline-block text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-1 ${w.urgency === "urgent" ? "bg-red-200 text-red-800" : w.urgency === "high" ? "bg-orange-200 text-orange-800" : "bg-amber-200 text-amber-800"}`}>
                      {w.urgency}
                    </span>
                    <h3 className="font-black text-gray-900 text-base">{w.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIAGNOSTIC TOOL ── */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 md:py-16 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">Interactive Diagnosis</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">What&apos;s Your Security Situation?</h2>
            <p className="text-gray-500">Select your antivirus software for a tailored action plan</p>
          </div>
          <TechER category="virus" pageTrending={["Fake Microsoft pop-up","Malwarebytes found threats","Browser homepage changed","Was scammed online"]} />
        </div>
      </section>

      {/* ── THREAT TYPES ── */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">What We Remove</p>
            <h2 className="text-3xl font-black text-gray-900">Every Type of Threat — Removed</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {THREAT_TYPES.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <p className="font-black text-gray-900">{t.name}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${t.severity === "Critical" ? "bg-red-100 text-red-700" : t.severity === "High" ? "bg-orange-100 text-orange-700" : "bg-amber-100 text-amber-700"}`}>
                      {t.severity}
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REMOVAL PROCESS ── */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">Our 6-Step Process</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How We Remove Viruses Remotely</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROCESS_STEPS.map((s) => (
              <div key={s.n} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="text-3xl mb-3">{s.icon}</div>
                <p className="text-xs text-red-600 font-black uppercase tracking-widest mb-1">Step {s.n}</p>
                <h3 className="font-black text-gray-900 text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="text-3xl mb-2">⭐⭐⭐⭐⭐</div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">4.9 Stars · 5,000+ Viruses Removed</h2>
            <p className="text-gray-500 mt-1 text-sm">In 8+ years, zero data loss during virus removal</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="text-amber-400 mb-3 text-sm">{"⭐".repeat(r.stars)}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">&ldquo;{r.text}&rdquo;</p>
                <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                <p className="text-xs text-gray-400">{r.loc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-10">Virus Removal FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "How do I know if my computer has a virus?", a: "Signs include: sudden extreme slowdown, pop-up ads everywhere, browser homepage changed, antivirus turned off, strange emails sent from your account, or a scary pop-up with a phone number to call. Any of these means you should act immediately." },
              { q: "That pop-up says to call Microsoft — is it real?", a: "No — 100% a scam. Microsoft never shows pop-ups with phone numbers. Force-close your browser (Ctrl+Alt+Delete → Task Manager → End Task). Run Malwarebytes free scan. Call Trini System at 347-953-1531 if it returns." },
              { q: "I already called the scam number and gave them access — what now?", a: "Call Trini System immediately at 347-953-1531. We'll find and remove all software they installed, check for keyloggers, and secure your PC. Change your email and bank passwords from a different device right now." },
              { q: "Will virus removal delete my photos and documents?", a: "No. In 8+ years and 5,000+ sessions, Trini System has never caused data loss during virus removal. We target only malicious files. Your personal files are completely safe." },
              { q: "How much does virus removal cost?", a: "Trini System remote virus removal starts at $49. No fix = no fee guaranteed. Compare to Geek Squad's $149+. We've never charged for a failed removal." },
            ].map((faq) => (
              <details key={faq.q} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-gray-900 list-none">
                  {faq.q}
                  <svg className="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7"/></svg>
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 text-white text-center" style={{ background: "linear-gradient(135deg,#7f1d1d,#991b1b,#b91c1c)" }}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-5xl mb-4">🛡️</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">Don&apos;t let viruses steal your data</h2>
          <p className="text-red-200 text-lg mb-8">Every minute matters. Call now — we answer immediately, 24/7.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF}
              className="flex items-center justify-center gap-2 bg-white text-red-700 font-black text-lg px-8 py-4 rounded-2xl hover:bg-red-50 transition-all shadow-xl">
              🚨 Call {PHONE} — We Answer 24/7
            </a>
            <a href="https://discord.gg/trinisystem" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all">
              💬 Join Discord — Free Virus Advice
            </a>
          </div>
          <p className="text-red-300/60 text-xs mt-5">No fix = no fee · All 50 US states · 8+ years · 5,000+ PCs secured</p>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
