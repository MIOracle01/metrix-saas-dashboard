import { create } from "zustand";
import type { UserStatus } from "@/entities/user";

interface CustomersFiltersState {
  search: string;
  status: UserStatus | "all";
  page: number;
  setSearch: (search: string) => void;
  setStatus: (status: UserStatus | "all") => void;
  setPage: (page: number) => void;
}

export const useCustomersFiltersStore = create<CustomersFiltersState>((set) => ({
  search: "",
  status: "all",
  page: 1,
  setSearch: (search) => set({ search, page: 1 }),
  setStatus: (status) => set({ status, page: 1 }),
  setPage: (page) => set({ page }),
}));
