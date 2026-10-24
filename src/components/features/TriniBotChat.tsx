"use client";
import { useEffect, useRef, useState } from "react";
import { X, Send } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING =
  "Hi, I'm Trini Bot, an AI assistant. Are you having trouble with a computer, printer, or GPS device today?";

/** Chat panel for Trini Bot. Opened from the FloatingSupport menu. */
export function TriniBotChat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json().catch(() => ({}));
      setMessages((p) => [
        ...p,
        { role: "assistant", content: data.content || "Sorry, something went wrong. Please call 347-953-1531 or visit /book." },
      ]);
    } catch {
      setMessages((p) => [...p, { role: "assistant", content: "Network error. Please call us at 347-953-1531." }]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Trini Bot chat"
      className="t-surface flex flex-col overflow-hidden rounded-3xl"
      style={{
        position: "fixed",
        zIndex: 60,
        right: "1rem",
        bottom: "calc(var(--fab-b) + 4.5rem)",
        width: "min(24rem, calc(100vw - 2rem))",
        height: "min(32rem, calc(100vh - 8rem))",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-2))", color: "var(--on-primary)" }}
      >
        <div>
          <p className="font-bold text-sm">Trini Bot</p>
          <p className="text-xs" style={{ opacity: 0.85 }}>AI tech-support assistant</p>
        </div>
        <button onClick={onClose} aria-label="Close chat" className="p-1 rounded-full hover:opacity-80">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[85%] px-3 py-2 rounded-2xl whitespace-pre-wrap break-words"
              style={
                m.role === "user"
                  ? { background: "var(--primary)", color: "var(--on-primary)" }
                  : { background: "var(--surface)", border: "1px solid var(--border)" }
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && <p className="t-faint text-xs animate-pulse">Trini Bot is typing…</p>}
        <div ref={endRef} />
      </div>

      <p className="t-faint text-[11px] px-4 pb-1">Never type passwords or card numbers here.</p>
      <form onSubmit={send} className="p-3 flex gap-2" style={{ borderTop: "1px solid var(--border)" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          placeholder="Describe your problem…"
          aria-label="Your message"
          className="flex-1 rounded-xl px-3 py-2 text-sm t-text"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send"
          className="rounded-xl px-3 grid place-items-center disabled:opacity-50"
          style={{ background: "var(--primary)", color: "var(--on-primary)" }}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
