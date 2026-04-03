import { MetadataRoute } from "next";

const BASE_URL = "https://trinisystem.vercel.app";

// Use explicit dates — avoids Bing/Google treating every crawl as "updated today"
// Update these dates when you publish real content changes
const DATES = {
  home:      "2025-06-01",
  services:  "2025-06-01",
  hp:        "2025-06-01",
  canon:     "2025-06-01",
  epson:     "2025-06-01",
  fix:       "2025-06-01",
  spanish:   "2025-06-01",
  products:  "2025-05-01",
  tools:     "2025-05-01",
  guides:    "2025-05-01",
  downloads: "2025-04-01",
  contact:   "2025-04-01",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL,                              lastModified: DATES.home,      changeFrequency: "weekly",  priority: 1.0  },
    { url: `${BASE_URL}/services`,                lastModified: DATES.services,  changeFrequency: "weekly",  priority: 0.9  },
    { url: `${BASE_URL}/hp-printer-repair`,       lastModified: DATES.hp,        changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE_URL}/epson-printer-repair`,    lastModified: DATES.epson,     changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE_URL}/canon-printer-repair`,    lastModified: DATES.canon,     changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE_URL}/fix`,                     lastModified: DATES.fix,       changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE_URL}/reparacion-impresoras`,   lastModified: DATES.spanish,   changeFrequency: "weekly",  priority: 0.9  },
    { url: `${BASE_URL}/products`,                lastModified: DATES.products,  changeFrequency: "weekly",  priority: 0.9  },
    { url: `${BASE_URL}/tools`,                   lastModified: DATES.tools,     changeFrequency: "weekly",  priority: 0.8  },
    { url: `${BASE_URL}/guides`,                  lastModified: DATES.guides,    changeFrequency: "weekly",  priority: 0.8  },
    { url: `${BASE_URL}/downloads`,               lastModified: DATES.downloads, changeFrequency: "monthly", priority: 0.7  },
    { url: `${BASE_URL}/contact`,                 lastModified: DATES.contact,   changeFrequency: "monthly", priority: 0.7  },
  ];
}
