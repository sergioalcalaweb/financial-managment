"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";
import { Select } from "@/shared/components/ui/select";

export function LanguageSelector({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = getTranslations(locale);

  return (
    <Select
      aria-label={t.language}
      disabled={isPending}
      value={locale}
      onChange={(event) => {
        const nextLocale = event.target.value as Locale;

        startTransition(async () => {
          await fetch("/api/locale", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ locale: nextLocale })
          });
          router.refresh();
        });
      }}
      className="w-28"
    >
      <option value="es">{t.spanish}</option>
      <option value="en">{t.english}</option>
    </Select>
  );
}
