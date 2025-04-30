// src/components/layout/AdminSidebar.tsx

import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebarStore";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  LayoutDashboard,
  Package,
  DollarSign,
  ShoppingBag,
  X,
} from "lucide-react";

const mainLinks = [
  { name: "Resumen", href: "/dashboard", icon: LayoutDashboard },
  { name: "Productos", href: "/dashboard/products", icon: Package },
  { name: "Ventas", href: "/dashboard/sales", icon: DollarSign },
  { name: "Pedidos", href: "/dashboard/orders", icon: ShoppingBag },
];

export default function AdminSidebar() {
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
          "fixed sm:relative inset-y-0 left-0 z-50 flex flex-col bg-white text-black shadow-sm overflow-hidden",
          "transition-width duration-200 ease-in-out",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          {!isCollapsed && (
            <h2 className="text-lg font-bold">Casa Blanca Admin</h2>
          )}
          <button
            className="p-2 text-black sm:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D09E66]"
            onClick={toggleSidebar}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main nav */}
        <nav className="flex flex-col flex-grow gap-1 px-2 sm:px-4">
          {mainLinks.map(({ name, href, icon: Icon }) => (
            <NavLink
              key={href}
              to={href}
              end={href === "/dashboard"} // solo match exact en "Resumen"
              className={({ isActive }) =>
                cn(
                  "relative flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D09E66]",
                  isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-200",
                  isActive &&
                    "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#3B2F2F]",
                  isCollapsed && "justify-center px-0"
                )
              }
              onClick={() => isSidebarOpen && closeSidebar()}
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && name}
            </NavLink>
          ))}
        </nav>

        {!isCollapsed && <Separator className="w-full my-2 bg-gray-300" />}

        {/* Home at bottom */}
        <nav className="flex flex-col px-2 sm:px-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "relative flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D09E66]",
                isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-200",
                isActive &&
                  "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#3B2F2F]",
                isCollapsed && "justify-center px-0"
              )
            }
            onClick={() => isSidebarOpen && closeSidebar()}
            title="Home"
          >
            <Home className="w-5 h-5" />
            {!isCollapsed && "Home"}
          </NavLink>
        </nav>

        {/* Footer note */}
        {!isCollapsed && (
          <p className="px-6 py-4 mt-auto text-sm text-gray-500">
            Panel de administración
          </p>
        )}
      </aside>
    </>
  );
}
