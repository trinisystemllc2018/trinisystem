# Trini System LLC — Next.js Website v3.0

## What's New in v3.0

### New Pages
| URL | Keywords | Monthly Searches |
|-----|----------|-----------------|
| /hp-printer-offline | "hp printer offline" | 18,000 |
| /printer-wont-print | "printer won't print" | 12,000 |
| /windows-11-slow-fix | "windows 11 slow" | 9,800 |
| /brother-printer-repair | "brother printer repair" | 5,400 |
| /error-code/[brand]/[code] | Brand error codes | varies |
| /compare/[slug] | "hp vs canon printer" | varies |

### SEO Improvements
- AEO speakable: added `.faq-answer` + `.step-description` selectors
- FAQPage + HowTo + BreadcrumbList schema on all new pages
- Updated sitemap.ts covers all new routes
- New redirects in next.config.js

## Quick Start
```bash
npm install && npm run dev
```

## Deploy
```bash
npx vercel
```

## Key Files
- Phone: `src/lib/utils.ts` → PHONE
- Error codes: `src/app/error-code/[brand]/[code]/page.tsx` → ERROR_DB
- Sitemap: `src/app/sitemap.ts`
- Schemas: `src/app/layout.tsx`

## Contact
Trini System LLC · 347-953-1531 · Available 24/7
