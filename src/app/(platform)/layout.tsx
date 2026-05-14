import { cookies } from "next/headers";
import { AppShell } from "@/shared/components/app-shell";
import { getLocale } from "@/lib/i18n";

export default async function PlatformLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = getLocale((await cookies()).get("fmp_locale")?.value);
  return <AppShell locale={locale}>{children}</AppShell>;
}
