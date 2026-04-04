import { MetadataRoute } from "next";

const BASE_URL = "https://trinisystem.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL,                              lastModified: "2025-06-01", changeFrequency: "weekly",  priority: 1.0  },
    { url: `${BASE_URL}/services`,                lastModified: "2025-06-01", changeFrequency: "weekly",  priority: 0.9  },
    { url: `${BASE_URL}/hp-printer-repair`,       lastModified: "2025-06-01", changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE_URL}/canon-printer-repair`,    lastModified: "2025-06-01", changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE_URL}/epson-printer-repair`,    lastModified: "2025-06-01", changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE_URL}/fix`,                     lastModified: "2025-06-01", changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE_URL}/reparacion-impresoras`,   lastModified: "2025-06-01", changeFrequency: "weekly",  priority: 0.9  },
    { url: `${BASE_URL}/virus-removal`,           lastModified: "2025-06-01", changeFrequency: "weekly",  priority: 0.9  },
    { url: `${BASE_URL}/comparison`,              lastModified: "2025-06-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/about`,                   lastModified: "2025-06-01", changeFrequency: "monthly", priority: 0.8  },
    { url: `${BASE_URL}/products`,                lastModified: "2025-05-01", changeFrequency: "weekly",  priority: 0.9  },
    { url: `${BASE_URL}/tools`,                   lastModified: "2025-05-01", changeFrequency: "weekly",  priority: 0.8  },
    { url: `${BASE_URL}/guides`,                  lastModified: "2025-05-01", changeFrequency: "weekly",  priority: 0.8  },
    { url: `${BASE_URL}/downloads`,               lastModified: "2025-04-01", changeFrequency: "monthly", priority: 0.7  },
    { url: `${BASE_URL}/contact`,                 lastModified: "2025-04-01", changeFrequency: "monthly", priority: 0.7  },
  ];
}
