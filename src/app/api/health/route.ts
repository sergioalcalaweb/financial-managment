import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "financial-management-platform",
    currencies: ["MXN", "USD"]
  });
}
