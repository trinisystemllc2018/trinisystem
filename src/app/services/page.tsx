import type { Metadata } from "next";
import Link from "next/link";
import { BRANDS, PHONE_HREF, PHONE } from "@/lib/utils";
import { StickyCTA } from "@/components/ui/Button";

// ── JSON-LD: Service page with all brand sub-services ─────────
const servicePageSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Printer Repair & Tech Support Services — Trini System LLC",
  "description": "Expert remote printer repair for HP, Canon, Epson, Brother. PC repair, GPS updates, virus removal. All 50 US states.",
  "url": "https://trinisystem.vercel.app/services",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "HP Printer Repair", "url": "https://trinisystem.vercel.app/hp-printer-repair" },
    { "@type": "ListItem", "position": 2, "name": "Canon Printer Repair", "url": "https://trinisystem.vercel.app/canon-printer-repair" },
    { "@type": "ListItem", "position": 3, "name": "Epson Printer Repair", "url": "https://trinisystem.vercel.app/epson-printer-repair" },
    { "@type": "ListItem", "position": 4, "name": "Fix All Problems", "url": "https://trinisystem.vercel.app/fix" },
    { "@type": "ListItem", "position": 5, "name": "Reparación de Impresoras en Español", "url": "https://trinisystem.vercel.app/reparacion-impresoras" },
  ],
};

export const metadata: Metadata = {
  title: "Printer Repair & Tech Services — HP, Canon, Epson, Brother | Trini System",
  description: "Expert remote printer repair for HP DeskJet 4155e, Canon PIXMA, Epson EcoTank, Brother MFC. PC repair, GPS updates, antivirus setup. Call 347-953-1531.",
  keywords: ["HP printer repair", "Canon printer support", "Epson printer fix", "Brother printer setup", "printer offline fix", "tech support USA"],
};

// ── All specific service pages — previously unlinked ─────────
const BRAND_PAGES = [
  {
    icon: "🖨️",
    label: "HP Printer Repair",
    sub: "DeskJet, ENVY, OfficeJet, LaserJet",
    queries: "34 search queries covered",
    href: "/hp-printer-repair",
    color: "border-blue-200 bg-blue-50 hover:border-blue-400",
    badge: "bg-blue-600",
  },
  {
    icon: "🔴",
    label: "Canon Printer Repair",
    sub: "PIXMA, imageCLASS, MX, TR, MG series",
    queries: "19 search queries covered",
    href: "/canon-printer-repair",
    color: "border-red-200 bg-red-50 hover:border-red-400",
    badge: "bg-red-600",
  },
  {
    icon: "🔵",
    label: "Epson Printer Repair",
    sub: "EcoTank, WorkForce, Expression series",
    queries: "39 search queries covered",
    href: "/epson-printer-repair",
    color: "border-sky-200 bg-sky-50 hover:border-sky-400",
    badge: "bg-sky-600",
  },
  {
    icon: "🔧",
    label: "Fix Any Problem",
    sub: "HP · Canon · Epson · Brother · PC · GPS",
    queries: "AI-powered diagnostic tool",
    href: "/fix",
    color: "border-emerald-200 bg-emerald-50 hover:border-emerald-400",
    badge: "bg-emerald-600",
  },
  {
    icon: "🇪🇸",
    label: "Reparación de Impresoras",
    sub: "Soporte técnico remoto en español",
    queries: "Búsquedas en español",
    href: "/reparacion-impresoras",
    color: "border-orange-200 bg-orange-50 hover:border-orange-400",
    badge: "bg-orange-500",
  },
];

