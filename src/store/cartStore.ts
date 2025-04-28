// src/store/cartStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSessionId } from "@/utils/session"; // Unificamos sesión

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
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      // Siempre usamos getSessionId() para sincronizar con utils/session
      sessionId: getSessionId(),
      items: [],

      setSessionId: (id) => {
        // Refleja tanto en localStorage.session_id como en el store
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

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      // Sólo persistimos los items; sessionId viene de utils/session
      partialize: (state) => ({ items: state.items }),
    }
  )
);
