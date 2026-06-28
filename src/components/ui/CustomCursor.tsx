"use client";

import { useEffect, useRef } from "react";

/**
 * CustomCursor — a high-visibility "precision reticle" cursor.
 *
 * Why this design (audit fix #5 — make it MORE visible & innovative):
 *  - A ring with four reticle ticks reads instantly as a real pointer.
 *  - mix-blend-mode:difference makes it pop on ANY background, light or dark.
 *  - A short comet trail of fading dots makes movement easy to track.
 *  - On interactive elements the ring blooms and shows a contextual label
 *    ("OPEN", "CALL", "TYPE"…) so the action is obvious before you click.
 *  - Native I-beam is preserved over text fields (handled in CSS), so people
 *    can always see where they're typing.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;

    const ring = ringRef.current;
    const core = coreRef.current;
    const label = labelRef.current;
    const trails = trailRefs.current;
    if (!ring || !core || !label) return;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    const tx: number[] = trails.map(() => -200);
    const ty: number[] = trails.map(() => -200);
    let last: Element | null = null;
    let raf = 0;
    let shown = false;

    const labelFor = (el: Element): string => {
      const tag = el.tagName.toLowerCase();
      const href = (el.getAttribute("href") || "").toLowerCase();
      if (href.startsWith("tel:")) return "Call";
      if (tag === "input" || tag === "textarea") return "Type";
      if (tag === "select") return "Pick";
      if (el.getAttribute("role") === "switch") return "Toggle";
      if (tag === "button" || el.closest("button")) return "Tap";
      if (tag === "a" || el.closest("a")) return "Open";
      return "";
    };

    const show = () => {
      if (shown) return;
      shown = true;
      [ring, core, ...trails].forEach((n) => n && (n.style.opacity = ""));
    };
    const hide = () => {
      shown = false;
      [ring, core, ...trails].forEach((n) => n && (n.style.opacity = "0"));
    };

    const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; show(); };
    const onLeave = (e: PointerEvent) => { if (!e.relatedTarget) hide(); };

    const tick = () => {
      core.style.transform = `translate(${mx}px, ${my}px)`;
      rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;

      // comet trail — each dot chases the one before it
      let px = mx, py = my;
      for (let i = 0; i < trails.length; i++) {
        tx[i] += (px - tx[i]) * 0.35;
        ty[i] += (py - ty[i]) * 0.35;
        const t = trails[i];
        if (t) {
          t.style.transform = `translate(${tx[i]}px, ${ty[i]}px)`;
          t.style.opacity = String(0.4 - i * 0.1);
        }
        px = tx[i]; py = ty[i];
      }

      const el = document.elementFromPoint(mx, my);
      const hit = el?.closest('a, button, [role="button"], [role="switch"], input, textarea, select, summary, [data-cursor-hover]') ?? null;
      if (hit !== last) {
        const active = !!hit;
        ring.classList.toggle("is-hover", active);
        core.classList.toggle("is-hover", active);
        label.textContent = hit ? labelFor(hit) : "";
        last = hit;
      }
      raf = requestAnimationFrame(tick);
    };

    tick();
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", show);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", show);
    };
  }, []);

  return (
    <>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(n) => { if (n) trailRefs.current[i] = n; }}
          className="tx-cursor-trail"
          aria-hidden="true"
          style={{ opacity: 0 }}
        />
      ))}
      <div ref={coreRef} className="tx-cursor-core" aria-hidden="true" style={{ opacity: 0 }} />
      <div ref={ringRef} className="tx-cursor-ring" aria-hidden="true" style={{ opacity: 0 }}>
        <span ref={labelRef} className="tx-cursor-label" />
      </div>
    </>
  );
}
