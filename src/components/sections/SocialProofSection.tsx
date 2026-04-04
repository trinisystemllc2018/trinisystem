"use client";
import { SOCIAL, PHONE_HREF } from "@/lib/utils";

const PLATFORM_COLORS: Record<string, string> = {
  Facebook: "bg-blue-600",
  YouTube:  "bg-red-600",
  TikTok:   "bg-gray-900",
  Google:   "bg-yellow-500",
  Yelp:     "bg-red-500",
};

const PLATFORM_ICONS: Record<string, string> = {
  Facebook: "f",
  YouTube:  "▶",
  TikTok:   "♪",
  Google:   "G",
  Yelp:     "★",
};

export function SocialProofSection() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            Follow Us &amp; Leave a Review
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">
            Find Us Everywhere
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {SOCIAL.map((s) => (
            <a
              key={s.platform}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="group flex items-center gap-3 bg-white border-2 border-gray-100 hover:border-gray-200 rounded-2xl px-5 py-3.5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className={`w-9 h-9 ${PLATFORM_COLORS[s.platform] ?? "bg-gray-600"} text-white rounded-xl flex items-center justify-center font-black text-sm`}>
                {PLATFORM_ICONS[s.platform] ?? s.platform[0]}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm leading-tight">{s.platform}</p>
                <p className="text-xs text-gray-500">{s.followers}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Google review CTA */}
        <div className="mt-10 bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6 text-center max-w-xl mx-auto">
          <p className="text-2xl mb-2">⭐⭐⭐⭐⭐</p>
          <p className="font-black text-gray-900 text-lg mb-1">Happy with our service?</p>
          <p className="text-gray-600 text-sm mb-4">Leaving a Google review takes 60 seconds and helps other seniors find trustworthy tech support.</p>
          <a
            href="https://share.google/1mtrJVk8Ya0PkjG76"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-2xl transition-colors"
          >
            ⭐ Leave a Google Review
          </a>
        </div>
      </div>
    </section>
  );
}
