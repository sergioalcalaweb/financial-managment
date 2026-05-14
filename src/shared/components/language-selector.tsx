"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getLocale, getTranslations } from "@/lib/i18n";
import { Select } from "@/shared/components/ui/select";

export function LanguageSelector({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = getLocale(searchParams.get("lang") ?? locale);
  const t = getTranslations(currentLocale);

  return (
    <Select
      aria-label={t.language}
      value={currentLocale}
      onChange={(event) => {
        const params = new URLSearchParams(searchParams.toString());
        const nextLocale = event.target.value;

        params.set("lang", nextLocale);

        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname);
      }}
      className="w-28"
    >
      <option value="es">{t.spanish}</option>
      <option value="en">{t.english}</option>
    </Select>
  );
}
