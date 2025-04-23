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

const AdminNavbar = () => {
  const user = useAuthStore((s) => s.user);
  const toggleCollapse = useSidebarStore((s) => s.toggleCollapse);

  const handleLogout = () => {
    console.log("Cerrar sesión");
  };

  return (
    <header className="sticky top-0 left-0 z-50 w-full text-black bg-white border-b">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <button
          onClick={toggleCollapse}
          className="p-2 mr-2 rounded-md hover:bg-gray-200"
        >
          <Menu className="w-5 h-5 text-black" />
        </button>

        <h1 className="text-lg font-semibold sm:text-xl">Admin Dashboard</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 text-black rounded-full h-9 w-9"
            >
              <Avatar className="h-9 w-9">
                {user?.avatarUrl ? (
                  <AvatarImage src={user.avatarUrl} alt={user.name ?? "User"} />
                ) : (
                  <AvatarFallback>
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
            className="text-black bg-white"
          >
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {user?.name || "Invitado"}
                </span>
                {user?.email && (
                  <span className="text-xs text-gray-500">{user.email}</span>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
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
