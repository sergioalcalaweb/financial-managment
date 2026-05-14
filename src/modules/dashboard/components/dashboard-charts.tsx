"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { CashflowPoint, InvestmentTrendPoint } from "../data";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export function DashboardCharts({
  cashflow,
  investmentTrend,
  labels
}: {
  cashflow: CashflowPoint[];
  investmentTrend: InvestmentTrendPoint[];
  labels: {
    incomeVsExpenses: string;
    investmentTrend: string;
  };
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{labels.incomeVsExpenses}</CardTitle>
          </CardHeader>
          <CardContent className="h-72" />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{labels.investmentTrend}</CardTitle>
          </CardHeader>
          <CardContent className="h-72" />
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{labels.incomeVsExpenses}</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashflow}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="MXNIncome" fill="#0f766e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="MXNExpenses" fill="#f6c453" radius={[4, 4, 0, 0]} />
              <Bar dataKey="USDIncome" fill="#1d2939" radius={[4, 4, 0, 0]} />
              <Bar dataKey="USDExpenses" fill="#98a2b3" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{labels.investmentTrend}</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={investmentTrend}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area dataKey="MXN" stroke="#0f766e" fill="#0f766e33" />
              <Area dataKey="USD" stroke="#1d2939" fill="#1d293933" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
