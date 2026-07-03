import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@/shared/ui";
import { ROUTES } from "@/shared/config/routes";
import { useAuthStore } from "@/stores/auth.store";

export function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("jane.doe@metrix.io");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!email.includes("@")) {
      setError("Enter a valid email address");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      login(email);
      setIsSubmitting(false);
      navigate(ROUTES.dashboard, { replace: true });
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <Input
        id="email"
        type="email"
        label="Work email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        error={error ?? undefined}
      />
      <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-2 w-full">
        Sign in
      </Button>
      <p className="text-center text-xs text-[rgb(var(--color-text-muted))]">
        Demo mode — any email/password combination (4+ chars) works.
      </p>
    </form>
  );
}
