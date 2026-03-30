import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PHONE = "347-953-1531";
export const PHONE_HREF = "tel:+13479531531";
export const DOWNLOAD_URL =
  "https://github.com/trinisystemllc2018/trini-system-app/releases/download/v1.0.0/TriniCleaner_Setup.exe";
export const SUPPORT_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSdhnfaKTFVw0E2fdA7wgtGFgmJp54q_xpfyF1wENld0anRohA/viewform?usp=header";
export const MAPS_URL =
  "https://www.google.com/maps/d/edit?mid=1SayLATqOp73r1ccSEmewrShz2WM7dlQ&usp=sharing";
export const OFFICIAL_SITE =
  "https://sites.google.com/view/trinisystemllc/Technical-Support-USA";

// Social Media — used for SEO schema sameAs and footer links
export const SOCIAL = {
  facebook:  "https://www.facebook.com/Trinisystem/",
  youtube:   "https://www.youtube.com/@trinisystemllc",   // update if different handle
  tiktok:    "https://www.tiktok.com/@trinisystemllc",     // update if different handle
  google:    "https://share.google/1mtrJVk8Ya0PkjG76",
  yelp:      "https://www.yelp.com/biz/trini-system-new-york",
};

export const GOOGLE_LISTING = "https://share.google/1mtrJVk8Ya0PkjG76";

export const BRANDS = [
  {
    name: "HP",
    color: "#0096D6",
    bgColor: "#e8f4fd",
    models: ["DeskJet 4155e", "DeskJet 2755e", "OfficeJet Pro 9015e", "LaserJet M404n", "ENVY 6055e"],
    issues: ["Printer offline", "WiFi not connecting", "Error codes 49/79", "Paper jam", "OXc19a0035"],
    slug: "hp",
  },
  {
    name: "Canon",
    color: "#CC0000",
    bgColor: "#fde8e8",
    models: ["PIXMA MX922", "PIXMA TR4520", "PIXMA MG3620", "imageCLASS MF644Cdw", "MAXIFY MB5420"],
    issues: ["Error B200", "Error E03/E04", "Not printing", "Wireless setup", "Driver install"],
    slug: "canon",
  },
  {
    name: "Epson",
    color: "#007AB8",
    bgColor: "#e8f4fb",
    models: ["EcoTank ET-2720", "EcoTank ET-4760", "WorkForce WF-7720", "Expression XP-7100"],
    issues: ["Ink system error", "Nozzle clog", "WiFi setup", "Ink reset", "Print head clean"],
    slug: "epson",
  },
  {
    name: "Brother",
    color: "#004B9C",
    bgColor: "#e8eef8",
    models: ["MFC-L2710DW", "MFC-J995DW", "HL-L2350DW", "HL-L3270CDW", "DCP-L2550DW"],
    issues: ["Driver unavailable", "AirPrint not working", "Toner error", "Windows 11 fix", "Mopria setup"],
    slug: "brother",
  },
];

export const REVIEWS = [
  {
    name: "Corey Hawkins",
    location: "New York, NY",
    stars: 5,
    text: "James was incredibly patient and made everything easy. My HP DeskJet was offline for weeks and they fixed it in 20 minutes. Absolutely the best tech support experience I've ever had.",
    device: "HP DeskJet 4155e",
  },
  {
    name: "Leslie Park",
    location: "Dallas, TX",
    stars: 5,
    text: "Very helpful in finding and resolving my Canon PIXMA B200 error. Quick, simple, and effective. I was ready to buy a new printer — they saved me $200!",
    device: "Canon PIXMA MX922",
  },
  {
    name: "Mary Steil",
    location: "Chicago, IL",
    stars: 5,
    text: "Things got complicated with my Epson EcoTank but James was outstanding throughout. Fixed the ink error and even helped me reconnect it to my new router. Truly above and beyond!",
    device: "Epson EcoTank ET-2720",
  },
  {
    name: "Mark Starrett",
    location: "Phoenix, AZ",
    stars: 5,
    text: "They went above and beyond to get my Garmin GPS updated correctly. Professional, reliable, and MUCH cheaper than Best Buy. Will use them every time.",
    device: "Garmin DriveSmart 65",
  },
  {
    name: "Patricia Walsh",
    location: "Miami, FL",
    stars: 5,
    text: "TriniCleaner made my old laptop run like new again. I was about to buy a new computer but it's completely fast now. So grateful for this free tool!",
    device: "Windows 11 Laptop",
  },
  {
    name: "Robert Chen",
    location: "Seattle, WA",
    stars: 5,
    text: "Brother printer stopped printing after Windows 11 update. Trini System fixed the driver issue in under 30 minutes while I watched. Amazing remote support!",
    device: "Brother MFC-L2710DW",
  },
];

export const STATS = [
  { value: 5000, suffix: "+", label: "Devices Fixed" },
  { value: 24,   suffix: "/7", label: "Support Available" },
  { value: 50,   suffix: " States", label: "Nationwide Coverage" },
  { value: 4.9,  suffix: "★", label: "Average Rating", isDecimal: true },
];

export const SERVICES = [
  {
    icon: "🖨️",
    title: "Printer Repair & Setup",
    description: "HP, Canon, Epson, Brother — offline errors, WiFi setup, driver install, error codes. Fixed remotely.",
    href: "/services",
    color: "blue",
    popular: true,
  },
  {
    icon: "⚡",
    title: "TriniCleaner — Free Download",
    description: "Free Windows optimizer. Removes junk files, fixes registry errors, speeds up boot time. 100% free.",
    href: "/products",
    color: "green",
    popular: false,
  },
  {
    icon: "💻",
    title: "PC & Windows Support",
    description: "Windows 10/11 repair, slow computer, virus removal, driver updates, system restore.",
    href: "/services",
    color: "purple",
    popular: false,
  },
  {
    icon: "🗺️",
    title: "Garmin GPS Updates",
    description: "Map & firmware updates for all Garmin models — nuvi, DriveSmart, RV series. Fast remote update.",
    href: "/services",
    color: "orange",
    popular: false,
  },
  {
    icon: "🛡️",
    title: "Antivirus Setup & Removal",
    description: "Norton, McAfee, Malwarebytes install. Full system scan, malware removal, browser cleanup.",
    href: "/services",
    color: "red",
    popular: false,
  },
  {
    icon: "🏠",
    title: "Home Office Setup",
    description: "Router config, printer network, monitor, webcam for video calls. Classroom & home office ready.",
    href: "/services",
    color: "teal",
    popular: false,
  },
];
