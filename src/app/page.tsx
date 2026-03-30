import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/sections/HeroSection";
import { SmartProblemFinder } from "@/components/features/SmartProblemFinder";
import { ReviewsCarousel, TrustSection } from "@/components/sections/ReviewsSection";
import { StickyCTA } from "@/components/ui/Button";
import { EightYearTrustBanner, GoogleReviewsSection } from "@/components/sections/GoogleTrustSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { BRANDS, SERVICES, DOWNLOAD_URL, PHONE_HREF, PHONE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Trini System LLC — Printer Repair & Free PC Optimizer USA",
  description: "Expert remote printer repair for HP, Canon, Epson, Brother + free TriniCleaner PC optimizer. All 50 states. Call 347-953-1531.",
};

function BrandsSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
          All Major Printer Brands — Supported &amp; Repaired
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {BRANDS.map((b, i) => (
            <Link
              key={b.name}
              href="/services"
              className="group flex flex-col gap-4 p-6 rounded-3xl border-2 border-gray-100 hover:border-blue-200 bg-white hover:bg-blue-50/40 transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-black"
                style={{ background: b.bgColor, color: b.color }}
              >
                {b.name[0]}
              </div>
              <div>
                <h3 className="font-black text-gray-900 text-lg mb-1 group-hover:text-blue-700 transition-colors">
                  {b.name}
                </h3>
                <div className="space-y-1">
                  {b.models.slice(0, 3).map(m => (
                    <p key={m} className="text-xs text-gray-500 font-mono">{m}</p>
                  ))}
                </div>
              </div>
              <div className="text-xs text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                View support →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const colorMap: Record<string, string> = {
    blue:   "bg-blue-50   border-blue-100   text-blue-600",
    green:  "bg-emerald-50 border-emerald-100 text-emerald-600",
    purple: "bg-purple-50 border-purple-100 text-purple-600",
    orange: "bg-orange-50 border-orange-100 text-orange-600",
    red:    "bg-red-50    border-red-100    text-red-600",
    teal:   "bg-teal-50   border-teal-100   text-teal-600",
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 flex items-center gap-2">
              <span className="w-5 h-px bg-blue-400 inline-block" />
              Our Services
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Every tech problem.<br />One trusted team.
            </h2>
          </div>
          <Link href="/services" className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 transition-colors shrink-0">
            View all services →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <Link
              key={s.title}
              href={s.href}
              className="group relative bg-white rounded-3xl p-7 border-2 border-gray-100 hover:border-blue-200 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
            >
              {s.popular && (
                <div className="absolute top-5 right-5 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Popular
                </div>
              )}
              <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-2xl mb-5 ${colorMap[s.color]}`}>
                {s.icon}
              </div>
              <h3 className="font-black text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">
                {s.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.description}</p>
              <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                Learn more <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const rows = [
    { label: "Average Cost",        trini: "From $49",     geek: "$149+",       triniWins: true },
    { label: "Wait Time",           trini: "< 30 minutes", geek: "3–7 days",    triniWins: true },
    { label: "Leave Home Required", trini: "Never",        geek: "Yes",         triniWins: true },
    { label: "Available Hours",     trini: "24/7",         geek: "Store hours", triniWins: true },
    { label: "Free Tools",          trini: "Yes — TriniCleaner", geek: "None",  triniWins: true },
    { label: "Personal Technician", trini: "Yes — always", geek: "Varies",      triniWins: true },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-red-200">
            📊 Comparison
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Trini System vs. Geek Squad
          </h2>
          <p className="text-lg text-gray-600">Same-day service at half the price — without leaving your home.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-soft-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
            <div className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Feature</div>
            <div className="p-4 text-center">
              <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                TS Trini System
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-sm font-semibold text-gray-400">Geek Squad</div>
            </div>
          </div>
          {rows.map((r, i) => (
            <div key={r.label} className={`grid grid-cols-3 border-b border-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
              <div className="p-4 text-sm font-medium text-gray-700 flex items-center">{r.label}</div>
              <div className="p-4 text-center flex items-center justify-center">
                <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100">
                  ✓ {r.trini}
                </span>
              </div>
              <div className="p-4 text-center flex items-center justify-center">
                <span className="text-sm text-gray-400">{r.geek}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-brand hover:from-blue-700 hover:to-blue-800 transition-all">
            📞 Call {PHONE} — Available Now
          </a>
          <Link href="/contact" className="flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold py-4 px-8 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all">
            Book Online →
          </Link>
        </div>
      </div>
    </section>
  );
}

function DownloadCTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-emerald-600 to-teal-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-6xl mb-4">⚡</div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Is Your PC Running Slow?
        </h2>
        <p className="text-emerald-100 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Download TriniCleaner free — removes gigabytes of junk in 60 seconds. No subscription, no upsells, no nonsense.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={DOWNLOAD_URL}
            className="flex items-center gap-3 bg-white text-emerald-700 font-black text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all active:scale-95"
          >
            <span className="text-2xl">⬇</span>
            Download TriniCleaner — Free
          </a>
          <div className="text-emerald-200 text-sm">
            Works on Windows 7, 8, 10 &amp; 11<br />
            No sign-up. Instant download.
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EightYearTrustBanner />
      <BrandsSection />
      <SmartProblemFinder />
      <ServicesGrid />
      <TrustSection />
      <GoogleReviewsSection />
      <SocialProofSection />
      <ComparisonSection />
      <DownloadCTASection />
      <StickyCTA />
    </>
  );
}
