import { NextResponse } from "next/server";

export const revalidate = 86400;

const BASE_URL = "https://freecodedocs.vercel.app";

type DocEntry = {
  name?: string;
  type?: string;
  path?: string;
  entries?: DocEntry[];
};

type DevDocsTechnology = {
  slug: string;
  mtime?: number;
};

function extractPaths(entries: DocEntry[]): string[] {
  const paths: string[] = [];

  for (const entry of entries) {
    if (entry.path) {
      paths.push(entry.path);
    }

    if (entry.entries?.length) {
      paths.push(...extractPaths(entry.entries));
    }
  }

  return paths;
}

function formatLastModified(mtime?: number): string | null {
  if (!mtime) {
    return null;
  }

  const date = new Date(mtime * 1000);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      tech: string;
    }>;
  }
) {
  const { tech: rawTech } = await params;

  /*
   * /sitemaps/react.xml
   *
   * [tech] = react.xml
   *
   * DevDocs needs:
   * react
   */

  const tech = decodeURIComponent(rawTech).replace(/\.xml$/, "");

  if (!tech) {
    return new NextResponse("Technology is required", {
      status: 400,
    });
  }

  try {
    /*
     * ---------------------------------------------------------
     * 1. Get DevDocs technology metadata
     * ---------------------------------------------------------
     */

    const technologiesResponse = await fetch(
      "https://devdocs.io/docs.json",
      {
        next: {
          revalidate: 86400,
        },
      }
    );

    if (!technologiesResponse.ok) {
      return new NextResponse(
        "Failed to fetch DevDocs technologies",
        {
          status: 500,
        }
      );
    }

    const technologies =
      (await technologiesResponse.json()) as DevDocsTechnology[];

    /*
     * Find the exact technology.
     *
     * Important:
     * Use slug, not name.
     *
     * Example:
     * python~3.14
     * python~3.13
     */

    const technology = technologies.find(
      (item) => item.slug === tech
    );

    if (!technology) {
      return new NextResponse("Technology not found", {
        status: 404,
      });
    }

    /*
     * DevDocs documentation-level modification time.
     */

    const lastmod = formatLastModified(
      technology.mtime
    );

    /*
     * ---------------------------------------------------------
     * 2. Get documentation index
     * ---------------------------------------------------------
     */

    const response = await fetch(
      `https://documents.devdocs.io/${encodeURIComponent(
        tech
      )}/index.json`,
      {
        next: {
          revalidate: 86400,
        },
      }
    );

    if (!response.ok) {
      return new NextResponse(
        "Technology documentation not found",
        {
          status: 404,
        }
      );
    }

    const data = await response.json();

    const entries: DocEntry[] = Array.isArray(data)
      ? data
      : data.entries ?? [];

    const paths = extractPaths(entries);

    const urls: string[] = [];

    /*
     * ---------------------------------------------------------
     * Technology landing page
     * ---------------------------------------------------------
     */

    urls.push(`
  <url>
    <loc>${escapeXml(
      `${BASE_URL}/docs/${tech}`
    )}</loc>
    ${lastmod
        ? `<lastmod>${lastmod}</lastmod>`
        : ""
      }
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);

    /*
     * ---------------------------------------------------------
     * Individual documentation pages
     * ---------------------------------------------------------
     */

    for (const path of paths) {
      const cleanPath = path
        .replace(/^\/+/, "")
        .replace(/\/+$/, "");

      if (!cleanPath) {
        continue;
      }

      urls.push(`
  <url>
    <loc>${escapeXml(
        `${BASE_URL}/docs/${tech}/${cleanPath}`
      )}</loc>
    ${lastmod
          ? `<lastmod>${lastmod}</lastmod>`
          : ""
        }
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
    }

    /*
     * ---------------------------------------------------------
     * XML
     * ---------------------------------------------------------
     */

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type":
          "application/xml; charset=utf-8",

        "Cache-Control":
          "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error(
      `Failed to generate sitemap for ${tech}:`,
      error
    );

    return new NextResponse(
      "Failed to generate sitemap",
      {
        status: 500,
      }
    );
  }
}