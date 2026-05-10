"use client";

import { useEffect } from "react";

/**
 * ScrollRevealProvider — observes ALL reveal classes:
 *  - .scroll-reveal (legacy)
 *  - .reveal-from-left / -right / -top / -bottom
 *  - .reveal-zoom / .reveal-fade / .reveal-rotate
 *
 * Adds `.is-visible` when element enters viewport.
 * Also wires `.spotlight` mouse-tracking (sets --mx, --my CSS vars).
 */
export function ScrollRevealProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const REVEAL_SELECTOR =
      ".scroll-reveal:not(.is-visible), " +
      ".reveal-from-left:not(.is-visible), " +
      ".reveal-from-right:not(.is-visible), " +
      ".reveal-from-top:not(.is-visible), " +
      ".reveal-from-bottom:not(.is-visible), " +
      ".reveal-zoom:not(.is-visible), " +
      ".reveal-fade:not(.is-visible), " +
      ".reveal-rotate:not(.is-visible)";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const reveal = () => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        if (reduceMotion) {
          el.classList.add("is-visible");
        } else {
          observer.observe(el);
        }
      });
    };

    reveal();
    const t = setInterval(reveal, 1500);

    // Spotlight mouse tracking
    const spotlights = new Set<HTMLElement>();
    const onSpotlightMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(".spotlight") as HTMLElement | null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      target.style.setProperty("--my", `${e.clientY - rect.top}px`);
      spotlights.add(target);
    };
    document.addEventListener("mousemove", onSpotlightMove, { passive: true });

    return () => {
      clearInterval(t);
      observer.disconnect();
      document.removeEventListener("mousemove", onSpotlightMove);
    };
  }, []);

  return null;
}
