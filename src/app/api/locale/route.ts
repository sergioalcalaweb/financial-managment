import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getLocale } from "@/lib/i18n";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { locale?: string };
  const locale = getLocale(body.locale);

  (await cookies()).set("fmp_locale", locale, {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365
  });

  return NextResponse.json({ locale });
}
