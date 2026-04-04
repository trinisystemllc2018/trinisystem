/* ═══════════════════════════════════════════════════════════════
   TRINI SYSTEM LLC — Core Constants & Data
   lib/utils.ts — single source of truth for all shared data
═══════════════════════════════════════════════════════════════ */

// ── cn utility (clsx + tailwind-merge) ───────────────────────
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Contact / NAP ─────────────────────────────────────────────
export const PHONE          = "347-953-1531";
export const PHONE_HREF     = "tel:+13479531531";
export const SUPPORT_FORM   = "https://trinisystemllc.com/contact";
export const MAPS_URL       = "https://maps.google.com/?q=Trini+System+LLC+Corona+NY";
export const OFFICIAL_SITE  = "https://trinisystem.vercel.app";
export const DOWNLOAD_URL   = "https://trinisystem.vercel.app/downloads";

// ── Brand data (services page + home brands section) ──────────
export const BRANDS = [
  {
    name: "HP",
    color: "#185FA5",
    bgColor: "#E6F1FB",
    href: "/hp-printer-repair",
    models: [
      "DeskJet 4155e", "DeskJet 2755e", "DeskJet 3755",
      "ENVY 6055e", "ENVY 6455e", "OfficeJet Pro 9015e", "LaserJet M404n",
    ],
    issues: [
      "Printer offline fix",
      "WiFi setup & reconnect",
      "Error code OXc19a0035",
      "Cartridge not recognized",
      "Windows 11 driver fix",
    ],
  },
  {
    name: "Canon",
    color: "#CC0000",
    bgColor: "#FDE8E8",
    href: "/canon-printer-repair",
    models: [
      "PIXMA MX922", "PIXMA TR4520", "PIXMA TR4722",
      "PIXMA MG3620", "imageCLASS MF644Cdw",
    ],
    issues: [
      "Error B200 fix",
      "Error 5100 / 5B00",
      "WiFi disconnect repair",
      "Scan not working",
      "Windows 11 driver",
    ],
  },
  {
    name: "Epson",
    color: "#0057A8",
    bgColor: "#E6F0FB",
    href: "/epson-printer-repair",
    models: [
      "EcoTank ET-2720", "EcoTank ET-4760", "EcoTank ET-3850", "WorkForce WF-7720",
    ],
    issues: [
      "Ink system error reset",
      "Nozzle clog & head cleaning",
      "WiFi connection drops",
      "Scan to PC missing",
      "Firmware update failed",
    ],
  },
  {
    name: "Brother",
    color: "#4D4D9D",
    bgColor: "#EEEEFC",
    href: "/services",
    models: [
      "MFC-L2710DW", "MFC-J995DW", "HL-L2350DW", "HL-L3270CDW", "DCP-L2550DW",
    ],
    issues: [
      "Windows 11 driver fix",
      "Scan to PC not working",
      "Drum error replace",
      "AirPrint iPhone setup",
      "Fax not sending",
    ],
  },
];

// ── Services grid (home + nav) — ALL pages linked correctly ───
export const SERVICES = [
  {
    icon: "🖨️",
    title: "HP Printer Repair",
    description:
      "Fix any HP DeskJet, ENVY, OfficeJet or LaserJet issue remotely. Offline errors, WiFi drops, error codes — fixed same day.",
    href: "/hp-printer-repair",
    color: "blue",
    popular: true,
  },
  {
    icon: "🔴",
    title: "Canon Printer Repair",
    description:
      "Canon PIXMA B200, 5100, WiFi and scan problems solved. We fix Canon imageCLASS and PIXMA models every day.",
    href: "/canon-printer-repair",
    color: "red",
    popular: false,
  },
  {
    icon: "🔵",
    title: "Epson Printer Repair",
    description:
      "EcoTank ink errors, nozzle clogs, WorkForce scan issues. Our Epson specialists fix it without replacing hardware.",
    href: "/epson-printer-repair",
    color: "blue",
    popular: false,
  },
  {
    icon: "🔧",
    title: "Fix Any Problem — All Brands",
    description:
      "HP, Canon, Epson, Brother, Garmin, PC. Use our free interactive diagnostic tool to find your exact fix in minutes.",
    href: "/fix",
    color: "green",
    popular: false,
  },
  {
    icon: "💻",
    title: "PC Repair & Speed Fix",
    description:
      "Windows 10/11 slow, crashes, viruses, driver issues. Free TriniCleaner download or full remote cleanup.",
    href: "/services",
    color: "purple",
    popular: false,
  },
  {
    icon: "🗺️",
    title: "Garmin GPS Updates",
    description:
      "DriveSmart, nüvi, RV GPS — map updates, software fixes, screen repair. Done remotely while you watch.",
    href: "/services",
    color: "teal",
    popular: false,
  },
  {
    icon: "🇪🇸",
    title: "Soporte en Español",
    description:
      "Reparación de impresoras HP, Canon, Epson y Brother en español. Servicio remoto — disponible ahora mismo.",
    href: "/reparacion-impresoras",
    color: "orange",
    popular: false,
  },
];

