import type { KpiSummary } from "@/entities/metric";
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { formatCompactNumber, formatCurrency, formatPercent } from "@/shared/lib/format";

interface KpiCardsProps {
  kpi: KpiSummary | undefined;
  isLoading: boolean;
}

interface KpiDefinition {
  key: keyof KpiSummary;
  deltaKey: keyof KpiSummary;
  label: string;
  format: (value: number) => string;
  invertDelta?: boolean;
}

const DEFINITIONS: KpiDefinition[] = [
  { key: "mrr", deltaKey: "mrrDelta", label: "Monthly Recurring Revenue", format: formatCurrency },
  { key: "activeUsers", deltaKey: "activeUsersDelta", label: "Active Users", format: formatCompactNumber },
  {
    key: "churnRate",
    deltaKey: "churnRateDelta",
    label: "Churn Rate",
    format: (v) => `${v.toFixed(1)}%`,
    invertDelta: true,
  },
  { key: "arpu", deltaKey: "arpuDelta", label: "ARPU", format: formatCurrency },
];

export function KpiCards({ kpi, isLoading }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {DEFINITIONS.map((def) => (
        <Card key={def.key}>
          <CardHeader>
            <CardTitle>{def.label}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading || !kpi ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-semibold tracking-tight">{def.format(kpi[def.key])}</p>
                <DeltaTag value={kpi[def.deltaKey]} invert={def.invertDelta} isPercentPoints={def.key === "churnRate"} />
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DeltaTag({ value, invert, isPercentPoints }: { value: number; invert?: boolean; isPercentPoints?: boolean }) {
  const isPositive = invert ? value <= 0 : value >= 0;
  const suffix = isPercentPoints ? " pts" : "%";
  return (
    <span
      className={cn(
        "mt-1 inline-flex items-center gap-1 text-xs font-medium",
        isPositive ? "text-[rgb(var(--color-positive))]" : "text-[rgb(var(--color-negative))]"
      )}
    >
      {isPositive ? "▲" : "▼"}
      {formatPercent(Math.abs(value), false)}
      {suffix} vs last month
    </span>
  );
}
