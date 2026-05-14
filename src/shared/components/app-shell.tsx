import Link from "next/link";
import { redirect } from "next/navigation";
import {
  BarChart3,
  CircleDollarSign,
  Gauge,
  Landmark,
  LogOut,
  Plus,
  ReceiptText,
  Settings,
  ShieldCheck,
  TrendingUp,
  WalletCards
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";
import { logoutAction } from "@/modules/authentication/actions";
import type { SessionUser } from "@/modules/authentication/types";
import { LanguageSelector } from "@/shared/components/language-selector";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

const nav = [
  { href: "/dashboard", label: "dashboard", icon: Gauge },
  { href: "/income", label: "income", icon: CircleDollarSign },
  { href: "/expenses", label: "expenses", icon: ReceiptText },
  { href: "/investments", label: "investments", icon: TrendingUp },
  { href: "/debts", label: "debts", icon: Landmark },
  { href: "/reports", label: "reports", icon: BarChart3 },
  { href: "/settings", label: "settings", icon: Settings }
] as const;

export function AppShell({
  locale = "es",
  user,
  children
}: {
  locale?: Locale;
  user?: SessionUser;
  children: React.ReactNode;
}) {
  const t = getTranslations(locale);
  const shellUser: SessionUser = user ?? {
    id: "session",
    name: t.shell.userName,
    email: t.shell.securedSession,
    role: "USER"
  };

  async function quickAdd() {
    "use server";
    redirect("/expenses?quick=1");
  }

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-card p-4 lg:flex lg:flex-col">
        <Link href="/dashboard" className="flex items-center gap-3 px-2 py-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <WalletCards />
          </div>
          <div>
            <p className="text-sm font-semibold">FinControl</p>
            <p className="text-xs text-muted-foreground">{t.shell.separatedFlows}</p>
          </div>
        </Link>
        <nav className="mt-6 flex flex-1 flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <item.icon />
              {t.nav[item.label]}
            </Link>
          ))}
          {shellUser.role === "ADMIN" ? (
            <Link
              href="/admin/users"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ShieldCheck />
              {t.nav.admin}
            </Link>
          ) : null}
        </nav>
        <div className="rounded-lg border bg-background p-3">
          <p className="text-sm font-medium">{shellUser.name}</p>
          <p className="truncate text-xs text-muted-foreground">{shellUser.email}</p>
          <Badge className="mt-3" variant="secondary">
            {shellUser.role}
          </Badge>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {t.shell.financialMonth}
              </p>
              <h1 className="text-lg font-semibold">FinControl</h1>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector locale={locale} />
              <form action={quickAdd}>
                <Button size="sm">
                  <Plus data-icon="inline-start" />
                  {t.shell.quickAdd}
                </Button>
              </form>
              <form action={logoutAction}>
                <Button variant="outline" size="icon" aria-label={t.shell.logout}>
                  <LogOut />
                </Button>
              </form>
            </div>
          </div>
        </header>
        <main className="px-4 py-5 sm:px-6 lg:px-8">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t bg-card p-1 lg:hidden">
        {nav.slice(0, 5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1 rounded-md px-2 py-2 text-[11px] text-muted-foreground"
          >
            <item.icon />
            {t.nav[item.label]}
          </Link>
        ))}
      </nav>
    </div>
  );
}
