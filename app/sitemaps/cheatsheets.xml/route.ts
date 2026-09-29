import { NextResponse } from "next/server";
import { allCheatSheets } from "@/lib/cheatsheets";

const BASE_URL = "https://freecodedocs.vercel.app";
export const revalidate = 86400;

export async function GET() {
  const urls = allCheatSheets()
    .map((s) => `
  <url>
    <loc>${BASE_URL}/cheatsheets/${s.slug}</loc>
    <lastmod>${s.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
  });
}