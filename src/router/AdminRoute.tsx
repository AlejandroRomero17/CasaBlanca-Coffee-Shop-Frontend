import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Spinner } from "@/components/ui/spinner";

const AdminRoute = () => {
  const { token, user } = useAuthStore();

  // Si hay token pero no user aún, mostrar loading temporal
  if (token && !user) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="large" />
      </div>
    );
  }

  // Si no está autenticado o no es admin, redirigir
  if (!token || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
