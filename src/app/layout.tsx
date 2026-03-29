import type { Metadata } from "next";
import Script from "next/script";
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
    url: "https://trinisystem.vercel.app",
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
  verification: {
    // Bing Webmaster Tools
    other: { "msvalidate.01": "FB3B439D2D61A515B724444ADBA619BD" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Bing Webmaster verification */}
        <meta name="msvalidate.01" content="FB3B439D2D61A515B724444ADBA619BD" />

        {/* Google Tag Manager — fires before everything else */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P5MQTQJ9');`,
          }}
        />
      </head>
      <body className="bg-white text-gray-900 antialiased font-sans">
        {/* Google Tag Manager (noscript) — must be first thing inside <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P5MQTQJ9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingSupport />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
