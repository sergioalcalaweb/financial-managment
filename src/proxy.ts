import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const protectedRoutes = [
  "/dashboard",
  "/income",
  "/expenses",
  "/investments",
  "/debts",
  "/reports",
  "/settings",
  "/admin"
];

export async function proxy(request: NextRequest) {
  const requestedLocale = request.nextUrl.searchParams.get("lang");
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!isProtected) {
    const response = NextResponse.next();
    if (requestedLocale === "en") {
      response.cookies.set("fmp_locale", "en", { path: "/", sameSite: "lax" });
    } else if (requestedLocale === "es") {
      response.cookies.set("fmp_locale", "es", { path: "/", sameSite: "lax" });
    }
    return response;
  }

  const token = request.cookies.get("fmp_session")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET ?? "development-secret-change-me"
    );
    const { payload } = await jwtVerify(token, secret);
    if (request.nextUrl.pathname.startsWith("/admin") && payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    const response = NextResponse.next();
    if (requestedLocale === "en") {
      response.cookies.set("fmp_locale", "en", { path: "/", sameSite: "lax" });
    } else if (requestedLocale === "es") {
      response.cookies.set("fmp_locale", "es", { path: "/", sameSite: "lax" });
    }
    return response;
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
