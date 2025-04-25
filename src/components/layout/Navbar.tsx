import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Menu, ShoppingCart, X } from "lucide-react";
import { fetchProducts } from "@/services/productService";
import { Product } from "@/types/product";
import { useCart } from "../../context/CartContext";
import { useAuthStore } from "@store/authStore";

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
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [bounce, setBounce] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    fetchProducts().then(setAllProducts).catch(console.error);
  }, []);

  useEffect(() => {
    setResults(
      allProducts.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, allProducts]);

  useEffect(() => {
    if (itemCount > 0) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

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
    <header className="fixed top-0 left-0 z-50 w-full backdrop-blur-md bg-[#A0744F]/95 border-b border-white/20">
      <nav className="flex items-center justify-between px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
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

        {/* LINKS DESKTOP */}
        <div className="items-center hidden md:flex">{renderLinks()}</div>

        {/* SEARCH + CART + LOGOUT */}
        <div className="relative items-center hidden space-x-3 md:flex">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="w-36 bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#D09E66] h-8"
            aria-label="Buscar productos"
          />
          {search && results.length > 0 && (
            <ul className="absolute left-0 z-50 w-64 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md top-10 max-h-80">
              {results.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    setSearch("");
                    navigate("/products");
                  }}
                  className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-10 h-10 rounded"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-600">${item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

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
                  {itemCount}
                </motion.span>
              </Button>
            </motion.div>
          </Link>

          {/* BOTÓN DE CERRAR SESIÓN */}
          {user && (
            <Button
              variant="outline"
              size="sm"
              className="ml-2 text-white border-white hover:bg-[#D09E66]/20 hover:text-[#D09E66]"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Cerrar sesión
            </Button>
          )}
        </div>

        {/* MENU ICON */}
        <motion.div
          className="flex items-center ml-4"
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={onMenuClick}
            className="text-white hover:bg-[#D09E66]/20"
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
