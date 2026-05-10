"use server";

/**
 * Server Action — request a callback.
 *
 * Replaces the prior `fetch('/api/callback')` flow with a direct server
 * action. Benefits for seniors:
 *  - One round-trip, fewer moving parts
 *  - No "JSON parse failed" or "network error" cascades
 *  - Progressive enhancement: works even if JS hasn't loaded yet
 *  - Can co-locate logic with the form
 *
 * Background tasks (analytics, audit log, secondary notifications) run
 * after the user gets their success response. We deliberately do NOT
 * await them so the user sees "Success!" instantly, while non-essential
 * work continues on the server. (Pattern equivalent to Next 15's
 * `unstable_after` — works on stable Next 14.)
 */

type CallbackFormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

function fireAndForget(p: Promise<unknown>) {
  // Schedules a promise without blocking the response. Errors logged, never thrown.
  p.catch((err) => console.error("[bg-task]", err));
}

async function logCallbackAnalytics(name: string, page: string) {
  // Background task #1 — analytics ping
  // In production: POST to your analytics endpoint
  await new Promise((r) => setTimeout(r, 0));
  console.info(`[analytics] callback requested by ${name} from ${page}`);
}

async function sendSlackBackup(name: string, phone: string, page: string) {
  // Background task #2 — backup notification (e.g. Slack/email if Discord fails)
  const backupHook = process.env.SLACK_WEBHOOK_URL;
  if (!backupHook) return;
  try {
    await fetch(backupHook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `📞 Callback request: ${name} at ${phone} from ${page}`,
      }),
    });
  } catch {
    // Silent — backup is best-effort
  }
}

export async function requestCallbackAction(
  _prevState: CallbackFormState,
  formData: FormData
): Promise<CallbackFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const page = String(formData.get("page") ?? "/");

  // Basic validation — server-side, can't be bypassed by disabling JS
  if (!name) return { status: "error", message: "Please enter your name." };
  if (name.length > 100) return { status: "error", message: "Name is too long." };
  if (!phone) return { status: "error", message: "Please enter your phone number." };

  // Phone sanity check — must contain at least 7 digits
  const digitCount = phone.replace(/\D/g, "").length;
  if (digitCount < 7) return { status: "error", message: "Please enter a valid phone number." };

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  // Critical path — primary notification (must succeed)
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `📞 **CALLBACK REQUEST** — Call **${name}** at **${phone}** ASAP!`,
          embeds: [
            {
              title: "🔔 New Callback Request (Server Action)",
              color: 0x22c55e,
              fields: [
                { name: "👤 Name", value: name, inline: true },
                { name: "📞 Phone", value: phone, inline: true },
                { name: "📄 Page", value: page, inline: true },
                {
                  name: "⏰ Time",
                  value: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
                  inline: false,
                },
              ],
              footer: { text: "Trini System LLC" },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      if (!res.ok) {
        return {
          status: "error",
          message: "We couldn't reach our team right now. Please call 347-953-1531 directly.",
        };
      }
    } catch {
      return {
        status: "error",
        message: "Network error. Please call 347-953-1531 directly.",
      };
    }
  }

  // Background tasks — fire-and-forget, user doesn't wait for these
  fireAndForget(logCallbackAnalytics(name, page));
  fireAndForget(sendSlackBackup(name, phone, page));

  return {
    status: "success",
    message: "Got it! A technician will call you in under 5 minutes.",
  };
}
