"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/* ════════════════════════════════════════════════════════════════
   DEFERRED FLOATING UI
   Loads FloatingSupport + ExitIntentPopup ONLY after the page is
   interactive (or 1.5s after mount, whichever comes first).
   This keeps them out of the initial JS bundle and out of the
   critical path — huge LCP/TBT win.
═══════════════════════════════════════════════════════════════════ */

const FloatingSupport = dynamic(
  () => import("@/components/ui/FloatingSupport").then(m => m.FloatingSupport),
  { ssr: false, loading: () => null }
);
const ExitIntentPopup = dynamic(
  () => import("@/components/ui/ExitIntentPopup").then(m => m.ExitIntentPopup),
  { ssr: false, loading: () => null }
);

export function DeferredFloating() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait for the browser to be idle before pulling in these components.
    // Falls back to a 1.5s timeout if requestIdleCallback isn't available.
    let cancelled = false;

    const start = () => {
      if (!cancelled) setReady(true);
    };

    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(start, { timeout: 2000 });
      return () => {
        cancelled = true;
        (window as any).cancelIdleCallback?.(id);
      };
    }

    const id = setTimeout(start, 1500);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <FloatingSupport />
      <ExitIntentPopup />
    </>
  );
}
