import { redirect } from "next/navigation";
import ErrorState from "@/components/ErrorState";
import { getIndex, pageList } from "@/lib/devdocs";
import { docHref } from "@/lib/url";

export const revalidate = 86400;

export default async function TechHome({ params }: { params: Promise<{ tech: string }> }) {
  const { tech } = await params;
  let first;
  try { first = pageList(await getIndex(tech))[0]; } catch (e) {
    return <ErrorState title="Couldn’t load this documentation" message={(e as Error).message} href={`/docs/${tech}`} />;
  }
  if (!first) return <ErrorState title="Nothing to show" message="This technology has no pages." />;
  redirect(docHref(tech, first.path));
}
