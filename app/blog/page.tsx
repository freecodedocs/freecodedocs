import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import BlogCard from "@/components/BlogCard";
import { allPosts } from "@/lib/blog";
import { getTechs } from "@/lib/devdocs";
import { groupTechs } from "@/lib/url";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical writing on reading documentation, developer workflow, and getting the most out of reference docs — from the team behind FreeCodeDocs.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  let techs: ReturnType<typeof groupTechs> = [];
  try { techs = groupTechs(await getTechs()); } catch {}
  const posts = allPosts();
  return (
    <>
      <SiteHeader techs={techs} />
      <main className="mx-auto max-w-8xl px-5 pb-24 pt-32 sm:px-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">The FreeCodeDocs blog</h1>
        <p className="mt-3 max-w-xl text-muted">Notes on reading documentation well, working faster with reference docs, and building a calmer developer workflow.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {posts.map((p) => <BlogCard key={p.slug} post={p} />)}
        </div>
      </main>
    </>
  );
}