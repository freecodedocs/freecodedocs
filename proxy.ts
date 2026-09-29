import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  return new NextResponse("PROXY WORKS", {
    status: 403,
  });
}

export const config = {
  matcher: ["/docs/:path*"],
};