// src/router/AdminRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Spinner } from "@/components/ui/spinner";

export default function AdminRoute() {
  const { token, user } = useAuthStore();

  // Mientras carga el usuario
  if (token && !user) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="large" />
      </div>
    );
  }

  // 🚨 Si no hay token, redirigir a login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🚨 Si no es admin, redirigir al inicio
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Todo bien
  return <Outlet />;
}
