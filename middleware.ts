import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BLOCKED_UA =
  /AhrefsBot|SemrushBot|MJ12bot|DotBot|PetalBot|Bytespider|SerpstatBot|MegaIndex|ShapBot|GoogleOther/i;

export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";

  if (BLOCKED_UA.test(ua)) {
    return new NextResponse("Blocked", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/docs/:path*"],
};