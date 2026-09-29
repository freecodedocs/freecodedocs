import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import CheatSheetCard from "@/components/CheatSheetCard";
import { allCheatSheets } from "@/lib/cheatsheets";
import { getTechs } from "@/lib/devdocs";
import { groupTechs } from "@/lib/url";

export const revalidate = 86400;
export const metadata: Metadata = {
  title: "Cheat Sheets",
  description: "Quick, scannable cheat sheets for the syntax and commands developers look up most — JavaScript arrays, Git, and more.",
  alternates: { canonical: "/cheatsheets" },
};

export default async function CheatSheetsIndex() {
  let techs: ReturnType<typeof groupTechs> = [];
  try { techs = groupTechs(await getTechs()); } catch {}
  const sheets = allCheatSheets();
  return (
    <>
      <SiteHeader techs={techs} />
      <main className="mx-auto max-w-5xl px-5 pb-24 pt-32 sm:px-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Cheat sheets</h1>
        <p className="mt-3 max-w-xl text-muted">The syntax and commands developers look up most, condensed onto one scannable page each.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">{sheets.map((s) => <CheatSheetCard key={s.slug} sheet={s} />)}</div>
      </main>
    </>
  );
}