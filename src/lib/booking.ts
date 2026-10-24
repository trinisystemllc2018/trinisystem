import {
  BOOKING_RULES,
  BOOKING_SERVICES,
  BOOKING_STEPS,
  TIME_WINDOWS,
  type ServiceId,
} from "@/lib/booking-config";

/** Everything the agent collects. All fields optional until submission. */
export type BookingDraft = {
  service?: ServiceId;
  device?: string;
  issue?: string;
  environment?: string;
  tried?: string;
  date?: string; // YYYY-MM-DD, visitor's local date
  time?: string; // one of TIME_WINDOWS
  timezone?: string;
  name?: string;
  email?: string;
  phone?: string;
  contactMethod?: "email" | "phone";
  consent?: boolean;
  confirmed?: boolean;
};

const MAX = { short: 120, long: 600, tz: 60 } as const;

/** Strip control characters, collapse whitespace, cap length. */
export function clean(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isoToday(offsetDays = 0): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}
export const todayISO = () => isoToday(0);

/**
 * Merge model- or client-supplied fields into a draft, validating each one.
 * Invalid fields are dropped and reported in `errors` so the agent can re-ask.
 */
export function mergeDraft(
  current: BookingDraft,
  input: Record<string, unknown>
): { draft: BookingDraft; errors: string[] } {
  const draft: BookingDraft = { ...current };
  const errors: string[] = [];

  if (input.service !== undefined) {
    const id = clean(input.service, 20).toLowerCase();
    if (BOOKING_SERVICES.some((s) => s.id === id)) draft.service = id as ServiceId;
    else errors.push(`service must be one of: ${BOOKING_SERVICES.map((s) => s.id).join(", ")}`);
  }
  for (const key of ["device", "issue", "environment", "tried"] as const) {
    if (input[key] !== undefined) {
      const v = clean(input[key], key === "device" ? MAX.short : MAX.long);
      if (v.length >= 2) draft[key] = v;
      else errors.push(`${key} is too short`);
    }
  }
  if (input.date !== undefined) {
    const v = clean(input.date, 10);
    const ok = /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
    if (!ok) errors.push("date must be YYYY-MM-DD");
    else if (v < isoToday(-1) || v > isoToday(BOOKING_RULES.maxDaysAhead + 1))
      errors.push(`date must be within the next ${BOOKING_RULES.maxDaysAhead} days`);
    else if (!BOOKING_RULES.allowedWeekdays.includes(new Date(`${v}T12:00:00Z`).getUTCDay()))
      errors.push("we do not take bookings on that weekday — suggest another day");
    else draft.date = v;
  }
  if (input.time !== undefined) {
    const v = clean(input.time, 40);
    const match = TIME_WINDOWS.find((w) => w.toLowerCase().startsWith(v.toLowerCase().split(" ")[0]));
    if (match) draft.time = match;
    else errors.push(`time must be one of: ${TIME_WINDOWS.join(" | ")}`);
  }
  if (input.timezone !== undefined) {
    const v = clean(input.timezone, MAX.tz);
    if (v.length >= 2) draft.timezone = v;
  }
  if (input.name !== undefined) {
    const v = clean(input.name, 80);
    if (v.length >= 2) draft.name = v;
    else errors.push("name is too short");
  }
  if (input.email !== undefined) {
    const v = clean(input.email, 120).toLowerCase();
    if (EMAIL_RE.test(v)) draft.email = v;
    else errors.push("email looks invalid");
  }
  if (input.phone !== undefined) {
    const v = clean(input.phone, 30);
    if (v === "") delete draft.phone;
    else if (v.replace(/\D/g, "").length >= 7) draft.phone = v;
    else errors.push("phone looks invalid");
  }
  if (input.contactMethod !== undefined) {
    const v = clean(input.contactMethod, 10).toLowerCase();
    if (v === "email" || v === "phone") draft.contactMethod = v;
  }
  if (input.consent !== undefined) draft.consent = input.consent === true;

  return { draft, errors };
}

/** Which of the 10 steps are complete for this draft? */
export function stepStatus(d: BookingDraft): boolean[] {
  const contactDone =
    !!d.email && d.consent === true && (d.contactMethod !== "phone" || !!d.phone);
  return BOOKING_STEPS.map((s) => {
    switch (s.key) {
      case "time":
        return !!d.time && !!d.timezone;
      case "contact":
        return contactDone;
      case "confirmed":
        return d.confirmed === true;
      default:
        return !!d[s.key as keyof BookingDraft];
    }
  });
}

export function nextStep(d: BookingDraft): { n: number; label: string } | null {
  const done = stepStatus(d);
  const i = done.findIndex((x) => !x);
  return i === -1 ? null : { n: BOOKING_STEPS[i].n, label: BOOKING_STEPS[i].label };
}

/** Steps 1–9 complete (so the visitor can be asked for final confirmation). */
export function readyToConfirm(d: BookingDraft): boolean {
  return stepStatus(d).slice(0, 9).every(Boolean);
}

export function newBookingId(): string {
  return "TS-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

/** Post a finished booking to Discord. Returns true on success. */
export async function sendBookingToDiscord(id: string, d: BookingDraft, page: string): Promise<boolean> {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) {
    console.error("DISCORD_WEBHOOK_URL is not set — booking not delivered");
    return false;
  }
  const svc = BOOKING_SERVICES.find((s) => s.id === d.service);
  const f = (name: string, value: string | undefined, inline = false) => ({
    name,
    value: (value || "—").slice(0, 1000),
    inline,
  });
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Never let visitor text ping @everyone / roles
        allowed_mentions: { parse: [] },
        embeds: [
          {
            title: `📅 New booking request ${id}`,
            color: 0x2563eb,
            fields: [
              f("Service", svc ? `${svc.label} (${svc.price})` : d.service, true),
              f("Device", d.device, true),
              f("Issue", d.issue),
              f("Computer / connection", d.environment),
              f("Already tried", d.tried),
              f("Requested date", d.date, true),
              f("Time window", d.time, true),
              f("Visitor time zone", d.timezone, true),
              f("Name", d.name, true),
              f("Email", d.email, true),
              f("Phone", d.phone, true),
              f("Prefers", d.contactMethod, true),
              f("Source page", page, true),
            ],
            footer: { text: "Booked via AI assistant · confirm with the customer" },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
    if (!res.ok) console.error("Discord rejected booking:", res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error("Discord booking error:", err);
    return false;
  }
}
