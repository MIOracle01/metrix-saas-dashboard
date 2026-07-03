import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/widgets/sidebar/Sidebar";
import { Topbar } from "@/widgets/topbar/Topbar";
import { ROUTES } from "@/shared/config/routes";

const TITLES: Record<string, string> = {
  [ROUTES.dashboard]: "Overview",
  [ROUTES.users]: "Customers",
};

export function DashboardLayout() {
  const location = useLocation();
  const title = TITLES[location.pathname] ?? "Metrix";

  return (
    <div className="flex h-screen overflow-hidden bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
