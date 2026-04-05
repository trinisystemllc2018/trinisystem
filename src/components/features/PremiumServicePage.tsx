"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { PHONE, PHONE_HREF } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   PREMIUM SERVICE PAGE — Ultra-premium animated experience
   Full-screen hero → Brand selector → 15-step fix guide
   → Reviews → FAQ → CTA
───────────────────────────────────────────────────────────── */

interface Brand {
  name: string;
  icon: string;
  sub: string;
  color: string;
  models: string[];
  href?: string;
}

interface Step {
  icon: string;
  title: string;
  detail: string;
}

interface Review {
  name: string;
  stars: number;
  text: string;
  loc: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface Stat {
  value: string;
  label: string;
}

interface TrendingTag {
  label: string;
}

export interface PremiumServicePageProps {
  /* Hero */
  category: "printer" | "gps" | "computer" | "virus";
  badgeText: string;
  heroTitle: string;
  heroHighlight: string;
  heroSub: string;
  heroGradient: string;
  accentColor: string;        // tailwind color like "blue" "emerald" "violet" "red"
  accentHex: string;          // hex like "#3b82f6"
  glowColor: string;          // rgba glow like "rgba(59,130,246,0.5)"
  stats: Stat[];
  trending: TrendingTag[];

  /* Brands */
  brandSectionTitle: string;
  brandSectionSub: string;
  brands: Brand[];

  /* 15 Steps */
  stepsSectionTitle: string;
  stepsSectionSub: string;
  steps: Step[];

  /* Extra CTA in steps */
  stepsCtaLabel?: string;
  stepsCtaHref?: string;

  /* Reviews */
  reviewsTitle: string;
  reviews: Review[];

  /* FAQ */
  faqTitle: string;
  faqs: FAQ[];

  /* Bottom CTA */
  ctaTitle: string;
  ctaSub: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;

