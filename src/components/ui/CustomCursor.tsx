"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — orange dot + outline that follows the mouse with spring lag.
 *
 * Fixes vs prior version:
 * - Stays visible while scrolling (no longer hides on document mouseleave)
 * - Uses pointermove events so it works during scroll/touch hybrids
 * - Visibility starts hidden, only shown after first mouse move
 * - Hover state checks every frame against current pointer coords
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduceMotion) return;

    setIsReady(true);

    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    let mouseX = -100, mouseY = -100;
    let outlineX = -100, outlineY = -100;
    let visible = false;
    let lastHoverTarget: Element | null = null;
    let rafId = 0;

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor-hover]';

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        outline.style.opacity = "1";
      }
    };

    const onLeaveWindow = (e: PointerEvent) => {
      // Only hide when pointer truly leaves the window (relatedTarget is null)
      if (!e.relatedTarget) {
        visible = false;
        dot.style.opacity = "0";
        outline.style.opacity = "0";
      }
    };

    const onEnterWindow = () => {
      visible = true;
      dot.style.opacity = "1";
      outline.style.opacity = "1";
    };

    const animate = () => {
      // Dot — follows instantly
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      // Outline — spring lag
      outlineX += (mouseX - outlineX) * 0.18;
      outlineY += (mouseY - outlineY) * 0.18;
      outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;

      // Recompute hover target every frame using current pointer position
      // This keeps hover state correct during scroll, even without mouse movement
      const target = document.elementFromPoint(mouseX, mouseY);
      const interactive = target?.closest(interactiveSelector) ?? null;

      if (interactive !== lastHoverTarget) {
        if (interactive) {
          dot.classList.add("cursor-hover");
          outline.classList.add("cursor-hover");
        } else {
          dot.classList.remove("cursor-hover");
          outline.classList.remove("cursor-hover");
        }
        lastHoverTarget = interactive;
      }

      rafId = requestAnimationFrame(animate);
    };
    animate();

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeaveWindow);
    document.addEventListener("pointerenter", onEnterWindow);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeaveWindow);
      document.removeEventListener("pointerenter", onEnterWindow);
    };
  }, []);

  if (!isReady) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" style={{ opacity: 0 }} />
      <div ref={outlineRef} className="cursor-outline" aria-hidden="true" style={{ opacity: 0 }} />
    </>
  );
}
