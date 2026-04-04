import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Computer Help — Slow PC, Won't Start, Windows 11 | Trini System LLC",
  description: "Fix your slow computer, boot issues, Windows 11 problems, crashes, or no internet. Dell, HP, Lenovo, Gateway. Remote support all 50 states. Call 347-953-1531.",
  keywords: ["computer running slow","pc won't start","windows 11 fix","laptop slow","computer freezing","dell laptop help","hp computer fix","lenovo laptop help"],
};

const COMPUTER_TRENDING = [
  "Computer running very slow","Windows 11 problems","Laptop won't start",
  "PC keeps freezing","No internet connection","Dell laptop slow",
  "HP computer not starting","Windows update issues",
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",         "item": "https://trinisystem.vercel.app" },
      { "@type": "ListItem", "position": 2, "name": "Computer Help","item": "https://trinisystem.vercel.app/computer-help" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Computer & Windows Support",
    "provider": { "@type": "LocalBusiness", "name": "Trini System LLC", "telephone": "+13479531531" },
    "areaServed": "United States",
    "serviceType": "Computer Repair & Optimization",
    "offers": { "@type": "Offer", "price": "49", "priceCurrency": "USD" },
  },
];

export default function ComputerHelpPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white py-3 text-center text-sm font-semibold">
        💻 Computer Help — Dell · HP · Lenovo · Gateway · Windows 10/11 · Remote ·{" "}
        <a href="tel:+13479531531" className="underline font-bold">Call 347-953-1531</a>
      </div>
      <TechER initialCategory="computer" pageTrending={COMPUTER_TRENDING} />
      <StickyCTA />
    </>
  );
}
