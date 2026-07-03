export type UserPlan = "Free" | "Starter" | "Pro" | "Enterprise";
export type UserStatus = "active" | "trialing" | "past_due" | "canceled";

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: UserPlan;
  status: UserStatus;
  mrr: number;
  joinedAt: string;
}
