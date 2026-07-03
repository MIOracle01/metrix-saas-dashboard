import type { CustomerUser } from "@/entities/user";
import { Avatar, Badge, Card, CardContent, CardHeader, CardTitle, Skeleton } from "@/shared/ui";
import { formatCurrency, formatDate } from "@/shared/lib/format";
import { statusTone } from "@/entities/user/lib/status-tone";

interface RecentUsersTableProps {
  users: CustomerUser[] | undefined;
  isLoading: boolean;
}

export function RecentUsersTable({ users, isLoading }: RecentUsersTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Signups</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
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
            {isLoading || !users
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-[rgb(var(--color-border))] last:border-0">
                    <td className="py-3">
                      <Skeleton className="h-8 w-40" />
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
              : users.map((user) => (
                  <tr key={user.id} className="border-b border-[rgb(var(--color-border))] last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.name} size="sm" />
                        <div>
                          <p className="font-medium leading-tight">{user.name}</p>
                          <p className="text-xs text-[rgb(var(--color-text-muted))]">{user.company}</p>
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
      </CardContent>
    </Card>
  );
}
