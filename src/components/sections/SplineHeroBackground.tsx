"use client";

/* ════════════════════════════════════════════════════════════════
   SPLINE HERO BACKGROUND
   Renders an interactive 3D scene (via @splinetool/react-spline)
   behind the hero content, without hurting LCP.

   Strategy:
   - The <Spline> component + its runtime (~600KB-1.5MB gzipped,
     depends on scene complexity) is dynamically imported with
     ssr:false, so it never ships in the initial server HTML.
   - We don't even start loading it until the browser is idle AND
     the hero has scrolled into view — the H1 / search bar / CTAs
     paint first, exactly like before.
   - prefers-reduced-motion and small/low-end viewports fall back
     to the existing CSS aurora + orbs (no 3D at all).
   - If the scene fails to load (network, ad-blocker, etc.) the
     CSS fallback stays visible — the hero never breaks.

   TO USE YOUR OWN SCENE:
   1. Design it at https://spline.design (free). Suggested brief:
      dark navy background, a loose network of glowing orange/amber
      nodes connected by thin lines (mirrors the brand's circuit
      motif), slow ambient rotation, subtle mouse-parallax on the
      camera. Keep polycount and texture size low — export settings
      let you check an estimated file size before publishing.
   2. Export → "Public URL" → copy the *.splinecode URL.
   3. Paste it into SPLINE_SCENE_URL below.

   Until you do that, this ships with one of Spline's own public
   demo scenes as a stand-in so you can see real 3D in place —
   swap it before launch.
═══════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const SPLINE_SCENE_URL =
  "https://prod.spline.design/fJ2ptJKzT-sDkpfO/scene.splinecode"; // TODO: replace with your branded scene

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

export function SplineHeroBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Respect reduced-motion and skip 3D entirely — CSS fallback stays.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Skip on narrow/low-memory devices — protects mobile PageSpeed score.
    const lowPower =
      window.innerWidth < 480 ||
      (navigator as any).deviceMemory !== undefined && (navigator as any).deviceMemory <= 4;
    if (lowPower) return;

    const node = wrapperRef.current;
    if (!node) return;

    // Only start the 3D chunk once the hero is actually visible,
    // and only after the browser is idle (main thread free).
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          const idle = (window as any).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 300));
          idle(() => setShouldLoad(true));
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {shouldLoad && (
        <div
          className="absolute inset-0 transition-opacity duration-[1200ms]"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <Spline scene={SPLINE_SCENE_URL} onLoad={() => setReady(true)} />
        </div>
      )}
      {/* Dark veil so foreground text stays readable over the 3D scene */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(10,5,0,0.25) 0%, rgba(10,5,0,0.82) 78%)",
        }}
      />
    </div>
  );
}
