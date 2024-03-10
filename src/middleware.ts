import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const secret = process.env.NEXT_AUTH_SECRET;

  const token = await getToken({
    req: request,
    secret: secret,
    cookieName: "next-auth.session-token",
  });

  // home middleware
  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/home", request.url));
  }

  // payment middleware
  if (request.nextUrl.pathname.includes("/payment")) {
    if (!token) {
      return NextResponse.rewrite(new URL("/sign-in", request.url));
    } else {
      return NextResponse.next();
    }
  }

  // auth middleware
  if (
    request.nextUrl.pathname === "/sign-in" ||
    request.nextUrl.pathname === "/sign-up"
  ) {
    if (token) {
      return NextResponse.rewrite(new URL("/home", request.url));
    } else {
      return NextResponse.next();
    }
  }

  if (request.nextUrl.pathname.includes("/user")) {
    if (!token) {
      return NextResponse.rewrite(new URL("/sign-in", request.url));
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/((?!api|_next|.*\\..*).*)",
    "/((?!_next/static|favicon.ico|home|).*)",
    "/((?!_next/static|favicon.ico|login|).*)",
  ],
};
