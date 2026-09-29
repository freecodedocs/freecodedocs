import { NextResponse } from "next/server";

export const revalidate = 86400;

const BASE_URL = "https://freecodedocs.vercel.app";

const pages = [
  {
    path: "/",
    lastmod: "2026-09-25",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/blog",
    lastmod: "2026-09-25",
    changefreq: "daily",
    priority: "0.8",
  },
  {
    path: "/docs",
    lastmod: "2026-09-25",
    changefreq: "weekly",
    priority: "0.9",
  },
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const urls = pages
    .map(
      (page) => `
  <url>
    <loc>${escapeXml(`${BASE_URL}${page.path}`)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}