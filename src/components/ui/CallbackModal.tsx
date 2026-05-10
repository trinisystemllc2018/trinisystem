"use client";

import React, { useState, useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { requestCallbackAction } from "@/app/actions/callback";

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialState: FormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="cta-glow-ring click-ripple w-full py-4 rounded-2xl font-black text-lg text-white transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait"
      style={{
        background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
        boxShadow: "0 8px 32px rgba(239,68,68,0.5)",
      }}
    >
      {pending ? (
        <>
          <span className="inline-block w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          Sending...
        </>
      ) : (
        <>📞 Call Me Back — Free</>
      )}
    </button>
  );
}

export function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [state, formAction] = useFormState(requestCallbackAction, initialState);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState("/");

  // Capture current page for the form
  useEffect(() => {
    if (typeof window !== "undefined") setPage(window.location.pathname);
  }, []);

  // Auto-close after success
  useEffect(() => {
    if (state.status === "success") {
      const t = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [state.status, onClose]);

  // ESC to close, focus trap basics
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="callback-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl overflow-hidden animate-fade-up"
        style={{
          background: "linear-gradient(135deg, #0a0505 0%, #1a0a05 100%)",
          border: "1px solid rgba(249,115,22,0.25)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 80px rgba(239,68,68,0.2)",
        }}
      >
        {/* Decorative gradient header */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: "linear-gradient(90deg, #f97316, #ef4444, #f97316)",
            backgroundSize: "200% 100%",
            animation: "gradientShift 3s ease infinite",
          }}
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all z-10"
        >
          ✕
        </button>

        <div className="p-8 pt-10">
          {state.status === "success" ? (
            <div className="text-center py-8" role="status" aria-live="polite">
              <div className="text-6xl mb-4 animate-float inline-block">✅</div>
              <h2 className="text-2xl font-black text-white mb-3">You&apos;re all set!</h2>
              <p className="text-white/70 leading-relaxed">{state.message}</p>
              <p className="text-orange-400 font-mono text-sm mt-6">⏱ Response under 5 min · 24/7</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="text-5xl mb-3 inline-block animate-float">📞</div>
                <h2 id="callback-title" className="text-2xl md:text-3xl font-black text-white mb-2">
                  Get a callback in <span className="text-gradient-gold-shimmer">5 min</span>
                </h2>
                <p className="text-white/55 text-sm">No fix = no fee. Real technician calls you back.</p>
              </div>

              <form action={formAction} className="flex flex-col gap-4">
                <input type="hidden" name="page" value={page} />

                <div>
                  <label htmlFor="cb-name" className="block text-white/70 text-sm font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    id="cb-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="e.g. Mary Smith"
                    className="w-full px-4 py-3.5 rounded-xl outline-none text-white font-medium placeholder:text-white/25 transition-all focus:ring-2 focus:ring-orange-400/50"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "2px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="cb-phone" className="block text-white/70 text-sm font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    id="cb-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    placeholder="(347) 555-0100"
                    className="w-full px-4 py-3.5 rounded-xl outline-none text-white font-medium placeholder:text-white/25 transition-all focus:ring-2 focus:ring-orange-400/50"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "2px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>

                <SubmitButton />

                {state.status === "error" && (
                  <p
                    role="alert"
                    aria-live="assertive"
                    className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                  >
                    {state.message}
                  </p>
                )}

                <p className="text-white/30 text-xs text-center">
                  No fix = no fee · Response under 5 min · Available 24/7
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   CallbackButton — a button that opens the modal
   Restored as named export for legacy imports in:
     - FloatingSupport.tsx
     - PremiumServicePage.tsx
     - TechER.tsx
──────────────────────────────────────────────── */
interface CallbackButtonProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function CallbackButton({ children, className, style, onClick }: CallbackButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={className}
        style={style}
      >
        {children ?? "Request a Callback"}
      </button>
      <CallbackModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
