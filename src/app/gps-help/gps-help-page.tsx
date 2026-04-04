import type { Metadata } from "next";
import Link from "next/link";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";
import { PHONE, PHONE_HREF } from "@/lib/utils";

export const metadata: Metadata = {
  title: "GPS Help & Map Updates — Garmin, TomTom, Magellan | Free Remote Fix",
  description: "Fix your GPS device — Garmin map updates, satellite signal issues, Garmin Express errors, TomTom updates. Free step-by-step guide + remote support. Call 347-953-1531.",
  keywords: [
    "garmin gps update","garmin map update free","garmin express not working","tomtom map update",
    "gps not finding satellites","garmin drivesmart update","garmin nuvi update","magellan gps update",
    "gps map update help","garmin express error","how to update garmin gps","garmin satellite signal fix",
    "tomtom go update","gps not working","garmin won't update","gps repair near me",
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "GPS Help", item: "https://trinisystem.vercel.app/gps-help" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How do I update my Garmin GPS maps?",
        acceptedAnswer: { "@type": "Answer", text: "Download Garmin Express from garmin.com/express. Connect your Garmin GPS via USB. Sign in with a free Garmin account. Click 'Add Map Updates' and let the download run — it takes 30–90 minutes depending on internet speed. Trini System does Garmin map updates remotely if you need help — call 347-953-1531." } },
      { "@type": "Question", name: "Why is Garmin Express not working or showing errors?",
        acceptedAnswer: { "@type": "Answer", text: "Garmin Express errors are usually caused by an outdated version of Garmin Express, USB connection issues, or Windows firewall blocking the update. Uninstall Garmin Express, download the fresh version from garmin.com/express, and try a different USB port. Trini System fixes Garmin Express errors remotely in 20 minutes." } },
      { "@type": "Question", name: "Why won't my Garmin GPS find satellites?",
        acceptedAnswer: { "@type": "Answer", text: "GPS satellite issues are usually caused by stale satellite almanac data. Hold the power button for 10 seconds to reset, then take the device outside to an open sky and leave it stationary for 10–15 minutes. Also update the satellite data in Garmin Express. Call Trini System at 347-953-1531 if the issue persists." } },
      { "@type": "Question", name: "How do I update a TomTom GPS device?",
        acceptedAnswer: { "@type": "Answer", text: "TomTom GPS devices update via MyDrive Connect on PC/Mac. Download it from tomtom.com/getstarted. Connect your TomTom via USB and sign in to your TomTom account. Any available map updates will appear automatically. Trini System assists with TomTom updates remotely — call 347-953-1531." } },
      { "@type": "Question", name: "Are Garmin map updates free?",
        acceptedAnswer: { "@type": "Answer", text: "Garmin offers one free lifetime map update on most newer devices. Additional updates require a map subscription. Garmin Express itself is free to download. Trini System can check if your device qualifies for free updates and handle the entire process remotely." } },
    ],
  },
];

const GPS_BRANDS = [
  { name: "Garmin", color: "#007cc2", models: ["DriveSmart 65", "DriveSmart 55", "Nuvi 2797LMT", "Drive 52", "RV 890", "Overlander"], href: "#tool" },
  { name: "TomTom", color: "#e63946", models: ["GO 520", "GO 620", "GO Discover", "Via 1525M", "Start 55"], href: "#tool" },
  { name: "Magellan", color: "#2a7f4f", models: ["RoadMate 6630", "RoadMate 9400-LM", "Maestro 4250"], href: "#tool" },
];

const REVIEWS = [
  { name: "Frank D.", stars: 5, text: "My Garmin Nuvi hadn't been updated in 5 years. Trini System connected remotely and updated all the maps in one session. No more wrong turns!", loc: "Chicago, IL" },
  { name: "Patricia L.", stars: 5, text: "Garmin Express kept giving errors and I couldn't figure it out. Tech logged in, fixed the software issue, and maps downloaded perfectly. Very patient.", loc: "Miami, FL" },
  { name: "James R.", stars: 5, text: "GPS couldn't find satellites. Called Trini System and they walked me through the reset process. Fixed in 20 minutes.", loc: "Atlanta, GA" },
  { name: "Susan K.", stars: 5, text: "Had my TomTom GO updated with help from Trini System. They did everything remotely — I just had to plug in the USB cable.", loc: "Denver, CO" },
];

