import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/cn";
import { ROUTES } from "@/shared/config/routes";
import { useUiStore } from "@/stores/ui.store";

const NAV_ITEMS = [
  { to: ROUTES.dashboard, label: "Overview", icon: OverviewIcon },
  { to: ROUTES.users, label: "Customers", icon: UsersIcon },
];

export function Sidebar() {
  const isCollapsed = useUiStore((state) => state.isSidebarCollapsed);

  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col border-r border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] transition-[width] duration-200 md:flex",
        isCollapsed ? "w-[72px]" : "w-60"
      )}
    >
      <div className="flex h-14 items-center gap-2 border-b border-[rgb(var(--color-border))] px-4">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[rgb(var(--color-accent))] text-sm font-bold text-[rgb(var(--color-accent-foreground))]">
          M
        </div>
        {!isCollapsed && <span className="text-sm font-semibold">Metrix</span>}
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === ROUTES.dashboard}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[rgb(var(--color-accent))]/10 text-[rgb(var(--color-accent))]"
                  : "text-[rgb(var(--color-text-muted))] hover:bg-black/5 hover:text-[rgb(var(--color-text))] dark:hover:bg-white/5"
              )
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[rgb(var(--color-border))] p-3">
        {!isCollapsed && (
          <p className="px-3 text-xs text-[rgb(var(--color-text-muted))]">Metrix v2.4.1 — Pro plan</p>
        )}
      </div>
    </aside>
  );
}

function OverviewIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
