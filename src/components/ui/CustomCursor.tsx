"use client";

import { useEffect, useRef } from "react";

/**
 * CustomCursor — orange dot + outline that follows the mouse.
 *
 * Key fixes:
 * 1. Refs are always attached (no conditional null return before ref attachment)
 * 2. will-change: transform re-added so GPU composites the layer for butter-smooth tracking
 * 3. Persists across Next.js page navigations (lives in layout, effect survives)
 * 4. Hidden via CSS opacity/visibility until first mouse move — no layout shift
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Don't run on touch devices or reduced motion
    if (isTouch || reduceMotion) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    // Promote to GPU layer immediately for smooth tracking
    dot.style.willChange = "transform";
    outline.style.willChange = "transform";

    let mouseX = -200, mouseY = -200;
    let outlineX = -200, outlineY = -200;
    let visible = false;
    let lastHoverTarget: Element | null = null;
    let rafId = 0;

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor-hover]';

    const show = () => {
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        outline.style.opacity = "1";
      }
    };

    const hide = () => {
      visible = false;
      dot.style.opacity = "0";
      outline.style.opacity = "0";
    };

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      show();
    };

    const onLeave = (e: PointerEvent) => {
      // Only hide when truly leaving the window
      if (!e.relatedTarget) hide();
    };

    const animate = () => {
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      // Spring-lag outline
      outlineX += (mouseX - outlineX) * 0.18;
      outlineY += (mouseY - outlineY) * 0.18;
      outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;

      // Update hover state every frame (works during scroll too)
      const target = document.elementFromPoint(mouseX, mouseY);
      const interactive = target?.closest(interactiveSelector) ?? null;
      if (interactive !== lastHoverTarget) {
        dot.classList.toggle("cursor-hover", !!interactive);
        outline.classList.toggle("cursor-hover", !!interactive);
        lastHoverTarget = interactive;
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", show);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", show);
    };
  }, []);

  // Always render — CSS hides on touch/coarse pointer via media query
  // Refs must be attached before useEffect runs, so no conditional return here
  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{ opacity: 0 }}
      />
      <div
        ref={outlineRef}
        className="cursor-outline"
        aria-hidden="true"
        style={{ opacity: 0 }}
      />
    </>
  );
}
