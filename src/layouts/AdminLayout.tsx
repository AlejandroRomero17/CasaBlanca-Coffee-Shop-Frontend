// src/layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import AdminNavbar from "@/components/dashboard/AdminNavbar";
import AdminSidebar from "@/components/dashboard/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminNavbar />
        <main className="flex-1 p-6 bg-[#fefcf9]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
