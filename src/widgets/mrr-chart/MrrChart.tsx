import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { SeriesPoint } from "@/entities/metric";
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from "@/shared/ui";
import { formatCurrency } from "@/shared/lib/format";

interface MrrChartProps {
  data: SeriesPoint[] | undefined;
  isLoading: boolean;
}

export function MrrChart({ data, isLoading }: MrrChartProps) {
  return (
    <Card className="col-span-1 xl:col-span-2">
      <CardHeader>
        <CardTitle>Monthly Recurring Revenue</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        {isLoading || !data ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(79 70 229)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="rgb(79 70 229)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "currentColor", opacity: 0.6 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={56}
                tick={{ fontSize: 12, fill: "currentColor", opacity: 0.6 }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value ?? 0)), "MRR"]}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid rgb(228 228 231)",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="rgb(79 70 229)"
                strokeWidth={2}
                fill="url(#mrrGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
