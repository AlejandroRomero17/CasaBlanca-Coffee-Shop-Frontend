import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import CartItem from "./CartItem";

const CartList = () => {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  /* Debug */
  useEffect(() => console.log("🛒 items:", items), [items]);

  if (items.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        Tu carrito está vacío
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {items.map((it) => (
        <CartItem
          key={it.id}
          image={it.image}
          title={it.name}
          price={it.price}
          quantity={it.quantity}
          onRemove={() => removeItem(it.id)}
          onQuantityChange={(q) => updateQuantity(it.id, q)}
        />
      ))}
    </ul>
  );
};

export default CartList;
