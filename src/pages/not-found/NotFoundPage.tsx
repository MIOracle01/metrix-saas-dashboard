import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";
import { ROUTES } from "@/shared/config/routes";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[rgb(var(--color-bg))] px-4 text-center">
      <p className="text-sm font-medium text-[rgb(var(--color-accent))]">404</p>
      <h1 className="text-xl font-semibold">This page doesn't exist</h1>
      <p className="max-w-sm text-sm text-[rgb(var(--color-text-muted))]">
        The page you're looking for may have been moved or removed.
      </p>
      <Link to={ROUTES.dashboard}>
        <Button className="mt-2">Back to dashboard</Button>
      </Link>
    </div>
  );
}
