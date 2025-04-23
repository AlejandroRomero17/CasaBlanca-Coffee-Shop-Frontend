// src/layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import AdminNavbar from "@/components/dashboard/AdminNavbar";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import { useSidebarStore } from "@/store/sidebarStore";

const AdminLayout = () => {
  const isCollapsed = useSidebarStore((s) => s.isCollapsed);

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-gray-50">
      {/* Navbar fijo arriba */}
      <AdminNavbar />

      {/* Contenedor principal */}
      <div className="flex flex-1 h-full overflow-hidden">
        {/* Sidebar a la izquierda */}
        <AdminSidebar />

        {/* Main content (lo que contiene AdminDashboard y otras rutas) */}
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 ${
            isCollapsed ? "md:pl-0" : "md:pl-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
