"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export function InvestmentHistoryChart({
  data
}: {
  data: Array<{ month: string; MXN: number; USD: number }>;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de crecimiento por moneda</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area dataKey="MXN" stroke="#0f766e" fill="#0f766e33" />
              <Area dataKey="USD" stroke="#1d2939" fill="#1d293933" />
            </AreaChart>
          </ResponsiveContainer>
        ) : null}
      </CardContent>
    </Card>
  );
}
