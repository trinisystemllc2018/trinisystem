import Link from "next/link";
import type { VacationGpsPage } from "@/lib/vacation-gps-data";

const BASE_URL = "https://trinisystem.vercel.app";

const BRAND_THEME: Record<
  VacationGpsPage["brand"],
  { gradient: string; glow: string; barFrom: string; barTo: string; chip: string; icon: string; name: string }
> = {
  garmin: {
    gradient: "linear-gradient(135deg, #051124 0%, #0a2247 40%, #0d3266 100%)",
    glow: "rgba(0,150,214,0.2)",
    barFrom: "#1d4ed8",
    barTo: "#2563eb",
    chip: "text-blue-300",
    icon: "🗺️",
    name: "Garmin",
  },
  tomtom: {
    gradient: "linear-gradient(135deg, #150505 0%, #2b0a0a 40%, #4a0f0f 100%)",
    glow: "rgba(220,38,38,0.22)",
    barFrom: "#b91c1c",
    barTo: "#dc2626",
    chip: "text-red-300",
    icon: "🧭",
    name: "TomTom",
  },
  general: {
    gradient: "linear-gradient(135deg, #0b0f19 0%, #131b2e 40%, #1c2a44 100%)",
    glow: "rgba(148,163,184,0.2)",
    barFrom: "#334155",
    barTo: "#475569",
    chip: "text-slate-300",
    icon: "📡",
    name: "GPS",
  },
};

