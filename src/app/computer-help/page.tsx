import type { Metadata } from "next";
import Link from "next/link";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Computer Help — Slow PC, Blue Screen, Windows Fix | Free Diagnosis",
  description: "Fix your slow computer, blue screen errors, Windows 11 problems, startup issues. Free TriniCleaner download + remote tech support. Dell, HP, Lenovo. Call 347-953-1531.",
  keywords: [
    "computer running slow fix","slow pc fix free","windows 11 slow","blue screen fix",
    "computer won't start","laptop running slow","dell computer slow","hp laptop slow",
    "lenovo laptop problems","windows update stuck","computer repair near me","remote computer fix",
    "fix slow windows 10","computer boot loop","startup programs","free computer cleaner",
    "pc optimization","windows 11 problems","computer freezing fix","make pc faster free",
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Computer Help", item: "https://trinisystem.vercel.app/computer-help" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Why is my computer running so slow?",
        acceptedAnswer: { "@type": "Answer", text: "A slow Windows PC is almost always caused by junk files (avg 4–8 GB), too many startup programs, registry errors, or a nearly full hard drive. Download TriniCleaner free from Trini System to remove junk and disable unnecessary startup programs in one click. Call 347-953-1531 if it's still slow." } },
      { "@type": "Question", name: "How do I fix a blue screen of death (BSOD) on Windows?",
        acceptedAnswer: { "@type": "Answer", text: "Note the STOP code shown on the blue screen. Boot into Safe Mode (F8 or Shift+Restart → Troubleshoot → Advanced). Update all drivers, especially display and network adapters. Run Windows Memory Diagnostic (mdsched.exe) to check RAM. Trini System fixes BSOD errors remotely — call 347-953-1531." } },
      { "@type": "Question", name: "How do I make Windows 11 faster?",
        acceptedAnswer: { "@type": "Answer", text: "Download TriniCleaner (free) to remove junk files and disable startup programs. In Windows 11: Settings → System → Power & Sleep → Power mode → set to 'Best Performance'. Also disable visual effects: search 'Adjust the appearance and performance of Windows' → select 'Adjust for best performance'." } },
      { "@type": "Question", name: "How do I fix Windows 11 update stuck at 100%?",
        acceptedAnswer: { "@type": "Answer", text: "Wait at least 2 hours — large updates genuinely take a long time. If still stuck, restart your PC (it's usually safe). If it loops: boot to Safe Mode, run Windows Update Troubleshooter (Settings → System → Troubleshoot). Trini System fixes stuck Windows updates remotely — call 347-953-1531." } },
      { "@type": "Question", name: "How much does remote PC repair cost?",
        acceptedAnswer: { "@type": "Answer", text: "Most slow PC issues are fixed free with TriniCleaner download. For complex issues — blue screens, viruses, Windows problems — Trini System remote repair starts at $49. No fix = no fee guaranteed. Compare to Geek Squad's $149+ fee." } },
    ],
  },
];

const SLOW_CAUSES = [
  { icon: "🗑️", title: "Junk Files (4–8 GB avg)", desc: "Windows accumulates temporary files, update logs, browser cache, and recycle bin items. This alone slows boot by 3–5 minutes." },
  { icon: "🚀", title: "Too Many Startup Programs", desc: "After years of use, 20–40 programs launch at startup. Most are unnecessary — Teams, Spotify, Adobe, OneDrive all run silently in the background." },
  { icon: "💾", title: "Full or Failing Hard Drive", desc: "When your drive is over 85% full, Windows performance drops sharply. HDDs over 5 years old often have failing sectors causing slowdowns." },
  { icon: "🦠", title: "Hidden Malware", desc: "Adware and cryptomining malware use your CPU and RAM in the background. Your PC slows down while criminals use your computer's resources." },
  { icon: "📋", title: "Registry Errors", desc: "Uninstalled programs leave orphaned registry entries. Over thousands of entries, Windows has to search through more junk every time it starts." },
  { icon: "🔄", title: "Outdated Windows / Drivers", desc: "Skipped Windows updates and outdated drivers cause compatibility issues that progressively degrade performance over months." },
];

