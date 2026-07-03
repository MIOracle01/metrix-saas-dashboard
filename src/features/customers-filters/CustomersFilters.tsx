import { Input } from "@/shared/ui";
import { useCustomersFiltersStore } from "@/stores/customers-filters.store";
import type { UserStatus } from "@/entities/user";
import { cn } from "@/shared/lib/cn";

const STATUS_OPTIONS: { value: UserStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "trialing", label: "Trialing" },
  { value: "past_due", label: "Past due" },
  { value: "canceled", label: "Canceled" },
];

export function CustomersFilters() {
  const search = useCustomersFiltersStore((state) => state.search);
  const status = useCustomersFiltersStore((state) => state.status);
  const setSearch = useCustomersFiltersStore((state) => state.setSearch);
  const setStatus = useCustomersFiltersStore((state) => state.setStatus);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="w-full sm:max-w-xs">
        <Input
          placeholder="Search by name, email or company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {STATUS_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setStatus(option.value)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              status === option.value
                ? "border-[rgb(var(--color-accent))] bg-[rgb(var(--color-accent))]/10 text-[rgb(var(--color-accent))]"
                : "border-[rgb(var(--color-border))] text-[rgb(var(--color-text-muted))] hover:bg-black/5 dark:hover:bg-white/5"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
