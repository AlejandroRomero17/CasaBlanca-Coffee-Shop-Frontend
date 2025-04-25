// src/store/productStore.ts
import { create } from "zustand";
import { Product } from "@/types/product";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";

// Definir el tipo de estado
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Partial<Product>) => Promise<void>;
  editProduct: (id: string, data: Partial<Product>) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
}

// Crear el store con zustand
export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchProducts();
      set({ products: data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  addProduct: async (product: Partial<Product>) => {
    try {
      await createProduct(product);
      await set((state) => ({
        products: [...state.products, product as Product],
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  editProduct: async (id: string, data: Partial<Product>) => {
    try {
      const updatedProduct = await updateProduct(id, data);
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? updatedProduct : product
        ),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  removeProduct: async (id: string) => {
    try {
      await deleteProduct(id);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));
