import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/features/theme-toggle/ThemeToggle";
import { Avatar, Button } from "@/shared/ui";
import { useAuthStore } from "@/stores/auth.store";
import { useUiStore } from "@/stores/ui.store";
import { ROUTES } from "@/shared/config/routes";

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  function handleLogout() {
    logout();
    navigate(ROUTES.login, { replace: true });
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className="hidden h-8 w-8 items-center justify-center rounded-md text-[rgb(var(--color-text-muted))] hover:bg-black/5 dark:hover:bg-white/5 md:flex"
          aria-label="Toggle sidebar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <h1 className="text-base font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="mx-1 h-6 w-px bg-[rgb(var(--color-border))]" />
        <div className="flex items-center gap-2">
          <Avatar name={user?.name ?? "Guest User"} size="sm" />
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-medium leading-tight">{user?.name ?? "Guest"}</span>
            <span className="text-xs leading-tight text-[rgb(var(--color-text-muted))]">{user?.email ?? ""}</span>
          </div>
        </div>
        <Button variant="secondary" size="sm" onClick={handleLogout}>
          Sign out
        </Button>
      </div>
    </header>
  );
}
