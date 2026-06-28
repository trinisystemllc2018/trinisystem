"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * ScrollUI — top progress bar + back-to-top button.
 * The button lives in the coordinated FAB stack (.tx-fab-top) so it never
 * overlaps the support bubble or the sticky CTA bar (audit fix #5).
 */
export function ScrollUI() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const top = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(h > 0 ? (top / h) * 100 : 0);
        setShow(top > 600);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      <div aria-hidden className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
        <div
          className="h-full transition-[width] duration-100 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, var(--primary), var(--primary-2))",
            boxShadow: "0 0 12px rgba(239,68,68,0.6)",
          }}
        />
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll back to top"
        className={`tx-fab-top grid place-items-center w-12 h-12 rounded-full transition-all hover:scale-110 active:scale-95 ${
          show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          background: "var(--surface-solid)",
          color: "var(--text)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow)",
          transitionProperty: "opacity, transform",
          transitionDuration: "0.3s",
        }}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
