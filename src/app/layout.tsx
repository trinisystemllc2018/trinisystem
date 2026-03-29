import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingSupport } from "@/components/ui/FloatingSupport";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";

const BASE_URL = "https://trinisystem.vercel.app";

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
    "TriniCleaner", "Trini System LLC", "printer repair Corona NY",
    "tech support Queens NY", "senior tech support New York",
  ],
  authors: [{ name: "Trini System LLC" }],
  creator: "Trini System LLC",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
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
};

// ── LocalBusiness JSON-LD Schema ──────────────────────────────
// This is the #1 SEO signal to connect your Google Business listing
// to your website. Google uses this to verify NAP consistency.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#business`,
  "name": "Trini System LLC",
  "alternateName": "HP Canon Epson Printer Help | Trini System LLC",
  "description": "Expert remote printer repair & PC support for HP, Canon, Epson, Brother. Free TriniCleaner download. Serving all 50 states. Based in Corona, Queens, NY.",
  "url": BASE_URL,
  "telephone": "+13479531531",
  "email": "trinisystemllc@gmail.com",
  "foundingDate": "2016",
  "priceRange": "$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Credit Card, PayPal, Zelle",
  "image": `${BASE_URL}/logo.png`,
  "logo": `${BASE_URL}/logo.png`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "52-09 99th St Apt 8S",
    "addressLocality": "Corona",
    "addressRegion": "NY",
    "postalCode": "11368",
    "addressCountry": "US",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.7459,
    "longitude": -73.8618,
  },
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "State", "name": "New York" },
    { "@type": "City", "name": "Corona" },
    { "@type": "City", "name": "Queens" },
  ],
  "serviceArea": {
    "@type": "GeoShape",
    "description": "All 50 US states — remote support available nationwide",
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59",
    },
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tech Support Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "HP Printer Repair & Setup" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Canon Printer Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Epson Printer Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brother Printer Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Garmin GPS Map Update" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "PC Virus Removal" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Windows 10/11 Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "TriniCleaner PC Optimizer (Free)" } },
    ],
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47",
    "bestRating": "5",
    "worstRating": "1",
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Corey Hawkins" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "James was incredibly patient and made everything easy. My HP DeskJet was offline for weeks and they fixed it in 20 minutes. Absolutely the best tech support experience I've ever had.",
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Leslie Park" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Very helpful in finding and resolving my Canon PIXMA B200 error. Quick, simple, and effective. I was ready to buy a new printer — they saved me $200!",
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Mark Starrett" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "They went above and beyond to get my Garmin GPS updated correctly. Professional, reliable, and MUCH cheaper than Best Buy.",
    },
  ],
  "sameAs": [
    "https://www.google.com/maps/place/HP+Canon+Epson+Printer+Help",
    "https://sites.google.com/view/trinisystemllc/Technical-Support-USA",
    "https://share.google/1mtrJVk8Ya0PkjG76",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Bing Webmaster verification */}
        <meta name="msvalidate.01" content="FB3B439D2D61A515B724444ADBA619BD" />

        {/* LocalBusiness JSON-LD — connects website to Google Business listing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        {/* Google Tag Manager */}
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
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P5MQTQJ9"
            height="0" width="0"
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
