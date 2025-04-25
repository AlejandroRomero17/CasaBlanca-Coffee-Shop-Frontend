import { API_BASE_URL } from "@/config/api";
import { Product } from "@/types/product";
import { useAuthStore } from "@/store/authStore"; // Asegúrate de importar el store de auth

// Wrapper que maneja errores de red y parsea JSON
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const token = useAuthStore.getState().token; // Obtener el token desde el authStore
  console.log("Token en la petición:", token); // Verificamos que el token esté presente

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`; // Incluir el token en la cabecera
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    let msg: string;
    try {
      msg = await res.text();
    } catch {
      msg = `Request failed (${res.status})`;
    }
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

// CRUD Products
export function fetchProducts(): Promise<Product[]> {
  return request<Product[]>(`${API_BASE_URL}/products`);
}

export function createProduct(data: Partial<Product>): Promise<Product> {
  return request<Product>(`${API_BASE_URL}/products`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateProduct(
  id: string,
  data: Partial<Product>
): Promise<Product> {
  return request<Product>(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await request(`${API_BASE_URL}/products/${id}`, { method: "DELETE" });
}
