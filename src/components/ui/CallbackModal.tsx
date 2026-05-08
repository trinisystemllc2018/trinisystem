"use client";
import { useState } from "react";
import React from "react";

/* Pure CSS transitions — no framer-motion */
interface CallbackModalProps { isOpen: boolean; onClose: () => void; }

export function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), page: typeof window !== "undefined" ? window.location.pathname : "" }),
      });
      if (res.ok) {
        setStatus("sent");
        setTimeout(() => { onClose(); setStatus("idle"); setName(""); setPhone(""); }, 3000);
      } else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", animation: "fadeIn 0.2s ease" }}>
      <div className="w-full max-w-md rounded-3xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", animation: "scaleIn 0.2s ease" }}>

        {/* Header */}
        <div className="px-6 py-5 text-white relative" style={{ background: "linear-gradient(135deg, #059669, #0d9488)" }}>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white/80 hover:bg-white/30 transition-colors">✕</button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">📞</div>
            <div>
              <h3 className="font-black text-lg">Request a Callback</h3>
              <p className="text-emerald-100 text-sm">We call you back in under 5 minutes</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {status === "sent" ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h4 className="font-black text-xl text-white mb-2">We&apos;ll call you right back!</h4>
              <p className="text-white/50 text-sm">A technician will call <strong className="text-white">{name}</strong> at <strong className="text-white">{phone}</strong> within 5 minutes.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-5 text-xs text-white/40">
                <span>● Techs available now</span>
                <span>⭐ 4.9 rating</span>
                <span>🔒 No spam</span>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-white/80 mb-1.5">Your Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John"
                  className="w-full px-4 py-3.5 rounded-xl outline-none text-white font-medium placeholder:text-white/20 transition-all"
                  style={{ background: "rgba(255,255,255,0.07)", border: "2px solid rgba(255,255,255,0.1)" }} autoFocus />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold text-white/80 mb-1.5">Phone Number</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(347) 953-1531"
                  className="w-full px-4 py-3.5 rounded-xl outline-none text-white font-medium placeholder:text-white/20 transition-all"
                  style={{ background: "rgba(255,255,255,0.07)", border: "2px solid rgba(255,255,255,0.1)" }}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()} />
              </div>
              <button onClick={handleSubmit} disabled={!name.trim() || !phone.trim() || status === "sending"}
                className="w-full py-4 rounded-2xl font-black text-lg text-white transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #059669, #0d9488)", boxShadow: "0 4px 20px rgba(5,150,105,0.5)" }}>
                {status === "sending" ? "⏳ Sending..." : "📞 Call Me Back — Free"}
              </button>
              {status === "error" && <p className="text-red-400 text-sm text-center mt-3">Something went wrong. Call us directly: 347-953-1531</p>}
              <p className="text-white/25 text-xs text-center mt-4">No fix = no fee · Response under 5 min · 24/7</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function CallbackButton({ className, children, style }: { className?: string; children?: React.ReactNode; style?: React.CSSProperties }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className={className} style={style}>
        {children || "📞 Request Callback — Free"}
      </button>
      <CallbackModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
