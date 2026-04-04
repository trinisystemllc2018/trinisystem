import { MetadataRoute } from "next";
import { PRINTER_BRANDS, PRINTER_PROBLEMS, GARMIN_MODELS } from "@/lib/seo-data";

const BASE = "https://trinisystem.vercel.app";
const NOW  = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const static_pages: MetadataRoute.Sitemap = [
    { url: BASE,                              lastModified: NOW, changeFrequency: "weekly",  priority: 1.0  },
    { url: `${BASE}/fix`,                     lastModified: NOW, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE}/hp-printer-repair`,       lastModified: NOW, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE}/canon-printer-repair`,    lastModified: NOW, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE}/epson-printer-repair`,    lastModified: NOW, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE}/reparacion-impresoras`,   lastModified: NOW, changeFrequency: "weekly",  priority: 0.90 },
    { url: `${BASE}/virus-removal`,           lastModified: NOW, changeFrequency: "weekly",  priority: 0.90 },
    { url: `${BASE}/services`,                lastModified: NOW, changeFrequency: "weekly",  priority: 0.90 },
    { url: `${BASE}/products`,                lastModified: NOW, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE}/tools`,                   lastModified: NOW, changeFrequency: "weekly",  priority: 0.80 },
    { url: `${BASE}/guides`,                  lastModified: NOW, changeFrequency: "weekly",  priority: 0.80 },
    { url: `${BASE}/comparison`,              lastModified: NOW, changeFrequency: "monthly", priority: 0.80 },
    { url: `${BASE}/about`,                   lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/contact`,                 lastModified: NOW, changeFrequency: "monthly", priority: 0.70 },
    { url: `${BASE}/downloads`,               lastModified: NOW, changeFrequency: "monthly", priority: 0.65 },
  ];

  // Programmatic: /fix-printer/[brand]/[problem]
  const printer_pages: MetadataRoute.Sitemap = [];
  for (const brand of Object.keys(PRINTER_BRANDS)) {
    for (const problem of Object.keys(PRINTER_PROBLEMS)) {
      printer_pages.push({
        url: `${BASE}/fix-printer/${brand}/${problem}`,
        lastModified: NOW,
        changeFrequency: "weekly",
        priority: 0.88,
      });
    }
  }

  // Programmatic: /garmin-update/[model]
  const garmin_pages: MetadataRoute.Sitemap = Object.keys(GARMIN_MODELS).map(model => ({
    url: `${BASE}/garmin-update/${model}`,
    lastModified: NOW,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...static_pages, ...printer_pages, ...garmin_pages];
}
