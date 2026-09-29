import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import CheatSheetCard from "@/components/CheatSheetCard";
import { allCheatSheets, getCheatSheet } from "@/lib/cheatsheets";
import { getTechs } from "@/lib/devdocs";
import { groupTechs } from "@/lib/url";

type Props = { params: Promise<{ slug: string }> };
const SITE = "https://freecodedocs.vercel.app";
export const revalidate = 86400;

export function generateStaticParams() {
  return allCheatSheets().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sheet = getCheatSheet(slug);
  if (!sheet) return { title: "Cheat sheet not found" };
  return {
    title: sheet.title,
    description: sheet.description,
    alternates: { canonical: `/cheatsheets/${sheet.slug}` },
    openGraph: { type: "article", url: `${SITE}/cheatsheets/${sheet.slug}`, title: sheet.title, description: sheet.description },
  };
}

export default async function CheatSheetPage({ params }: Props) {
  const { slug } = await params;
  const sheet = getCheatSheet(slug);
  if (!sheet) notFound();

  let techs: ReturnType<typeof groupTechs> = [];
  try { techs = groupTechs(await getTechs()); } catch {}
  const more = allCheatSheets().filter((s) => s.slug !== sheet.slug).slice(0, 2);
  const url = `${SITE}/cheatsheets/${sheet.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: sheet.title,
    description: sheet.description,
    datePublished: sheet.date,
    url,
    author: { "@type": "Organization", name: "FreeCodeDocs" },
    publisher: { "@type": "Organization", name: "FreeCodeDocs" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader techs={techs} />
      <main className="mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li><Link href="/cheatsheets" prefetch={false} className="hover:text-ink">Cheat sheets</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="truncate text-ink">{sheet.title}</li>
          </ol>
        </nav>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{sheet.title}</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{sheet.intro}</p>

        <div className="mt-10 space-y-12">
          {sheet.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="border-b border-line pb-2 text-lg font-semibold">{section.heading}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {section.items.map((item) => (
                  <div key={item.term} className="rounded-md border border-line p-4">
                    <code className="rounded bg-subtle px-1.5 py-0.5 font-mono text-sm text-accent">{item.term}</code>
                    <div className="mt-2 overflow-x-auto rounded bg-subtle px-2.5 py-1.5 font-mono text-xs text-ink">{item.syntax}</div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {sheet.relatedDocs && sheet.relatedDocs.length > 0 && (
          <div className="mt-14 rounded-lg border border-line bg-subtle p-6">
            <p className="font-medium">Go deeper</p>
            <p className="mt-1 text-sm text-muted">This cheat sheet covers the common cases. For everything else:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sheet.relatedDocs.map((d) => (
                <Link key={d.href} href={d.href} prefetch={false} className="rounded-md border border-line bg-bg px-3 py-1.5 text-sm hover:border-accent">{d.label}</Link>
              ))}
            </div>
          </div>
        )}

        {more.length > 0 && (
          <div className="mt-16 border-t border-line pt-10">
            <h2 className="mb-5 text-lg font-semibold">More cheat sheets</h2>
            <div className="grid gap-8 sm:grid-cols-2">{more.map((s) => <CheatSheetCard key={s.slug} sheet={s} />)}</div>
          </div>
        )}
      </main>
    </>
  );
}