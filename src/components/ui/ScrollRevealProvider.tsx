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

    const observeNew = (root: Element | Document = document) => {
      root.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        if (reduceMotion) {
          el.classList.add("is-visible");
        } else {
          observer.observe(el);
        }
      });
    };

    // Initial sweep
    observeNew();

    // Watch for dynamically injected elements (lazy-loaded sections, etc.)
    // MutationObserver fires synchronously in microtask queue — no polling needed
    const mutObs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "childList") {
          m.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              observeNew(node as Element);
              (node as Element).querySelectorAll?.(REVEAL_SELECTOR)
                .forEach((el) => {
                  if (reduceMotion) el.classList.add("is-visible");
                  else observer.observe(el);
                });
            }
          });
        }
      }
    });
    mutObs.observe(document.body, { childList: true, subtree: true });

    // Spotlight mouse tracking — desktop only
    const onSpotlightMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(".spotlight") as HTMLElement | null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      target.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("mousemove", onSpotlightMove, { passive: true });

    return () => {
      mutObs.disconnect();
      observer.disconnect();
      document.removeEventListener("mousemove", onSpotlightMove);
    };
  }, []);

  return null;
}
