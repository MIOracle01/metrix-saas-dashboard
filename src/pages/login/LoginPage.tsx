import { Navigate } from "react-router-dom";
import { LoginForm } from "@/features/auth/LoginForm";
import { useAuthStore } from "@/stores/auth.store";
import { ROUTES } from "@/shared/config/routes";

export function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--color-bg))] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgb(var(--color-accent))] text-lg font-bold text-[rgb(var(--color-accent-foreground))]">
            M
          </div>
          <div>
            <h1 className="text-lg font-semibold">Sign in to Metrix</h1>
            <p className="text-sm text-[rgb(var(--color-text-muted))]">
              Analytics for growing SaaS teams
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
