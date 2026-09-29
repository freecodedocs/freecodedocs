import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import CompareCard from "@/components/CompareCard";
import { allComparisons } from "@/lib/compare";
import { getTechs } from "@/lib/devdocs";
import { groupTechs } from "@/lib/url";

export const revalidate = 86400;
export const metadata: Metadata = {
  title: "Compare",
  description: "Practical, no-hype comparisons between languages, frameworks, and API styles — to help you pick the right tool for your next project.",
  alternates: { canonical: "/compare" },
};

export default async function CompareIndex() {
  let techs: ReturnType<typeof groupTechs> = [];
  try { techs = groupTechs(await getTechs()); } catch {}
  const posts = allComparisons();
  return (
    <>
      <SiteHeader techs={techs} />
      <main className="mx-auto max-w-5xl px-5 pb-24 pt-32 sm:px-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Compare</h1>
        <p className="mt-3 max-w-xl text-muted">Head-to-head comparisons to help you choose between two options, without the marketing spin.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">{posts.map((p) => <CompareCard key={p.slug} post={p} />)}</div>
      </main>
    </>
  );
}