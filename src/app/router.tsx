import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "@/pages/login/LoginPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { UsersPage } from "@/pages/users/UsersPage";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";
import { ROUTES } from "@/shared/config/routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.login,
    element: <LoginPage />,
  },
  {
    path: ROUTES.dashboard,
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: ROUTES.users.slice(1), element: <UsersPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
