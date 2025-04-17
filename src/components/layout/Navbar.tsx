// src/components/layout/Navbar.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const cartCount = 2; // Simulación de 2 productos

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Nuestros productos", href: "/products" },
    { name: "Bienvenido al lounge", href: "/lounge" },
    { name: "Entrega", href: "/delivery" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-transparent backdrop-blur-md">
      <nav className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* LOGO */}
        <div className="text-2xl font-bold text-black font-fancy">
          Casa Blanca
        </div>

        {/* NAV LINKS - DESKTOP */}
        <div className="items-center hidden space-x-6 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`text-black hover:text-[#D09E66] transition ${
                  isActive ? "font-bold border-b-2 border-[#D09E66]" : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* SEARCH + CART - DESKTOP */}
        <div className="relative items-center hidden space-x-4 md:flex">
          <Input placeholder="Buscar..." className="w-48 bg-white/70" />

          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <Icon icon="mdi:cart-outline" className="w-6 h-6 text-black" />
            </Button>
            <span className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-600 rounded-full -top-1 -right-1">
              {cartCount}
            </span>
          </Link>
        </div>

        {/* MENU ICON - MOBILE */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            <Icon
              icon={menuOpen ? "mdi:close" : "mdi:menu"}
              className="w-7 h-7"
            />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="px-6 py-4 space-y-4 shadow-md md:hidden bg-beige-light/80 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-black hover:text-[#D09E66] ${
                  isActive ? "font-bold border-b-2 border-[#D09E66]" : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Input placeholder="Buscar..." className="w-full bg-white/70" />

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="relative inline-block"
          >
            <Button variant="ghost" size="icon" className="mt-2">
              <Icon icon="mdi:cart-outline" className="w-6 h-6 text-black" />
            </Button>
            <span className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-600 rounded-full -top-1 -right-1">
              {cartCount}
            </span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