const REVIEWS = [
  { name: "Dorothy M.", stars: 5, text: "My Dell was taking 20 minutes to start. Downloaded TriniCleaner and found 9 GB of junk. After cleaning it starts in 45 seconds. Incredible!", loc: "Columbus, OH" },
  { name: "Thomas H.", stars: 5, text: "Blue screen every day for a week. Trini System connected remotely and fixed the driver issue in 35 minutes. Haven't had a BSOD since.", loc: "Portland, OR" },
  { name: "Barbara N.", stars: 5, text: "Windows 11 was unusably slow on my HP laptop. The tech fixed startup programs and cleaned junk remotely. Feels like a new computer.", loc: "Nashville, TN" },
  { name: "Richard K.", stars: 5, text: "Computer stuck on Windows update for 3 days. Trini System fixed it remotely and explained exactly what they were doing. Very trustworthy.", loc: "Sacramento, CA" },
];

export default function ComputerHelpPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1a0545 0%,#2e0e72 40%,#3b1299 100%)" }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(196,181,253,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(196,181,253,0.8) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        {/* Scan line animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-violet-400/30 to-transparent animate-[scanline_6s_linear_infinite]" style={{ animationDelay: "0s" }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-white/15 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              Computer Repair & Optimization
            </div>
            <h1 className="font-black text-white tracking-tight leading-[0.95] mb-5" style={{ fontSize: "clamp(2.6rem,6vw,5rem)" }}>
              Computer Running Slow?<br />
              <span style={{ background: "linear-gradient(90deg,#c4b5fd,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Fix It Free in 5 Minutes
              </span>
            </h1>
            <p className="text-white/55 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Slow PC, blue screen, Windows errors, viruses — free TriniCleaner tool + remote technician support for complex fixes.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[["Free","TriniCleaner Tool"],["98%","Fix Rate for Slow PCs"],["5 min","Average Clean Time"],["$49","Complex Fixes"]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <p className="text-2xl font-black text-white">{n}</p>
                  <p className="text-xs text-white/40 font-semibold uppercase tracking-widest">{l}</p>
                </div>
              ))}
            </div>
            {/* Free download CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={DOWNLOAD_URL} className="flex items-center justify-center gap-2 bg-white text-purple-700 font-black text-lg px-8 py-4 rounded-2xl hover:bg-purple-50 transition-all shadow-2xl">
                ⬇ Download TriniCleaner — Free
              </a>
              <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all border border-purple-400/40">
                📞 Call {PHONE}
              </a>
            </div>
            <p className="text-white/30 text-xs mt-4">Works on Windows 7, 8, 10 & 11 · No sign-up · No credit card</p>
          </div>
        </div>
      </section>

      {/* ── TRINICLEANER PROMO ── */}
      <section className="py-12 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="text-white flex-1">
              <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-white/20">
                ✅ 100% Free — No Subscription Ever
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-3">TriniCleaner — Fix Your Slow PC Right Now</h2>
              <p className="text-emerald-100 text-base mb-5">Removes junk files, fixes registry errors, disables startup programs, and optimizes Windows — in one click. Average user finds 4–8 GB of junk.</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {["Junk file removal","Registry fix","Startup manager","Privacy cleaner","Browser cleaner","RAM optimizer"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-emerald-100">
                    <span className="text-emerald-300">✓</span> {f}
                  </div>
                ))}
              </div>
              <a href={DOWNLOAD_URL} className="inline-flex items-center gap-2 bg-white text-emerald-700 font-black text-base px-6 py-3 rounded-xl hover:bg-emerald-50 transition-all shadow-lg">
                ⬇ Download Free — Windows 7/8/10/11
              </a>
            </div>
            <div className="bg-white/10 rounded-3xl p-6 border border-white/20 backdrop-blur-sm lg:w-64 shrink-0">
              <div className="text-center">
                <div className="text-5xl mb-3">💻</div>
                <p className="text-white font-black text-xl mb-1">Before TriniCleaner</p>
                <div className="h-2 bg-white/20 rounded-full mb-2"><div className="h-full w-4/5 bg-red-400 rounded-full" /></div>
                <p className="text-red-300 text-sm mb-4">8 GB junk · 43 startup apps</p>
                <p className="text-white font-black text-xl mb-1">After TriniCleaner</p>
                <div className="h-2 bg-white/20 rounded-full mb-2"><div className="h-full w-1/5 bg-emerald-400 rounded-full" /></div>
                <p className="text-emerald-300 text-sm">0 GB junk · 6 startup apps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIAGNOSTIC TOOL ── */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-2">Interactive Diagnosis</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">What&apos;s the Problem?</h2>
            <p className="text-gray-500">Select your computer brand for a tailored fix guide</p>
          </div>
          <TechER category="computer" pageTrending={["Windows 11 running slow","Dell Inspiron boot loop","HP Pavilion slow startup","Lenovo blue screen BSOD"]} />
        </div>
      </section>

      {/* ── WHY IS MY PC SLOW (SEO content) ── */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-2">Root Causes</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Why Is My Computer So Slow?</h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">6 proven causes of slow PCs — most are completely fixable in under 10 minutes</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SLOW_CAUSES.map((c) => (
              <div key={c.title} className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-black text-gray-900 text-lg mb-2">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href={DOWNLOAD_URL} className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-black text-base px-8 py-4 rounded-2xl transition-all shadow-lg">
              ⬇ Fix All 6 Issues — TriniCleaner Free
            </a>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-16 bg-slate-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="text-3xl mb-2">⭐⭐⭐⭐⭐</div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">4.9 Stars · 3,000+ PC Repairs</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
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
      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-10">Computer Help FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "Why is my computer running so slow?", a: "A slow Windows PC is almost always caused by junk files (avg 4–8 GB), too many startup programs, registry errors, or a nearly full hard drive. Download TriniCleaner free to fix all of these in one click. If still slow, call us at 347-953-1531." },
              { q: "How do I fix a blue screen of death (BSOD)?", a: "Note the STOP code shown on the screen. Boot into Safe Mode (F8 or Shift+Restart → Troubleshoot → Advanced). Update all drivers, especially display and network. Run Windows Memory Diagnostic (mdsched.exe). Trini System fixes BSOD errors remotely — call 347-953-1531." },
              { q: "How do I make Windows 11 faster?", a: "Download TriniCleaner (free) to remove junk and disable startup programs. Set Power mode to 'Best Performance' in Settings. Disable visual effects by searching 'Adjust the appearance and performance of Windows' → select 'Best performance'." },
              { q: "My Windows update has been stuck for hours — what do I do?", a: "Wait at least 2 hours for large updates. If truly stuck: restart your PC. If it loops back to the stuck screen, boot to Safe Mode and run the Windows Update Troubleshooter (Settings → System → Troubleshoot). Trini System fixes stuck updates remotely." },
              { q: "How much does remote PC repair cost?", a: "Most slow PC issues are fixed free with TriniCleaner. For complex issues — BSOD, viruses, Windows corruption — Trini System remote repair starts at $49. No fix = no fee guaranteed. Much less than Geek Squad's $149+." },
            ].map((faq) => (
              <details key={faq.q} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
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
      <section className="py-14 bg-gradient-to-r from-violet-700 to-purple-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Still having PC problems?</h2>
          <p className="text-purple-200 text-lg mb-8">Our techs connect remotely and fix complex Windows issues while you watch — from $49.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-white text-purple-700 font-black text-lg px-8 py-4 rounded-2xl hover:bg-purple-50 transition-all shadow-xl">
              📞 Call {PHONE}
            </a>
            <a href="https://discord.gg/trinisystem" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all">
              💬 Join Discord — Free PC Help
            </a>
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
