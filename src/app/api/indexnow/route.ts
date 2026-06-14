import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "5ff4f4a8614348b4a05732551b6b38fe";
const BASE_URL = "https://trinisystem.vercel.app";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// ── All site URLs (mirrors sitemap.ts) ──────────────────────────────────────
const ALL_URLS: string[] = [
  // Static pages
  `${BASE_URL}/`,
  `${BASE_URL}/printer-support`,
  `${BASE_URL}/gps-help`,
  `${BASE_URL}/computer-help`,
  `${BASE_URL}/virus-removal`,
  `${BASE_URL}/hp-printer-repair`,
  `${BASE_URL}/epson-printer-repair`,
  `${BASE_URL}/canon-printer-repair`,
  `${BASE_URL}/brother-printer-repair`,
  `${BASE_URL}/hp-printer-offline`,
  `${BASE_URL}/printer-wont-print`,
  `${BASE_URL}/windows-11-slow-fix`,
  `${BASE_URL}/printer-repair-near-me`,
  `${BASE_URL}/reparacion-impresoras`,
  `${BASE_URL}/how-to`,
  `${BASE_URL}/services`,
  `${BASE_URL}/products`,
  `${BASE_URL}/tools`,
  `${BASE_URL}/guides`,
  `${BASE_URL}/comparison`,
  `${BASE_URL}/downloads`,
  `${BASE_URL}/about`,
  `${BASE_URL}/contact`,
  `${BASE_URL}/epson-service-nyc`,
  `${BASE_URL}/epson-plotters`,
  `${BASE_URL}/hp-printer-service`,
  `${BASE_URL}/garmin-gps-help`,
];

// ── POST: Submit specific URLs (called from build hooks or admin actions) ────
export async function POST(req: NextRequest) {
  try {
    // Optional: protect with a secret header in production
    const authHeader = req.headers.get("x-indexnow-secret");
    const expectedSecret = process.env.INDEXNOW_SUBMIT_SECRET;
    if (expectedSecret && authHeader !== expectedSecret) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    // Accept a custom list of URLs, or fall back to the full site list
    const urlList: string[] = Array.isArray(body.urls) && body.urls.length > 0
      ? body.urls
      : ALL_URLS;

    const result = await submitToIndexNow(urlList);
    return NextResponse.json(result, { status: result.ok ? 200 : 500 });
  } catch (err) {
    console.error("IndexNow POST error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

// ── GET: Submit all URLs (useful for Vercel deploy hook or manual trigger) ───
export async function GET(req: NextRequest) {
  // Optional secret param: /api/indexnow?secret=xxx
  const secret = req.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.INDEXNOW_SUBMIT_SECRET;
  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const result = await submitToIndexNow(ALL_URLS);
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}

// ── Core submission logic ────────────────────────────────────────────────────
async function submitToIndexNow(urls: string[]) {
  // IndexNow batch limit is 10,000 URLs per request
  const batch = urls.slice(0, 10000);

  const payload = {
    host: new URL(BASE_URL).hostname,       // "trinisystem.vercel.app"
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: batch,
  };

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  // IndexNow returns 200 (OK) or 202 (Accepted) on success
  const ok = res.status === 200 || res.status === 202;
  const responseText = await res.text().catch(() => "");

  if (!ok) {
    console.error(`IndexNow error ${res.status}:`, responseText);
  }

  return {
    ok,
    status: res.status,
    submittedCount: batch.length,
    urls: batch,
    indexnowResponse: responseText || null,
    submittedAt: new Date().toISOString(),
  };
}
