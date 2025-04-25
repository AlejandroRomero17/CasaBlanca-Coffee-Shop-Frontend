"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useSidebarStore } from "@/store/sidebarStore";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const user = useAuthStore((s) => s.user);
  const toggleCollapse = useSidebarStore((s) => s.toggleCollapse);
  const { logout } = useAuthStore(); // Aquí obtenemos el método logout
  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  const handleLogout = () => {
    logout(); // Ejecutamos el logout
    navigate("/login"); // Redirigimos al login
  };

  return (
    <header className="sticky top-0 left-0 z-50 w-full transition-colors duration-300 bg-white border-b border-gray-300 shadow-md">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Hamburger Menu Button */}
        <motion.button
          onClick={toggleCollapse}
          aria-label="Abrir menú"
          aria-pressed="false"
          className="w-10 h-10 p-2 transition-colors rounded-md hover:bg-gray-200"
        >
          <Menu className="w-6 h-6 text-black" />
        </motion.button>

        {/* Navbar Title */}
        <h1 className="text-lg font-semibold sm:text-xl text-[#4A4A4A]">
          Admin Dashboard
        </h1>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-10 h-10 p-0 text-black rounded-full ring-1 ring-gray-300"
              aria-label="Abrir menú de usuario"
            >
              <Avatar className="border-2 border-black h-9 w-9">
                {user?.avatarUrl ? (
                  <AvatarImage src={user.avatarUrl} alt={user.name ?? "User"} />
                ) : (
                  <AvatarFallback className="text-black bg-gray-300">
                    {user?.name?.charAt(0) ?? (
                      <User className="w-4 h-4 text-black" />
                    )}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
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
              onClick={handleLogout} // Llamamos a handleLogout aquí
              className="cursor-pointer hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-2 text-black" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminNavbar;
