import type { MetadataRoute } from "next";

const BASE_URL = "https://freecodedocs.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/docs/*~*",
    },

    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}