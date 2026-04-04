"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";

const STATS = [
  { value: "4.9★", label: "Google Rating" },
  { value: "47+",  label: "5-Star Reviews" },
  { value: "< 15m", label: "Response Time" },
  { value: "All 50", label: "US States" },
];

const TICKER_ITEMS = [
  "🖨️ HP Printer Offline Fixed",
  "✅ Canon B200 Error Resolved",
  "⚡ Epson EcoTank Reset",
  "💻 Windows 11 Sped Up",
  "🗺️ Garmin GPS Updated",
  "🖨️ Brother Driver Installed",
  "🛡️ Virus Removed Remotely",
  "📶 Printer WiFi Reconnected",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-100/40 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-blue-200">
              🖨️ USA &amp; Canada Remote Support
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-5">
              Printer Repair &amp;{" "}
              <span className="text-gradient">Tech Support</span>
              {" "}That Actually Works
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
              Expert remote repair for HP, Canon, Epson &amp; Brother printers. PC optimization, virus removal, GPS updates. All 50 states — no appointment, no Geek Squad prices.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black text-lg px-7 py-4 rounded-2xl shadow-brand hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                📞 {PHONE} — Free Help
              </a>
              <Link
                href="/fix"
                className="flex items-center justify-center gap-2 bg-white text-gray-800 font-bold text-lg px-7 py-4 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all"
              >
                🔧 Fix My Problem Now →
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {["No Fix = No Fee", "Remote in 15 Min", "50% Less Than Geek Squad", "Est. 2016"].map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: stats + quick actions */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white rounded-3xl p-5 shadow-soft border border-gray-100 text-center">
                  <div className="text-2xl font-black text-blue-600 mb-1">{s.value}</div>
                  <div className="text-xs text-gray-500 font-medium">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Quick brand picker */}
            <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">My Printer Brand Is…</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "HP",      color: "bg-blue-50 border-blue-200 hover:border-blue-400 text-blue-700", href: "/hp-printer-repair" },
                  { name: "Canon",   color: "bg-red-50 border-red-200 hover:border-red-400 text-red-700",   href: "/canon-printer-repair" },
                  { name: "Epson",   color: "bg-sky-50 border-sky-200 hover:border-sky-400 text-sky-700",   href: "/epson-printer-repair" },
                  { name: "Brother", color: "bg-indigo-50 border-indigo-200 hover:border-indigo-400 text-indigo-700", href: "/fix" },
                ].map((b) => (
                  <Link
                    key={b.name}
                    href={b.href}
                    className={`flex items-center justify-center font-black text-base py-3.5 rounded-2xl border-2 transition-all hover:-translate-y-0.5 ${b.color}`}
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/fix"
                className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-blue-600 font-medium transition-colors py-2"
              >
                Not sure? Use our free diagnostic tool →
              </Link>
            </div>

            {/* Free download CTA */}
            <a
              href={DOWNLOAD_URL}
              className="flex items-center gap-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 hover:border-emerald-300 rounded-3xl p-5 transition-all group"
            >
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-sm shrink-0">
                ⬇
              </div>
              <div>
                <p className="font-black text-gray-900 text-base leading-tight">Free TriniCleaner Download</p>
                <p className="text-xs text-gray-500 mt-0.5">Speed up your PC in one click — 100% free</p>
              </div>
              <div className="ml-auto text-emerald-600 font-bold text-sm group-hover:translate-x-1 transition-transform shrink-0">
                Get It →
              </div>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Live fixes ticker */}
      <div className="mt-14 overflow-hidden border-y border-blue-100 bg-white/70 backdrop-blur-sm py-3">
        <div className="flex gap-8 animate-[scroll_30s_linear_infinite] whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 shrink-0">
              {item}
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
