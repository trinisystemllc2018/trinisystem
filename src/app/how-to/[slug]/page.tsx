import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import VisualWalkthrough from "@/components/features/VisualWalkthrough";
import { GMAIL_PAGES, ALL_GMAIL_SLUGS, type GmailPage } from "@/lib/gmail-data";

/* ═══════════════════════════════════════════════════════════════════
   /how-to/[slug] — Senior help cluster (Gmail v1)

   This route handles all 12 Gmail pages from a single template.
   Future brands (Yahoo, Outlook, Facebook, etc.) will follow the same
   data file → dynamic route pattern, dramatically scaling the
   senior-help vertical without writing new templates.

   SEO features:
   - Multi-schema stacking: Article + HowTo + FAQPage + BreadcrumbList
     + WebPage + Organization (mirrors /garmin/[slug] pattern)
   - generateStaticParams pre-renders ALL pages at build time
   - Per-page <title>, description, and canonical
   - Heavy internal linking via relatedSlugs
   - AI-citation-optimized: TL;DR in first 60 words, declarative answers
   - Senior UX: 18px+ body, 30px+ headings, sticky phone CTA
═══════════════════════════════════════════════════════════════════ */

const SITE = "https://trinisystem.vercel.app";
const PHONE = "+13479531531";
const PHONE_DISPLAY = "347-953-1531";

type Props = { params: { slug: string } };

