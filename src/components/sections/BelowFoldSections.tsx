import Link from "next/link";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   BELOW-THE-FOLD SECTIONS — Server Component, zero client JS.
   Loaded via dynamic() in the homepage so it's not in the initial bundle.
═══════════════════════════════════════════════════════════════════ */

const HOW_IT_WORKS = [
  { step: "01", icon: "🔍", title: "Describe your problem",  desc: "Type it in the search box at the top or call us directly — no tech jargon needed." },
  { step: "02", icon: "📞", title: "Get connected instantly", desc: "A real technician picks up in under 5 minutes, 24 hours a day, 7 days a week." },
  { step: "03", icon: "🖥️", title: "We fix it while you watch", desc: "With your permission we connect remotely — you see everything on your screen." },
  { step: "04", icon: "✅", title: "Guaranteed or free",      desc: "No fix means no charge. We don't stop until your device works perfectly." },
];

const REVIEWS = [
  { name: "Corey Hawkins",  loc: "New York, NY",   text: "James fixed my HP DeskJet offline in 20 minutes. The best tech support I've ever had!",       device: "HP DeskJet 4155e" },
  { name: "Leslie Park",    loc: "Dallas, TX",     text: "Fixed my Canon PIXMA B200 error. Quick and effective — saved me $200 on a new printer.",     device: "Canon PIXMA MX922" },
  { name: "Mary Steil",     loc: "Chicago, IL",    text: "Outstanding help with my Epson EcoTank ink error and reconnecting to my new router.",          device: "Epson EcoTank ET-2720" },
  { name: "Mark Starrett",  loc: "Phoenix, AZ",    text: "Above and beyond for my Garmin GPS update. Professional and MUCH cheaper than Best Buy.",     device: "Garmin DriveSmart 65" },
  { name: "Patricia Walsh", loc: "Miami, FL",      text: "TriniCleaner made my old laptop run like new. I was about to buy a new computer!",             device: "Windows 11 Laptop" },
  { name: "Robert Chen",    loc: "Seattle, WA",    text: "Fixed my Brother printer driver after Windows 11 update — in under 30 minutes remotely.",     device: "Brother MFC-L2710DW" },
];

const SENIOR_GUIDES = [
  { icon: "✉️", title: "Gmail Help",      desc: "Login problems, account recovery, setting up Gmail for the first time, password reset, two-step verification.", href: "/how-to/gmail-help",    color: "#f97316", topics: ["Gmail login", "Forgot password", "Recovery phone", "Two-factor auth", "New account setup"] },
  { icon: "👥", title: "Facebook Help",   desc: "Account hacked, recovery, privacy settings, scam alerts, blocking people, family photo sharing.", href: "/how-to/facebook-help",  color: "#1877f2", topics: ["Account hacked", "Forgot password", "Privacy settings", "Scam alerts", "Messenger help"] },
  { icon: "🗺️", title: "Garmin GPS Help", desc: "Map updates, Garmin Express setup, GPS watch updates, satellite issues, device frozen.", href: "/how-to/garmin-express",  color: "#06b6d4", topics: ["Map update", "Garmin Express", "Watch update", "Satellite fix", "Device frozen"] },
];

