import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";

export const metadata: Metadata = {
  title: "Epson Printer Repair Near Me — NYC & All 50 States | Trini System LLC",
  description: "Expert Epson printer repair. EcoTank ink errors, WiFi offline, nozzle clogs, scan not working. Epson service NYC. Remote 24/7. Call 347-953-1531.",
  keywords: [
    "epson printer repair near me","epson service nyc","epson printer repair new york",
    "epson repair service center","epson repair near me","epson printer repair",
    "epson ecotank ink error","epson not printing","epson company phone number",
    "epson contact no","epson customer service telephone number","epson repair center near me",
    "epson authorized dealer","epson dealer near me","epson phone number",
    "epson scanner service","epson printer service","service epson printer",
    "epson repair centre","epson repairs","epson servicing","epson authorized distributors",
  ],
};

const EPSON_TRENDING = [
  "Epson EcoTank ink error","Epson ET-2720 not printing","Epson printer offline",
  "Epson scan not working","Epson WiFi disconnected","Epson ET-4760 ink system error",
  "Epson WorkForce paper jam","Epson nozzle clog fix",
];

const EpsonSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Epson Printer Repair Service",
  "provider": { "@type": "LocalBusiness", "name": "Trini System LLC", "telephone": "+13479531531" },
  "areaServed": "United States",
  "serviceType": "Epson Printer Repair",
  "offers": { "@type": "Offer", "price": "49", "priceCurrency": "USD" },
};

export default function EpsonPrinterRepairPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(EpsonSchema) }} />
      <div className="bg-cyan-700 text-white py-3 text-center text-sm font-semibold">
        🖨️ Epson Printer Repair — Remote Service, NYC & All 50 States · <a href="tel:+13479531531" className="underline">Call 347-953-1531</a>
      </div>
      <TechER brandFilter="Epson" pageTrending={EPSON_TRENDING} />
    </>
  );
}
