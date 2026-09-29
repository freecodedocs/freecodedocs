import { notFound } from "next/navigation";
import DocNav from "@/components/DocNav";
import Shell from "@/components/Shell";
import TechList from "@/components/TechList";
import { getIndex, getTechs, pageList, type Tech, type TechIndex } from "@/lib/devdocs";
import { baseSlug, groupTechs } from "@/lib/url";

export const revalidate = 86400;

export default async function DocsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ tech: string }> }) {
  const { tech } = await params;
  let techs: Tech[] = [];
  let index: TechIndex | null = null;
  try {
    [techs, index] = await Promise.all([getTechs(), getIndex(tech)]);
  } catch {
    try { techs = await getTechs(); } catch {}
  }
  const current = techs.find((t) => t.slug === tech);
  if (techs.length && !current) notFound();

  const base = baseSlug(tech);
  const groups = groupTechs(techs);
  const versions = techs.filter((t) => baseSlug(t.slug) === base).map((t) => ({ slug: t.slug, label: t.version || t.release || t.slug }));
  const rail = <TechList active={base} techs={groups} />;
  const nav = index
    ? <DocNav tech={tech} techName={current?.name ?? tech} versions={versions} types={index.types.map((t) => t.name)}
        items={pageList(index).map((e) => [e.name, e.path, e.type] as [string, string, string])} />
    : <p className="px-2 text-sm text-muted">The page index couldn’t be loaded. Reload to retry.</p>;
  return <Shell rail={rail} nav={nav} techs={groups} title={current?.name ?? tech}>{children}</Shell>;
}
