import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Only run middleware on admin routes
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Skip middleware for the login page
  if (request.nextUrl.pathname === "/admin") {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  try {
    // Verify admin role
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid token");
    }

    const user = await response.json();
    if (user.role !== "admin") {
      throw new Error("Access denied");
    }

    return NextResponse.next();
  } catch (error) {
    // Clear invalid token
    const response = NextResponse.redirect(new URL("/admin", request.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: "/admin/:path*",
};
