import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import SiteHeader from "@/components/SiteHeader";
import CompareCard from "@/components/CompareCard";
import { allComparisons, getComparison } from "@/lib/compare";
import { getTechs } from "@/lib/devdocs";
import { groupTechs } from "@/lib/url";

type Props = { params: Promise<{ slug: string }> };
const SITE = "https://freecodedocs.vercel.app";
export const revalidate = 86400;

export function generateStaticParams() {
  return allComparisons().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getComparison(slug);
  if (!post) return { title: "Comparison not found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/compare/${post.slug}` },
    openGraph: { type: "article", url: `${SITE}/compare/${post.slug}`, title: post.title, description: post.description },
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const post = getComparison(slug);
  if (!post) notFound();

  let techs: ReturnType<typeof groupTechs> = [];
  try { techs = groupTechs(await getTechs()); } catch {}
  const more = allComparisons().filter((p) => p.slug !== post.slug).slice(0, 2);
  const url = `${SITE}/compare/${post.slug}`;
  const check = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5" /></svg>
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", headline: post.title, description: post.description, datePublished: post.date, url, author: { "@type": "Organization", name: "FreeCodeDocs" }, publisher: { "@type": "Organization", name: "FreeCodeDocs" } },
      ...(post.faq ? [{ "@type": "FAQPage", mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader techs={techs} />
      <main className="mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li><Link href="/compare" prefetch={false} className="hover:text-ink">Compare</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="truncate text-ink">{post.title}</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{post.intro}</p>

        <div className="mt-8 overflow-x-auto rounded-lg border border-line">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-subtle">
                <th className="border-b border-line p-3 text-left font-semibold"></th>
                <th className="border-b border-line p-3 text-left font-semibold">{post.subjectA.name}</th>
                <th className="border-b border-line p-3 text-left font-semibold">{post.subjectB.name}</th>
              </tr>
            </thead>
            <tbody>
              {post.rows.map((r) => (
                <tr key={r.label} className="odd:bg-bg even:bg-subtle/40">
                  <td className="border-b border-line p-3 font-medium text-muted">{r.label}</td>
                  <td className="border-b border-line p-3">{r.a}</td>
                  <td className="border-b border-line p-3">{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-line p-5">
            <h2 className="font-semibold">Choose {post.subjectA.name} if…</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">{post.chooseA.map((c) => <li key={c} className="flex gap-2">{check}<span>{c}</span></li>)}</ul>
            {post.subjectA.docsHref && <Link href={post.subjectA.docsHref} prefetch={false} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">{post.subjectA.name} docs <Icon name="arrow" size={14} /></Link>}
          </div>
          <div className="rounded-lg border border-line p-5">
            <h2 className="font-semibold">Choose {post.subjectB.name} if…</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">{post.chooseB.map((c) => <li key={c} className="flex gap-2">{check}<span>{c}</span></li>)}</ul>
            {post.subjectB.docsHref && <Link href={post.subjectB.docsHref} prefetch={false} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">{post.subjectB.name} docs <Icon name="arrow" size={14} /></Link>}
          </div>
        </div>

        <blockquote className="mt-10 border-l-2 border-line pl-4 italic text-muted">{post.verdict}</blockquote>

        {post.faq && (
          <div className="mt-14">
            <h2 className="mb-4 text-lg font-semibold">Frequently asked questions</h2>
            <div className="space-y-6">
              {post.faq.map((f) => (
                <div key={f.q}><h3 className="font-medium">{f.q}</h3><p className="mt-1 text-sm leading-relaxed text-muted">{f.a}</p></div>
              ))}
            </div>
          </div>
        )}

        {more.length > 0 && (
          <div className="mt-16 border-t border-line pt-10">
            <h2 className="mb-5 text-lg font-semibold">More comparisons</h2>
            <div className="grid gap-8 sm:grid-cols-2">{more.map((p) => <CompareCard key={p.slug} post={p} />)}</div>
          </div>
        )}
      </main>
    </>
  );
}