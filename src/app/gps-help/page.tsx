import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "GPS Help & Map Updates — Garmin, TomTom, Magellan | Trini System LLC",
  description: "Fix your GPS device. Garmin DriveSmart, TomTom GO, Magellan. Map updates, frozen screen, no signal, won't turn on. Remote help. Call 347-953-1531.",
  keywords: ["garmin map update","gps not working","garmin express help","tomtom update","gps frozen","no satellite signal","garmin drivesmart fix"],
};

const GPS_TRENDING = [
  "Garmin map won't update","Garmin stuck on logo","TomTom not turning on",
  "GPS no satellite signal","Garmin Express error","Magellan map update",
  "Garmin DriveSmart 65 update","GPS screen problem",
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",    "item": "https://trinisystem.vercel.app" },
      { "@type": "ListItem", "position": 2, "name": "GPS Help","item": "https://trinisystem.vercel.app/gps-help" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "GPS Device Help & Map Updates",
    "provider": { "@type": "LocalBusiness", "name": "Trini System LLC", "telephone": "+13479531531" },
    "areaServed": "United States",
    "serviceType": "GPS Repair & Map Update",
    "offers": { "@type": "Offer", "price": "49", "priceCurrency": "USD" },
  },
];

export default function GpsHelpPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white py-3 text-center text-sm font-semibold">
        🗺️ GPS Help & Map Updates — Garmin · TomTom · Magellan · Remote Service ·{" "}
        <a href="tel:+13479531531" className="underline font-bold">Call 347-953-1531</a>
      </div>
      <TechER initialCategory="gps" pageTrending={GPS_TRENDING} />
      <StickyCTA />
    </>
  );
}
