"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";

const STORAGE_KEY = "ts_exit_shown";

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !firedRef.current) {
        firedRef.current = true;
        setVisible(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
      }
    };

    // Small delay so it doesn't fire immediately on page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", onMouseLeave);
    }, 4000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const close = () => setVisible(false);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="text-6xl mb-4">🖨️</div>
          <h2
            id="exit-popup-title"
            className="text-2xl font-black text-gray-900 mb-3"
          >
            Wait — Still have a tech problem?
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Most printer &amp; PC issues are fixed in under 15 minutes remotely.
            <strong className="text-gray-900"> No fix = no fee.</strong>
          </p>

          <div className="space-y-3">
            <a
              href={PHONE_HREF}
              onClick={close}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black text-lg px-6 py-4 rounded-2xl shadow-brand hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              📞 Call {PHONE} — Free Help
            </a>

            <Link
              href="/fix"
              onClick={close}
              className="flex items-center justify-center gap-2 w-full bg-emerald-50 text-emerald-800 font-bold px-6 py-3.5 rounded-2xl border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              🔧 Try Free Diagnostic Tool
            </Link>

            <a
              href={DOWNLOAD_URL}
              onClick={close}
              className="flex items-center justify-center gap-2 w-full text-gray-600 font-semibold px-6 py-3 text-sm hover:text-blue-600 transition-colors"
            >
              ⬇ Download Free TriniCleaner for Slow PC
            </a>
          </div>

          <button
            onClick={close}
            className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            No thanks, I&apos;ll figure it out myself
          </button>
        </div>
      </div>
    </div>
  );
}