// ── Reviews data (used by ReviewsSection) ────────────────────
export const REVIEWS = [
  {
    name: "Corey Hawkins",
    rating: 5,
    date: "2024-11-12",
    text: "James was incredibly patient and made everything easy. My HP DeskJet was offline for weeks and they fixed it in 20 minutes. Absolutely the best tech support experience I've ever had.",
    service: "HP Printer Repair",
    source: "Google",
  },
  {
    name: "Leslie Park",
    rating: 5,
    date: "2024-10-28",
    text: "Very helpful in finding and resolving my Canon PIXMA B200 error. Quick, simple, and effective. I was ready to buy a new printer — they saved me $200!",
    service: "Canon Printer Repair",
    source: "Google",
  },
  {
    name: "Mark Starrett",
    rating: 5,
    date: "2024-09-15",
    text: "They went above and beyond to get my Garmin GPS updated correctly. Professional, reliable, and MUCH cheaper than Best Buy.",
    service: "Garmin GPS Update",
    source: "Google",
  },
  {
    name: "Diane Morales",
    rating: 5,
    date: "2024-12-03",
    text: "My Epson EcoTank kept showing ink errors even though I just refilled it. Trini System reset it remotely in 10 minutes. So grateful!",
    service: "Epson Printer Repair",
    source: "Yelp",
  },
  {
    name: "Robert Chen",
    rating: 5,
    date: "2024-08-20",
    text: "Windows 11 was running so slow I could barely use it. After TriniCleaner and a remote tune-up session, it boots in under 30 seconds. Night and day difference.",
    service: "PC Speed Fix",
    source: "Google",
  },
  {
    name: "Patricia Williams",
    rating: 5,
    date: "2024-11-30",
    text: "Called about my Brother MFC printer not scanning. James walked me through every step and stayed on the call until it worked. Extremely patient with seniors like me.",
    service: "Brother Printer Repair",
    source: "Google",
  },
];

// ── Social links (used by SocialProofSection) ─────────────────
export const SOCIAL = [
  {
    platform: "Facebook",
    label: "Follow on Facebook",
    href: "https://www.facebook.com/Trinisystem/",
    icon: "facebook",
    followers: "1.2K",
  },
  {
    platform: "YouTube",
    label: "Watch on YouTube",
    href: "https://www.youtube.com/@trinisystemllc",
    icon: "youtube",
    followers: "800+",
  },
  {
    platform: "TikTok",
    label: "Follow on TikTok",
    href: "https://www.tiktok.com/@trinisystemllc",
    icon: "tiktok",
    followers: "500+",
  },
  {
    platform: "Google",
    label: "Leave a Google Review",
    href: "https://share.google/1mtrJVk8Ya0PkjG76",
    icon: "google",
    followers: "47 reviews",
  },
  {
    platform: "Yelp",
    label: "Find us on Yelp",
    href: "https://www.yelp.com/biz/trini-system-new-york",
    icon: "yelp",
    followers: "4.9 ★",
  },
];
