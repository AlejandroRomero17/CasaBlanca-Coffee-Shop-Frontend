import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Nuestros productos", href: "/products" },
    { name: "Entrega", href: "/delivery" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-transparent backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="text-2xl font-fancy font-bold text-black">
          Casa Blanca
        </div>

        {/* NAV LINKS - DESKTOP */}
        <div className="hidden md:flex space-x-6 items-center">
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
        <div className="hidden md:flex items-center space-x-4">
          <Input placeholder="Buscar..." className="w-48 bg-white/70" />
          <Button variant="ghost" size="icon">
            <Icon icon="mdi:cart-outline" className="text-black w-6 h-6" />
          </Button>
        </div>

        {/* MENU ICON - MOBILE */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black focus:outline-none"
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
        <div className="md:hidden px-6 py-4 bg-beige-light shadow-md space-y-4">
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
          <Input placeholder="Buscar..." className="bg-white/70" />
          <Button variant="ghost" size="icon" className="mt-2">
            <Icon icon="mdi:cart-outline" className="text-black w-6 h-6" />
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
