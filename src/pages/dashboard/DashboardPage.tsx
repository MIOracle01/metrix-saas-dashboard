import { useQuery } from "@tanstack/react-query";
import { metricApi } from "@/entities/metric";
import { userApi } from "@/entities/user";
import { KpiCards } from "@/widgets/kpi-cards/KpiCards";
import { MrrChart } from "@/widgets/mrr-chart/MrrChart";
import { UsersChart } from "@/widgets/users-chart/UsersChart";
import { RecentUsersTable } from "@/widgets/recent-users-table/RecentUsersTable";

export function DashboardPage() {
  const metricsQuery = useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: () => metricApi.getDashboardMetrics(),
  });

  const recentUsersQuery = useQuery({
    queryKey: ["recent-users"],
    queryFn: () => userApi.getRecentUsers(5),
  });

  return (
    <div className="flex flex-col gap-4">
      <KpiCards kpi={metricsQuery.data?.kpi} isLoading={metricsQuery.isLoading} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <MrrChart data={metricsQuery.data?.mrrSeries} isLoading={metricsQuery.isLoading} />
        <UsersChart
          userGrowthData={metricsQuery.data?.userGrowthSeries}
          churnData={metricsQuery.data?.churnSeries}
          isLoading={metricsQuery.isLoading}
        />
      </div>

      <RecentUsersTable users={recentUsersQuery.data} isLoading={recentUsersQuery.isLoading} />
    </div>
  );
}
