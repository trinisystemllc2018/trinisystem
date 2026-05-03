import type { Metadata } from "next";
import Link from "next/link";
import { GMAIL_PAGES } from "@/lib/gmail-data";

export const metadata: Metadata = {
  title: "Senior Tech Help — Easy How-To Guides for Email, Phones & Computers",
  description:
    "Free, plain-English help guides written for seniors. Step-by-step pictures and a real phone number for live help: 347-953-1531. No jargon, no rush.",
  alternates: { canonical: "https://trinisystem.vercel.app/how-to" },
  openGraph: {
    title: "Senior Tech Help — Easy How-To Guides | Trini System",
    description:
      "Free, plain-English help guides written for seniors. Step-by-step pictures included.",
    url: "https://trinisystem.vercel.app/how-to",
    type: "website",
  },
};

export default function HowToHub() {
  const gmail = Object.values(GMAIL_PAGES);

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Senior Tech Help — Trini System How-To Guides",
            description:
              "Plain-English step-by-step guides for seniors covering Gmail, email, login, password recovery, and more.",
            url: "https://trinisystem.vercel.app/how-to",
            hasPart: gmail.map((p) => ({
              "@type": "Article",
              headline: p.h1,
              url: `https://trinisystem.vercel.app/how-to/${p.slug}`,
              about: p.primaryQuery,
            })),
          }),
        }}
      />

      <div className="bg-gradient-to-br from-blue-50 to-emerald-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Easy Tech Help Guides Written for Seniors
          </h1>
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            No jargon. Big pictures. Plain English. Every guide ends with a phone number where a real person will help you for free.
          </p>
          <a
            href="tel:3479531531"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xl px-8 py-4 rounded-2xl shadow-lg transition"
          >
            📞 Call us now: 347-953-1531
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">📧 Gmail Help Guides</h2>
          <p className="text-lg text-gray-700 mb-6">
            Everything you need to know about Gmail — login, password recovery, sending emails, and how to spot scams.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {gmail.map((page) => (
              <Link
                key={page.slug}
                href={`/how-to/${page.slug}`}
                className="block bg-white border-2 border-gray-200 hover:border-blue-400 rounded-2xl p-5 transition hover:shadow-lg group"
              >
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition leading-snug">
                  {page.h1}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{page.metaDescription}</p>
                <div className="flex items-center gap-3 mt-3 text-xs">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-semibold">
                    ⏱ {page.estimatedTime}
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-semibold">
                    {page.difficultyLabel}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Coming-soon section — primes the pump for future brand clusters */}
        <div className="mt-12 bg-gray-50 rounded-3xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">More guides coming soon</h2>
          <p className="text-lg text-gray-700">
            We're working on guides for Yahoo Mail, Outlook, Facebook, Netflix, Medicare, Social Security, and more. Need help with something not listed? <a href="tel:3479531531" className="text-blue-600 font-semibold underline">Call us</a> — we'll help anyway.
          </p>
        </div>
      </div>
    </div>
  );
}
