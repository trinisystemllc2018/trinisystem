"use client";
import Link from "next/link";
import { REVIEWS, PHONE_HREF } from "@/lib/utils";

// ── 8-Year Trust Banner ───────────────────────────────────────
export function EightYearTrustBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 py-3 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
        <div className="flex items-center gap-2 text-white text-sm font-semibold">
          <span className="text-yellow-300 text-base">🏆</span>
          <span>Trusted Since 2016 — 8+ Years of Remote Tech Support</span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-blue-400" />
        <div className="flex items-center gap-4 text-sm text-blue-100 font-medium">
          <span className="flex items-center gap-1">
            <span className="text-yellow-300">⭐</span> 4.9 Google Rating
          </span>
          <span>·</span>
          <span>47 Reviews</span>
          <span>·</span>
          <span>All 50 States</span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-blue-400" />
        <a
          href={PHONE_HREF}
          className="text-white font-black text-sm hover:text-yellow-300 transition-colors"
        >
          📞 347-953-1531 — Available Now
        </a>
      </div>
    </div>
  );
}

// ── Google Reviews Grid Section ───────────────────────────────
function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function GoogleReviewsSection() {
  // Show first 3 reviews in a grid
  const featured = REVIEWS.slice(0, 3);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-yellow-200">
              ⭐ Verified Google Reviews
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              What Customers Are Saying
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-black text-gray-900 text-lg">4.9</span>
              <span className="text-gray-500 text-sm">· 47 reviews · Google &amp; Yelp</span>
            </div>
          </div>
          <a
            href="https://share.google/1mtrJVk8Ya0PkjG76"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-sm px-5 py-3 rounded-2xl transition-colors shrink-0"
          >
            ⭐ Leave a Review
          </a>
        </div>

        {/* Reviews grid */}
        <div
          className="grid md:grid-cols-3 gap-4"
          itemScope
          itemType="https://schema.org/LocalBusiness"
        >
          <meta itemProp="name" content="Trini System LLC" />
          <meta itemProp="aggregateRating" content="4.9" />

          {featured.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft hover:shadow-card-hover transition-all"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="flex items-start justify-between mb-3">
                <StarRow rating={review.rating} />
                <span className="text-xs text-gray-400 shrink-0 ml-2">{review.source}</span>
              </div>

              <blockquote
                className="text-gray-700 text-sm leading-relaxed mb-4"
                itemProp="reviewBody"
              >
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <div>
                  <p className="font-bold text-gray-900 text-sm" itemProp="author">
                    {review.name}
                  </p>
                  <p className="text-xs text-gray-400">{review.service}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black text-sm">
                  {review.name[0]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Over 47 verified reviews across Google &amp; Yelp — and counting.
          </p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-brand hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            📞 Get Your Problem Fixed Today
          </a>
        </div>
      </div>
    </section>
  );
}
