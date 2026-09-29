import Link from "next/link";
import BlogArt from "./BlogArt";
import Icon from "./Icon";
import type { CheatSheet } from "@/lib/cheatsheets";

export default function CheatSheetCard({ sheet }: { sheet: CheatSheet }) {
  const itemCount = sheet.sections.reduce((n, s) => n + s.items.length, 0);
  return (
    <Link href={`/cheatsheets/${sheet.slug}`} prefetch={false} className="group block overflow-hidden rounded-lg border border-line transition-colors hover:border-accent">
      <BlogArt variant={sheet.cover} className="aspect-[20/11] w-full border-b border-line" />
      <div className="p-5">
        <div className="flex flex-wrap gap-1.5">
          {sheet.tags.slice(0, 2).map((t) => <span key={t} className="rounded-full border border-line px-2 py-0.5 text-xs text-muted">{t}</span>)}
        </div>
        <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight group-hover:text-accent">{sheet.title}</h2>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{sheet.description}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted">
          <span>{sheet.sections.length} sections</span><span aria-hidden>·</span><span>{itemCount} entries</span>
          <span className="ml-auto inline-flex items-center gap-1 font-medium text-ink group-hover:text-accent">Open <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-0.5" /></span>
        </div>
      </div>
    </Link>
  );
}