// src/components/sections/cart/CartHeader.tsx
import { motion } from "framer-motion";

interface CartHeaderProps {
  itemCount: number;
}

const CartHeader = ({ itemCount }: CartHeaderProps) => {
  const title = itemCount === 0 ? "Tu carrito está vacío" : "Tu carrito";
  const description =
    itemCount === 0
      ? "¡Ups! No hay nada todavía. Empieza a explorar nuestros productos. 🛍️"
      : itemCount === 1
      ? "Tienes 1 producto esperando por ti."
      : `Tienes ${itemCount} productos listos para el checkout.`;

  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-screen-xl px-4 py-8 mx-auto text-center 2xl:px-0 md:py-12 lg:text-left"
      aria-labelledby="cart-heading"
    >
      <h2
        id="cart-heading"
        className="font-fancy text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight
                   bg-gradient-to-r from-[#DFAF78] via-[#C58C5C] to-[#A46C4A] bg-clip-text text-transparent"
      >
        {title}
      </h2>
      <p className="max-w-2xl mx-auto mt-2 text-gray-700 sm:text-lg md:text-xl lg:mx-0">
        {description}
      </p>
    </motion.header>
  );
};

export default CartHeader;
