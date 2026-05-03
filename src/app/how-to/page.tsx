import type { Metadata } from "next";
import Link from "next/link";
import { GMAIL_PAGES, ALL_GMAIL_SLUGS } from "@/lib/gmail-data";
import { FACEBOOK_PAGES, ALL_FACEBOOK_SLUGS, FB_THEME } from "@/lib/facebook-data";
import { GARMIN_APPS_PAGES, ALL_GARMIN_APPS_SLUGS, GARMIN_THEME } from "@/lib/garmin-apps-data";

const SITE = "https://trinisystem.vercel.app";
const PHONE = "+13479531531";
const PHONE_DISPLAY = "347-953-1531";

export const metadata: Metadata = {
  title: "How-To Guides for Seniors — Gmail, Facebook & Garmin Help (Trini System)",
  description:
    "Free senior-friendly guides for Gmail, Facebook, and Garmin apps. Login problems, account recovery, scams, GPS map updates, watch setup. Call 347-953-1531.",
  alternates: { canonical: `${SITE}/how-to` },
};

const GMAIL_BLUE = "#1a73e8";
const FB_BLUE = FB_THEME.primary;
const GARMIN_BLUE = GARMIN_THEME.primary;

export default function HowToHub() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="sticky top-0 z-40 bg-gray-900 px-4 py-2 text-white text-center font-bold text-base md:text-lg">
        Need a real person? Call free —{" "}
        <a href={`tel:${PHONE}`} className="underline">
          {PHONE_DISPLAY}
        </a>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
            How-to guides for seniors
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Plain English. Large text. Free practice mode. Pick your topic below — every guide has
            step-by-step screens you can click through before doing it for real.
          </p>
        </header>

        {/* GMAIL */}
        <ClusterSection
          title="Gmail Help"
          subtitle={`${ALL_GMAIL_SLUGS.length} senior-friendly Gmail guides`}
          color={GMAIL_BLUE}
          letter="✉"
          slugs={ALL_GMAIL_SLUGS}
          pages={GMAIL_PAGES}
        />

        {/* FACEBOOK */}
        <ClusterSection
          title="Facebook Help"
          subtitle={`${ALL_FACEBOOK_SLUGS.length} senior-friendly Facebook guides`}
          color={FB_BLUE}
          letter="f"
          slugs={ALL_FACEBOOK_SLUGS}
          pages={FACEBOOK_PAGES}
        />

        {/* GARMIN */}
        <ClusterSection
          title="Garmin App Help"
          subtitle={`${ALL_GARMIN_APPS_SLUGS.length} guides — Garmin Express, WebUpdater, Connect, ActiveCaptain, Pilot, Honda nav, free maps`}
          color={GARMIN_BLUE}
          letter="G"
          slugs={ALL_GARMIN_APPS_SLUGS}
          pages={GARMIN_APPS_PAGES}
        />

        <section
          className="rounded-2xl p-6 md:p-10 text-center"
          style={{ backgroundColor: "#1f2937", color: "white" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Don't see your problem?</h2>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            Call a real person. We answer in under 15 minutes. No password ever needed.
          </p>
          <a
            href={`tel:${PHONE}`}
            className="inline-block px-8 py-4 rounded-full text-xl md:text-2xl font-bold bg-white text-gray-900"
          >
            📞 {PHONE_DISPLAY}
          </a>
        </section>
      </div>
    </main>
  );
}

function ClusterSection({
  title,
  subtitle,
  color,
  letter,
  slugs,
  pages,
}: {
  title: string;
  subtitle: string;
  color: string;
  letter: string;
  slugs: string[];
  pages: Record<string, { h1: string; heroIntro: string; category: string; estimatedTime: string }>;
}) {
  return (
    <section className="mb-14">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
          style={{ backgroundColor: color }}
        >
          {letter}
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
          <p className="text-base text-gray-600">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slugs.map((slug) => {
          const p = pages[slug];
          if (!p) return null;
          return (
            <Link
              key={slug}
              href={`/how-to/${slug}`}
              className="block bg-white rounded-xl p-5 border-2 hover:shadow-lg transition-all"
              style={{ borderColor: "transparent" }}
            >
              <div
                className="text-xs font-bold uppercase tracking-wide mb-2"
                style={{ color }}
              >
                {p.category} · {p.estimatedTime}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{p.h1}</h3>
              <p className="text-sm text-gray-600">{p.heroIntro.slice(0, 110)}…</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
