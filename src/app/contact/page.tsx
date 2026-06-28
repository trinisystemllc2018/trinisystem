"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, CalendarClock, Map, Globe, Zap, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { PHONE, PHONE_HREF, MAPS_URL, OFFICIAL_SITE, DOWNLOAD_URL } from "@/lib/utils";

type Status = "idle" | "loading" | "ok" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", issue: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      // Audit fix #2 — only celebrate on a real success.
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => { setStatus("idle"); setForm({ name: "", email: "", phone: "", issue: "", message: "" }); };

  const inputCls =
    "glass-input w-full px-4 py-3.5 rounded-2xl text-base outline-none transition-all";
  const labelCls = "block text-xs font-bold uppercase tracking-wide t-muted mb-1.5";

  const methods = [
    { Icon: Phone, title: "Call or text", sub: "Fastest — talk to a tech in seconds", action: { label: PHONE, href: PHONE_HREF }, badge: "24/7" },
    { Icon: CalendarClock, title: "Request a callback", sub: "Leave your number and we'll call you", action: { label: "Use the form below", href: "#form" }, badge: "Popular" },
    { Icon: Map, title: "Service area map", sub: "See where we cover on-site visits", action: { label: "View coverage map", href: MAPS_URL }, badge: "All 50 states" },
    { Icon: Globe, title: "Official Trini System site", sub: "Our main website and info pages", action: { label: "Visit official site", href: OFFICIAL_SITE }, badge: "USA & Canada" },
  ];

  return (
    <section className="bg-section-dark pt-12 pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="chip mb-6">Real humans · 24/7</span>
          <h1 className="text-4xl md:text-5xl font-black t-text mb-4">
            Let&apos;s fix it
            <span className="block text-gradient-gold">right now.</span>
          </h1>
          <p className="text-xl t-muted max-w-xl mx-auto">
            A real technician picks up — not a bot. Tell us what&apos;s wrong and we&apos;ll get on it.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact methods */}
          <div className="space-y-4">
            <h2 className="text-xl font-black t-text mb-4">How to reach us</h2>

            {methods.map(({ Icon, title, sub, action, badge }) => (
              <a
                key={title}
                href={action.href}
                target={action.href.startsWith("http") ? "_blank" : undefined}
                rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-5 rounded-2xl transition-all group t-surface lift-on-hover"
                style={{ border: "1px solid var(--border)" }}
              >
                <span className="w-12 h-12 rounded-2xl grid place-items-center shrink-0" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
                  <Icon size={22} />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold t-text">{title}</p>
                    <span className="text-[11px] t-muted px-2 py-0.5 rounded-full" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>{badge}</span>
                  </div>
                  <p className="text-sm t-faint">{sub}</p>
                  <p className="text-sm font-semibold mt-1" style={{ color: "var(--primary)" }}>{action.label} &rarr;</p>
                </div>
              </a>
            ))}

            {/* TriniCleaner */}
            <div className="rounded-2xl p-5" style={{ background: "var(--primary-soft)", border: "1px solid var(--border-strong)" }}>
              <div className="flex items-start gap-4">
                <Zap size={28} style={{ color: "var(--primary)" }} />
                <div>
                  <p className="font-bold t-text mb-1">PC running slow? Try TriniCleaner first</p>
                  <p className="text-sm t-muted mb-3">Our free Windows optimizer may solve it without any support needed.</p>
                  <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl transition-transform hover:scale-[1.03]"
                    style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-2))", color: "var(--on-primary)" }}>
                    Download free
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div id="form" className="rounded-3xl p-7 t-surface" style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
            <h2 className="text-xl font-black t-text mb-1">Send a message</h2>
            <p className="text-sm t-faint mb-6">Fill in a few details and we&apos;ll reply by email or phone.</p>

            <AnimatePresence mode="wait">
              {status === "ok" ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 size={64} style={{ color: "#10b981" }} />
                  <h3 className="text-xl font-black t-text mt-4 mb-2">Message sent</h3>
                  <p className="t-muted mb-6">We&apos;ll be in touch shortly. For urgent help, call{" "}
                    <a href={PHONE_HREF} className="font-semibold" style={{ color: "var(--primary)" }}>{PHONE}</a>
                  </p>
                  <button onClick={reset} className="text-sm t-muted underline hover:opacity-80">Send another message</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {status === "error" && (
                    <div className="flex items-start gap-3 p-3 rounded-2xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.4)" }}>
                      <AlertCircle size={18} style={{ color: "var(--primary-2)" }} className="mt-0.5 shrink-0" />
                      <p className="text-sm t-text">We couldn&apos;t send that — please try again, or call us at{" "}
                        <a href={PHONE_HREF} className="font-bold" style={{ color: "var(--primary)" }}>{PHONE}</a>.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls} htmlFor="c-name">Name *</label>
                      <input id="c-name" type="text" required value={form.name} onChange={set("name")} placeholder="John Smith" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="c-email">Email *</label>
                      <input id="c-email" type="email" required value={form.email} onChange={set("email")} placeholder="john@email.com" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="c-phone">Phone (so we can call you back)</label>
                    <input id="c-phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="(555) 000-0000" className={inputCls} />
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="c-issue">What do you need help with? *</label>
                    <select id="c-issue" required value={form.issue} onChange={set("issue")} className={inputCls} style={{ background: "var(--surface)" }}>
                      <option value="">Select an issue…</option>
                      <optgroup label="Printers">
                        <option>HP Printer — Offline / WiFi</option>
                        <option>Canon Printer — Error / Not printing</option>
                        <option>Epson Printer — Ink / Network</option>
                        <option>Brother Printer — Driver / Windows 11</option>
                        <option>Printer error code</option>
                      </optgroup>
                      <optgroup label="PC & Software">
                        <option>PC running slow / Windows repair</option>
                        <option>Virus or malware removal</option>
                        <option>TriniCleaner help / installation</option>
                      </optgroup>
                      <optgroup label="Other">
                        <option>Garmin GPS map update</option>
                        <option>Email / account help</option>
                        <option>Something else</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="c-msg">Describe the problem</label>
                    <textarea id="c-msg" rows={4} value={form.message} onChange={set("message")}
                      placeholder="e.g. My HP DeskJet shows offline on Windows 11 after I changed my WiFi password…"
                      className={`${inputCls} resize-none`} />
                  </div>

                  <button type="submit" disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 font-black text-lg py-4 px-6 rounded-2xl transition-transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70"
                    style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-2))", color: "var(--on-primary)" }}>
                    {status === "loading" ? (<><Loader2 size={20} className="animate-spin" /> Sending…</>) : "Send message"}
                  </button>

                  <p className="text-center text-xs t-faint">
                    Prefer to talk? Call <a href={PHONE_HREF} className="font-semibold" style={{ color: "var(--primary)" }}>{PHONE}</a> · available 24/7
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