export default function BelowFoldSections() {
  return (
    <>
      {/* ══ HOW IT WORKS ══════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, #000000 0%, #050505 100%)" }} aria-label="How it works">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">How it works</h2>
            <p className="text-white/50 text-lg">From your first call to a fixed device — here's what to expect.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4 relative">
            {HOW_IT_WORKS.map((step, idx) => (
              <div key={step.step} className="scroll-reveal flex flex-col items-center text-center" style={{ animationDelay: `${idx * 0.12}s` }}>
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
                    style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)", border: "2px solid rgba(249,115,22,0.3)", boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 8px rgba(245,158,11,0.04)" }}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-black"
                    style={{ background: "linear-gradient(135deg, #f97316, #fb923c)" }}>
                    {step.step}
                  </div>
                  {idx < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-px -translate-y-1/2"
                      style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.4), transparent)", marginLeft: "8px" }} />
                  )}
                </div>
                <h3 className="text-white font-black text-lg mb-2">{step.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SENIOR GUIDES SPOTLIGHT ════════════════════════ */}
      <section className="py-20 px-4 bg-section-dark" aria-label="Senior guides">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 scroll-reveal">
            <div className="text-5xl mb-4">👴👵</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Guides written for seniors</h2>
            <p className="text-white/55 text-lg max-w-2xl mx-auto">
              Large text. Plain English. Step-by-step screens. No tech jargon. Every guide has a free practice mode you can try before doing it for real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SENIOR_GUIDES.map((guide, i) => (
              <div key={guide.href} className="scroll-reveal rounded-2xl overflow-hidden" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="p-6" style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-5xl mb-4">{guide.icon}</div>
                  <h3 className="text-xl font-black text-white mb-2">{guide.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-4">{guide.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {guide.topics.map(t => (
                      <span key={t} className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{ background: `${guide.color}22`, color: guide.color, border: `1px solid ${guide.color}44` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link href={guide.href}
                    className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-black text-white transition-all hover:scale-105 active:scale-95 btn-glow"
                    style={{ background: `linear-gradient(135deg, ${guide.color}cc, ${guide.color})`, boxShadow: `0 4px 20px ${guide.color}44` }}>
                    Open guide — large text →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 scroll-reveal">
            <Link href="/how-to"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-white transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.2)" }}>
              📖 View All How-To Guides →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FREE TOOLS BAND ════════════════════════════════ */}
      <section className="py-16 px-4" style={{ background: "linear-gradient(135deg, #064e3b, #065f46)" }} aria-label="Free tools">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 scroll-reveal">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-400/20 border border-emerald-400/30 rounded-full px-4 py-2 text-emerald-300 text-xs font-mono tracking-widest uppercase mb-4">
              ⚡ 100% Free · No Subscription Ever
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">TriniCleaner — Free PC Optimizer</h2>
            <p className="text-emerald-100/70 text-lg mb-2">
              Removes junk files, fixes startup slowdowns, speeds up your PC in one click. Works on Windows 7, 8, 10, 11.
            </p>
            <p className="text-emerald-300/60 text-sm">Built by Trini System LLC · 5,000+ downloads · Virus-free</p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
              className="btn-glow touch-target flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-white transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 8px 32px rgba(16,185,129,0.5)" }}>
              ⬇ Download Free — Windows
            </a>
            <Link href="/products"
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-emerald-200 transition-all hover:text-white"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)" }}>
              Learn more about TriniCleaner →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background: "#020817" }} aria-label="Customer reviews">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 scroll-reveal">
            <div className="text-4xl mb-3">⭐⭐⭐⭐⭐</div>
            <h2 className="text-4xl font-black text-white mb-2">4.9 on Google · 47 reviews</h2>
            <p className="text-white/50">Real customers, real fixes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={r.name} className="scroll-reveal rounded-2xl p-6" style={{
                animationDelay: `${i * 0.08}s`,
                background: "linear-gradient(135deg, #1e293b, #0f172a)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)"
              }}>
                <div className="text-amber-400 text-lg mb-3">★★★★★</div>
                <p className="text-white/80 text-sm leading-relaxed mb-4 italic">&quot;{r.text}&quot;</p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{r.name}</div>
                    <div className="text-white/40 text-xs">{r.loc} · {r.device}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 scroll-reveal">
            <a href="https://share.google/1mtrJVk8Ya0PkjG76" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-orange-400 hover:text-orange-300 transition-colors"
              style={{ border: "1px solid rgba(249,115,22,0.3)" }}>
              ⭐ Read all reviews on Google ↗
            </a>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══════════════════════════════════════ */}
      <section className="py-20 px-4 bg-hero bg-grid text-center" aria-label="Call to action">
        <div className="max-w-3xl mx-auto scroll-reveal">
          <div className="text-5xl mb-6 animate-float">📞</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Ready to get help?</h2>
          <p className="text-white/60 text-xl mb-8">
            Call free — a real technician answers in under 5 minutes, 24 hours a day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF}
              className="btn-glow touch-target flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-xl text-black transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", boxShadow: "0 0 60px rgba(249,115,22,0.5)" }}>
              📞 {PHONE} — Call Free Now
            </a>
            <Link href="/contact"
              className="btn-glow touch-target flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-xl text-white transition-all hover:scale-105 active:scale-95"
              style={{ background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.25)" }}>
              📋 Book Online →
            </Link>
          </div>
          <p className="text-white/30 text-sm mt-6 font-mono tracking-wider">
            NO FIX = NO FEE · NEVER ASKS FOR PASSWORDS · EST. 2016
          </p>
        </div>
      </section>

      {/* ══ SEO SEMANTIC CONTENT ═══════════════════════════ */}
      <div className="sr-only" aria-hidden="false">
        <h2>Our Services</h2>
        <ul>
          <li><a href="/printer-support">Printer Help — HP, Canon, Epson, Brother repair and setup</a></li>
          <li><a href="/computer-help">Computer Help — slow PC, Windows errors, startup fix</a></li>
          <li><a href="/virus-removal">Virus Removal — malware, pop-ups, ransomware removal</a></li>
          <li><a href="/garmin-gps-help">Garmin GPS Help — map updates, Garmin Express, device setup</a></li>
          <li><a href="/how-to/gmail-help">Gmail Help — login, password reset, account recovery</a></li>
          <li><a href="/how-to/facebook-help">Facebook Help — hacked account, privacy, Messenger</a></li>
          <li><a href="/products">TriniCleaner — free Windows PC optimizer download</a></li>
          <li><a href="/how-to">How-To Guides — step-by-step senior-friendly tech help</a></li>
        </ul>
        <p>Free phone support: <a href="tel:+13479531531">347-953-1531</a>. Based in Corona, Queens, New York. Remote support nationwide.</p>
        <h2>Frequently Asked Questions</h2>
        <dl>
          <dt>How much does printer repair cost?</dt><dd>Printer repair starts at $49. Free diagnosis. No fix, no fee.</dd>
          <dt>Do you offer remote support?</dt><dd>Yes. We connect remotely to your computer with your permission and fix the problem while you watch.</dd>
          <dt>What brands of printers do you fix?</dt><dd>HP, Canon, Epson, and Brother. All models including DeskJet, PIXMA, EcoTank, and MFC series.</dd>
          <dt>Is TriniCleaner safe?</dt><dd>Yes. TriniCleaner is built by Trini System LLC, virus-free, and 100% free with no subscription.</dd>
          <dt>Do you help seniors with technology?</dt><dd>Yes. All our guides and support calls are senior-friendly with plain English instructions.</dd>
        </dl>
      </div>
    </>
  );
}
