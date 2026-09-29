import { NextResponse } from "next/server";
import { baseSlug } from "@/lib/url";

const BASE_URL = "https://freecodedocs.vercel.app";

export const revalidate = 86400;

type Technology = { name: string; slug: string };

export async function GET() {
  try {
    const response = await fetch("https://devdocs.io/docs.json", {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return new NextResponse("Failed to fetch DevDocs technologies", { status: 500 });
    }

    const technologies: Technology[] = await response.json();

    // Keep exactly one slug per technology family — the default/unversioned
    // one where it exists, otherwise the first version we see. This cuts
    // out hundreds of redundant "old version" sub-sitemaps.
    const seen = new Map<string, string>();
    for (const t of technologies) {
      const base = baseSlug(t.slug);
      const isDefault = t.slug === base;
      if (!seen.has(base) || isDefault) seen.set(base, t.slug);
    }
    const defaultSlugs = [...seen.values()];

    const staticSitemaps = ["pages.xml", "blog.xml", "cheatsheets.xml", "compare.xml"];
    const technologySitemaps = defaultSlugs.map((slug) => `${encodeURIComponent(slug)}.xml`);
    const sitemapFiles = [...staticSitemaps, ...technologySitemaps];

    const sitemaps = sitemapFiles
      .map((file) => `
  <sitemap>
    <loc>${BASE_URL}/sitemaps/${file}</loc>
  </sitemap>`)
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Failed to generate sitemap index:", error);
    return new NextResponse("Failed to generate sitemap", { status: 500 });
  }
}