export default function GpsHelpPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#022a14 0%,#053d20 40%,#064d28 100%)" }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(110,231,183,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(110,231,183,0.8) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        {/* Animated satellite rings */}
        <div className="absolute right-10 top-8 opacity-20 pointer-events-none hidden lg:block">
          {[80, 120, 160].map((r) => (
            <div key={r} className="absolute rounded-full border border-emerald-400 -translate-x-1/2 -translate-y-1/2" style={{ width: r, height: r }} />
          ))}
          <div className="w-4 h-4 rounded-full bg-emerald-400 absolute -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-white/15 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              GPS & Navigation Support
            </div>
            <h1 className="font-black text-white tracking-tight leading-[0.95] mb-5" style={{ fontSize: "clamp(2.6rem,6vw,5rem)" }}>
              GPS Not Working?<br />
              <span style={{ background: "linear-gradient(90deg,#6ee7b7,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Maps & Signal Fixed Fast
              </span>
            </h1>
            <p className="text-white/55 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Garmin, TomTom, Magellan — map updates, satellite signal fixes, Garmin Express errors. Remote help available 24/7.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[["5,000+","GPS Devices Updated"],["100%","Update Success Rate"],["30–90 min","Map Download Time"],["$49","With Tech Help"]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <p className="text-2xl font-black text-white">{n}</p>
                  <p className="text-xs text-white/40 font-semibold uppercase tracking-widest">{l}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Garmin DriveSmart update","Garmin Express errors","Nuvi maps outdated","TomTom won't update","No satellite signal","GPS frozen"].map((t) => (
                <span key={t} className="text-xs bg-white/8 text-white/55 border border-white/12 px-3 py-1.5 rounded-full font-medium">🔥 {t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIAGNOSTIC TOOL ── */}
      <section id="tool" className="bg-gradient-to-b from-slate-50 to-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Free Diagnostic</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">What&apos;s the Problem?</h2>
            <p className="text-gray-500">Select your GPS brand and get an instant step-by-step fix</p>
          </div>
          <TechER category="gps" pageTrending={["Garmin DriveSmart 65 update","Garmin Nuvi map update","Garmin Express not working","GPS no satellite signal"]} />
        </div>
      </section>

      {/* ── GPS MODEL GUIDE (Programmatic SEO) ── */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">All Major GPS Brands</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Popular Models We Support</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {GPS_BRANDS.map((b) => (
              <div key={b.name} className="bg-white rounded-3xl p-6 border-2 border-gray-100 hover:border-emerald-200 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-black mb-4"
                  style={{ background: b.color }}>
                  {b.name[0]}
                </div>
                <h3 className="font-black text-gray-900 text-xl mb-3">{b.name} GPS</h3>
                <div className="space-y-1.5 mb-5">
                  {b.models.map((m) => (
                    <div key={m} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      {m}
                    </div>
                  ))}
                </div>
                <a href="#tool" className="text-sm text-emerald-600 font-bold hover:underline">Fix this device →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GARMIN EXPRESS GUIDE ── */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Step-by-Step Guide</p>
            <h2 className="text-3xl font-black text-gray-900">How to Update Garmin GPS Maps</h2>
            <p className="text-gray-500 mt-2">Works for DriveSmart, Nuvi, Drive, and RV series</p>
          </div>
          <div className="space-y-4">
            {[
              { step: "1", icon: "⬇", title: "Download Garmin Express", detail: "Visit garmin.com/express on your PC or Mac. Click Download for Windows (or Mac). Run the installer — it takes about 3 minutes." },
              { step: "2", icon: "🔌", title: "Connect your Garmin via USB", detail: "Use the micro-USB cable that came with your GPS. Connect one end to your Garmin, the other to your computer. Garmin Express will detect it automatically within 30 seconds." },
              { step: "3", icon: "👤", title: "Sign in to Garmin account", detail: "Sign in or create a free account at connect.garmin.com. This links your device and activates your map subscriptions. New accounts are free." },
              { step: "4", icon: "🗺️", title: "Add and download map updates", detail: "Click 'Add Map Updates'. You'll see which maps are available. Free lifetime updates apply to eligible devices. Click Install and let it run — map downloads take 30–90 minutes." },
              { step: "5", icon: "✅", title: "Eject and test", detail: "Click the eject icon in Garmin Express before unplugging. Power on your Garmin — it will install the new maps on first startup. Takes about 10 minutes." },
            ].map((s) => (
              <div key={s.step} className="flex gap-5 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm shrink-0">
                  {s.step}
                </div>
                <div>
                  <p className="font-black text-gray-900 mb-1">{s.icon} {s.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
            <p className="font-bold text-amber-800 mb-1">⚠️ Having trouble with Garmin Express?</p>
            <p className="text-amber-700 text-sm">If Garmin Express shows errors, won&apos;t detect your device, or the update keeps failing — call Trini System. We fix Garmin Express errors remotely in 20 minutes. <a href={PHONE_HREF} className="font-black underline">Call {PHONE}</a></p>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="text-3xl mb-2">⭐⭐⭐⭐⭐</div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">4.9 Stars · 1,000+ GPS Devices Updated</h2>
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
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-10">GPS Help — FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "How do I update my Garmin GPS maps?", a: "Download Garmin Express from garmin.com/express. Connect your GPS via USB. Sign in with a Garmin account. Click 'Add Map Updates' and let the download run (30–90 min). Trini System does Garmin map updates remotely if you need help — call 347-953-1531." },
              { q: "Why is Garmin Express not working?", a: "Garmin Express errors are usually caused by an outdated version, USB connection issues, or firewall blocking. Uninstall Garmin Express completely, download the fresh version, and try a different USB port. Trini System fixes Garmin Express errors remotely in 20 minutes." },
              { q: "Why won't my GPS find satellites?", a: "Stale satellite almanac data is the most common cause. Hold the power button for 10 seconds to reset, go outside to an open sky area, leave it stationary for 10–15 minutes. Also update the satellite data in Garmin Express." },
              { q: "Are Garmin map updates free?", a: "Most newer Garmin devices include one free lifetime map update. Garmin Express itself is always free. Trini System can check if your device qualifies and handle the entire update process remotely." },
              { q: "How do I update a TomTom GPS?", a: "TomTom devices update via MyDrive Connect on PC/Mac — download it at tomtom.com/getstarted. Connect via USB and sign in to your TomTom account to see available updates. Trini System assists with TomTom updates remotely." },
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
      <section className="py-14 bg-gradient-to-r from-emerald-700 to-teal-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black mb-4">GPS still not updating?</h2>
          <p className="text-emerald-200 text-lg mb-8">We&apos;ll connect remotely and do the entire Garmin update for you while you watch.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-white text-emerald-700 font-black text-lg px-8 py-4 rounded-2xl hover:bg-emerald-50 transition-all shadow-xl">
              📞 Call {PHONE}
            </a>
            <a href="https://discord.gg/trinisystem" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all">
              💬 Join Discord — Free GPS Help
            </a>
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
