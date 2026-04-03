import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";

export const metadata: Metadata = {
  title: "HP Printer Repair Near Me — NYC & All 50 States | Trini System LLC",
  description: "Expert HP printer repair. HP DeskJet 4155e, 2755e, OfficeJet, LaserJet, ENVY. Fix offline errors, WiFi issues, error codes OXc19a0035. Remote 24/7. Call 347-953-1531.",
  keywords: [
    "hp printer repair near me","hp printer repair new york","hp printer repair service near me",
    "hp printer support","hp printer technician","hp repair center near me","hp printer offline fix",
    "hp printer error code","hp 952 cyan","hp deskjet 4155e repair","hp deskjet 2755e setup",
    "hp printer support phone number 24 hours","authorized hp printer repair near me",
    "hp laserjet printer repair","hp copier repair near me","hp printer service center",
    "where can i get my hp printer fixed","call hp printer support","hp printer maintenance",
  ],
};

const HP_TRENDING = [
  "HP DeskJet 4155e offline","HP DeskJet 2755e setup","HP ENVY not printing",
  "HP OfficeJet Pro 9015e error","HP LaserJet driver Windows 11","HP printer error OXc19a0035",
  "HP 952 ink cartridge error","HP printer won't connect WiFi",
];

const HpSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "HP Printer Repair Service",
  "provider": { "@type": "LocalBusiness", "name": "Trini System LLC", "telephone": "+13479531531" },
  "areaServed": "United States",
  "serviceType": "HP Printer Repair",
  "offers": { "@type": "Offer", "price": "49", "priceCurrency": "USD" },
};

export default function HPPrinterRepairPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(HpSchema) }} />
      <div className="bg-blue-700 text-white py-3 text-center text-sm font-semibold">
        🖨️ HP Printer Repair — Remote Service, All 50 States · <a href="tel:+13479531531" className="underline">Call 347-953-1531</a>
      </div>
      <TechER brandFilter="HP" pageTrending={HP_TRENDING} />
    </>
  );
}
