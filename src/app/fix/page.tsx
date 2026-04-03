import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";

export const metadata: Metadata = {
  title: "Fix My Tech Problem — Free Instant Help | Trini System LLC",
  description: "Describe your printer, PC, internet, TV, router or gaming problem. Get instant step-by-step fixes, hand it to our technicians, or diagnose it together. Call 347-953-1531.",
  keywords: ["fix my printer","computer help","printer repair","tech support","hp printer offline","epson error","internet slow","router setup","free tech help"],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",     "item": "https://trinisystem.vercel.app" },
      { "@type": "ListItem", "position": 2, "name": "Fix My Problem", "item": "https://trinisystem.vercel.app/fix" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I fix my printer when it won't print?",
        "acceptedAnswer": { "@type": "Answer", "text": "Use Trini System's free diagnostic tool at trinisystem.vercel.app/fix. Select your printer brand, describe the problem, and get instant step-by-step fix instructions. If the problem persists, call 347-953-1531 for live remote support — average fix time is under 15 minutes." }
      },
      {
        "@type": "Question",
        "name": "What tech problems can Trini System fix remotely?",
        "acceptedAnswer": { "@type": "Answer", "text": "Trini System fixes: HP, Canon, Epson, and Brother printer issues (offline, error codes, WiFi, driver problems), slow Windows 10/11 computers, virus and malware removal, Garmin GPS map updates, home network setup, and new device configuration. All services are available remotely across all 50 US states." }
      },
      {
        "@type": "Question",
        "name": "Is Trini System's diagnostic tool really free?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. The diagnostic tool at trinisystem.vercel.app/fix is completely free with no signup required. It provides step-by-step fix instructions for the most common printer and computer problems. Remote technician support starts at $49 if you need hands-on help." }
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Trini System Tech Problem Finder",
    "applicationCategory": "UtilitiesApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "operatingSystem": "Web",
    "description": "Free interactive tech diagnostic tool for printer, PC, GPS, and device problems.",
    "url": "https://trinisystem.vercel.app/fix",
    "provider": { "@type": "Organization", "name": "Trini System LLC", "telephone": "+13479531531" },
  },
];

export default function FixPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <TechER />
    </>
  );
}
