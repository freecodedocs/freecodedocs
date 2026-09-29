import { HeroArt } from "@/components/Art";
import ErrorState from "@/components/ErrorState";
import SiteHeader from "@/components/SiteHeader";
import TechList from "@/components/TechList";
import { getTechs } from "@/lib/devdocs";
import { groupTechs } from "@/lib/url";

export const revalidate = 86400;

export default async function Docs() {
  let groups;
  try { groups = groupTechs(await getTechs()); } catch (e) {
    return <main className="p-8 pt-24"><ErrorState title="Documentation library unavailable" message={(e as Error).message} href="/" /></main>;
  }
  return (
    <>
      <SiteHeader techs={groups} />
      <main className="mx-auto max-w-8xl px-5 pb-16 pt-24 sm:px-10">
        <section className="grid items-center gap-10 md:grid-cols-[1fr_19rem]">
          <div>
            <h1 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">Free documentation you can actually browse.</h1>
            <p className="mt-3 max-w-lg text-muted">{groups.length} languages and frameworks, one page each. Pick a version once you’re inside.</p>
          </div>
          <HeroArt />
        </section>
        <h2 className="mb-4 mt-14 text-lg font-semibold">All frameworks</h2>
        <TechList variant="grid" techs={groups} />
      </main>
    </>
  );
}
