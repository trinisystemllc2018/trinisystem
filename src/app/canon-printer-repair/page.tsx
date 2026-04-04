import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Canon Printer Repair Near Me — PIXMA, imageCLASS | Trini System LLC",
  description: "Expert Canon printer repair. PIXMA MX922, TR4520, MG3620, imageCLASS MF644Cdw. Fix B200 error, 5100 error, WiFi issues. Remote service all 50 states. Call 347-953-1531.",
  keywords: [
    "canon printer repair near me","canon printer not printing","canon printer b200 error",
    "canon pixma repair","canon printer offline","canon printer wifi setup","canon 5100 error fix",
    "canon mx922 repair","canon tr4520 driver","canon mg3620 not printing",
    "canon printer support phone number","fix canon printer error","canon imageclass repair",
  ],
};

const CANON_TRENDING = [
  "Canon PIXMA B200 error","Canon 5100 error fix","Canon printer WiFi setup",
  "Canon MX922 not printing","Canon TR4520 driver Windows 11","Canon MG3620 error",
  "Canon scan not working","Canon printer offline",
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://trinisystem.vercel.app" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://trinisystem.vercel.app/services" },
      { "@type": "ListItem", "position": 3, "name": "Canon Printer Repair", "item": "https://trinisystem.vercel.app/canon-printer-repair" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Canon printer error B200 and can it be fixed?",
        "acceptedAnswer": { "@type": "Answer", "text": "Canon B200 error is a print head or hardware fault. Trini System fixes B200 remotely in 80% of cases without buying a new printer. The fix involves a specific reset procedure. Call 347-953-1531 or use the diagnostic tool. Most repairs cost $49–$79 and take under 30 minutes." }
      },
      {
        "@type": "Question",
        "name": "How do I fix Canon printer error 5100?",
        "acceptedAnswer": { "@type": "Answer", "text": "Canon error 5100 usually means a paper jam, foreign object inside, or carriage obstruction. Turn the printer off, open the front cover, remove any paper scraps or objects, and power it back on. If the error persists, Trini System can diagnose and fix it remotely." }
      },
      {
        "@type": "Question",
        "name": "Can Trini System fix my Canon PIXMA remotely?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Trini System provides remote Canon PIXMA repair for MX922, TR4520, TR4722, MG3620, and imageCLASS series. All 50 US states. Call 347-953-1531. No fix = no fee." }
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Canon Printer Repair Service",
    "provider": { "@type": "LocalBusiness", "name": "Trini System LLC", "telephone": "+13479531531" },
    "areaServed": "United States",
    "serviceType": "Canon Printer Repair",
    "offers": { "@type": "Offer", "price": "49", "priceCurrency": "USD" },
  },
];

export default function CanonPrinterRepairPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="bg-red-700 text-white py-3 text-center text-sm font-semibold">
        🖨️ Canon Printer Repair — Remote Service, All 50 States ·{" "}
        <a href="tel:+13479531531" className="underline font-bold">Call 347-953-1531</a>
      </div>
      <TechER brandFilter="Canon" pageTrending={CANON_TRENDING} />
      <StickyCTA />
    </>
  );
}
