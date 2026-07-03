import type { UserStatus } from "../model/types";

export function statusTone(status: UserStatus): "positive" | "warning" | "negative" | "neutral" {
  switch (status) {
    case "active":
      return "positive";
    case "trialing":
      return "warning";
    case "past_due":
      return "negative";
    case "canceled":
      return "neutral";
  }
}
