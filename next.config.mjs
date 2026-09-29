/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/docs/:path*",
        headers: [{ key: "Cache-Control", value: "public, s-maxage=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};