import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const roleSelected = request.cookies.get("role");

  if (path === "/sign-up" && !roleSelected) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-up/select-role";
    return NextResponse.redirect(url);
  }

  // Public paths that don't require authentication
  const publicPaths = ["/", "/sign-in", "/sign-up", "/api/auth"];
  const isPublicPath = publicPaths.some(
    (pp) => path === pp || path.startsWith(`${pp}/`)
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const token = await getToken({ req: request });

  if (!token) {
    // Redirect to sign-in if not authenticated
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Role-based access
  if (path.startsWith("/client") && token.role !== "CLIENT") {
    return NextResponse.redirect(new URL("/freelancer/dashboard", request.url));
  }

  if (path.startsWith("/freelancer") && token.role !== "FREELANCER") {
    return NextResponse.redirect(new URL("/client/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/client/:path*",
    "/freelancer/:path*",
    "/sign-up/:path*",
    "/sign-up",
  ],
};
