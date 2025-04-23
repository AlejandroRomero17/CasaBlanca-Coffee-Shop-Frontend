import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartStore = {
  sessionId: string;
  items: CartItem[];
  setSessionId: (id: string) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  replaceItems: (items: CartItem[]) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      sessionId: localStorage.getItem("session_id") || generateSessionId(),
      items: [],

      setSessionId: (id) => {
        localStorage.setItem("session_id", id);
        set({ sessionId: id });
      },

      addItem: (item) => {
        set((state) => {
          const found = state.items.find((i) => i.id === item.id);
          return found
            ? {
                items: state.items.map((i) =>
                  i.id === item.id
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i
                ),
              }
            : { items: [...state.items, item] };
        });
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, qty) } : i
          ),
        })),

      replaceItems: (items) => set({ items }),
    }),
    { name: "cart-storage" } // Persistir en localStorage
  )
);

const generateSessionId = () => {
  return `session-${Math.random().toString(36).substr(2, 9)}`;
};
