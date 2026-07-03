import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { SeriesPoint } from "@/entities/metric";
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from "@/shared/ui";
import { formatCompactNumber } from "@/shared/lib/format";

interface UsersChartProps {
  userGrowthData: SeriesPoint[] | undefined;
  churnData: SeriesPoint[] | undefined;
  isLoading: boolean;
}

export function UsersChart({ userGrowthData, churnData, isLoading }: UsersChartProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
        </CardHeader>
        <CardContent className="h-40">
          {isLoading || !userGrowthData ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "currentColor", opacity: 0.6 }}
                />
                <YAxis hide domain={[0, "dataMax + 200"]} />
                <Tooltip
                  formatter={(value) => [formatCompactNumber(Number(value ?? 0)), "Users"]}
                  contentStyle={{ borderRadius: 8, border: "1px solid rgb(228 228 231)", fontSize: 12 }}
                />
                <Bar dataKey="value" fill="rgb(79 70 229)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Churn Rate</CardTitle>
        </CardHeader>
        <CardContent className="h-40">
          {isLoading || !churnData ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={churnData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "currentColor", opacity: 0.6 }}
                />
                <YAxis hide domain={[0, "dataMax + 1"]} />
                <Tooltip
                  formatter={(value) => [`${Number(value ?? 0).toFixed(2)}%`, "Churn"]}
                  contentStyle={{ borderRadius: 8, border: "1px solid rgb(228 228 231)", fontSize: 12 }}
                />
                <Line type="monotone" dataKey="value" stroke="rgb(220 38 38)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
