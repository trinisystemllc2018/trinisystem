"use client";

import { useEffect } from "react";

/* Observes .reveal elements and adds .visible when they scroll into view.
   Runs after the page is interactive so it doesn't block LCP. */
export function ScrollRevealClient() {
  useEffect(() => {
    // Defer to next idle moment so it doesn't fight for main thread on load
    const start = () => {
      const els = document.querySelectorAll(".reveal, .reveal-left");
      if (!els.length) return;
      const obs = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      els.forEach(el => obs.observe(el));
      return () => obs.disconnect();
    };

    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(start, { timeout: 1500 });
      return () => (window as any).cancelIdleCallback?.(id);
    }
    const id = setTimeout(start, 200);
    return () => clearTimeout(id);
  }, []);

  return null;
}
