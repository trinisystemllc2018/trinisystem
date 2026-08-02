"use client";

/* ════════════════════════════════════════════════════════════════
   ANIMATED HERO BACKGROUND

   HISTORY / WHY THIS CHANGED:
   An earlier version of this file embedded a public Spline demo
   scene via @splinetool/react-spline. Two different public scenes
   both turned out to be authored with global mouse-tracking
   ("Events Target: Window" in Spline's export settings) — a
   property baked into the scene file itself, invisible until you
   test it. That setting makes the runtime render outside the
   container we put it in, which is why a stray reticle/"OPEN"
   hotspot was showing up on every page as you scrolled, not just
   the hero. That's not fixable from this wrapper — it's a property
   of the third-party scene file.

   Rather than keep gambling on unverified public scenes, this now
   defaults to a canvas particle-network that is fully contained,
   cheap, and theme-aware. Real Spline is still wired up below
   (ENABLE_SPLINE) for whenever you design your own scene at
   spline.design — just make sure "Events Target" is left as
   "Element" (not "Window") when you export it, or it will repeat
   the same bug.
═══════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Flip to true once you have your OWN Spline scene (see note above).
const ENABLE_SPLINE = false;
const SPLINE_SCENE_URL = ""; // paste your exported *.splinecode public URL here

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

type Theme = "light" | "dark";

function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const read = () =>
      setTheme((document.documentElement.getAttribute("data-theme") as Theme) || "dark");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  return theme;
}

function ParticleNetwork({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, raf = 0;
    const NODE_COUNT = window.innerWidth < 768 ? 32 : 60;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: 0, y: 0,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 1,
    }));

    function resize() {
      const parent = canvas!.parentElement;
      W = canvas!.width = parent ? parent.clientWidth : window.innerWidth;
      H = canvas!.height = parent ? parent.clientHeight : window.innerHeight;
      nodes.forEach(n => { n.x = Math.random() * W; n.y = Math.random() * H; });
    }
    resize();
    window.addEventListener("resize", resize);

    const lineColor = theme === "light" ? "255,110,50" : "255,140,80";
    const dotColor = theme === "light" ? "220,90,40" : "255,180,130";
    const lineAlphaMax = theme === "light" ? 0.18 : 0.35;
    const dotAlpha = theme === "light" ? 0.55 : 0.85;

    function tick() {
      ctx!.clearRect(0, 0, W, H);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 150) {
            ctx!.strokeStyle = `rgba(${lineColor},${(1 - d / 150) * lineAlphaMax})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${dotColor},${dotAlpha})`;
        ctx!.fill();
      }
      if (!reduced) raf = requestAnimationFrame(tick);
    }
    tick();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [theme]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export function SplineHeroBackground() {
  const theme = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [splineShouldLoad, setSplineShouldLoad] = useState(false);
  const [splineReady, setSplineReady] = useState(false);

  useEffect(() => {
    if (!ENABLE_SPLINE || !SPLINE_SCENE_URL) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || window.innerWidth < 480) return;

    const node = wrapperRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          const idle = (window as any).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 300));
          idle(() => setSplineShouldLoad(true));
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
      {/* Always-on, contained, theme-aware fallback */}
      <ParticleNetwork theme={theme} />

      {/* Optional real Spline layer — off until ENABLE_SPLINE is true and a verified scene URL is set */}
      {ENABLE_SPLINE && SPLINE_SCENE_URL && splineShouldLoad && (
        <div className="absolute inset-0 transition-opacity duration-[1200ms]" style={{ opacity: splineReady ? 1 : 0 }}>
          <Spline scene={SPLINE_SCENE_URL} onLoad={() => setSplineReady(true)} style={{ width: "100%", height: "100%" }} />
        </div>
      )}

      {/* Theme-aware veil so foreground text stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            theme === "light"
              ? "radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.35) 78%)"
              : "radial-gradient(ellipse at 50% 35%, rgba(10,5,0,0.15) 0%, rgba(10,5,0,0.55) 78%)",
        }}
      />
    </div>
  );
}
