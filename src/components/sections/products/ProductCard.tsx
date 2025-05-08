// src/components/sections/products/ProductCard.tsx
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useCartStore } from "@/store/cartStore";
import { isAuthenticated, getUserId } from "@/utils/session";
import { addToTempCart, addToUserCart } from "@/services/cartService";

interface Props {
  product: Product;
  index: number;
  onClick?: () => void;
}

const ProductCard = ({ product, index, onClick }: Props) => {
  const cardRef = useRef(null);
  const isVisible = useInView(cardRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  const [isAdded, setIsAdded] = useState(false);
  const addToCartState = useCartStore((s) => s.addItem);

  const handleAddToCart = async () => {
    const payload = {
      product_id: product.id,
      product_name: product.name,
      product_image: product.image || "/placeholder.webp", // ✅ fallback
      product_price: Number(product.price),
      quantity: 1,
    };

    try {
      if (isAuthenticated()) {
        const user_id = getUserId()!;
        await addToUserCart({ user_id, ...payload });
      } else {
        await addToTempCart(payload);
      }

      addToCartState({
        id: product.id,
        name: product.name,
        image: product.image || "/placeholder.webp", // ✅ fallback consistente
        price: Number(product.price),
        quantity: 1,
      });

      console.log("✅ Imagen enviada al carrito:", product.image);

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 0.77, 0.47, 0.99],
      }}
      whileHover={{ y: -5 }}
      className="relative h-full cursor-pointer group"
      onClick={onClick}
    >
      <div className="h-full overflow-hidden rounded-lg border border-[#f0e6db] bg-white transition-all duration-300 ease-out group-hover:shadow-lg group-hover:ring-1 group-hover:ring-[#e9d4ba]/50">
        <div className="relative overflow-hidden aspect-[4/3]">
          <motion.img
            src={product.image || "/placeholder.webp"} // ✅ seguridad visual
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          />
          <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-full bg-[#3B2F2F] text-[#f5e8db] capitalize">
            {product.category}
          </span>
        </div>

        <div className="flex flex-col justify-between h-auto p-5">
          <h3 className="mb-1 text-lg font-semibold text-[#3B2F2F] md:text-xl">
            {product.name}
          </h3>
          <p className="text-sm text-[#3B2F2F]/80 mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-base font-bold text-[#3B2F2F]">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className={clsx(
                "rounded-full px-4 py-2 text-sm flex gap-1.5 items-center transition-all duration-300 transform",
                isAdded
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-[#3B2F2F] hover:bg-[#5a4038] text-[#f5e8db]"
              )}
            >
              <ShoppingCart size={16} />
              <span>{isAdded ? "Agregado" : "Agregar"}</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