function ServicesHero() {
  return (
    <section className="pt-12 pb-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-blue-200">
              🖨️ All Brands — All Problems
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5">
              Every Tech Problem.
              <span className="block text-gradient">One Trusted Team.</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              From printer repair to PC optimization to GPS updates — we handle everything remotely across all 50 states. Fast, affordable, and no appointment needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg px-7 py-4 rounded-2xl shadow-brand hover:from-blue-700 hover:to-blue-800 transition-all">
                📞 {PHONE} — Available Now
              </a>
              <Link href="/fix" className="flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold text-lg px-7 py-4 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all">
                🔧 Fix My Problem Now →
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "⚡", title: "< 15 min", sub: "Average response time" },
              { icon: "🛡️", title: "No Fix = No Fee", sub: "100% satisfaction guarantee" },
              { icon: "🌎", title: "All 50 States", sub: "Remote support nationwide" },
              { icon: "💰", title: "50% Less", sub: "Than Geek Squad prices" },
            ].map(s => (
              <div key={s.title} className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-black text-gray-900 text-lg mb-1">{s.title}</div>
                <div className="text-xs text-gray-500">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── NEW: Brand-specific page hub ──────────────────────────────
function BrandPageHub() {
  return (
    <section className="py-14 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Choose Your Brand</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">
            Get a Dedicated Repair Page for Your Device
          </h2>
          <p className="text-gray-500 mt-2">Each page has model-specific fixes, error codes, and instant diagnosis tools.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BRAND_PAGES.map(p => (
            <Link
              key={p.href}
              href={p.href}
              className={`group flex items-start gap-4 p-5 rounded-2xl border-2 transition-all hover:-translate-y-0.5 hover:shadow-md ${p.color}`}
            >
              <div className={`w-11 h-11 rounded-xl ${p.badge} text-white flex items-center justify-center text-xl shrink-0 shadow-sm`}>
                {p.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-gray-900 text-base group-hover:text-blue-700 transition-colors">{p.label}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{p.sub}</p>
                <p className="text-xs text-emerald-600 font-semibold mt-1.5">{p.queries} →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandDetails() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Printer Brands We Support</h2>
          <p className="text-gray-500 text-lg">Every model. Every error. Every WiFi issue. Fixed remotely.</p>
        </div>
        <div className="space-y-4">
          {BRANDS.map(brand => (
            <div
              key={brand.name}
              className="bg-white rounded-3xl border-2 border-gray-100 hover:border-blue-200 shadow-card hover:shadow-card-hover transition-all overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div
                  className="md:w-48 p-6 flex flex-col items-center justify-center text-center shrink-0"
                  style={{ background: brand.bgColor }}
                >
                  <div className="text-4xl font-black mb-2" style={{ color: brand.color }}>{brand.name}</div>
                  <div className="text-3xl">🖨️</div>
                </div>
                <div className="flex-1 p-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Supported Models</h3>
                    <div className="space-y-1.5">
                      {brand.models.map(m => (
                        <div key={m} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                          <span className="font-mono">{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Issues We Fix</h3>
                    <div className="space-y-1.5">
                      {brand.issues.map(issue => (
                        <div key={issue} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-emerald-500 font-bold">✓</span>
                          {issue}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* CTA — now links to dedicated brand page */}
                <div className="md:w-44 p-6 flex flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-gray-100">
                  <a
                    href={PHONE_HREF}
                    className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold py-3 px-4 rounded-2xl shadow-brand hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    📞 Get Help
                  </a>
                  <Link
                    href={brand.href}
                    className="flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                  >
                    {brand.name} Repair Page →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OtherServices() {
  const services = [
    { icon: "💻", title: "PC & Windows Support", models: ["Windows 10 Repair", "Windows 11 Issues", "Slow Computer Fix", "Driver Updates", "System Restore"], color: "bg-purple-50 border-purple-100", href: "/fix" },
    { icon: "🦠", title: "Virus & Malware Removal", models: ["Norton/McAfee Install", "Full System Scan", "Malwarebytes Setup", "Browser Cleanup", "Ransomware Help"], color: "bg-red-50 border-red-100", href: "/fix" },
    { icon: "🗺️", title: "Garmin GPS Updates", models: ["nuvi Series", "DriveSmart 65/55", "RV 890/890LMT", "Map Updates", "Firmware Updates"], color: "bg-teal-50 border-teal-100", href: "/fix" },
    { icon: "🏠", title: "Home Office Setup", models: ["Router Config", "Printer Network Setup", "Webcam / Monitor", "Home Classroom", "Video Call Setup"], color: "bg-orange-50 border-orange-100", href: "/contact" },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">More Tech Services</h2>
          <p className="text-gray-500 text-lg">Beyond printers — we handle all your home tech needs.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {services.map(s => (
            <div key={s.title} className={`bg-white rounded-3xl p-7 border-2 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all ${s.color}`}>
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-black text-gray-900 text-xl mb-4">{s.title}</h3>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {s.models.map(m => (
                  <div key={m} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-emerald-500 font-bold">✓</span> {m}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 bg-white text-gray-700 font-semibold text-sm px-4 py-2.5 rounded-xl border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all"
                >
                  📞 Get Help →
                </a>
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm px-4 py-2.5 rounded-xl border border-blue-200 hover:bg-blue-50 transition-all"
                >
                  Try Free Tool →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageSchema) }} />
      <ServicesHero />
      <BrandPageHub />
      <BrandDetails />
      <OtherServices />
      <StickyCTA />
    </>
  );
}
