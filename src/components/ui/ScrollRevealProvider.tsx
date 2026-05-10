"use client";

import { useEffect } from "react";

/**
 * ScrollRevealProvider — adds .is-visible to elements with .scroll-reveal
 * when they enter viewport. Pure CSS transitions handle the animation.
 */
export function ScrollRevealProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // unobserve after first reveal to save cycles
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    const reveal = () => {
      document.querySelectorAll(".scroll-reveal:not(.is-visible)").forEach((el) => {
        if (reduceMotion) {
          el.classList.add("is-visible");
        } else {
          observer.observe(el);
        }
      });
    };

    reveal();
    // Re-scan on route change / dynamic content
    const t = setInterval(reveal, 1500);

    return () => {
      clearInterval(t);
      observer.disconnect();
    };
  }, []);

  return null;
}
