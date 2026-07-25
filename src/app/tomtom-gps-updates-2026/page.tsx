import type { Metadata } from "next";
import { getVacationGpsPage } from "@/lib/vacation-gps-data";
import { VacationGpsPageView } from "@/components/seo/VacationGpsPageView";
import { notFound } from "next/navigation";

const SLUG = "tomtom-gps-updates-2026";

export function generateMetadata(): Metadata {
  const data = getVacationGpsPage(SLUG)!;
  const url = `https://trinisystem.vercel.app/${SLUG}`;
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${data.metaTitle} | Trini System`,
      description: data.metaDescription,
      url,
      type: "website",
    },
  };
}

export default function Page() {
  const data = getVacationGpsPage(SLUG);
  if (!data) return notFound();
  return <VacationGpsPageView data={data} />;
}
