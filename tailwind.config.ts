import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Custom Shadows ──────────────────────────────────────
      boxShadow: {
        "soft":      "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
        "soft-lg":   "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)",
        "soft-xl":   "0 4px 16px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.10)",
        "card":      "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover":"0 4px 12px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.10)",
        "brand":     "0 8px 32px rgba(37,99,235,0.25), 0 2px 8px rgba(37,99,235,0.15)",
        "glow":      "0 0 40px rgba(37,99,235,0.30)",
      },
      // ── Custom Colors ───────────────────────────────────────
      colors: {
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      // ── Custom Animations ───────────────────────────────────
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-16px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%":      { transform: "translateY(-12px) rotate(2deg)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(37,99,235,0.3)" },
          "50%":      { boxShadow: "0 0 40px rgba(37,99,235,0.6)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "scan-line": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(100%)" },
        },
        "pulse-ring": {
          "0%":   { transform: "scale(1)",   opacity: "0.6" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        "scroll": {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "float":        "float 6s ease-in-out infinite",
        "float-slow":   "float-slow 8s ease-in-out infinite",
        "bounce-soft":  "bounce-soft 2s ease-in-out infinite",
        "spin-slow":    "spin-slow 12s linear infinite",
        "glow-pulse":   "glow-pulse 3s ease-in-out infinite",
        "shimmer":      "shimmer 1.8s infinite",
        "scan":         "scan-line 2.5s ease-in-out infinite",
        "scroll":       "scroll 30s linear infinite",
      },
      // ── Font Family ─────────────────────────────────────────
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      // ── Border Radius ───────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
