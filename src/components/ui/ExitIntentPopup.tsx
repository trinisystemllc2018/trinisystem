"use client";
import { useEffect, useState } from "react";
import { DOWNLOAD_URL, PHONE_HREF, PHONE } from "@/lib/utils";

/* Pure CSS transitions — no framer-motion */
export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => {
      const handleLeave = (e: MouseEvent) => {
        if (e.clientY <= 5 && !dismissed) {
          setShow(true);
          document.removeEventListener("mouseleave", handleLeave);
        }
      };
      document.addEventListener("mouseleave", handleLeave);
      return () => document.removeEventListener("mouseleave", handleLeave);
    }, 5000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const dismiss = () => { setShow(false); setDismissed(true); };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={dismiss}
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", animation: "fadeIn 0.2s ease" }}>
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f172a, #1e293b)",
          border: "1px solid rgba(249,115,22,0.3)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(249,115,22,0.1)",
          animation: "scaleIn 0.25s ease",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 text-center"
          style={{ background: "linear-gradient(135deg, #f9731622, transparent)" }}>
          <button onClick={dismiss}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.08)" }}>✕</button>
          <div className="text-4xl mb-2">⚡</div>
          <h3 className="text-xl font-black text-white">Wait — before you go!</h3>
          <p className="text-white/55 text-sm mt-1">Get free help or download our free PC cleaner.</p>
        </div>

        <div className="p-5 space-y-3">
          <a href={PHONE_HREF}
            className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #1e3a8a, #1d4ed8)", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
            <span className="text-3xl">📞</span>
            <div>
              <p className="text-white font-black">Free Call — Real Technician</p>
              <p className="text-blue-200 text-sm">{PHONE} · Answer in &lt;5 min</p>
            </div>
          </a>

          <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #064e3b, #059669)", boxShadow: "0 4px 20px rgba(16,185,129,0.4)" }}>
            <span className="text-3xl">⬇</span>
            <div>
              <p className="text-white font-black">Free TriniCleaner Download</p>
              <p className="text-emerald-200 text-sm">Speed up your PC — 100% free</p>
            </div>
          </a>

          <button onClick={dismiss} className="w-full text-white/30 text-sm py-2 hover:text-white/50 transition-colors">
            No thanks, I'll manage →
          </button>
        </div>
      </div>
    </div>
  );
}
