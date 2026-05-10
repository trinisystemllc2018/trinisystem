import { HeroSkeleton, GridSkeleton } from "@/components/ui/Skeletons";

/**
 * Root-level loading UI — Next.js automatically wraps the page in <Suspense>
 * with this fallback while the page navigates or hydrates. Streamed in
 * before the actual content is ready, so seniors never see a blank screen.
 */
export default function Loading() {
  return (
    <main aria-busy="true" aria-live="polite">
      <HeroSkeleton />
      <section className="px-4 py-12" style={{ background: "#020005" }}>
        <div className="max-w-6xl mx-auto">
          <div
            className="h-6 w-48 mx-auto rounded-full mb-8 animate-pulse"
            style={{ background: "rgba(249,115,22,0.15)" }}
          />
          <GridSkeleton count={6} />
        </div>
      </section>
    </main>
  );
}
