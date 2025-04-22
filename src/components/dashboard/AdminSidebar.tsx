// src/components/admin/AdminSidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Package,
  DollarSign,
  ShoppingBag,
} from "lucide-react"; // Íconos elegantes

const links = [
  {
    name: "Resumen",
    href: "/admin",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Productos",
    href: "/admin/products",
    icon: <Package className="w-5 h-5" />,
  },
  {
    name: "Ventas",
    href: "/admin/sales",
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    name: "Pedidos",
    href: "/admin/orders",
    icon: <ShoppingBag className="w-5 h-5" />,
  },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-[#3B2F2F] text-white flex flex-col p-6">
      <h2 className="mb-6 text-lg font-bold">Casa Blanca Admin</h2>
      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                "hover:bg-[#523d36]",
                isActive && "bg-[#523d36]"
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav>
      <Separator className="my-6 bg-white/20" />
      <p className="text-sm text-white/70">Panel de administración</p>
    </aside>
  );
};

export default AdminSidebar;
