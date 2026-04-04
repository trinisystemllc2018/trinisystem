"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { REVIEWS, PHONE_HREF, PHONE } from "@/lib/utils";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsCarousel() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? REVIEWS.length - 1 : a - 1));
  const next = () => setActive((a) => (a === REVIEWS.length - 1 ? 0 : a + 1));

  const review = REVIEWS[active];

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-blue-50/40 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-yellow-200">
            ⭐ Customer Reviews
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
            Real People. Real Results.
          </h2>
          <p className="text-gray-500 text-lg">4.9 stars · 47 verified reviews · Google &amp; Yelp</p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-3xl shadow-soft-xl border border-gray-100 p-8 md:p-10"
              itemScope
              itemType="https://schema.org/Review"
            >
              <meta itemProp="itemReviewed" content="Trini System LLC" />
              <StarRating rating={review.rating} />
              <meta itemProp="reviewRating" content={String(review.rating)} />

              <blockquote className="mt-4 text-gray-800 text-lg md:text-xl leading-relaxed font-medium" itemProp="reviewBody">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="font-black text-gray-900" itemProp="author">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.service} · via {review.source}</p>
                </div>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} aria-label="Previous review"
              className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-400 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all">
              ←
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Review ${i + 1}`}
                  className={`rounded-full transition-all ${i === active ? "w-6 h-2.5 bg-blue-600" : "w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300"}`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next review"
              className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-400 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all">
              →
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-brand hover:from-blue-700 hover:to-blue-800 transition-all">
            📞 Join Our Happy Customers — {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  const items = [
    { icon: "🛡️", title: "No Fix = No Fee",       sub: "100% satisfaction or you pay nothing" },
    { icon: "⚡", title: "15-Minute Response",    sub: "Technician on the call fast" },
    { icon: "🌎", title: "All 50 US States",      sub: "Fully remote — no travel needed" },
    { icon: "💰", title: "50% Less Than Retail",  sub: "vs. Geek Squad &amp; Best Buy" },
    { icon: "🔒", title: "Safe &amp; Secure",     sub: "We share your screen, nothing else" },
    { icon: "📞", title: "24/7 Availability",     sub: "Even weekends &amp; holidays" },
  ];
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <div key={item.title} className="text-center p-4">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="font-black text-gray-900 text-sm mb-1">{item.title}</p>
              <p className="text-xs text-gray-500" dangerouslySetInnerHTML={{ __html: item.sub }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
