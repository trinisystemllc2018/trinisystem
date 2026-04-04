import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Epson Printer Repair Near Me — EcoTank, WorkForce | Trini System LLC",
  description: "Expert Epson printer repair. EcoTank ET-2720, ET-4760, WorkForce WF-7720. Fix ink system errors, nozzle clogs, WiFi issues. Remote service all 50 states. Call 347-953-1531.",
  keywords: [
    "epson printer repair near me","epson printer not printing","epson ecotank not printing",
    "epson printer offline","epson ink system error","epson nozzle clog fix","epson wifi setup",
    "epson et-2720 error","epson et-4760 repair","epson workforce not printing",
    "epson printer support phone number","fix epson printer","epson scan not working",
  ],
};

const EPSON_TRENDING = [
  "Epson EcoTank ink error","Epson ET-2720 not printing","Epson WiFi setup",
  "Epson nozzle clog fix","Epson scan not working","Epson WorkForce WF-7720 error",
  "Epson firmware update failed","Epson printer offline Windows 11",
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://trinisystem.vercel.app" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://trinisystem.vercel.app/services" },
      { "@type": "ListItem", "position": 3, "name": "Epson Printer Repair", "item": "https://trinisystem.vercel.app/epson-printer-repair" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why does my Epson EcoTank show an ink error even when the tanks are full?",
        "acceptedAnswer": { "@type": "Answer", "text": "Epson EcoTank ink errors are almost always a sensor or firmware issue, not a real ink problem. Trini System can reset the ink sensor remotely in under 15 minutes — no need to replace the printer or any parts. Call 347-953-1531." }
      },
      {
        "@type": "Question",
        "name": "How do I fix Epson printer showing offline?",
        "acceptedAnswer": { "@type": "Answer", "text": "Restart both the Epson printer and your WiFi router. On the printer, press the WiFi button and run Wireless Setup. On your computer, remove the printer and reinstall using Epson Connect Printer Setup Utility. Trini System fixes Epson offline errors remotely across all 50 states." }
      },
      {
        "@type": "Question",
        "name": "How much does Epson printer repair cost at Trini System?",
        "acceptedAnswer": { "@type": "Answer", "text": "Remote Epson printer repair starts at $49 — about half the price of Geek Squad. Most issues are resolved in one 30-minute remote session. No fix = no fee." }
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Epson Printer Repair Service",
    "provider": { "@type": "LocalBusiness", "name": "Trini System LLC", "telephone": "+13479531531" },
    "areaServed": "United States",
    "serviceType": "Epson Printer Repair",
    "offers": { "@type": "Offer", "price": "49", "priceCurrency": "USD" },
  },
];

export default function EpsonPrinterRepairPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="bg-sky-700 text-white py-3 text-center text-sm font-semibold">
        🖨️ Epson Printer Repair — Remote Service, All 50 States ·{" "}
        <a href="tel:+13479531531" className="underline font-bold">Call 347-953-1531</a>
      </div>
      <TechER brandFilter="Epson" pageTrending={EPSON_TRENDING} />
      <StickyCTA />
    </>
  );
}
