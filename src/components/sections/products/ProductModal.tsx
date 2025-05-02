// src/components/sections/products/ProductModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { isAuthenticated, getUserId } from "@/utils/session";
import { addToTempCart, addToUserCart } from "@/services/cartService";
import clsx from "clsx";

interface Props {
  product: Product | null;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: Props) => {
  const [isAdded, setIsAdded] = useState(false);
  const addToCartState = useCartStore((s) => s.addItem);

  if (!product) return null;

  const handleAddToCart = async () => {
    const payload = {
      product_id: product.id,
      product_name: product.name,
      product_image: product.image,
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
        image: product.image,
        price: Number(product.price),
        quantity: 1,
      });

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
    }
  };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg bg-white shadow-xl border border-[#e6e0d4] p-6"
        style={{ backgroundColor: "#ffffff" }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#3B2F2F]">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-md object-cover aspect-[4/3]"
        />

        <p className="mt-4 text-[#3B2F2F]/80">{product.description}</p>

        <div className="flex items-center justify-between mt-6">
          <span className="text-lg font-bold text-[#3B2F2F]">
            ${product.price.toFixed(2)}
          </span>
          <Button
            onClick={handleAddToCart}
            className={clsx(
              "flex gap-2 items-center",
              isAdded
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-[#3B2F2F] hover:bg-[#5a4038] text-[#f5e8db]"
            )}
          >
            <ShoppingCart size={16} />
            <span>{isAdded ? "Agregado" : "Agregar al carrito"}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
