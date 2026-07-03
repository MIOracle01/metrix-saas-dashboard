import { delay } from "@/shared/api/delay";
import type { DashboardMetrics, SeriesPoint } from "../model/types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function buildSeries(base: number, growth: number, noise: number): SeriesPoint[] {
  let value = base;
  return MONTHS.map((label) => {
    value = value * (1 + growth) + (Math.random() - 0.5) * noise;
    return { label, value: Math.max(0, Math.round(value)) };
  });
}

function buildDashboardMetrics(): DashboardMetrics {
  const mrrSeries = buildSeries(18000, 0.065, 900);
  const userGrowthSeries = buildSeries(1200, 0.05, 60);
  const churnSeries = MONTHS.map((label) => ({
    label,
    value: Number((2.1 + Math.random() * 1.4 - 0.3).toFixed(2)),
  }));

  const lastMrr = mrrSeries[mrrSeries.length - 1].value;
  const prevMrr = mrrSeries[mrrSeries.length - 2].value;
  const lastUsers = userGrowthSeries[userGrowthSeries.length - 1].value;
  const prevUsers = userGrowthSeries[userGrowthSeries.length - 2].value;
  const lastChurn = churnSeries[churnSeries.length - 1].value;
  const prevChurn = churnSeries[churnSeries.length - 2].value;
  const arpu = Math.round((lastMrr / lastUsers) * 100) / 100;
  const prevArpu = Math.round((prevMrr / prevUsers) * 100) / 100;

  return {
    kpi: {
      mrr: lastMrr,
      mrrDelta: Number((((lastMrr - prevMrr) / prevMrr) * 100).toFixed(1)),
      activeUsers: lastUsers,
      activeUsersDelta: Number((((lastUsers - prevUsers) / prevUsers) * 100).toFixed(1)),
      churnRate: lastChurn,
      churnRateDelta: Number((lastChurn - prevChurn).toFixed(1)),
      arpu,
      arpuDelta: Number((((arpu - prevArpu) / prevArpu) * 100).toFixed(1)),
    },
    mrrSeries,
    userGrowthSeries,
    churnSeries,
  };
}

export const metricApi = {
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    return delay(buildDashboardMetrics(), 600);
  },
};
