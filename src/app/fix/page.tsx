import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Fix My Tech Problem — Free Instant Diagnosis | Trini System LLC",
  description: "Describe your printer, PC, GPS, or device problem. Get instant step-by-step fixes for HP, Canon, Epson, Brother, and more. Remote support available 24/7. Call 347-953-1531.",
  keywords: ["fix my printer","computer help","printer repair","tech support","hp printer offline","epson error","garmin gps update","virus removal","free tech help"],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://trinisystem.vercel.app" },
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
        "acceptedAnswer": { "@type": "Answer", "text": "Use Trini System's free diagnostic tool at trinisystem.vercel.app/fix. Select your printer brand, describe the problem, and get instant step-by-step fix instructions. If the problem persists, call 347-953-1531 for live remote support — average fix time is under 15 minutes. No fix = no fee." }
      },
      {
        "@type": "Question",
        "name": "What tech problems can Trini System fix remotely?",
        "acceptedAnswer": { "@type": "Answer", "text": "Trini System fixes HP, Canon, Epson, and Brother printer issues (offline errors, error codes, WiFi drops, driver problems), slow Windows 10/11 PCs, virus and malware removal, Garmin GPS map updates, and new device setup — all remotely across all 50 US states." }
      },
      {
        "@type": "Question",
        "name": "Is the diagnostic tool free?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes — the diagnostic tool at trinisystem.vercel.app/fix is completely free with no signup required. Remote technician support starts at $49 if you need hands-on help. No fix = no fee guaranteed." }
      },
    ],
  },
];

export default function FixPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-3 text-center text-sm font-semibold">
        🔧 Free Diagnostic Tool — All Brands · Remote Fix Available ·{" "}
        <a href="tel:+13479531531" className="underline font-bold">Call 347-953-1531</a>
      </div>
      <TechER />
      <StickyCTA />
    </>
  );
}