  /* Optional download CTA (for computer page) */
  downloadLabel?: string;
  downloadHref?: string;
}

/* ── Animated counter ── */
function AnimCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [val, setVal] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setVal(target); return; }
    const isDecimal = target.includes(".");
    const duration = 1200;
    const steps = 40;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { current = num; clearInterval(timer); }
      setVal(isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString());
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Fade-in wrapper ── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Floating particles ── */
function Particles({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function PremiumServicePage(props: PremiumServicePageProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const accent = props.accentColor;
  const accentMap: Record<string, { bg: string; text: string; border: string; bgLight: string; ring: string; gradient: string }> = {
    blue:    { bg: "bg-blue-600",    text: "text-blue-600",    border: "border-blue-500/30", bgLight: "bg-blue-50",    ring: "ring-blue-400",    gradient: "from-blue-500 to-blue-700" },
    emerald: { bg: "bg-emerald-600", text: "text-emerald-600", border: "border-emerald-500/30", bgLight: "bg-emerald-50", ring: "ring-emerald-400", gradient: "from-emerald-500 to-teal-700" },
    violet:  { bg: "bg-violet-600",  text: "text-violet-600",  border: "border-violet-500/30", bgLight: "bg-violet-50",  ring: "ring-violet-400",  gradient: "from-violet-500 to-purple-700" },
    red:     { bg: "bg-red-600",     text: "text-red-600",     border: "border-red-500/30", bgLight: "bg-red-50",     ring: "ring-red-400",     gradient: "from-red-500 to-red-700" },
  };
  const a = accentMap[accent] || accentMap.blue;

  return (
    <>
      {/* ════════════════════════════════════════════════
          HERO — Full viewport, immersive
      ════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden" style={{ background: props.heroGradient }}>
        <Particles color={props.glowColor} />

        {/* Mesh gradient overlays */}
        <div className="absolute inset-0 opacity-20" style={{
          background: `radial-gradient(ellipse 80% 50% at 20% 40%, ${props.glowColor}, transparent),
                       radial-gradient(ellipse 60% 60% at 80% 20%, ${props.glowColor}, transparent)`
        }} />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }} />

        {/* Animated rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[300, 500, 700].map((size, i) => (
            <motion.div
              key={size}
              className="absolute rounded-full border"
              style={{ width: size, height: size, borderColor: `${props.accentHex}15` }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 bg-white/[0.07] backdrop-blur-md text-white/80 text-xs font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-8 border border-white/[0.12]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: props.accentHex }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: props.accentHex }} />
            </span>
            {props.badgeText}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-black text-white tracking-tight leading-[0.92] mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            {props.heroTitle}<br />
            <span className="inline-block mt-2" style={{
              background: `linear-gradient(90deg, ${props.accentHex}, ${props.accentHex}aa)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 30px ${props.glowColor})`
            }}>
              {props.heroHighlight}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/50 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {props.heroSub}
          </motion.p>

          {/* Stats — big animated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 md:gap-14 mb-12"
          >
            {props.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="text-center group"
              >
                <p className="text-3xl md:text-4xl font-black text-white mb-1 tabular-nums">
                  <AnimCounter target={s.value} />
                </p>
                <p className="text-[10px] text-white/35 font-bold uppercase tracking-[0.15em]">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <a href={PHONE_HREF}
              className="group relative flex items-center justify-center gap-3 bg-white text-gray-900 font-black text-lg px-10 py-5 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.3)] hover:-translate-y-0.5"
            >
              <span className="text-2xl">📞</span>
              Call {PHONE}
              <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-[10px] font-black rounded-full uppercase tracking-wider">Live</span>
            </a>
            {props.downloadLabel && props.downloadHref ? (
              <a href={props.downloadHref}
                className={`flex items-center justify-center gap-2 ${a.bg} hover:opacity-90 text-white font-bold text-base px-10 py-5 rounded-2xl transition-all duration-300 border border-white/10`}
              >
                ⬇ {props.downloadLabel}
              </a>
            ) : (
              <a href="#brands"
                className={`flex items-center justify-center gap-2 ${a.bg} hover:opacity-90 text-white font-bold text-base px-10 py-5 rounded-2xl transition-all duration-300 border border-white/10`}
              >
                Start Free Diagnosis →
              </a>
            )}
          </motion.div>

          {/* Trending tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {props.trending.map((t) => (
              <span key={t.label} className="text-xs bg-white/[0.06] text-white/45 border border-white/[0.08] px-3.5 py-1.5 rounded-full font-medium backdrop-blur-sm">
                🔥 {t.label}
              </span>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-14"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/20 text-sm font-bold uppercase tracking-widest"
            >
              Scroll ↓
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
          BRAND SELECTOR — Full-width premium cards
      ════════════════════════════════════════════════ */}
      <section id="brands" className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Subtle bg pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <span className={`inline-block text-xs font-black uppercase tracking-[0.2em] ${a.text} mb-3`}>Select Your Brand</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">{props.brandSectionTitle}</h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">{props.brandSectionSub}</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {props.brands.map((brand, i) => (
              <FadeIn key={brand.name} delay={i * 0.08}>
                <motion.button
                  onClick={() => setSelectedBrand(selectedBrand === brand.name ? null : brand.name)}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative w-full text-left p-6 md:p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden group
                    ${selectedBrand === brand.name
                      ? `border-[${brand.color}] shadow-2xl ring-4 ${a.ring}/20`
                      : "border-gray-100 hover:border-gray-200 hover:shadow-xl bg-white"
                    }
                  `}
                  style={selectedBrand === brand.name ? { borderColor: brand.color, background: `linear-gradient(135deg, ${brand.color}08, ${brand.color}15)` } : {}}
                >
                  {/* Glow effect on select */}
                  {selectedBrand === brand.name && (
                    <motion.div
                      layoutId="brandGlow"
                      className="absolute inset-0 rounded-3xl"
                      style={{ boxShadow: `0 0 60px ${brand.color}25, inset 0 0 60px ${brand.color}08` }}
                      transition={{ type: "spring", stiffness: 200, damping: 30 }}
                    />
                  )}

                  <div className="relative z-10">
                    {/* Brand icon */}
                    <div className="text-5xl mb-4">{brand.icon}</div>

                    {/* Brand name */}
                    <h3 className="font-black text-gray-900 text-2xl md:text-3xl mb-1 tracking-tight">{brand.name}</h3>
                    <p className="text-xs text-gray-400 font-medium mb-4">{brand.sub}</p>

                    {/* Models */}
                    <div className="space-y-1.5">
                      {brand.models.slice(0, 3).map((m) => (
                        <div key={m} className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: brand.color }} />
                          {m}
                        </div>
                      ))}
                      {brand.models.length > 3 && (
                        <p className="text-xs text-gray-300 font-medium">+{brand.models.length - 3} more</p>
                      )}
                    </div>

                    {/* Arrow */}
                    <div className="mt-5 flex items-center gap-2" style={{ color: brand.color }}>
                      <span className="text-sm font-bold">Fix now</span>
                      <motion.span
                        animate={selectedBrand === brand.name ? { x: [0, 4, 0] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-lg"
                      >→</motion.span>
                    </div>
                  </div>
                </motion.button>
              </FadeIn>
            ))}
          </div>

          {/* Selected brand detail panel */}
          <AnimatePresence>
            {selectedBrand && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className={`${a.bgLight} rounded-3xl p-8 md:p-10 border-2 ${a.border}`}>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 mb-1">
                        {selectedBrand} Support
                      </h3>
                      <p className="text-gray-500">
                        Select your issue below or call us for instant help with your {selectedBrand} device.
                      </p>
                    </div>
                    <a href={PHONE_HREF}
                      className={`shrink-0 ${a.bg} text-white font-black px-8 py-4 rounded-2xl text-lg hover:opacity-90 transition-all shadow-lg`}
                    >
                      📞 Call Now — Free Diagnosis
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
          15-STEP FIX GUIDE — Premium numbered timeline
      ════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className={`inline-block text-xs font-black uppercase tracking-[0.2em] ${a.text} mb-3`}>Step-by-Step Guide</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">{props.stepsSectionTitle}</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">{props.stepsSectionSub}</p>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 md:left-10 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gray-200 via-gray-200 to-transparent hidden sm:block" />

            <div className="space-y-4">
              {props.steps.map((step, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <motion.div
                    onClick={() => setActiveStep(activeStep === i ? null : i)}
                    whileHover={{ x: 4 }}
                    className="relative cursor-pointer group"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-3.5 md:left-7.5 top-7 hidden sm:flex items-center justify-center z-10">
                      <motion.div
                        animate={activeStep === i ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={`w-5 h-5 rounded-full border-[3px] border-white shadow-md ${activeStep === i ? a.bg : "bg-gray-300"} transition-colors duration-300`}
                      />
                    </div>

                    {/* Card */}
                    <div className={`
                      sm:ml-16 md:ml-20 rounded-2xl md:rounded-3xl border-2 transition-all duration-300 overflow-hidden
                      ${activeStep === i
                        ? `${a.border} shadow-xl bg-white`
                        : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-md"
                      }
                    `}>
                      <div className="p-5 md:p-7 flex items-start gap-4 md:gap-5">
                        {/* Step number */}
                        <div className={`
                          shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-black text-lg md:text-xl transition-all duration-300
                          ${activeStep === i
                            ? `${a.bg} text-white shadow-lg`
                            : "bg-gray-100 text-gray-400"
                          }
                        `}>
                          {String(i + 1).padStart(2, "0")}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">{step.icon}</span>
                            <h3 className="font-black text-gray-900 text-base md:text-lg">{step.title}</h3>
                          </div>

                          {/* Expandable detail */}
                          <AnimatePresence>
                            {activeStep === i && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <p className="text-gray-500 text-sm leading-relaxed mt-2 pr-4">{step.detail}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Expand icon */}
                        <motion.div
                          animate={{ rotate: activeStep === i ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="shrink-0 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 9l-7 7-7-7"/></svg>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Steps CTA */}
          <FadeIn delay={0.2}>
            <div className="mt-12 p-6 md:p-8 rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/50 text-center">
              <p className="text-gray-500 mb-1 text-sm font-medium">Stuck on any step?</p>
              <p className="text-gray-900 font-black text-xl mb-5">Our tech walks you through it live — for free.</p>
              <a href={PHONE_HREF}
                className={`inline-flex items-center gap-2 ${a.bg} text-white font-black text-lg px-10 py-4 rounded-2xl hover:opacity-90 transition-all shadow-lg`}
              >
                📞 Call {PHONE} — Free Walkthrough
              </a>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
          REVIEWS — Premium testimonial cards
      ════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    className="text-3xl"
                  >⭐</motion.span>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{props.reviewsTitle}</h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {props.reviews.map((r, i) => (
              <FadeIn key={r.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
                  className="bg-gray-50 rounded-3xl p-6 border border-gray-100 transition-shadow"
                >
                  <div className="flex text-amber-400 mb-3 text-sm gap-0.5">
                    {"⭐".repeat(r.stars)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${a.bg} flex items-center justify-center text-white text-xs font-black`}>
                      {r.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                      <p className="text-xs text-gray-400">{r.loc}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
          FAQ — Accordion style
      ════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12 tracking-tight">{props.faqTitle}</h2>
          </FadeIn>

          <div className="space-y-3">
            {props.faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <motion.div
                  className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${openFaq === i ? `${a.border} bg-white shadow-md` : "border-gray-100 bg-white"}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                  >
                    <span className="font-bold text-gray-900 pr-4">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaq === i ? `${a.bgLight}` : "bg-gray-50"}`}
                    >
                      <svg className={`w-4 h-4 transition-colors ${openFaq === i ? a.text : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 9l-7 7-7-7"/></svg>
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
          BOTTOM CTA — Full-bleed with glow
      ════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-24 text-white text-center overflow-hidden" style={{ background: props.heroGradient }}>
        <Particles color={props.glowColor} />
        <div className="absolute inset-0 opacity-10" style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${props.glowColor}, transparent)`
        }} />

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{props.ctaTitle}</h2>
            <p className="text-white/50 text-lg mb-10">{props.ctaSub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={props.ctaPrimaryHref}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 bg-white text-gray-900 font-black text-lg px-10 py-5 rounded-2xl shadow-2xl"
              >
                📞 {props.ctaPrimaryLabel}
              </motion.a>
              <motion.a
                href="https://discord.gg/trinisystem"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base px-10 py-5 rounded-2xl transition-all"
              >
                💬 Join Discord — Free Help
              </motion.a>
            </div>
            <p className="text-white/25 text-xs mt-6 tracking-wide">No fix = no fee · All 50 US states · Available 24/7</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
