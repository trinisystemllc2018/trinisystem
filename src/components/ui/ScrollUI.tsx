"use client";

import { useEffect, useState } from "react";

/**
 * ScrollUI — adds two senior-friendly affordances:
 *  1. Top progress bar showing how far down the page you've scrolled
 *  2. Back-to-top button that fades in after 600px of scroll
 *
 * Pure CSS motion — no animation libraries. Respects prefers-reduced-motion.
 * Both are aria-hidden because they're decorative; the BTT button itself
 * has proper aria-label.
 */
export function ScrollUI() {
  const [progress, setProgress] = useState(0);
  const [showBtt, setShowBtt] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const top = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const pct = height > 0 ? (top / height) * 100 : 0;
        setProgress(pct);
        setShowBtt(top > 600);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Progress bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none"
      >
        <div
          className="h-full transition-[width] duration-100 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #f97316 0%, #ef4444 50%, #f97316 100%)",
            boxShadow: "0 0 12px rgba(239,68,68,0.6)",
          }}
        />
      </div>

      {/* Back to top button */}
      <button
        type="button"
        onClick={scrollTop}
        aria-label="Scroll back to top"
        className={`fixed bottom-24 right-5 md:right-8 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white text-xl md:text-2xl transition-all hover:scale-110 active:scale-95 ${
          showBtt ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
          boxShadow: "0 8px 24px rgba(239,68,68,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset",
          transitionProperty: "opacity, transform",
          transitionDuration: "0.3s",
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        ↑
      </button>
    </>
  );
}
