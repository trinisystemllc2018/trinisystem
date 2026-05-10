import { Suspense } from "react";

/**
 * LiveStatusStrip — demonstrates Streaming + Suspense.
 *
 * Static parts (the section frame, headings) render instantly as part of the
 * page shell. The "currently helping X people" number is fetched server-side
 * with an artificial delay to simulate a real backend call — Suspense streams
 * a skeleton until the data is ready.
 *
 * Pattern from Next.js 14: async server component + Suspense fallback = streaming UI.
 */

async function LiveCount() {
  // Simulated async data fetch (replace with real DB/API call in production)
  await new Promise((r) => setTimeout(r, 800));
  // In production: const data = await fetch(`${BASE}/api/live-status`, { next: { revalidate: 30 } });
  const helping = Math.floor(Math.random() * 8) + 4; // 4-11 active sessions
  const queueWait = Math.floor(Math.random() * 4) + 2; // 2-5 min wait
  return (
    <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto">
      <div
        className="rounded-2xl py-5 px-3 text-center transition-transform hover:scale-105"
        style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.02))",
          border: "1px solid rgba(16,185,129,0.25)",
        }}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="pulse-dot" aria-hidden="true" />
          <span className="text-3xl md:text-4xl font-black text-emerald-400 stat-3d">{helping}</span>
        </div>
        <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/55">
          Active Sessions
        </div>
      </div>
      <div
        className="rounded-2xl py-5 px-3 text-center transition-transform hover:scale-105"
        style={{
          background: "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(249,115,22,0.02))",
          border: "1px solid rgba(249,115,22,0.25)",
        }}
      >
        <div className="text-3xl md:text-4xl font-black mb-1 stat-3d"
          style={{
            background: "linear-gradient(135deg, #f97316, #ef4444)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
          ~{queueWait}m
        </div>
        <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/55">
          Avg Response
        </div>
      </div>
      <div
        className="rounded-2xl py-5 px-3 text-center transition-transform hover:scale-105"
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(168,85,247,0.02))",
          border: "1px solid rgba(168,85,247,0.25)",
        }}
      >
        <div className="text-3xl md:text-4xl font-black text-purple-400 stat-3d">24/7</div>
        <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/55">
          Always Open
        </div>
      </div>
    </div>
  );
}

function LiveCountSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto" role="status" aria-label="Loading live status">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-2xl py-5 px-3 text-center animate-pulse"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="h-9 w-16 mx-auto rounded mb-2" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div className="h-3 w-24 mx-auto rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>
      ))}
      <span className="sr-only">Loading live status...</span>
    </div>
  );
}

export function LiveStatusStrip() {
  return (
    <section
      className="py-12 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000 0%, #050008 100%)" }}
      aria-label="Live support status"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400 inline-flex items-center gap-2">
            <span className="pulse-dot" aria-hidden="true" />
            <span>Live Support Status</span>
          </p>
        </div>
        <Suspense fallback={<LiveCountSkeleton />}>
          <LiveCount />
        </Suspense>
      </div>
    </section>
  );
}
