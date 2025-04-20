import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Menu, ShoppingCart, X } from "lucide-react";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Nuestros productos", href: "/products" },
  { name: "Bienvenido al lounge", href: "/lounge" },
  { name: "Entrega", href: "/delivery" },
];

interface NavbarProps {
  isMenuOpen: boolean;
  onMenuClick: () => void;
}

export function Navbar({ isMenuOpen, onMenuClick }: NavbarProps) {
  const [bounce, setBounce] = useState(false);
  const location = useLocation();
  const cartCount = 2; // Simulación

  useEffect(() => {
    if (cartCount > 0) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const renderLinks = (onClick?: () => void) => (
    <ul role="menubar" className="flex flex-col md:flex-row md:space-x-6">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.href;
        return (
          <li key={link.name} role="none">
            <Link
              to={link.href}
              onClick={onClick}
              role="menuitem"
              aria-current={isActive ? "page" : undefined}
              className={clsx(
                "block text-lg font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                "hover:text-[#D09E66] focus:text-[#D09E66]",
                "text-white",
                isActive && "text-[#D09E66] underline"
              )}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 z-50 w-full backdrop-blur-md bg-[#A0744F]/95 border-b border-white/20"
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="flex items-center justify-between px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8"
      >
        {/* LOGO */}
        <Link to="/" className="shrink-0">
          <motion.h1
            className="text-2xl font-bold tracking-tight text-white font-fancy md:text-3xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Casa Blanca
          </motion.h1>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="items-center hidden md:flex">{renderLinks()}</div>

        {/* SEARCH + CART - DESKTOP */}
        <div className="items-center hidden space-x-3 md:flex">
          <Input
            placeholder="Buscar..."
            className="w-36 bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#D09E66] h-8"
            aria-label="Buscar productos"
          />
          <Link to="/cart" className="relative" aria-label="Ir al carrito">
            <motion.div
              animate={bounce ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="group relative hover:bg-[#D09E66]/20"
              >
                <ShoppingCart className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
                <motion.span
                  className="absolute inline-flex items-center justify-center w-4 h-4 text-[10px] font-semibold text-white bg-[#D09E66] rounded-full -top-1 -right-1"
                  aria-live="polite"
                  animate={
                    bounce
                      ? {
                          scale: [1, 1.5, 1],
                          backgroundColor: ["#D09E66", "#A0744F", "#D09E66"],
                        }
                      : {}
                  }
                >
                  {cartCount}
                </motion.span>
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* MENU TOGGLE - VISIBLE EN TODOS LOS DISPOSITIVOS */}
        <motion.div
          className="flex items-center ml-4"
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            onClick={onMenuClick}
            className="text-white focus-visible:ring-2 focus-visible:ring-accent hover:bg-[#D09E66]/20"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </Button>
        </motion.div>
      </nav>
    </header>
  );
}

export default Navbar;
