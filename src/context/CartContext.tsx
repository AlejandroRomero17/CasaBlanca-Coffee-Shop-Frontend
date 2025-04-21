import { createContext, useContext, useState, useEffect } from "react";
import { fetchCart } from "@/services/cartService";

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
    setLoading(true);
    const data = await fetchCart(session_id);
    setItems(
      data.map((item: any) => ({
        id: item.product_id,
        name: item.product_name,
        image: item.product_image || "https://via.placeholder.com/150",
        quantity: item.quantity,
        price: item.product_price,
      }))
    );
    setLoading(false);
  };

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
