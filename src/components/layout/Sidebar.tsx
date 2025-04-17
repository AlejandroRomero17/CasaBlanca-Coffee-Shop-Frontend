import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { X, ShoppingCart } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Nuestros productos", href: "/products" },
  { name: "Bienvenido al lounge", href: "/lounge" },
  { name: "Entrega", href: "/delivery" },
  { name: "Contacto", href: "/contact" },
  { name: "Blog", href: "/blog" },
  { name: "Suscripción", href: "/suscripcion" },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          {/* Sidebar panel */}
          <motion.aside
            className="relative ml-auto h-full w-64 bg-[#F3E5D7] backdrop-blur-md shadow-lg p-6 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Sidebar navigation"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-black font-fancy">
                Casa Blanca
              </h2>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Cerrar sidebar"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <Separator className="mb-4" />

            <nav aria-label="Sidebar links" className="flex-1 overflow-y-auto">
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      onClick={onClose}
                      className={clsx(
                        "block text-lg font-medium transition-colors",
                        "hover:text-[#D09E66] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D09E66]"
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Separator className="my-4" />

            <Input
              placeholder="Buscar..."
              className="w-full bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#D09E66]"
              aria-label="Buscar productos"
            />

            <div className="mt-4">
              <Link to="/cart" onClick={onClose}>
                <Button variant="secondary" className="justify-start w-full">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Carrito
                </Button>
              </Link>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
