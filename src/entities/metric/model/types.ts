export interface SeriesPoint {
  label: string;
  value: number;
}

export interface KpiSummary {
  mrr: number;
  mrrDelta: number;
  activeUsers: number;
  activeUsersDelta: number;
  churnRate: number;
  churnRateDelta: number;
  arpu: number;
  arpuDelta: number;
}

export interface DashboardMetrics {
  kpi: KpiSummary;
  mrrSeries: SeriesPoint[];
  userGrowthSeries: SeriesPoint[];
  churnSeries: SeriesPoint[];
}
