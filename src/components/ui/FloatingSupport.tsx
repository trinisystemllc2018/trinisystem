"use client";
import { useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Phone, CalendarClock, Zap, BookOpen, ArrowRight } from "lucide-react";
import { PHONE_HREF, PHONE, DOWNLOAD_URL } from "@/lib/utils";
import { CallbackButton } from "@/components/ui/CallbackModal";

/** Single support entry point — lives in the coordinated FAB stack. */
export function FloatingSupport() {
  const [open, setOpen] = useState(false);

  return (
    <div className="tx-fab-support flex flex-col items-end gap-3">
      {/* Panel opens above the button */}
      <div
        className="w-72 rounded-3xl overflow-hidden t-surface"
        style={{
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-lg)",
          opacity: open ? 1 : 0,
          transform: open ? "scale(1) translateY(0)" : "scale(0.92) translateY(12px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .25s ease, transform .25s ease",
          transformOrigin: "bottom right",
        }}
      >
        <div className="px-5 py-4 flex items-center gap-3" style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-2))", color: "var(--on-primary)" }}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 grid place-items-center font-black text-sm">TS</div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2" style={{ borderColor: "var(--primary)" }} />
          </div>
          <div>
            <p className="font-bold text-sm">Trini System Support</p>
            <p className="text-xs flex items-center gap-1" style={{ opacity: 0.85 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" /> Usually replies fast
            </p>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <p className="t-muted text-sm px-1 pb-2">Pick the fastest way to get help:</p>

          <a href={PHONE_HREF} className="flex items-center gap-3 p-3 rounded-2xl transition-colors"
            style={{ background: "var(--primary-soft)", border: "1px solid var(--border-strong)" }}>
            <Phone size={20} style={{ color: "var(--primary)" }} />
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: "var(--primary)" }}>Call now — free</p>
              <p className="text-xs t-faint">{PHONE} · 24/7</p>
            </div>
            <ArrowRight size={16} style={{ color: "var(--primary)" }} />
          </a>

          <CallbackButton className="flex items-center gap-3 p-3 rounded-2xl w-full text-left transition-colors"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" } as any}>
            <CalendarClock size={20} className="t-text" />
            <div className="flex-1">
              <p className="text-sm font-bold t-text">Request a callback</p>
              <p className="text-xs t-faint">Leave your number, we call you</p>
            </div>
            <ArrowRight size={16} className="t-faint" />
          </CallbackButton>

          <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl transition-colors"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <Zap size={20} style={{ color: "#10b981" }} />
            <div className="flex-1">
              <p className="text-sm font-bold t-text">Free PC cleaner</p>
              <p className="text-xs t-faint">TriniCleaner · Windows</p>
            </div>
            <ArrowRight size={16} className="t-faint" />
          </a>

          <Link href="/how-to" className="flex items-center gap-3 p-3 rounded-2xl transition-colors"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <BookOpen size={20} style={{ color: "var(--accent)" }} />
            <div className="flex-1">
              <p className="text-sm font-bold t-text">Free guides</p>
              <p className="text-xs t-faint">Step-by-step fixes</p>
            </div>
            <ArrowRight size={16} className="t-faint" />
          </Link>
        </div>
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        className="relative w-14 h-14 rounded-full grid place-items-center transition-all hover:scale-110 active:scale-95"
        style={{
          background: open ? "var(--surface-solid)" : "linear-gradient(135deg, var(--primary), var(--primary-2))",
          color: open ? "var(--text)" : "var(--on-primary)",
          border: open ? "1px solid var(--border)" : "none",
          boxShadow: open ? "var(--shadow)" : "0 8px 30px rgba(239,68,68,0.45)",
        }}
        aria-label={open ? "Close support menu" : "Open support menu"}
        aria-expanded={open}
      >
        {!open && <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "var(--primary)", opacity: 0.18 }} />}
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
