import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  name: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string) =>
        set({
          isAuthenticated: true,
          user: { name: email.split("@")[0], email },
        }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: "metrix-auth" }
  )
);
