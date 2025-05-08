// src/store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSessionId } from "@/utils/session";

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
  selectedItems: Set<string>;
  setSessionId: (id: string) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  replaceItems: (items: CartItem[]) => void;
  clearCart: () => void;
  toggleItemSelection: (id: string) => void;
  toggleAllItems: (select: boolean) => void;
  clearSelectedItems: () => void;
  getSelectedProducts: () => CartItem[];
  getSubtotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      sessionId: getSessionId(),
      items: [],
      selectedItems: new Set(),

      setSessionId: (id) => {
        localStorage.setItem("session_id", id);
        set({ sessionId: id });
      },

      addItem: (item) => {
        set((state) => {
          const found = state.items.find((i) => i.id === item.id);
          const newItems = found
            ? state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              )
            : [...state.items, item];

          const newSelected = new Set(state.selectedItems);
          newSelected.add(item.id);

          return {
            items: newItems,
            selectedItems: newSelected,
          };
        });
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
          selectedItems: new Set(
            [...state.selectedItems].filter((itemId) => itemId !== id)
          ),
        })),

      updateQuantity: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, qty) } : i
          ),
        })),

      replaceItems: (items) => {
        const newSelected = new Set(items.map((item) => item.id));
        set({ items, selectedItems: newSelected });
      },

      clearCart: () => set({ items: [], selectedItems: new Set() }),

      toggleItemSelection: (id) => {
        set((state) => {
          const newSelected = new Set(state.selectedItems);
          if (newSelected.has(id)) {
            newSelected.delete(id);
          } else {
            newSelected.add(id);
          }
          return { selectedItems: newSelected };
        });
      },

      toggleAllItems: (select) => {
        set((state) => {
          if (select) {
            return {
              selectedItems: new Set(state.items.map((item) => item.id)),
            };
          }
          return { selectedItems: new Set() };
        });
      },

      clearSelectedItems: () => {
        set({ selectedItems: new Set() });
      },

      // Nuevos métodos helpers
      getSelectedProducts: () => {
        const { items, selectedItems } = get();
        return items.filter((item) => selectedItems.has(item.id));
      },

      getSubtotal: () => {
        const selectedProducts = get().getSelectedProducts();
        return selectedProducts.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        selectedItems: Array.from(state.selectedItems),
      }),
      merge: (persistedState, currentState) => {
        const state = persistedState as Partial<CartStore>;
        return {
          ...currentState,
          ...state,
          selectedItems: state.selectedItems
            ? new Set(state.selectedItems)
            : new Set(),
        };
      },
    }
  )
);
