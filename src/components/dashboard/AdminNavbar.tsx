// src/components/layout/AdminNavbar.tsx

import React, { useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Menu as MenuIcon } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useSidebarStore } from "@/store/sidebarStore";
import { useNavigate } from "react-router-dom";

const AdminNavbar = React.memo(function AdminNavbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const toggleCollapse = useSidebarStore((s) => s.toggleCollapse);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-white border-b border-gray-300 shadow-md">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Hamburger Menu */}
        <button
          onClick={toggleCollapse}
          aria-label="Alternar menú lateral"
          className="w-10 h-10 p-2 rounded-md hover:bg-gray-200 focus:outline-none"
        >
          <MenuIcon className="w-6 h-6 text-black" />
        </button>

        {/* Title */}
        <h1 className="text-lg font-semibold sm:text-xl text-[#4A4A4A]">
          Casa Blanca Dashboard
        </h1>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="w-10 h-10 p-0 rounded-full hover:bg-gray-100 focus:outline-none"
              aria-label="Abrir menú de usuario"
            >
              <Avatar className="border-2 border-black h-9 w-9">
                {user?.avatarUrl ? (
                  <AvatarImage src={user.avatarUrl} alt={user.name || "User"} />
                ) : (
                  <AvatarFallback className="text-black bg-gray-300">
                    {user?.name?.charAt(0) || <User className="w-4 h-4" />}
                  </AvatarFallback>
                )}
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="text-black bg-white rounded-lg shadow-md"
          >
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#4A4A4A]">
                  {user?.name || "Invitado"}
                </span>
                {user?.email && (
                  <span className="text-xs text-gray-500">{user.email}</span>
                )}
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 focus:outline-none"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
});

export default AdminNavbar;
