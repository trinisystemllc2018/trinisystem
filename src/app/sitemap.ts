import { MetadataRoute } from "next";
import { PRINTER_BRANDS, PRINTER_PROBLEMS, GARMIN_MODELS } from "@/lib/seo-data";
import { ALL_GARMIN_SLUGS } from "@/lib/garmin-data";
import { ALL_GMAIL_SLUGS } from "@/lib/gmail-data";
import { ALL_FACEBOOK_SLUGS } from "@/lib/facebook-data";
import { ALL_GARMIN_APPS_SLUGS } from "@/lib/garmin-apps-data";
import { ALL_VACATION_GPS_SLUGS } from "@/lib/vacation-gps-data";

const BASE = "https://trinisystem.vercel.app";
const NOW = new Date();

// Known error codes per brand for programmatic error-code pages
const ERROR_CODES: Record<string, string[]> = {
  hp: ["OXc19a0035", "49", "79", "offline"],
  epson: ["0x97", "ink-system-error"],
  canon: ["b200", "e03"],
  brother: ["driver-unavailable"],
};

// Brand comparison pairs
const COMPARE_PAIRS = [
  "hp-vs-canon","hp-vs-epson","hp-vs-brother",
  "canon-vs-epson","canon-vs-brother","epson-vs-brother",
];

