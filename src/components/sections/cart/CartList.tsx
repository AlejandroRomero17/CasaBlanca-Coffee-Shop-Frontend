//import { useEffect } from "react";
//import { useCartStore } from "@/store/cartStore";
import CartItem from "./CartItem";
import { deleteFromCart, deleteFromCartAuth, updateCartQty, updateCartQtyAuth, fetchCart } from '../../../services/cartService';
import { getSessionId } from '../../../utils/session';

export type CartItemType = {
  id_cart_temp?: string; 
  id_cart?: string;     
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  quantity: number;
};

interface CartListProps {
  items: CartItemType[];
  onUpdate: (items: CartItemType[]) => void;
  refreshCart: () => Promise<void>;
}

const CartList = ({ items, onUpdate, refreshCart }: CartListProps) => {
  
  console.log("[DEBUG CartList items]", items);

  
  const handleRemove = async (id_cart_temp?: string, id_cart?: string) => {
    if (id_cart) {
      // Usuario autenticado
      try {
        const resp = await deleteFromCartAuth(id_cart);
        console.log("[DEBUG] Respuesta deleteFromCart (auth):", resp);
        await refreshCart();
      } catch (err) {
        console.error("Error eliminando del carrito (auth):", err);
      }
    } else if (id_cart_temp) {
      // Invitado
      try {
        const session_id = getSessionId();
        const resp = await deleteFromCart(session_id, id_cart_temp);
        console.log("[DEBUG] Respuesta deleteFromCart:", resp);
        const updated = await fetchCart(session_id);
        onUpdate(updated);
        await refreshCart();
      } catch (err) {
        console.error("Error eliminando del carrito:", err);
      }
    }
  };
  const handleQty = async (id_cart_temp?: string, qty?: number, id_cart?: string) => {
    if (id_cart && typeof qty === 'number') {
      
      try {
        const resp = await updateCartQtyAuth(id_cart, qty);
        console.log("[DEBUG] Respuesta updateCartQty (auth):", resp);
        await refreshCart();
      } catch (err) {
        console.error("Error actualizando cantidad (auth):", err);
      }
    } else if (id_cart_temp && typeof qty === 'number') {
      
      const session_id = getSessionId();
      try {
        const resp = await updateCartQty(session_id, id_cart_temp, qty);
        console.log("[DEBUG] Respuesta updateCartQty:", resp);
        const updated = await fetchCart(session_id);
        onUpdate(updated);
        await refreshCart();
      } catch (err) {
        console.error("Error actualizando cantidad:", err);
      }
    }
  };

  return (
    <ul className="space-y-4">
      {items.map((it) => (
        <CartItem
          key={it.id_cart ?? it.id_cart_temp ?? it.product_id}
          image={it.product_image || "https://placehold.co/120x120?text=Sin+Imagen"}
          title={it.product_name}
          price={typeof it.product_price === 'number' ? it.product_price : 0}
          quantity={it.quantity}
          onRemove={() => handleRemove(it.id_cart_temp, it.id_cart)}
          onQuantityChange={(q) => handleQty(it.id_cart_temp, q, it.id_cart)}
        />
      ))}
    </ul>
  );
};

export default CartList;
