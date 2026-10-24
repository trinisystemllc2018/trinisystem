import { NextRequest, NextResponse } from "next/server";
import { TRINI_BOT_PROMPT } from "@/lib/trini-bot-prompt";
import { clean } from "@/lib/booking";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
const MAX_TURNS = 20;

const FALLBACK =
  "I'm having a brief connection hiccup. You can book a session at /book or call us at 347-953-1531.";

/* Small best-effort in-memory rate limit (serverless-friendly, not perfect) */
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 30;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { content: "You're sending messages very quickly. Please wait a few minutes, or call 347-953-1531." },
      { status: 429 }
    );
  }

  let body: { messages?: { role?: string; content?: unknown }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const history = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role as "user" | "assistant", content: clean(m.content, 1000) }))
    .filter((m) => m.content.length > 0);

  // The API wants the conversation to start and end with the visitor.
  while (history.length && history[0].role !== "user") history.shift();
  if (!history.length || history[history.length - 1].role !== "user") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set");
    return NextResponse.json({ content: FALLBACK });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 600, system: TRINI_BOT_PROMPT, messages: history }),
    });
    if (!res.ok) {
      console.error("Anthropic error:", res.status, await res.text());
      return NextResponse.json({ content: FALLBACK });
    }
    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const text = (data.content ?? [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    return NextResponse.json({ content: text || "Could you tell me a bit more about the problem?" });
  } catch (err) {
    console.error("Trini Bot error:", err);
    return NextResponse.json({ content: FALLBACK });
  }
}
