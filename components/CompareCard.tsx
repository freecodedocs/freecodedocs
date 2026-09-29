import Link from "next/link";
import BlogArt from "./BlogArt";
import Icon from "./Icon";
import type { ComparisonPost } from "@/lib/compare";

export default function CompareCard({ post }: { post: ComparisonPost }) {
  return (
    <Link href={`/compare/${post.slug}`} prefetch={false} className="group block overflow-hidden rounded-lg border border-line transition-colors hover:border-accent">
      <BlogArt variant={post.cover} className="aspect-[20/11] w-full border-b border-line" />
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span>{post.subjectA.name}</span><span className="text-muted">vs</span><span>{post.subjectB.name}</span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{post.description}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
          <span className="ml-auto inline-flex items-center gap-1 font-medium text-ink group-hover:text-accent">Compare <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-0.5" /></span>
        </div>
      </div>
    </Link>
  );
}