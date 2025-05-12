import API from "@/services/api";
import { Product } from "@/types/product";
import { useAuthStore } from "@/store/authStore";

/**
 * Interceptor manual opcional (para funciones fuera de componentes React).
 * Aunque ya se aplica uno global en `services/api.ts`, esto asegura el token
 * también si se consume fuera del flujo normal de React.
 */
const withAuth = () => {
  const token = useAuthStore.getState().token;
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

// GET /products
export const fetchProducts = async (): Promise<Product[]> => {
  withAuth();
  const res = await API.get<Product[]>("/products");
  return res.data;
};

export async function getProductById(id: string): Promise<Product> {
  const res = await API.get(`/products/${id}`);
  return res.data;
}

// POST /products
export const createProduct = async (
  data: Partial<Product>
): Promise<Product> => {
  withAuth();
  const res = await API.post<Product>("/products", data);
  return res.data;
};

// PUT /products/:id
export const updateProduct = async (
  id: string,
  data: Partial<Product>
): Promise<Product> => {
  withAuth();
  const res = await API.put<Product>(`/products/${id}`, data);
  return res.data;
};

// DELETE /products/:id
export const deleteProduct = async (id: string): Promise<void> => {
  withAuth();
  await API.delete(`/products/${id}`);
};
