import type { Metadata } from "next";
import Link from "next/link";
import { StickyCTA } from "@/components/ui/Button";
import { PHONE, PHONE_HREF } from "@/lib/utils";

const BASE = "https://trinisystem.vercel.app";

type BrandKey = "hp" | "canon" | "epson" | "brother";

const BRAND_DATA: Record<BrandKey, {
  name: string; color: string; full: string;
  pros: string[]; cons: string[]; bestFor: string;
  repairCost: string; driverEase: string; reliability: string;
  href: string;
}> = {
  hp: {
    name: "HP", full: "Hewlett-Packard", color: "#0096D6", href: "/hp-printer-repair",
    pros: ["Widest US service network", "HP Smart app is excellent", "123.hp.com easy driver downloads", "Best AirPrint & ePrint support"],
    cons: ["Frequent firmware updates can cause errors", "Ink costs are high", "Aggressive ink subscription push"],
    bestFor: "Home offices, seniors, anyone wanting easy remote setup via HP Smart app",
    repairCost: "Most common issues fixed remotely from $49",
    driverEase: "⭐⭐⭐⭐⭐",
    reliability: "⭐⭐⭐⭐",
  },
  canon: {
    name: "Canon", full: "Canon Inc.", color: "#CC0000", href: "/canon-printer-repair",
    pros: ["Superior photo print quality", "Reliable ink tanks on PIXMA G-series", "Quiet operation", "Solid wireless setup"],
    cons: ["B200 error is notoriously stubborn", "Drivers harder to find", "Higher repair cost for printhead issues"],
    bestFor: "Photo enthusiasts, home users who print photos regularly",
    repairCost: "Most issues fixed remotely from $49; B200 may need hardware repair",
    driverEase: "⭐⭐⭐⭐",
    reliability: "⭐⭐⭐⭐",
  },
  epson: {
    name: "Epson", full: "Epson America Inc.", color: "#007AB8", href: "/epson-printer-repair",
    pros: ["EcoTank bottles = lowest ink cost long-term", "Excellent color accuracy", "Wide format options (plotters)", "Good for high-volume printing"],
    cons: ["Nozzle clogs if not used regularly", "Ink system errors can be complex", "0x97 can be hardware-level"],
    bestFor: "High-volume home printing, photo printing, businesses needing low ink cost",
    repairCost: "Most errors fixed remotely from $49; 0x97 may need escalation",
    driverEase: "⭐⭐⭐⭐",
    reliability: "⭐⭐⭐⭐",
  },
  brother: {
    name: "Brother", full: "Brother Industries", color: "#004B9C", href: "/brother-printer-repair",
    pros: ["Best laser printer value", "Low toner cost", "Extremely reliable for documents", "AirPrint & Mopria built-in"],
    cons: ["Driver issues after Windows Updates are common", "Photo quality below inkjet rivals", "Limited color options at entry price"],
    bestFor: "Small businesses, anyone printing lots of documents (not photos)",
    repairCost: "Driver issues fixed remotely from $49; hardware rare",
    driverEase: "⭐⭐⭐",
    reliability: "⭐⭐⭐⭐⭐",
  },
};

const VALID_PAIRS = [
  "hp-vs-canon", "hp-vs-epson", "hp-vs-brother",
  "canon-vs-epson", "canon-vs-brother", "epson-vs-brother",
];

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return VALID_PAIRS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const parts = params.slug.split("-vs-");
  if (parts.length !== 2) return { title: "Printer Comparison" };
  const [a, b] = parts as [BrandKey, BrandKey];
  const brandA = BRAND_DATA[a];
  const brandB = BRAND_DATA[b];
  if (!brandA || !brandB) return { title: "Printer Comparison" };

  return {
    title: `${brandA.name} vs ${brandB.name} Printer — Which to Buy 2026?`,
    description: `${brandA.name} vs ${brandB.name} printer comparison: reliability, ink cost, repair ease, and which brand is right for you in 2026. Free expert advice — call 347-953-1531.`,
    alternates: { canonical: `${BASE}/compare/${params.slug}` },
    keywords: [
      `${a} vs ${b} printer`,
      `${brandA.name} vs ${brandB.name}`,
      `${a} printer vs ${b} printer`,
      `which printer is better ${brandA.name} or ${brandB.name}`,
      `${brandA.name} printer review vs ${brandB.name}`,
    ],
  };
}

const COMPARE_ROWS = [
  { label: "Print Quality", key: "printQuality" as const },
  { label: "Ink / Toner Cost", key: "inkCost" as const },
  { label: "Driver Ease", key: "driverEase" as const },
  { label: "Reliability", key: "reliability" as const },
  { label: "Repair Cost", key: "repairCost" as const },
  { label: "Best For", key: "bestFor" as const },
];

