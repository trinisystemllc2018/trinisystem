/**
 * indexnow.ts — Trini System LLC
 *
 * Server-side utility to notify Bing (and other IndexNow-enabled engines)
 * about new or updated URLs. Import and call from Server Actions, API routes,
 * or any server-side code whenever a page is created or updated.
 *
 * Usage:
 *   import { notifyIndexNow } from "@/lib/indexnow";
 *   await notifyIndexNow(["/new-page", "/updated-page"]);
 */

const INDEXNOW_KEY = "5ff4f4a8614348b4a05732551b6b38fe";
const BASE_URL = "https://trinisystem.vercel.app";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/**
 * Notify IndexNow-enabled search engines (Bing, Yandex, etc.) about URLs.
 *
 * @param paths  Array of absolute URLs OR relative paths (e.g. "/about" or
 *               "https://trinisystem.vercel.app/about"). Mixed is fine.
 * @returns      Object with { ok, status, submittedCount }
 */
export async function notifyIndexNow(paths: string[]) {
  const urls = paths.map((p) =>
    p.startsWith("http") ? p : `${BASE_URL}${p.startsWith("/") ? p : `/${p}`}`
  );

  const payload = {
    host: new URL(BASE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls.slice(0, 10000),
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
      // Don't block the request; fire and don't wait in non-critical paths
      // Remove `cache` if you need a guaranteed result
      cache: "no-store",
    });

    const ok = res.status === 200 || res.status === 202;
    if (!ok) {
      console.warn(`[IndexNow] Submission issue — HTTP ${res.status}`);
    }
    return { ok, status: res.status, submittedCount: urls.length };
  } catch (err) {
    console.error("[IndexNow] Network error:", err);
    return { ok: false, status: 0, submittedCount: 0 };
  }
}

/**
 * Notify IndexNow for a single URL update (convenience wrapper).
 */
export async function notifyIndexNowSingle(path: string) {
  return notifyIndexNow([path]);
}
