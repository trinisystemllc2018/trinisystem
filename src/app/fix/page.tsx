import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";

export const metadata: Metadata = {
  title: "Fix My Tech Problem — Free Instant Help | Trini System LLC",
  description: "Describe your printer, PC, internet, TV, router or gaming problem. Get instant step-by-step fixes, hand it to our technicians, or diagnose it together. Call 347-953-1531.",
  keywords: ["fix my printer","computer help","printer repair","tech support","hp printer offline","epson error","internet slow","router setup","free tech help"],
};

export default function FixPage() {
  return <TechER />;
}
