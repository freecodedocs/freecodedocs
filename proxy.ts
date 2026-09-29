import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add any additional bad actors you identify in your logs.
const BLOCKED_UA = /AhrefsBot|SemrushBot|MJ12bot|DotBot|PetalBot|Bytespider|SerpstatBot|MegaIndex/i;

export function proxy(request: NextRequest) {
    const ua = request.headers.get("user-agent") ?? "";
    if (BLOCKED_UA.test(ua)) {
        return new NextResponse("Blocked", { status: 403 });
    }
    return NextResponse.next();
}

export const config = {
    matcher: "/docs/:path*",
};