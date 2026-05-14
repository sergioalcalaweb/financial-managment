"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getAvailableDashboardMonths } from "@/modules/dashboard/data";
import { Select } from "@/shared/components/ui/select";

export function MonthSelector({
  locale,
  selectedMonth,
  label
}: {
  locale: Locale;
  selectedMonth: string;
  label: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const months = getAvailableDashboardMonths(locale);

  return (
    <Select
      aria-label={label}
      value={selectedMonth}
      onChange={(event) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("month", event.target.value);
        router.push(`${pathname}?${params.toString()}`);
      }}
    >
      {months.map((month) => (
        <option key={month.key} value={month.key}>
          {month.label}
        </option>
      ))}
    </Select>
  );
}