export default function sitemap(): MetadataRoute.Sitemap {
  /* ── Static pages ── */
  const static_pages: MetadataRoute.Sitemap = [
    { url: BASE,                                   lastModified: NOW, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/printer-support`,              lastModified: NOW, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE}/gps-help`,                     lastModified: NOW, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE}/computer-help`,                lastModified: NOW, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE}/virus-removal`,                lastModified: NOW, changeFrequency: "weekly",  priority: 0.92 },
    { url: `${BASE}/hp-printer-repair`,            lastModified: NOW, changeFrequency: "weekly",  priority: 0.98 },
    { url: `${BASE}/epson-printer-repair`,         lastModified: NOW, changeFrequency: "weekly",  priority: 0.98 },
    { url: `${BASE}/canon-printer-repair`,         lastModified: NOW, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE}/brother-printer-repair`,       lastModified: NOW, changeFrequency: "weekly",  priority: 0.95 }, // NEW
    { url: `${BASE}/hp-printer-offline`,           lastModified: NOW, changeFrequency: "weekly",  priority: 0.96 }, // NEW
    { url: `${BASE}/printer-wont-print`,           lastModified: NOW, changeFrequency: "weekly",  priority: 0.96 }, // NEW
    { url: `${BASE}/windows-11-slow-fix`,          lastModified: NOW, changeFrequency: "weekly",  priority: 0.92 }, // NEW
    { url: `${BASE}/printer-repair-near-me`,       lastModified: NOW, changeFrequency: "weekly",  priority: 0.98 },
    { url: `${BASE}/reparacion-impresoras`,        lastModified: NOW, changeFrequency: "weekly",  priority: 0.88 },
    { url: `${BASE}/how-to`,                       lastModified: NOW, changeFrequency: "weekly",  priority: 0.92 },
    { url: `${BASE}/services`,                     lastModified: NOW, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE}/products`,                     lastModified: NOW, changeFrequency: "weekly",  priority: 0.88 },
    { url: `${BASE}/tools`,                        lastModified: NOW, changeFrequency: "weekly",  priority: 0.82 },
    { url: `${BASE}/guides`,                       lastModified: NOW, changeFrequency: "weekly",  priority: 0.80 },
    { url: `${BASE}/comparison`,                   lastModified: NOW, changeFrequency: "monthly", priority: 0.80 },
    { url: `${BASE}/downloads`,                    lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/about`,                        lastModified: NOW, changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/contact`,                      lastModified: NOW, changeFrequency: "monthly", priority: 0.70 },
    { url: `${BASE}/epson-service-nyc`,            lastModified: NOW, changeFrequency: "weekly",  priority: 0.88 },
    { url: `${BASE}/epson-plotters`,               lastModified: NOW, changeFrequency: "monthly", priority: 0.80 },
    { url: `${BASE}/hp-printer-service`,           lastModified: NOW, changeFrequency: "weekly",  priority: 0.88 },
  ];

  /* ── /fix-printer/[brand]/[problem] ── */
  const printer_pages: MetadataRoute.Sitemap = [];
  for (const brand of Object.keys(PRINTER_BRANDS)) {
    for (const problem of Object.keys(PRINTER_PROBLEMS)) {
      printer_pages.push({
        url: `${BASE}/fix-printer/${brand}/${problem}`,
        lastModified: NOW,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }
  }

  /* ── /garmin-update/[model] ── */
  const garmin_pages: MetadataRoute.Sitemap = Object.keys(GARMIN_MODELS).map((model) => ({
    url: `${BASE}/garmin-update/${model}`,
    lastModified: NOW,
    changeFrequency: "monthly",
    priority: 0.82,
  }));

  /* ── /garmin/[slug] ── */
  const garmin_seo_pages: MetadataRoute.Sitemap = [
    { url: `${BASE}/garmin-gps-help`, lastModified: NOW, changeFrequency: "weekly",  priority: 0.92 },
    ...ALL_GARMIN_SLUGS.map((slug) => ({
      url: `${BASE}/garmin/${slug}`,
      lastModified: NOW,
      changeFrequency: "weekly" as const,
      priority: 0.88,
    })),
  ];

  /* ── /how-to/[slug] — Gmail cluster ── */
  const gmail_pages: MetadataRoute.Sitemap = ALL_GMAIL_SLUGS.map((slug) => ({
    url: `${BASE}/how-to/${slug}`,
    lastModified: NOW,
    changeFrequency: "weekly" as const,
    priority: slug === "gmail-help" ? 0.95 : 0.88,
  }));

  /* ── /how-to/[slug] — Facebook cluster ── */
  const facebook_pages: MetadataRoute.Sitemap = ALL_FACEBOOK_SLUGS.map((slug) => ({
    url: `${BASE}/how-to/${slug}`,
    lastModified: NOW,
    changeFrequency: "weekly" as const,
    priority: slug === "facebook-help" ? 0.95 : 0.88,
  }));

  /* ── /how-to/[slug] — Garmin apps cluster ── */
  const garmin_apps_pages: MetadataRoute.Sitemap = ALL_GARMIN_APPS_SLUGS.map((slug) => ({
    url: `${BASE}/how-to/${slug}`,
    lastModified: NOW,
    changeFrequency: "weekly" as const,
    priority: slug === "garmin-express" ? 0.95 : 0.88,
  }));

  /* ── /error-code/[brand]/[code] — NEW ── */
  const error_code_pages: MetadataRoute.Sitemap = [];
  for (const [brand, codes] of Object.entries(ERROR_CODES)) {
    for (const code of codes) {
      error_code_pages.push({
        url: `${BASE}/error-code/${brand}/${code}`,
        lastModified: NOW,
        changeFrequency: "monthly" as const,
        priority: 0.88,
      });
    }
  }

  /* ── /compare/[slug] — NEW ── */
  const compare_pages: MetadataRoute.Sitemap = COMPARE_PAIRS.map((slug) => ({
    url: `${BASE}/compare/${slug}`,
    lastModified: NOW,
    changeFrequency: "monthly" as const,
    priority: 0.82,
  }));

  /* ── 2026 vacation / seasonal GPS update pages — NEW ── */
  const vacation_gps_pages: MetadataRoute.Sitemap = ALL_VACATION_GPS_SLUGS.map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: NOW,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    ...static_pages,
    ...printer_pages,
    ...garmin_pages,
    ...garmin_seo_pages,
    ...gmail_pages,
    ...facebook_pages,
    ...garmin_apps_pages,
    ...error_code_pages,
    ...compare_pages,
    ...vacation_gps_pages,
  ];
}
