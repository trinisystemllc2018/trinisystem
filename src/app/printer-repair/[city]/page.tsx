import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StickyCTA } from "@/components/ui/Button";
import { PHONE, PHONE_HREF } from "@/lib/utils";
import { LOCATIONS, ALL_LOCATION_SLUGS, getLocation } from "@/lib/locations-data";

interface Props {
  params: { city: string };
}

export async function generateStaticParams() {
  return ALL_LOCATION_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loc = getLocation(params.city);
  if (!loc) return {};
  const url = `https://trinisystem.vercel.app/printer-repair/${params.city}`;
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    alternates: { canonical: url },
    keywords: [
      `printer repair ${loc.city.toLowerCase()}`,
      `printer repair near me ${loc.city.toLowerCase()}`,
      `hp printer repair ${loc.city.toLowerCase()}`,
      `canon printer repair ${loc.city.toLowerCase()}`,
      `epson printer repair ${loc.city.toLowerCase()}`,
      `printer technician ${loc.city.toLowerCase()}`,
    ],
    openGraph: {
      title: `${loc.metaTitle} | Trini System`,
      description: loc.metaDescription,
      url,
      type: "website",
    },
  };
}

export default function LocationPage({ params }: Props) {
  const loc = getLocation(params.city);
  if (!loc) return notFound();

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
        { "@type": "ListItem", position: 2, name: "Printer Repair Locations", item: "https://trinisystem.vercel.app/services" },
        { "@type": "ListItem", position: 3, name: `Printer Repair ${loc.city}`, item: `https://trinisystem.vercel.app/printer-repair/${loc.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Printer Repair — ${loc.city}, ${loc.stateAbbr}`,
      description: `Printer repair for ${loc.city} customers via Trini System's nationwide network of independent field technicians, plus instant remote support from HQ.`,
      provider: {
        "@type": "Organization",
        name: "Trini System LLC",
        telephone: "+13479531531",
        url: "https://trinisystem.vercel.app",
      },
      areaServed: { "@type": "City", name: loc.city, containedInPlace: { "@type": "State", name: loc.state } },
      serviceType: "Printer Repair",
      offers: { "@type": "Offer", price: "49", priceCurrency: "USD", description: "Starting price. No fix = no fee." },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `Does Trini System have a physical repair shop in ${loc.city}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `No — Trini System is headquartered in Corona, Queens, NY. For ${loc.city} customers, we either fix the printer remotely in a live session (works for most software, driver, and connectivity issues) or match you with an independent technician from our nationwide network for on-site work. We're upfront about this so you know what to expect before you call.`,
          },
        },
        {
          "@type": "Question",
          name: `How fast can someone help me in ${loc.city}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Remote sessions from HQ are typically available same-day, often within the hour. On-site matching through our technician network depends on current availability in the ${loc.city} area — call 347-953-1531 and we'll tell you honestly what's available before you commit to anything.`,
          },
        },
        {
          "@type": "Question",
          name: `What does printer repair cost in ${loc.city}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: "Remote repair starts at $49. On-site visits through our technician network vary by location and issue — you'll get a quote before any work starts. No fix = no fee on remote sessions.",
          },
        },
      ],
    },
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Urgency Bar */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-3 text-center text-sm font-semibold">
        🖨️ Printer Repair — {loc.city}, {loc.stateAbbr} ·{" "}
        <a href={PHONE_HREF} className="underline font-bold hover:text-blue-200">Call {PHONE}</a>
        {" "}· From $49 · No Fix = No Fee
      </div>

      {/* HERO */}
      <section
        aria-label={`Printer Repair ${loc.city} Hero`}
        style={{ background: "linear-gradient(135deg, #0c1a2e 0%, #14264a 40%, #1e3a6b 100%)" }}
        className="text-white"
      >
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">📍 {loc.city}, {loc.state}</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500/20 border border-emerald-400/30 px-3 py-1.5 rounded-full">✅ No Fix = No Fee</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">🕐 {loc.timezone} Time</span>
          </div>
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
              Printer Repair in {loc.city}, {loc.stateAbbr}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-6">
              {loc.intro}
            </p>
            <p className="text-sm text-blue-300 max-w-2xl mx-auto mb-8 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              📋 Transparency note: Trini System is based in Corona, Queens, NY. We serve {loc.city} through instant remote sessions
              and a nationwide network of independent field technicians — we're not a local storefront in {loc.city}, and we'll always
              tell you upfront which option fits your issue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 30px rgba(220,38,38,0.5)" }}>
                📞 Call Now — {PHONE}
              </a>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold py-5 px-8 rounded-2xl text-lg hover:bg-white/20 transition-all">
                View All Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS LOCALLY */}
      <section aria-label="How service works in this city" className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 text-center">How We Help {loc.city} Customers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border-2 border-blue-100">
              <div className="text-3xl mb-3">💻</div>
              <h3 className="font-black text-gray-900 text-lg mb-2">Remote Session (Fastest)</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Most printer problems — driver errors, offline status, WiFi setup, ink sensor errors — are software issues, not hardware. Our HQ technicians fix these live over a secure remote connection, usually same-day, from $49.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border-2 border-blue-100">
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="font-black text-gray-900 text-lg mb-2">Local Technician Match</h3>
              <p className="text-gray-600 text-sm leading-relaxed">For hardware issues that need hands-on work, we match you with an independent technician from our nationwide network who can come to you in the {loc.city} area, based on current availability.</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">Serving the greater {loc.city} area, including {loc.neighborhoods.join(", ")}.</p>
        </div>
      </section>

      {/* BRANDS */}
      <section aria-label="Brands serviced" className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">Brands We Fix in {loc.city}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {loc.brandsInDemand.map((b) => (
              <span key={b} className="text-sm font-bold bg-blue-50 border border-blue-200 text-blue-700 px-5 py-3 rounded-xl">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-label={`Printer Repair ${loc.city} FAQ`} className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: `Does Trini System have a physical repair shop in ${loc.city}?`, a: `No — we're headquartered in Corona, Queens, NY. For ${loc.city} we offer remote fixes from HQ or matching with an independent technician from our nationwide network. We tell you which applies before you commit.` },
              { q: `How fast can someone help me in ${loc.city}?`, a: `Remote sessions are typically same-day. On-site matching depends on current technician availability in your area — call ${PHONE} and we'll be upfront about timing.` },
              { q: `What does it cost?`, a: "Remote repair starts at $49, no fix = no fee. On-site visits vary by location and issue — you get a quote before any work starts." },
            ].map(({ q, a }, i) => (
              <details key={i} className="group rounded-2xl border border-gray-200 bg-white overflow-hidden">
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

      {/* RELATED */}
      <section aria-label="Related resources" className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-black text-gray-900 mb-6">Related Resources</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/hp-printer-repair" className="text-sm bg-gray-50 border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">HP Printer Repair</Link>
            <Link href="/canon-printer-repair" className="text-sm bg-gray-50 border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">Canon Printer Repair</Link>
            <Link href="/epson-printer-repair" className="text-sm bg-gray-50 border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">Epson Printer Repair</Link>
            <Link href="/brother-printer-repair" className="text-sm bg-gray-50 border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">Brother Printer Repair</Link>
            <Link href="/printer-repair-near-me" className="text-sm bg-gray-50 border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">All Locations</Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section aria-label="Get help" style={{ background: "linear-gradient(135deg, #0c1a2e, #1e3a6b)" }} className="text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Get Your Printer Fixed — {loc.city}</h2>
          <p className="text-blue-200 text-lg mb-8">Remote from $49, or matched with a local network technician · No fix = no fee</p>
          <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 30px rgba(220,38,38,0.5)" }}>
            📞 Call {PHONE}
          </a>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
