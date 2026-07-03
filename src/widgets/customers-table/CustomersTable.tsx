import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/entities/user";
import { statusTone } from "@/entities/user/lib/status-tone";
import { Avatar, Badge, Button, Card, CardContent, Skeleton } from "@/shared/ui";
import { formatCurrency, formatDate } from "@/shared/lib/format";
import { useCustomersFiltersStore } from "@/stores/customers-filters.store";

export function CustomersTable() {
  const search = useCustomersFiltersStore((state) => state.search);
  const status = useCustomersFiltersStore((state) => state.status);
  const page = useCustomersFiltersStore((state) => state.page);
  const setPage = useCustomersFiltersStore((state) => state.setPage);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["users", { search, status, page }],
    queryFn: () => userApi.getUsers({ search, status, page, pageSize: 8 }),
    placeholderData: (prev) => prev,
  });

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <Card>
      <CardContent className="overflow-x-auto pt-5">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[rgb(var(--color-border))] text-left text-xs text-[rgb(var(--color-text-muted))]">
              <th className="pb-2 font-medium">Customer</th>
              <th className="pb-2 font-medium">Plan</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Joined</th>
              <th className="pb-2 text-right font-medium">MRR</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || !data
              ? Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b border-[rgb(var(--color-border))] last:border-0">
                    <td className="py-3">
                      <Skeleton className="h-8 w-44" />
                    </td>
                    <td className="py-3">
                      <Skeleton className="h-5 w-14" />
                    </td>
                    <td className="py-3">
                      <Skeleton className="h-5 w-16" />
                    </td>
                    <td className="py-3">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="py-3 text-right">
                      <Skeleton className="ml-auto h-4 w-12" />
                    </td>
                  </tr>
                ))
              : data.items.map((user) => (
                  <tr key={user.id} className="border-b border-[rgb(var(--color-border))] last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.name} size="sm" />
                        <div>
                          <p className="font-medium leading-tight">{user.name}</p>
                          <p className="text-xs text-[rgb(var(--color-text-muted))]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-[rgb(var(--color-text-muted))]">{user.plan}</td>
                    <td className="py-3">
                      <Badge tone={statusTone(user.status)}>{user.status.replace("_", " ")}</Badge>
                    </td>
                    <td className="py-3 text-[rgb(var(--color-text-muted))]">{formatDate(user.joinedAt)}</td>
                    <td className="py-3 text-right font-medium">{formatCurrency(user.mrr)}</td>
                  </tr>
                ))}
          </tbody>
        </table>

        {data && data.total === 0 && (
          <p className="py-10 text-center text-sm text-[rgb(var(--color-text-muted))]">
            No customers match your filters.
          </p>
        )}

        {data && data.total > 0 && (
          <div className="flex items-center justify-between pt-4">
            <p className="text-xs text-[rgb(var(--color-text-muted))]">
              Page {data.page} of {totalPages} · {data.total} customers
            </p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={page >= totalPages || isFetching}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
