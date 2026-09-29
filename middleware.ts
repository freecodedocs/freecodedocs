import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BLOCKED_UA =
  /AhrefsBot|SemrushBot|MJ12bot|DotBot|PetalBot|Bytespider|SerpstatBot|MegaIndex|ShapBot|BLEXBot|DataForSeoBot|Barkrowler|GoogleOther|GPTBot|CCBot|ClaudeBot|anthropic-ai|Amazonbot|SeznamBot|ZoominfoBot/i;

const DOCS_BLOCKED_UA =
  /OAI-SearchBot|PerplexityBot|Bingbot|DuckDuckBot/i;

export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  const pathname = request.nextUrl.pathname;

  if (BLOCKED_UA.test(ua)) {
    return new NextResponse("Blocked", { status: 403 });
  }

  if (
    DOCS_BLOCKED_UA.test(ua) &&
    (pathname === "/docs" || pathname.startsWith("/docs/"))
  ) {
    return new NextResponse("Blocked", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|sitemaps).*)",
  ],
};