import Link from "next/link";
import BlogArt from "./BlogArt";
import Icon from "./Icon";
import type { BlogPost } from "@/lib/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} prefetch={false} className="group block overflow-hidden rounded-lg border border-line transition-colors hover:border-accent">      <BlogArt variant={post.cover} className="aspect-[20/11] w-full border-b border-line" />
      <div className="p-5">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((t) => (
            <span key={t} className="rounded-full border border-line px-2 py-0.5 text-xs text-muted">{t}</span>
          ))}
        </div>
        <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight group-hover:text-accent">{post.title}</h2>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{post.description}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
          <span className="ml-auto inline-flex items-center gap-1 font-medium text-ink group-hover:text-accent">
            Read <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}