import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "HP Printer Repair Near Me — All 50 States | Trini System LLC",
  description: "Expert HP printer repair. DeskJet 4155e, 2755e, OfficeJet Pro, LaserJet, ENVY. Fix offline errors, WiFi issues, error codes OXc19a0035. Remote 24/7. Call 347-953-1531.",
  keywords: [
    "hp printer repair near me","hp printer repair new york","hp printer repair service near me",
    "hp printer support","hp printer technician","hp printer offline fix","hp printer error code",
    "hp deskjet 4155e repair","hp deskjet 2755e setup","hp printer support phone number 24 hours",
    "hp laserjet printer repair","hp printer service center","where can i get my hp printer fixed",
  ],
};

const HP_TRENDING = [
  "HP DeskJet 4155e offline","HP DeskJet 2755e setup","HP ENVY not printing",
  "HP OfficeJet Pro 9015e error","HP LaserJet driver Windows 11","HP printer error OXc19a0035",
  "HP 952 ink cartridge error","HP printer won't connect WiFi",
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://trinisystem.vercel.app" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://trinisystem.vercel.app/services" },
      { "@type": "ListItem", "position": 3, "name": "HP Printer Repair", "item": "https://trinisystem.vercel.app/hp-printer-repair" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I fix my HP printer showing offline?",
        "acceptedAnswer": { "@type": "Answer", "text": "Turn off both the HP printer and your WiFi router. Unplug both from the wall for 30 seconds. Plug the router back in first and wait 60 seconds. Power on the HP printer. On Windows, go to Settings > Printers and uncheck 'Use Printer Offline'. If it persists, call Trini System at 347-953-1531 — we fix HP offline errors remotely in under 15 minutes." }
      },
      {
        "@type": "Question",
        "name": "What is HP printer error code OXc19a0035?",
        "acceptedAnswer": { "@type": "Answer", "text": "Error OXc19a0035 is an ink system failure on HP printers. Turn the printer fully off, remove all ink cartridges, wait 60 seconds, reinstall them firmly, and power on. If the error returns, Trini System resolves this remotely without hardware replacement in most cases." }
      },
      {
        "@type": "Question",
        "name": "How much does HP printer repair cost at Trini System?",
        "acceptedAnswer": { "@type": "Answer", "text": "Remote HP printer repair starts at $49 — about 50% less than Geek Squad. Most HP issues are fixed remotely in under 30 minutes. No fix = no fee guaranteed." }
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "HP Printer Repair Service",
    "provider": { "@type": "LocalBusiness", "name": "Trini System LLC", "telephone": "+13479531531" },
    "areaServed": "United States",
    "serviceType": "HP Printer Repair",
    "offers": { "@type": "Offer", "price": "49", "priceCurrency": "USD" },
  },
];

export default function HPPrinterRepairPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="bg-blue-700 text-white py-3 text-center text-sm font-semibold">
        🖨️ HP Printer Repair — Remote Service, All 50 States ·{" "}
        <a href="tel:+13479531531" className="underline font-bold">Call 347-953-1531</a>
      </div>
      <TechER brandFilter="HP" pageTrending={HP_TRENDING} />
      <StickyCTA />
    </>
  );
}
