/**
 * Booking agent configuration — EDIT THIS FILE to change what the agent
 * says about services, prices and available time windows.
 *
 * The agent is only allowed to quote what is written here. Please make sure
 * every price / policy below is true for your business before going live.
 */

export const BUSINESS = {
  name: "Trini System LLC",
  site: "https://trinisystem.vercel.app",
  email: "trinisystemllc@gmail.com",
  /** Remote support only — change this if you also offer on-site visits. */
  delivery: "remote (the technician connects to your device over the internet while you watch)",
};

export type ServiceId = "printer" | "pc" | "virus" | "gps" | "email" | "other";

export const BOOKING_SERVICES: {
  id: ServiceId;
  label: string;
  price: string;
  covers: string;
}[] = [
  { id: "printer", label: "Printer repair & setup", price: "From $49", covers: "HP, Canon, Epson, Brother — offline, WiFi setup, drivers, error codes" },
  { id: "pc", label: "Slow PC / Windows help", price: "From $49", covers: "Slow computer, startup problems, junk cleanup, Windows errors" },
  { id: "virus", label: "Virus & malware removal", price: "From $49", covers: "Pop-ups, browser hijacks, suspected malware" },
  { id: "gps", label: "GPS map & firmware update", price: "Quoted after diagnosis", covers: "Garmin and TomTom map / firmware updates, Garmin Express problems" },
  { id: "email", label: "Gmail / account help", price: "Quoted after diagnosis", covers: "Sign-in problems, email setup on devices" },
  { id: "other", label: "Something else", price: "Quoted after diagnosis", covers: "Anything else — describe it and we will tell you if we can help" },
];

/**
 * Time windows offered to visitors, always in THEIR local time zone.
 * Bookings are REQUESTS — a human confirms the exact time.
 */
export const TIME_WINDOWS = ["Morning (9am–12pm)", "Afternoon (12pm–5pm)", "Evening (5pm–9pm)"] as const;

export const BOOKING_RULES = {
  /** How many days ahead a visitor may request. */
  maxDaysAhead: 30,
  /** 0 = Sunday … 6 = Saturday. Remove a number to block that weekday. */
  allowedWeekdays: [0, 1, 2, 3, 4, 5, 6],
};

/**
 * The 10 steps of the booking flow, in order. `key` is the field in the
 * booking draft that completes the step (see src/lib/booking.ts).
 */
export const BOOKING_STEPS = [
  { n: 1, key: "service", label: "What you need help with" },
  { n: 2, key: "device", label: "Your device (brand & model)" },
  { n: 3, key: "issue", label: "What is going wrong" },
  { n: 4, key: "environment", label: "Computer / connection" },
  { n: 5, key: "tried", label: "What you already tried" },
  { n: 6, key: "date", label: "Preferred date" },
  { n: 7, key: "time", label: "Preferred time" },
  { n: 8, key: "name", label: "Your name" },
  { n: 9, key: "contact", label: "How to reach you" },
  { n: 10, key: "confirmed", label: "Review & confirm" },
] as const;

export type StepKey = (typeof BOOKING_STEPS)[number]["key"];