// Pre-render every page at build time = fastest TTFB for SEO
export function generateStaticParams() {
  return ALL_GMAIL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = GMAIL_PAGES[params.slug];
  if (!page) return {};

  const url = `${SITE}/how-to/${params.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.primaryKeywords,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: "Trini System",
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default function GmailHelpPage({ params }: Props) {
  const page = GMAIL_PAGES[params.slug];
  if (!page) return notFound();

  const url = `${SITE}/how-to/${params.slug}`;
  const today = new Date().toISOString().split("T")[0];

  // ─── SCHEMA STACK ────────────────────────────────────────────────
  // Each schema is independently validated and serves a distinct AI/SEO purpose
  const schemas = [
    // 1. BreadcrumbList — Google sitelinks + AI navigation
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "How-To Guides", item: `${SITE}/how-to` },
        { "@type": "ListItem", position: 3, name: page.h1, item: url },
      ],
    },
    // 2. Article — main page schema for editorial-style ranking
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.metaTitle,
      description: page.metaDescription,
      image: `${SITE}/logo.svg`,
      datePublished: today,
      dateModified: today,
      author: {
        "@type": "Organization",
        name: "Trini System",
        url: SITE,
      },
      publisher: {
        "@type": "Organization",
        name: "Trini System LLC",
        logo: { "@type": "ImageObject", url: `${SITE}/logo.svg` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    },
    // 3. HowTo — qualifies for HowTo rich result on Google
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: page.h1,
      description: page.tldrAnswer,
      totalTime: `PT${page.estimatedTime.replace(/\D/g, "") || "5"}M`,
      step: page.textSteps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.detail,
      })),
    },
    // 4. FAQPage — qualifies for FAQ rich result on Google + AI citation gold
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    // 5. WebPage with speakable — voice search / Alexa / Google Assistant
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.metaTitle,
      description: page.metaDescription,
      isPartOf: { "@id": `${SITE}#website` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".tldr-answer", "h1", ".faq-answer"],
      },
      potentialAction: [
        {
          "@type": "ReadAction",
          target: [url],
        },
      ],
    },
    // 6. Service offering — converts informational → commercial intent
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Senior Tech Help — Phone Support",
      description: "Free phone help for seniors with Gmail, email, and account problems.",
      provider: {
        "@type": "LocalBusiness",
        name: "Trini System LLC",
        telephone: PHONE,
        address: { "@type": "PostalAddress", addressCountry: "US" },
      },
      areaServed: { "@type": "Country", name: "United States" },
      audience: { "@type": "PeopleAudience", suggestedMinAge: 60 },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free initial consultation by phone",
      },
    },
  ];

  return (
    <div className="bg-white">
      {/* SCHEMA INJECTION — multi-schema stacking for max AEO coverage */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ═══════════════════════ STICKY PHONE CTA — top of every page ═══════════════════════ */}
      <div className="bg-emerald-600 text-white py-3 px-4 sticky top-0 z-40 shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="font-semibold text-base">
            🆘 Stuck? Call Trini System — free help in under 15 minutes
          </div>
          <a
            href={`tel:${PHONE.replace(/\D/g, "")}`}
            className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-5 py-2 rounded-xl whitespace-nowrap transition"
          >
            📞 {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* ═══════════════════════ BREADCRUMBS ═══════════════════════ */}
      <nav className="max-w-4xl mx-auto px-4 pt-6 text-sm" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-gray-600">
          <li><Link href="/" className="hover:text-blue-600 underline">Home</Link></li>
          <li>›</li>
          <li><Link href="/how-to" className="hover:text-blue-600 underline">How-To Guides</Link></li>
          <li>›</li>
          <li className="font-semibold text-gray-900">{page.h1}</li>
        </ol>
      </nav>

      {/* ═══════════════════════ HERO + TLDR ═══════════════════════ */}
      <header className="max-w-4xl mx-auto px-4 pt-8 pb-4">
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
            Gmail Help
          </span>
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">
            ⏱ {page.estimatedTime}
          </span>
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">
            Difficulty: {page.difficultyLabel}
          </span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
            Updated: {today}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
          {page.h1}
        </h1>

        {/* TL;DR — first 60 words, AI-citation sweet spot */}
        <div className="tldr-answer bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-2xl my-6">
          <div className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-2">
            Quick answer
          </div>
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed">{page.tldrAnswer}</p>
        </div>

        {/* Big CTA — practice tour */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <a
            href="#walkthrough"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-6 rounded-2xl text-center transition shadow-lg"
          >
            👇 Practice it visually (free)
          </a>
          <a
            href={`tel:${PHONE.replace(/\D/g, "")}`}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-4 px-6 rounded-2xl text-center transition shadow-lg"
          >
            📞 Get help by phone — free
          </a>
        </div>
      </header>

      {/* ═══════════════════════ VISUAL WALKTHROUGH ═══════════════════════ */}
      <section id="walkthrough" className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 mt-6">
          Practice it first — see exactly where to click
        </h2>
        <p className="text-lg text-gray-700 mb-2">
          Below is a safe practice version of {page.h1.replace(/^How to /i, "").replace(/^I /i, "")}. Click through it as many times as you want — nothing happens to your real Gmail.
        </p>
        <VisualWalkthrough screens={page.walkthrough} />
      </section>

      {/* ═══════════════════════ TEXT STEPS ═══════════════════════ */}
      <section className="max-w-4xl mx-auto px-4 my-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Step-by-step instructions (read at your pace)
        </h2>
        <ol className="space-y-5">
          {page.textSteps.map((step, i) => (
            <li key={i} className="flex gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-200">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {i + 1}
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-1">{step.title}</h3>
                <p className="text-lg text-gray-700 leading-relaxed">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ═══════════════════════ "WHAT IF IT DIDN'T WORK" ═══════════════════════ */}
      <section className="max-w-4xl mx-auto px-4 my-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          What if these steps didn't work?
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Here are the most common problems and how to fix them.
        </p>
        <div className="space-y-4">
          {page.whatIfNotWork.map((item, i) => (
            <div key={i} className="bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl p-5">
              <h3 className="font-bold text-lg text-amber-900 mb-2">❓ {item.problem}</h3>
              <p className="text-lg text-gray-800 leading-relaxed">{item.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ FAQ — schema-backed ═══════════════════════ */}
      <section className="max-w-4xl mx-auto px-4 my-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Common questions about {page.primaryQuery}
        </h2>
        <div className="space-y-4">
          {page.faqs.map((faq, i) => (
            <details
              key={i}
              className="bg-white border-2 border-gray-200 rounded-2xl p-5 group hover:border-blue-300 transition"
              open={i < 3}
            >
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-start gap-3">
                <span>{faq.q}</span>
                <span className="text-blue-500 text-2xl group-open:rotate-45 transition flex-shrink-0">+</span>
              </summary>
              <p className="faq-answer text-lg text-gray-700 leading-relaxed mt-3">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ RELATED PAGES — internal linking ═══════════════════════ */}
      {page.relatedSlugs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 my-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Related Gmail help guides
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {page.relatedSlugs.map((slug) => {
              const related = GMAIL_PAGES[slug];
              if (!related) return null;
              return (
                <Link
                  key={slug}
                  href={`/how-to/${slug}`}
                  className="block bg-white border-2 border-gray-200 hover:border-blue-400 rounded-2xl p-5 transition hover:shadow-lg group"
                >
                  <div className="text-sm text-blue-600 font-medium mb-1">→ Gmail Help</div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition">
                    {related.h1}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {related.metaDescription}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ═══════════════════════ FINAL PHONE CTA ═══════════════════════ */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-12 px-4 my-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Still confused? We're here to help — really.
          </h2>
          <p className="text-xl mb-6 text-emerald-50">
            A real person at Trini System will walk you through it on the phone. No fees, no upsells, no judgment. We talk to seniors all day, every day.
          </p>
          <a
            href={`tel:${PHONE.replace(/\D/g, "")}`}
            className="inline-block bg-white text-emerald-700 font-bold text-2xl px-8 py-5 rounded-2xl hover:bg-emerald-50 transition shadow-2xl"
          >
            📞 Call {PHONE_DISPLAY}
          </a>
          <p className="text-sm text-emerald-100 mt-4">
            Average response time: under 15 minutes • English & Spanish
          </p>
        </div>
      </section>
    </div>
  );
}
