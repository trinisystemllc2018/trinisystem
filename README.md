# Trini System LLC — Website (v5, dual-theme refresh)

Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · lucide-react.

## What changed in this refresh
A clean rebuild of the shared shell and the two flagged pages, plus every systemic
fix from the UI/UX audit. **The graphics and scroll effects are all kept** — they're
now driven by theme tokens so they look right in both light and dark.

### Dual light / dark theme
- Semantic tokens live in `src/app/globals.css` (`:root` / `[data-theme="light"]`).
  Change a token once and the whole UI reflows — readable in **both** modes.
- A no-flash inline script in `layout.tsx` applies the saved choice (or the system
  preference) before first paint.
- Toggle component: `src/components/ui/ThemeToggle.tsx` (in the header + mobile menu).
- Dark is the signature default.

### Audit fixes applied
1. **One coherent system** — shell, homepage and contact are fully token-driven.
2. **Contact form no longer fakes success** — it shows "sent" only on a 200, and an
   error state (with the phone number) otherwise.
3. **Cursor keeps the native caret over text fields** so you can see where you type.
4. **Visible keyboard focus** — a global `:focus-visible` ring in both themes.
5. **Bottom-right declutter** — support bubble, back-to-top and the sticky CTA now
   live in one coordinated stack and never overlap (the bar lifts the FABs).
6. **Honest microcopy** on contact (no hard "5-minute" guarantee).
7. **Consistent primary CTA colour** (orange→red) across the rebuilt surfaces.
8. **Emoji icons replaced** with lucide icons in the header and floating UI.
9. **Exit-intent popup remembers dismissal** for 7 days (localStorage).

### New header
`src/components/layout/Navbar.tsx` — a floating glass command bar with a segmented
pill nav, sliding active underline, lucide icons and the theme toggle.

### Innovative cursor
`src/components/ui/CustomCursor.tsx` — a precision reticle ring (with `mix-blend-mode:
difference` so it stands out on any background) plus a comet trail and a contextual
label ("Open", "Call", "Type"…). Hidden on touch / reduced-motion.

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (needs network for the Inter font)
```

## Theming the remaining content pages (next step)
The shell, homepage and contact page are hand-tuned for both themes. The older
brand/service content pages still use hard-coded colours, so they render readably but
**don't yet switch with the toggle** — they look fully coherent in **light** mode.
To make one respond to the toggle, swap its hard-coded colours for tokens:

| Replace                        | With                       |
|--------------------------------|----------------------------|
| `bg-white`                     | `t-surface`                |
| `bg-gray-50` / section light bg| `bg-section-dark`          |
| `text-gray-900` / `-800`       | `t-text`                   |
| `text-gray-600` / `-500`       | `t-muted`                  |
| `text-gray-400`                | `t-faint`                  |
| `border-gray-100/200`          | `style border var(--border)`|
| primary button gradient        | `var(--primary)→var(--primary-2)`, text `var(--on-primary)` |

Always convert a page's **background, text and borders together** so it stays
readable in both modes.

© 2016–2026 Trini System LLC — independent tech support.
