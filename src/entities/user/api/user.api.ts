import { delay } from "@/shared/api/delay";
import type { CustomerUser, UserPlan, UserStatus } from "../model/types";

const FIRST_NAMES = ["Olivia", "Liam", "Emma", "Noah", "Ava", "Lucas", "Mia", "Ethan", "Sofia", "Mason", "Isla", "Leo"];
const LAST_NAMES = ["Bennett", "Cole", "Reyes", "Novak", "Hart", "Sato", "Kramer", "Weiss", "Duarte", "Fischer"];
const COMPANIES = ["Nimbus Labs", "Vertex Cloud", "Northwind", "Orbit Health", "Fenwick & Co", "Loop Systems", "Cascade AI", "Brightline", "Quantum Retail", "Harbor Studio"];
const PLANS: UserPlan[] = ["Free", "Starter", "Pro", "Enterprise"];
const STATUSES: UserStatus[] = ["active", "active", "active", "trialing", "past_due", "canceled"];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDateWithinDays(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * days));
  return date.toISOString();
}

function mrrForPlan(plan: UserPlan): number {
  switch (plan) {
    case "Free":
      return 0;
    case "Starter":
      return 29 + Math.floor(Math.random() * 10) * 10;
    case "Pro":
      return 99 + Math.floor(Math.random() * 15) * 10;
    case "Enterprise":
      return 499 + Math.floor(Math.random() * 20) * 25;
  }
}

function buildUser(index: number): CustomerUser {
  const first = randomFrom(FIRST_NAMES);
  const last = randomFrom(LAST_NAMES);
  const plan = randomFrom(PLANS);
  return {
    id: `usr_${index.toString().padStart(4, "0")}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@${randomFrom(COMPANIES).toLowerCase().replace(/[^a-z]/g, "")}.com`,
    company: randomFrom(COMPANIES),
    plan,
    status: randomFrom(STATUSES),
    mrr: mrrForPlan(plan),
    joinedAt: randomDateWithinDays(360),
  };
}

let cachedUsers: CustomerUser[] | null = null;

function getAllUsers(): CustomerUser[] {
  if (!cachedUsers) {
    cachedUsers = Array.from({ length: 64 }, (_, i) => buildUser(i + 1)).sort(
      (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
    );
  }
  return cachedUsers;
}

export interface GetUsersParams {
  search?: string;
  status?: UserStatus | "all";
  page?: number;
  pageSize?: number;
}

export interface PaginatedUsers {
  items: CustomerUser[];
  total: number;
  page: number;
  pageSize: number;
}

export const userApi = {
  async getUsers(params: GetUsersParams = {}): Promise<PaginatedUsers> {
    const { search = "", status = "all", page = 1, pageSize = 8 } = params;
    let users = getAllUsers();

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.company.toLowerCase().includes(query)
      );
    }

    if (status !== "all") {
      users = users.filter((user) => user.status === status);
    }

    const total = users.length;
    const start = (page - 1) * pageSize;
    const items = users.slice(start, start + pageSize);

    return delay({ items, total, page, pageSize }, 450);
  },

  async getRecentUsers(limit = 5): Promise<CustomerUser[]> {
    return delay(getAllUsers().slice(0, limit), 500);
  },
};
