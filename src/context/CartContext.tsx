import { createContext, useContext, useState, useEffect } from "react";
import { fetchCart, getCartByUser, isAuthenticated, getUserId } from "@/services/cartService";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const session_id = (() => {
    let id = localStorage.getItem("session_id");
    if (!id) {
      id = Math.random().toString(36).substring(2);
      localStorage.setItem("session_id", id);
    }
    return id;
  })();

  const refreshCart = async () => {
    console.log('[DEBUG CartContext] refreshCart called');
    setLoading(true);
    let data = [];
    if (isAuthenticated()) {
      
      const user_id = getUserId();
      console.log('[DEBUG CartContext] Auth user_id:', user_id);
      try {
        data = await getCartByUser(user_id); 
        console.log('[DEBUG CartContext] getCartByUser response:', data);
      } catch (err) {
        data = [];
      }
    } else {
      
      data = await fetchCart(session_id);
      console.log('[DEBUG CartContext] fetchCart response:', data);
    }
    const mapped = data.map((item: any) => ({
      id_cart: item.id_cart,
      id_cart_temp: item.id_cart_temp,
      product_id: item.product_id,
      product_name: item.product_name,
      product_image: item.product_image || "https://via.placeholder.com/150",
      quantity: item.quantity,
      product_price: item.product_price,
    }));
    console.log('[DEBUG CartContext] mapped items:', mapped);
    setItems(mapped);
    setLoading(false);
  };

  // Permitir refrescar el carrito desde cualquier lugar
  useEffect(() => {
    window.addEventListener('cart:refresh', refreshCart);
    return () => window.removeEventListener('cart:refresh', refreshCart);
  }, []);

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
        refreshCart,
        loading,
        session_id,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
