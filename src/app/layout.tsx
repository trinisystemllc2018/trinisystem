import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingSupport } from "@/components/ui/FloatingSupport";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";

export const metadata: Metadata = {
  title: {
    default: "Trini System LLC — Printer Repair & PC Support USA",
    template: "%s | Trini System LLC",
  },
  description:
    "Expert printer repair & PC optimization for HP, Canon, Epson, Brother. Free TriniCleaner download. Remote support across all 50 states. Call 347-953-1531.",
  keywords: [
    "printer repair USA", "HP printer offline fix", "Canon printer not printing",
    "Epson printer error", "Brother printer setup", "free computer cleaner",
    "make computer faster", "Windows 11 slow", "virus removal", "tech support USA",
    "HP DeskJet 4155e setup", "HP DeskJet 2755e setup", "Garmin GPS update",
    "TriniCleaner", "Trini System LLC",
  ],
  authors: [{ name: "Trini System LLC" }],
  creator: "Trini System LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://trinisystemllc.com",
    title: "Trini System LLC — Printer Repair & PC Support USA",
    description: "Expert printer repair & free PC optimizer. HP, Canon, Epson, Brother. Call 347-953-1531.",
    siteName: "Trini System LLC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trini System LLC — Printer Repair & PC Support",
    description: "Free TriniCleaner + expert printer repair. All 50 states.",
  },
  robots: { index: true, follow: true },
  verification: {},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased font-sans">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingSupport />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
