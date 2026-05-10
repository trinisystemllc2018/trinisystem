# v4.0 — Template Design Language Applied

## What changed

### Design Tokens (from reference template)
- Adopted **HSL design system** — `--primary: 262° 83% 57%` (purple)
- Pure dark canvas: `hsl(240 10% 3.9%)` background
- Emerald-to-blue `gradient-text` accent class added
- Amber/gold accents → **purple** throughout (CTAs, hover states, glows)

### New Features (template-inspired)
- **Custom cursor** (`CustomCursor.tsx`) — purple dot + outline that follows mouse with spring lag, expands on hover over interactive elements
- **Scroll-reveal** (`ScrollRevealProvider.tsx`) — IntersectionObserver hook that adds `.is-visible` to `.scroll-reveal` elements
- **Glassmorphism utilities** — `.glass`, `.glass-dark`, `.glass-card`
- **Marquee animations** — `.animate-marquee`, `.animate-marquee-reverse`
- **3D perspective** — `.perspective-1000`, `.rotateX-3`, `.rotateX-0`
- **Custom purple scrollbar**
- **Click ripple** — `.click-ripple` adds a purple expanding circle on click
- **Magnetic hover** — `.magnetic` class for cards
- **Float animation** — `.animate-float` for orbs
- **Text shimmer** — animated gold/purple shimmer on hero headline

### Preserved Untouched
- ✅ HeroSearchIsland search box (exact same)
- ✅ All quick-fix pills, layout, navigation structure
- ✅ Page hierarchy, routes, schemas, sitemap
- ✅ Trust stats grid, CTA buttons positioning
- ✅ All SEO/AEO infrastructure
- ✅ Programmatic routes (fix-printer, garmin-update, error-code, compare)

### Color System
| Element | v3.2 (Old) | v4 (New) |
|---------|------------|----------|
| Primary CTA | Amber gradient | Purple gradient |
| Hero orbs | Amber + violet | Purple + blue + emerald |
| Aurora ribbon | Amber/violet | Purple/blue/emerald |
| Service card glow | Black + amber | Black + purple |
| Footer header | Amber-tinted | Purple-tinted |
| Scrollbar | Default | Purple |
| Cursor | System | Purple dot + outline |
| Navbar logo | Amber | Purple |

### Files Added
- `src/components/ui/CustomCursor.tsx`
- `src/components/ui/ScrollRevealProvider.tsx`

### Files Replaced
- `src/app/globals.css` (full rewrite — template tokens + Trini structure preserved)

### Files Updated
- `src/app/layout.tsx` (added cursor + scroll-reveal providers)
- `src/app/page.tsx` (purple CTAs, scroll-reveal on cards)
- `src/components/layout/Navbar.tsx` (amber → purple)
- `src/components/layout/Footer.tsx` (amber + blue → purple)
- `src/components/sections/BelowFoldSections.tsx` (amber → purple)
- 12 other source files (bulk amber → purple replacement)

## Deploy
```bash
unzip trinisystem-v4.zip
cd trinisystem-v4
npm install && npx vercel
```

## Performance
- Custom cursor uses `requestAnimationFrame` with spring lerp — no jank
- Scroll-reveal uses IntersectionObserver (auto-unobserves after first reveal)
- Both auto-disable on touch devices and `prefers-reduced-motion`
- Zero new dependencies — pure React + CSS
- LCP target unchanged (search box still the only client island above fold)
