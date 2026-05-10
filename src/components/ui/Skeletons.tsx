/**
 * Senior-friendly skeleton placeholders.
 *
 * Used as Suspense fallbacks throughout the site to give immediate visual
 * feedback while content loads. Prevents the "did the site break?" feeling
 * that a blank white screen creates — especially confusing for older users.
 *
 * All skeletons use a subtle pulse animation matching the site's orange/red
 * theme, and sit on dark backgrounds.
 */

export function CardSkeleton() {
  return (
    <div
      className="rounded-2xl p-6 animate-pulse"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      aria-hidden="true"
    >
      <div className="w-12 h-12 rounded-2xl mb-4" style={{ background: "rgba(249,115,22,0.15)" }} />
      <div className="h-5 w-3/4 rounded mb-3" style={{ background: "rgba(255,255,255,0.08)" }} />
      <div className="h-3 w-full rounded mb-2" style={{ background: "rgba(255,255,255,0.05)" }} />
      <div className="h-3 w-5/6 rounded mb-4" style={{ background: "rgba(255,255,255,0.05)" }} />
      <div className="h-3 w-1/3 rounded" style={{ background: "rgba(249,115,22,0.2)" }} />
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading content...</span>
    </div>
  );
}

export function SectionSkeleton({ heightClass = "min-h-[400px]" }: { heightClass?: string }) {
  return (
    <section
      role="status"
      aria-label="Loading section"
      className={`${heightClass} flex flex-col items-center justify-center px-4 py-20`}
    >
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div
            className="w-12 h-12 rounded-full animate-pulse"
            style={{
              background: "linear-gradient(135deg, rgba(249,115,22,0.3), rgba(239,68,68,0.3))",
              boxShadow: "0 0 30px rgba(249,115,22,0.3)",
            }}
          />
        </div>
        <div className="text-center">
          <div
            className="h-8 w-3/4 mx-auto rounded mb-4 animate-pulse"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          <div
            className="h-4 w-1/2 mx-auto rounded animate-pulse"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
        </div>
        <p className="sr-only">Loading...</p>
      </div>
    </section>
  );
}

export function HeroSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading hero"
      className="min-h-[60vh] flex flex-col items-center justify-center px-4"
      style={{ background: "#000" }}
    >
      <div className="text-center max-w-2xl w-full">
        <div
          className="h-6 w-48 mx-auto rounded-full mb-8 animate-pulse"
          style={{ background: "rgba(249,115,22,0.15)" }}
        />
        <div
          className="h-14 w-full rounded mb-4 animate-pulse"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <div
          className="h-14 w-4/5 mx-auto rounded mb-8 animate-pulse"
          style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.2), rgba(239,68,68,0.2))" }}
        />
        <div className="flex gap-3 justify-center">
          <div
            className="h-12 w-44 rounded-2xl animate-pulse"
            style={{ background: "rgba(249,115,22,0.3)" }}
          />
          <div
            className="h-12 w-36 rounded-2xl animate-pulse"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </section>
  );
}

export function ListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div role="status" aria-label="Loading list" className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-4 rounded-xl animate-pulse"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ background: "rgba(16,185,129,0.4)" }}
          />
          <div className="flex-1 min-w-0">
            <div className="h-4 w-2/3 rounded mb-2" style={{ background: "rgba(255,255,255,0.08)" }} />
            <div className="h-3 w-1/3 rounded" style={{ background: "rgba(255,255,255,0.04)" }} />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div role="status" aria-label="Loading form" className="flex flex-col gap-4 max-w-md mx-auto">
      <div className="h-4 w-20 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.08)" }} />
      <div className="h-12 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
      <div className="h-4 w-24 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.08)" }} />
      <div className="h-12 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
      <div
        className="h-14 rounded-2xl animate-pulse"
        style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.4), rgba(239,68,68,0.4))" }}
      />
      <span className="sr-only">Loading form...</span>
    </div>
  );
}
