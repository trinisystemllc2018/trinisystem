"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Bot, CheckCircle2, RotateCcw } from "lucide-react";
import { BOOKING_SERVICES, BOOKING_STEPS, TIME_WINDOWS, BUSINESS } from "@/lib/booking-config";
import { nextStep, stepStatus, type BookingDraft } from "@/lib/booking";

type ChatMsg = { role: "user" | "assistant"; content: string };

const GREETING: ChatMsg = {
  role: "assistant",
  content:
    "Hello! I'm the Trini System AI assistant. I can answer questions about printer, computer, GPS and email help, and set up a booking request with a technician — it takes about 10 short steps. Which of these do you need help with?",
};

/** Tappable quick replies that match the current step. */
function quickReplies(draft: BookingDraft, submitted: boolean): string[] {
  if (submitted) return [];
  const step = nextStep(draft);
  if (!step) return ["Yes, send my booking request", "I want to change something"];
  switch (step.n) {
    case 1:
      return BOOKING_SERVICES.map((s) => s.label);
    case 7:
      return draft.time ? [] : [...TIME_WINDOWS];
    default:
      return [];
  }
}

export function BookingAgent({ page = "/book" }: { page?: string }) {
  const [messages, setMessages] = useState<ChatMsg[]>([GREETING]);
  const [draft, setDraft] = useState<BookingDraft>({});
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  const done = stepStatus(draft);
  const doneCount = submittedId ? 10 : done.filter(Boolean).length;
  const current = nextStep(draft);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy || submittedId) return;
    const next: ChatMsg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is UI-only; the API wants the conversation to start with the visitor
        body: JSON.stringify({ messages: next.slice(1), booking: draft, page }),
      });
      const data = await res.json();
      if (data.booking) setDraft(data.booking);
      if (data.submitted?.id) setSubmittedId(data.submitted.id);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || "Sorry, something went wrong. Please try again." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `Sorry, I could not connect. Please try again, or email ${BUSINESS.email}.` },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setMessages([GREETING]);
    setDraft({});
    setSubmittedId(null);
    setInput("");
  }

  const chips = quickReplies(draft, !!submittedId);

  return (
    <section
      className="w-full max-w-2xl mx-auto rounded-3xl overflow-hidden t-surface"
      style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}
      aria-label="Booking assistant"
    >
      {/* Header + progress */}
      <div
        className="px-5 py-4"
        style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-2))", color: "var(--on-primary)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 grid place-items-center">
            <Bot size={20} aria-hidden />
          </div>
          <div className="flex-1">
            <p className="font-bold text-base leading-tight">Trini System Assistant</p>
            <p className="text-xs" style={{ opacity: 0.9 }}>
              AI assistant · a human technician confirms every booking
            </p>
          </div>
          <button
            onClick={reset}
            className="p-2 rounded-full hover:bg-white/20"
            aria-label="Start over"
            title="Start over"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <div className="mt-3" role="status" aria-live="polite">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>
              {submittedId
                ? "All 10 steps complete"
                : current
                ? `Step ${current.n} of 10: ${current.label}`
                : "Ready to confirm"}
            </span>
            <span>{doneCount}/10</span>
          </div>
          <div className="flex gap-1" aria-hidden>
            {BOOKING_STEPS.map((s, i) => (
              <div
                key={s.n}
                className="h-1.5 flex-1 rounded-full"
                style={{ background: submittedId || done[i] ? "#fff" : "rgba(255,255,255,0.3)" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 py-4 space-y-3 overflow-y-auto" style={{ height: "min(55vh, 460px)" }} aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className="max-w-[85%] px-4 py-3 rounded-2xl text-base leading-relaxed whitespace-pre-wrap"
              style={
                m.role === "user"
                  ? { background: "var(--primary)", color: "var(--on-primary)", borderBottomRightRadius: 6 }
                  : { background: "var(--surface)", border: "1px solid var(--border)", borderBottomLeftRadius: 6 }
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        {busy && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl text-base t-faint" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              Typing…
            </div>
          </div>
        )}

        {submittedId && (
          <div
            className="rounded-2xl p-4 flex gap-3 items-start"
            style={{ background: "var(--primary-soft)", border: "1px solid var(--border-strong)" }}
          >
            <CheckCircle2 size={22} style={{ color: "#16a34a" }} aria-hidden />
            <div>
              <p className="font-bold">Booking request sent — ID {submittedId}</p>
              <p className="text-sm t-muted">
                A technician will contact you to confirm the exact time. Keep this ID for reference.
              </p>
              <button onClick={reset} className="mt-2 text-sm font-semibold underline">
                Start a new request
              </button>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick replies */}
      {chips.length > 0 && !busy && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => send(c)}
              className="px-3 py-2 rounded-full text-sm font-semibold"
              style={{ background: "var(--primary-soft)", color: "var(--primary)", border: "1px solid var(--border-strong)" }}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="p-3 flex gap-2"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <label htmlFor="agent-input" className="sr-only">
          Type your message
        </label>
        <input
          id="agent-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          disabled={busy || !!submittedId}
          placeholder={submittedId ? "Request sent" : "Type your question or answer…"}
          className="flex-1 px-4 py-3 rounded-full text-base outline-none"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={busy || !input.trim() || !!submittedId}
          className="w-12 h-12 rounded-full grid place-items-center disabled:opacity-40"
          style={{ background: "var(--primary)", color: "var(--on-primary)" }}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>

      <p className="px-4 pb-3 text-xs t-faint">
        Please don&apos;t type passwords, card numbers or codes here. This assistant is an AI and can make mistakes.
      </p>
    </section>
  );
}
