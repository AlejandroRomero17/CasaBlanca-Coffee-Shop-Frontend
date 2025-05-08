import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Menu, ShoppingCart, Search, User, LogOut } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { fetchProducts } from "@/services/productService";
import { Product } from "@/types/product";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Nuestros productos", href: "/products" },
  { name: "Bienvenido al lounge", href: "/lounge" },
];

interface NavbarProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [bounce, setBounce] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const cartCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

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
    if (cartCount > 0) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderLinks = () => (
    <ul role="menubar" className="flex flex-row space-x-6">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.href;
        return (
          <motion.li
            key={link.name}
            role="none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={link.href}
              role="menuitem"
              aria-current={isActive ? "page" : undefined}
              className={clsx(
                "block text-lg font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                "hover:text-[#D09E66] focus:text-[#D09E66]",
                "text-white",
                isActive && "text-[#D09E66]"
              )}
            >
              <motion.span
                className="relative inline-block"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D09E66]"
                    layoutId="navIndicator"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                  />
                )}
              </motion.span>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );

  return (
    <motion.header
      className="fixed top-0 left-0 z-50 w-full backdrop-blur-md bg-[#A0744F]/95 border-b border-white/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="flex items-center justify-between px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link to="/" className="shrink-0">
          <motion.h1
            className="text-2xl font-bold tracking-tight text-white font-fancy md:text-3xl"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 8px rgba(255,255,255,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Casa Blanca
            <motion.span
              className="block h-0.5 bg-[#D09E66]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.h1>
        </Link>

        {/* LINKS DESKTOP */}
        <div className="items-center hidden md:flex">{renderLinks()}</div>

        {/* SEARCH + CART + USER */}
        <div className="relative flex items-center space-x-3">
          {/* Search */}
          <motion.div
            className="relative hidden md:block"
            animate={{
              width: isSearchFocused ? "240px" : "144px",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Buscar..."
              className="w-full bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#D09E66] h-8 pl-8"
              aria-label="Buscar productos"
            />
            <Search className="absolute left-2.5 top-1.5 w-4 h-4 text-gray-500" />
          </motion.div>

          <AnimatePresence>
            {search && results.length > 0 && (
              <motion.ul
                className="absolute left-0 z-50 w-64 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md top-10 max-h-80"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {results.map((item) => (
                  <motion.li
                    key={item.id}
                    onClick={() => {
                      setSearch("");
                      navigate(`/products/${item.id}`);
                    }}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-10 h-10 rounded"
                      whileHover={{ rotate: 5 }}
                    />
                    <div className="text-sm">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-600">${item.price}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Cart */}
          <Link to="/cart" className="relative" aria-label="Ir al carrito">
            <motion.div
              animate={bounce ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.5, type: "easeInOut" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="group relative hover:bg-[#D09E66]/20"
              >
                <ShoppingCart className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
                {cartCount > 0 && (
                  <motion.span
                    className="absolute w-5 h-5 text-xs font-semibold text-white bg-[#D09E66] rounded-full flex items-center justify-center -top-1 -right-1"
                    animate={
                      bounce
                        ? {
                            scale: [1, 1.5, 1],
                            backgroundColor: ["#D09E66", "#A0744F", "#D09E66"],
                            boxShadow: [
                              "0 0 0 rgba(208,158,102,0.4)",
                              "0 0 0 8px rgba(208,158,102,0)",
                              "0 0 0 rgba(208,158,102,0)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 0.7 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Button>
            </motion.div>
          </Link>

          {/* User Auth */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#D09E66]/20"
                >
                  <Avatar className="w-8 h-8 border border-white">
                    {user.avatarUrl ? (
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-[#D09E66] text-white">
                        {user.name?.charAt(0).toUpperCase() ||
                          user.email?.charAt(0).toUpperCase() || (
                            <User className="w-4 h-4" />
                          )}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="bg-white border border-gray-200 rounded-md shadow-lg"
              >
                <DropdownMenuLabel className="flex flex-col">
                  <span className="font-medium text-[#5a4038]">
                    {user.name || "Usuario"}
                  </span>
                  {user.email && (
                    <span className="text-sm font-normal text-gray-500">
                      {user.email}
                    </span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer"
                >
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 cursor-pointer focus:text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="hidden text-white hover:bg-[#D09E66]/20 md:block"
            >
              Iniciar sesión
            </Button>
          )}
        </div>

        {/* MENU ICON (SOLO PARA MÓVIL) */}
        <motion.div
          className="flex items-center ml-4 md:hidden"
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Abrir menú"
            onClick={onMenuClick}
            className="text-white hover:bg-[#D09E66]/20"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </motion.div>
      </nav>
    </motion.header>
  );
}

export default Navbar;
