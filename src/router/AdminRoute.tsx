// src/router/AdminRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Spinner } from "@/components/ui/spinner";

export default function AdminRoute() {
  const { token, user } = useAuthStore();

  if (token && !user) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="large" />
      </div>
    );
  }
  if (!token || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
