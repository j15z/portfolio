import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the request is for the studio route (but not the auth API or root studio path)
  if (
    request.nextUrl.pathname.startsWith("/studio") &&
    !request.nextUrl.pathname.startsWith("/studio/auth") &&
    request.nextUrl.pathname !== "/studio"
  ) {
    // Check for authentication cookie
    const authCookie = request.cookies.get("studio-auth");

    if (authCookie?.value !== "authenticated") {
      // Redirect to studio page which will show the auth form
      return NextResponse.redirect(new URL("/studio", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/studio/:path*",
};
