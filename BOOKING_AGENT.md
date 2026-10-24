# Booking assistant + phone-number removal

## What changed
- **Phone number removed everywhere** (code, JSON-LD `telephone` fields, meta tags, docs). `tel:` links now point to `/book`.
  `src/lib/utils.ts` exports `BOOKING_HREF` ("/book"), `BOOKING_LABEL` ("Book Online") and `CONTACT_EMAIL` instead of `PHONE` / `PHONE_HREF`.
- **New AI booking assistant** at `/book`, and in the floating support menu (bottom-right) and navbar button.

## The 10 steps (src/lib/booking-config.ts)
1 Service · 2 Device · 3 Issue · 4 Computer/connection · 5 What was tried · 6 Date · 7 Time window + time zone ·
8 Name · 9 Email/phone + consent to contact · 10 Review & confirm → sent to Discord.
The agent answers questions at any point and then returns to the current step. A progress bar shows "Step n of 10".

## Files
- `src/components/features/BookingAgent.tsx` — chat UI
- `src/app/book/page.tsx` — the page
- `src/app/api/agent/route.ts` — calls Google Gemini via `@google/genai` (function calls: `update_booking`, `submit_booking`); validates everything server-side; rate-limited
- `src/lib/booking.ts` — validation, step logic, Discord delivery
- `src/lib/booking-config.ts` — **edit services, prices, time windows here**

## Setup (Vercel → Settings → Environment Variables)
| Name | Purpose |
|---|---|
| `GEMINI_API_KEY` | required for the assistant (aistudio.google.com/apikey) |
| `DISCORD_WEBHOOK_URL` | where bookings arrive (already used by your contact form) |
| `GEMINI_MODEL` | optional, default `gemini-2.5-flash` |

Without the API key the chat shows a polite fallback pointing to the contact form.

## Safety built in
The agent says it is an AI, never asks for passwords/cards/codes, only quotes prices from `booking-config.ts`, never promises a fix or an exact time,
cannot submit without the visitor's explicit "yes" (enforced on the server), and Discord messages cannot ping @everyone.

## Before going live — please check
- Prices/"free diagnosis"/"no fix = no fee" in `booking-config.ts` must be true.
- Bookings are *requests*: someone has to answer them by email. The "Request a callback" form (kept) also needs someone to call back.
- Homepage claims about live activity, 24/7 staffing, response times, years in business and a New York address should match reality.
