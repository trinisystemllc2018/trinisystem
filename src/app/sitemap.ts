import { MetadataRoute } from "next";
import { PRINTER_BRANDS, PRINTER_PROBLEMS, GARMIN_MODELS } from "@/lib/seo-data";
import { ALL_GARMIN_SLUGS } from "@/lib/garmin-data";
import { ALL_GMAIL_SLUGS } from "@/lib/gmail-data";

const BASE = "https://trinisystem.vercel.app";
const NOW = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const static_pages: MetadataRoute.Sitemap = [
    // Core pages — highest priority
    { url: BASE, lastModified: NOW, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/printer-support`, lastModified: NOW, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/gps-help`, lastModified: NOW, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/computer-help`, lastModified: NOW, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/virus-removal`, lastModified: NOW, changeFrequency: "weekly", priority: 0.95 },

    // Brand-specific service pages — high commercial intent
    { url: `${BASE}/hp-printer-repair`, lastModified: NOW, changeFrequency: "weekly", priority: 0.98 },
    { url: `${BASE}/epson-printer-repair`, lastModified: NOW, changeFrequency: "weekly", priority: 0.98 },
    { url: `${BASE}/canon-printer-repair`, lastModified: NOW, changeFrequency: "weekly", priority: 0.92 },

    // Spanish page
    { url: `${BASE}/reparacion-impresoras`, lastModified: NOW, changeFrequency: "weekly", priority: 0.88 },

    // Senior help hub — NEW
    { url: `${BASE}/how-to`, lastModified: NOW, changeFrequency: "weekly", priority: 0.92 },

    // Supporting pages
    { url: `${BASE}/services`, lastModified: NOW, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/products`, lastModified: NOW, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/tools`, lastModified: NOW, changeFrequency: "weekly", priority: 0.80 },
    { url: `${BASE}/guides`, lastModified: NOW, changeFrequency: "weekly", priority: 0.80 },
    { url: `${BASE}/comparison`, lastModified: NOW, changeFrequency: "monthly", priority: 0.78 },
    { url: `${BASE}/downloads`, lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/fix`, lastModified: NOW, changeFrequency: "weekly", priority: 0.82 },

    // Info pages
    { url: `${BASE}/about`, lastModified: NOW, changeFrequency: "monthly", priority: 0.70 },
    { url: `${BASE}/contact`, lastModified: NOW, changeFrequency: "monthly", priority: 0.70 },
  ];

  // Programmatic: /fix-printer/[brand]/[problem]
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

  // Programmatic: /garmin-update/[model]
  const garmin_pages: MetadataRoute.Sitemap = Object.keys(GARMIN_MODELS).map((model) => ({
    url: `${BASE}/garmin-update/${model}`,
    lastModified: NOW,
    changeFrequency: "monthly",
    priority: 0.82,
  }));

  // Garmin SEO pages
  const garmin_seo_pages: MetadataRoute.Sitemap = [
    { url: `${BASE}/garmin-gps-help`, lastModified: NOW, changeFrequency: "weekly", priority: 0.92 },
    ...ALL_GARMIN_SLUGS.map((slug) => ({
      url: `${BASE}/garmin/${slug}`,
      lastModified: NOW,
      changeFrequency: "weekly" as const,
      priority: 0.88,
    })),
  ];

  // NEW — Senior help cluster: /how-to/[slug]
  // Hub page (gmail-help) gets max priority; long-tail pages get high priority
  const senior_help_pages: MetadataRoute.Sitemap = ALL_GMAIL_SLUGS.map((slug) => ({
    url: `${BASE}/how-to/${slug}`,
    lastModified: NOW,
    changeFrequency: "weekly" as const,
    priority: slug === "gmail-help" ? 0.95 : 0.88,
  }));

  return [
    ...static_pages,
    ...printer_pages,
    ...garmin_pages,
    ...garmin_seo_pages,
    ...senior_help_pages,
  ];
}
