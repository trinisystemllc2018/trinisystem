"use client";
import { useEffect, useState } from "react";
import { X, Phone, Download } from "lucide-react";
import { DOWNLOAD_URL, PHONE_HREF, PHONE } from "@/lib/utils";

const KEY = "trini-exit-dismissed";
const COOLDOWN_DAYS = 7;

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Respect a prior dismissal for COOLDOWN_DAYS (audit fix #9)
    try {
      const until = Number(localStorage.getItem(KEY) || 0);
      if (until && Date.now() < until) return;
    } catch {}

    const arm = setTimeout(() => {
      const onLeave = (e: MouseEvent) => {
        if (e.clientY <= 4) {
          setShow(true);
          document.removeEventListener("mouseleave", onLeave);
        }
      };
      document.addEventListener("mouseleave", onLeave);
    }, 6000);
    return () => clearTimeout(arm);
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(KEY, String(Date.now() + COOLDOWN_DAYS * 864e5));
    } catch {}
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={dismiss}
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", animation: "fadeIn 0.2s ease" }}>
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden t-surface"
        style={{ border: "1px solid var(--border-strong)", boxShadow: "var(--shadow-lg)", animation: "scaleIn 0.25s ease" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog" aria-label="Before you go"
      >
        <div className="relative px-6 pt-6 pb-4 text-center" style={{ background: "var(--primary-soft)" }}>
          <button onClick={dismiss}
            className="absolute top-4 right-4 w-8 h-8 rounded-full grid place-items-center t-muted transition-colors"
            style={{ background: "var(--surface)" }} aria-label="Close">
            <X size={16} />
          </button>
          <h3 className="text-xl font-black t-text">Need a hand before you go?</h3>
          <p className="t-muted text-sm mt-1">Talk to a real technician, or grab our free PC cleaner.</p>
        </div>

        <div className="p-5 space-y-3">
          <a href={PHONE_HREF}
            className="flex items-center gap-4 p-4 rounded-2xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-2))", color: "var(--on-primary)" }}>
            <Phone size={26} />
            <div>
              <p className="font-black">Free call — real technician</p>
              <p className="text-sm" style={{ opacity: 0.85 }}>{PHONE}</p>
            </div>
          </a>

          <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <Download size={26} style={{ color: "#10b981" }} />
            <div>
              <p className="font-black t-text">Free TriniCleaner download</p>
              <p className="text-sm t-faint">Speed up your PC — 100% free</p>
            </div>
          </a>

          <button onClick={dismiss} className="w-full t-faint text-sm py-2 hover:opacity-80 transition-opacity">
            No thanks, I'll keep browsing
          </button>
        </div>
      </div>
    </div>
  );
}
