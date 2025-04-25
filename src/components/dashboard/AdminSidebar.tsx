"use client";

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebarStore";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Package,
  DollarSign,
  ShoppingBag,
  X,
} from "lucide-react";

const links = [
  { name: "Resumen", href: "/admin", icon: LayoutDashboard },
  { name: "Productos", href: "/admin/products", icon: Package },
  { name: "Ventas", href: "/admin/sales", icon: DollarSign },
  { name: "Pedidos", href: "/admin/orders", icon: ShoppingBag },
];

const AdminSidebar = () => {
  const location = useLocation();
  const isSidebarOpen = useSidebarStore((s) => s.isSidebarOpen);
  const isCollapsed = useSidebarStore((s) => s.isCollapsed);
  const toggleSidebar = useSidebarStore((s) => s.toggleSidebar);
  const closeSidebar = useSidebarStore((s) => s.closeSidebar);

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 sm:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={cn(
          "h-full bg-white text-black shadow-sm transition-all duration-300", // fondo blanco y sombra ligera
          "w-64 sm:relative sm:block hidden",
          isCollapsed ? "md:w-20" : "md:w-64"
        )}
      >
        <div className="flex items-center justify-between px-4 py-4 sm:py-6 sm:px-6">
          {!isCollapsed && (
            <h2 className="text-lg font-bold text-black">Casa Blanca Admin</h2>
          )}
          <button
            className="p-2 text-black sm:hidden hover:text-gray-600"
            onClick={toggleSidebar}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-2 sm:px-4">
          {links.map(({ name, href, icon: Icon }) => {
            const isActive = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-gray-200", // Cambio de hover para un fondo suave
                  isActive && "bg-gray-300 font-semibold", // Color de fondo para item activo
                  isCollapsed && "justify-center px-0"
                )}
                onClick={() => {
                  if (window.innerWidth < 640) closeSidebar();
                }}
              >
                <Icon className="w-5 h-5 text-black" /> {/* Iconos negros */}
                {!isCollapsed && name}
              </Link>
            );
          })}
        </nav>

        {/* Separador ajustado a la medida del sidebar */}
        {!isCollapsed && (
          <>
            <Separator className="w-full my-2 bg-gray-300" />{" "}
            {/* Usamos w-full */}
            <p className="px-6 pb-6 text-sm text-gray-500">
              Panel de administración
            </p>
          </>
        )}
      </aside>
    </>
  );
};

export default AdminSidebar;
