import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";

export const metadata: Metadata = {
  title: "Canon Printer Repair Near Me — NYC & All 50 States | Trini System LLC",
  description: "Expert Canon printer repair. Error B200, WiFi offline, E03/E04 errors, driver issues. Canon copier repair New York. Remote 24/7. Call 347-953-1531.",
  keywords: [
    "canon printer repair near me","canon copier repair new york","canon printer repair",
    "canon repair near me","canon technical support","canon printer repairs near me",
    "canon copier repair","canon photocopier repair","canon repair","canon printer service center",
    "canon printer service center near me","nearest canon printer service center",
    "canon printer home service","canon printer tech support","canon repair shop near me",
    "canon wy printer","canon computers","printer parts canon",
  ],
};

const CANON_TRENDING = [
  "Canon B200 error fix","Canon PIXMA MX922 offline","Canon TR4520 WiFi setup",
  "Canon printer error E03","Canon printer driver Windows 11","Canon MG3620 not printing",
  "Canon imageCLASS scan not working","Canon copier repair NYC",
];

const CanonSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Canon Printer Repair Service",
  "provider": { "@type": "LocalBusiness", "name": "Trini System LLC", "telephone": "+13479531531" },
  "areaServed": "United States",
  "serviceType": "Canon Printer Repair",
  "offers": { "@type": "Offer", "price": "49", "priceCurrency": "USD" },
};

export default function CanonPrinterRepairPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(CanonSchema) }} />
      <div className="bg-red-700 text-white py-3 text-center text-sm font-semibold">
        🖨️ Canon Printer Repair — Remote Service, NYC & All 50 States · <a href="tel:+13479531531" className="underline">Call 347-953-1531</a>
      </div>
      <TechER brandFilter="Canon" pageTrending={CANON_TRENDING} />
    </>
  );
}
