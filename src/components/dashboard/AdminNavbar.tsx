// src/components/admin/AdminNavbar.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";

const AdminNavbar = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="flex items-center justify-between w-full px-6 py-4 bg-white border-b shadow-sm">
      <h1 className="text-xl font-semibold text-[#3B2F2F]">Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-[#3B2F2F]/80">
          {user?.name || "Administrador"}
        </span>
        <Avatar className="w-8 h-8">
          <AvatarFallback>{user?.name?.charAt(0) ?? "A"}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default AdminNavbar;
