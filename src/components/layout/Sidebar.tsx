import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { X, ShoppingCart, Search, User, LogOut } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Nuestros productos", href: "/products" },
  { name: "Lounge", href: "/lounge" },
  { name: "Contacto", href: "/contact" },
  { name: "Blog", href: "/blog" },
  { name: "Suscripción", href: "/suscripcion" },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const cartCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {/* Backdrop con animación de desenfoque */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(4px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
          />

          {/* Sidebar panel con animación mejorada */}
          <motion.aside
            className="relative ml-auto h-full w-full max-w-sm bg-[#F3E5D7] shadow-2xl p-6 flex flex-col"
            initial={{ x: "100%" }}
            animate={{
              x: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 0.1,
              },
            }}
            exit={{
              x: "100%",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Sidebar navigation"
          >
            {/* Encabezado con animación */}
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.h2
                className="text-2xl font-bold text-[#A0744F] font-fancy"
                whileHover={{ scale: 1.05 }}
              >
                Casa Blanca
              </motion.h2>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Cerrar sidebar"
                  onClick={onClose}
                  className="text-[#A0744F] hover:bg-[#A0744F]/10"
                >
                  <X className="w-6 h-6" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Sección de usuario */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {user ? (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#A0744F]/10">
                  <Avatar className="w-10 h-10 border border-[#A0744F]">
                    {user.avatarUrl ? (
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-[#D09E66] text-white">
                        {user.name?.charAt(0).toUpperCase() ||
                          user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-[#5a4038]">
                      {user.name || "Usuario"}
                    </p>
                    {user.email && (
                      <p className="text-sm truncate text-[#A0744F]">
                        {user.email}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="text-[#5a4038] hover:bg-[#A0744F]/20"
                  >
                    <LogOut className="w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <Link to="/login" onClick={onClose}>
                  <Button
                    variant="outline"
                    className="w-full h-12 bg-[#A0744F]/10 border-[#A0744F]/20 hover:bg-[#A0744F]/20 text-[#5a4038]"
                  >
                    <User className="w-5 h-5 mr-2" />
                    Iniciar sesión
                  </Button>
                </Link>
              )}
            </motion.div>

            <Separator className="h-[2px] bg-[#A0744F]/20 mb-6" />

            {/* Links de navegación con animación escalonada */}
            <motion.nav
              aria-label="Sidebar links"
              className="flex-1 overflow-y-auto"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.5,
                  },
                },
              }}
            >
              <ul className="space-y-3">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <motion.li
                      key={link.name}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            type: "spring",
                            stiffness: 100,
                          },
                        },
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={link.href}
                        onClick={onClose}
                        className={clsx(
                          "block text-lg font-medium transition-colors px-4 py-3 rounded-lg",
                          "hover:bg-[#A0744F]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D09E66]",
                          isActive
                            ? "text-[#A0744F] bg-[#A0744F]/10 font-semibold"
                            : "text-[#5a4038]"
                        )}
                      >
                        <motion.span className="relative inline-block">
                          {link.name}
                          {isActive && (
                            <motion.span
                              className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D09E66]"
                              layoutId="mobileNavIndicator"
                              transition={{
                                type: "spring",
                                bounce: 0.25,
                                duration: 0.6,
                              }}
                            />
                          )}
                        </motion.span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>

            <Separator className="h-[2px] bg-[#A0744F]/20 my-4" />

            {/* Búsqueda con animación */}
            <motion.div
              className="relative mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0744F]" />
              <Input
                placeholder="Buscar..."
                className="w-full pl-10 bg-white/90 focus:bg-white focus:ring-2 focus:ring-[#D09E66] h-12"
                aria-label="Buscar productos"
              />
            </motion.div>

            {/* Botón de carrito con animación */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link to="/cart" onClick={onClose}>
                <Button
                  variant="outline"
                  className="w-full h-12 bg-[#A0744F]/10 border-[#A0744F]/20 hover:bg-[#A0744F]/20 text-[#5a4038]"
                >
                  <div className="flex items-center justify-center w-full">
                    <ShoppingCart className="w-5 h-5 mr-2 text-[#A0744F]" />
                    <span>Carrito</span>
                    {cartCount > 0 && (
                      <motion.span
                        className="ml-2 w-6 h-6 text-xs font-semibold text-white bg-[#D09E66] rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.9 }}
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </div>
                </Button>
              </Link>
            </motion.div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