export function buildVacationGpsSchemas(data: VacationGpsPage) {
  const url = `${BASE_URL}/${data.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "GPS Help", item: `${BASE_URL}/gps-help` },
        { "@type": "ListItem", position: 3, name: data.h1, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: data.h1,
      description: data.metaDescription,
      provider: {
        "@type": "LocalBusiness",
        name: "Trini System LLC",
        telephone: "+13479531531",
        address: {
          "@type": "PostalAddress",
          streetAddress: "52-09 99th St Apt 8S",
          addressLocality: "Corona",
          addressRegion: "NY",
          postalCode: "11368",
          addressCountry: "US",
        },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "47", bestRating: "5" },
      },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
      ],
      serviceType: "GPS Map & Firmware Update",
      offers: { "@type": "Offer", price: "49", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: data.h1,
      description: data.h1Sub,
      step: data.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.detail,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: data.metaTitle,
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", ".speakable-summary"] },
    },
  ];
}

export function VacationGpsPageView({ data }: { data: VacationGpsPage }) {
  const theme = BRAND_THEME[data.brand];
  const schemas = buildVacationGpsSchemas(data);

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Urgency bar */}
      <div
        className="text-white py-3 text-center text-sm font-semibold"
        style={{ background: `linear-gradient(90deg, ${theme.barFrom}, ${theme.barTo})` }}
      >
        {theme.icon} {theme.name} · Vacation-Ready GPS Updates ·{" "}
        <a href="tel:+13479531531" className="underline font-bold hover:text-white/80">
          347-953-1531
        </a>{" "}
        · From $49 · No Fix = No Fee
      </div>

      {/* HERO */}
      <section aria-label={`${data.h1} Hero`} style={{ background: theme.gradient, position: "relative", overflow: "hidden" }} className="text-white">
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 relative">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
              {data.badge}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500/20 border border-emerald-400/30 px-3 py-1.5 rounded-full">
              ✅ No Fix = No Fee
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
              🇺🇸 US · 🇬🇧 UK Support
            </span>
          </div>
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
              {data.h1}
              <span className={`block mt-1 text-xl md:text-2xl font-bold ${theme.chip}`}>{data.h1Sub}</span>
            </h1>
            <p className="speakable-summary text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl mx-auto mb-8">
              {data.intro[0]}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+13479531531"
                className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 30px rgba(220,38,38,0.5)" }}
              >
                📞 Call Now — 347-953-1531
              </a>
              <a
                href="#update-guide"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold py-5 px-8 rounded-2xl text-lg hover:bg-white/20 transition-all"
              >
                See the Update Guide
              </a>
            </div>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {data.quickFacts.map((f) => (
              <div key={f.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <p className="text-[11px] uppercase tracking-widest font-bold text-white/50 mb-1">{f.label}</p>
                <p className="text-sm md:text-base font-black text-white">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO / WHY */}
      <section className="bg-white py-14">
        <div className="max-w-3xl mx-auto px-4">
          {data.intro.slice(1).map((p, i) => (
            <p key={i} className="text-gray-700 text-lg leading-relaxed mb-5">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4 space-y-10">
          {data.sections.map((sec) => (
            <div key={sec.heading}>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">{sec.heading}</h2>
              {sec.body.map((p, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-3">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* STEP-BY-STEP */}
      <section id="update-guide" aria-label="Update steps" className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 text-center">
            Step-by-Step Update Guide
          </h2>
          <ol className="space-y-4">
            {data.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-black text-white text-sm"
                  style={{ background: `linear-gradient(135deg, ${theme.barFrom}, ${theme.barTo})` }}
                >
                  {i + 1}
                </div>
                <div>
                  <p className="font-black text-gray-900 mb-1">{s.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DEVICES COVERED */}
      <section aria-label="Devices covered" className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 text-center">Devices We Cover</h2>
          <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {data.devices.map((d) => (
              <div key={d} className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800">
                <span>✅</span>
                {d}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section aria-label="Why Trini System" className="text-white py-14" style={{ background: theme.gradient }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3">Why Travelers Call Trini System</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Remote GPS updates for people who need it done right before they leave — not shipped off for two weeks.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "🎯", title: "Every Major Brand", body: "Garmin and TomTom, every product line — auto, outdoor, motorcycle, RV, and fitness watch. We know each brand's update software inside out." },
              { icon: "💻", title: "Remote-First", body: "You connect your GPS to your computer, we connect to your computer via secure session, and we run the update together while you watch. No mailing devices, no waiting." },
              { icon: "💰", title: "Flat $49", body: "No fix, no fee. No surprise add-ons. If it turns out to be a hardware issue we won't charge, and we'll tell you honestly if it's not worth fixing." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-black text-white text-lg mb-2">{title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLOSURE */}
      <section aria-label="Independent Service Disclosure" className="bg-amber-50 py-10 border-t-2 border-amber-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-black text-amber-900 uppercase tracking-widest mb-3">Important Disclosure</p>
          <p className="text-sm text-amber-900 leading-relaxed">
            Trini System LLC is an <strong>independent GPS service provider</strong> — we are not affiliated with,
            endorsed by, or authorized by Garmin Ltd., TomTom International BV, or their subsidiaries. Garmin®,
            TomTom®, and related marks are registered trademarks of their respective owners. For warranty-covered
            hardware defects, contact the manufacturer directly. We provide independent paid service for software,
            firmware, map, and configuration issues — typically faster and at lower cost than authorized service
            for non-warranty work.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section aria-label="FAQ" className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {data.faqs.map(({ q, a }, i) => (
              <details key={i} className="group rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-black text-gray-900 hover:text-blue-700 transition-colors list-none">
                  <span>{q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED LINKS */}
      <section aria-label="Related pages" className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-black text-gray-900 mb-5 text-center">Related Guides</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {data.relatedLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-5 py-3 rounded-xl bg-white border border-gray-200 hover:border-blue-400 text-sm font-bold text-gray-800 hover:text-blue-700 transition-colors"
              >
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section aria-label="Final CTA" className="text-white py-16 text-center" style={{ background: theme.gradient }}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-5xl mb-5">{theme.icon}</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">Get Your GPS Vacation-Ready</h2>
          <p className="text-white/70 text-lg mb-8">Phone pickup under 5 min · From $49 · No fix = no fee · 24/7</p>
          <a
            href="tel:+13479531531"
            className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 30px rgba(220,38,38,0.5)" }}
          >
            📞 347-953-1531
          </a>
        </div>
      </section>
    </>
  );
}