export default function ComparePage({ params }: Props) {
  const parts = params.slug.split("-vs-");
  if (parts.length !== 2) return null;
  const [aKey, bKey] = parts as [BrandKey, BrandKey];
  const brandA = BRAND_DATA[aKey];
  const brandB = BRAND_DATA[bKey];

  if (!brandA || !brandB) return (
    <section className="py-20 px-4 text-center" style={{ background: "#050d1a" }}>
      <h1 className="text-white text-3xl font-black mb-4">Comparison not found</h1>
      <Link href="/printer-support" className="text-amber-400 underline">Browse all printer help →</Link>
    </section>
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is ${brandA.name} or ${brandB.name} better for home use?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${brandA.name} is best for: ${brandA.bestFor}. ${brandB.name} is best for: ${brandB.bestFor}. For most home users, the decision comes down to what you print most — photos favor ${brandA.name === "Canon" || brandA.name === "Epson" ? brandA.name : brandB.name}, while document printing favors ${brandA.name === "Brother" ? brandA.name : brandB.name === "Brother" ? brandB.name : brandA.name}.`,
        },
      },
      {
        "@type": "Question",
        name: `Which printer is easier to repair — ${brandA.name} or ${brandB.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Both ${brandA.name} and ${brandB.name} printers can be repaired remotely by Trini System. ${brandA.name}: ${brandA.repairCost}. ${brandB.name}: ${brandB.repairCost}. Most issues with either brand are fixed remotely in under 20 minutes. Call 347-953-1531 for free diagnosis.`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* HERO */}
      <section className="relative py-16 px-4"
        style={{ background: "linear-gradient(135deg,#050d1a 0%,#0f1a30 60%,#050d1a 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono tracking-widest uppercase mb-6"
            style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(249,115,22,0.3)", color: "#f59e0b" }}>
            🖨️ Printer Comparison 2026
          </div>
          <h1 className="font-black text-white leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            <span style={{ color: brandA.color }}>{brandA.name}</span>
            {" "}vs{" "}
            <span style={{ color: brandB.color }}>{brandB.name}</span>
            {" "}Printer<br />
            <span style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Which Should You Buy?
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8 speakable-summary">
            Honest comparison from technicians who repair both brands every day.
            Reliability, ink cost, repair ease — all covered.
          </p>
        </div>
      </section>

      {/* BRAND CARDS */}
      <section className="py-16 px-4" style={{ background: "#0a0f1e" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[brandA, brandB].map((brand) => (
            <div key={brand.name} className="rounded-2xl p-7"
              style={{ background: "#0f172a", border: `2px solid ${brand.color}44` }}>
              <div className="font-black text-3xl mb-1" style={{ color: brand.color }}>{brand.name}</div>
              <div className="text-white/40 text-sm mb-5 font-mono">{brand.full}</div>

              <div className="mb-4">
                <div className="text-xs font-mono tracking-widest text-green-400 mb-2">PROS</div>
                {brand.pros.map((p) => (
                  <div key={p} className="flex items-start gap-2 mb-1">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-white/70 text-sm">{p}</span>
                  </div>
                ))}
              </div>

              <div className="mb-5">
                <div className="text-xs font-mono tracking-widest text-red-400 mb-2">CONS</div>
                {brand.cons.map((c) => (
                  <div key={c} className="flex items-start gap-2 mb-1">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                    <span className="text-white/60 text-sm">{c}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-4" style={{ background: `${brand.color}12`, border: `1px solid ${brand.color}33` }}>
                <div className="text-xs font-mono text-white/40 mb-1">BEST FOR</div>
                <div className="text-white/80 text-sm">{brand.bestFor}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPEC TABLE */}
      <section className="py-16 px-4" style={{ background: "linear-gradient(180deg,#020817 0%,#050d1a 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-white text-center mb-10">Head-to-Head Specs</h2>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="grid grid-cols-3" style={{ background: "#0f172a" }}>
              <div className="p-4 text-xs font-mono text-white/40 uppercase tracking-widest">Feature</div>
              <div className="p-4 text-sm font-black text-center" style={{ color: brandA.color, background: `${brandA.color}10` }}>{brandA.name}</div>
              <div className="p-4 text-sm font-black text-center" style={{ color: brandB.color, background: `${brandB.color}10` }}>{brandB.name}</div>
            </div>
            {[
              { label: "Driver Ease", a: brandA.driverEase, b: brandB.driverEase },
              { label: "Reliability", a: brandA.reliability, b: brandB.reliability },
              { label: "Repair Cost", a: brandA.repairCost, b: brandB.repairCost },
              { label: "Best For", a: brandA.bestFor.split(",")[0], b: brandB.bestFor.split(",")[0] },
            ].map((row, i) => (
              <div key={row.label} className="grid grid-cols-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 0 ? "#0a1628" : "#070e1c" }}>
                <div className="p-4 text-sm text-white/60 font-medium">{row.label}</div>
                <div className="p-4 text-sm text-white/80 text-center">{row.a}</div>
                <div className="p-4 text-sm text-white/80 text-center">{row.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ background: "#050d1a" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-black text-white mb-4">Already own one? We repair both.</h2>
          <p className="text-white/55 mb-8">Whether you have a {brandA.name} or {brandB.name} printer, our technicians fix all models remotely. From $49 · No fix = no fee.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-black"
              style={{ background: "linear-gradient(135deg,#f59e0b,#fb923c)" }}>
              📞 {PHONE}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={brandA.href}
              className="text-sm font-semibold px-5 py-2 rounded-xl text-white/70 hover:text-white transition-colors"
              style={{ background: "#0f172a", border: `1px solid ${brandA.color}44` }}>
              {brandA.name} Repair →
            </Link>
            <Link href={brandB.href}
              className="text-sm font-semibold px-5 py-2 rounded-xl text-white/70 hover:text-white transition-colors"
              style={{ background: "#0f172a", border: `1px solid ${brandB.color}44` }}>
              {brandB.name} Repair →
            </Link>
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
