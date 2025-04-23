// src/services/productService.ts
import { API_BASE_URL } from "@/config/api";
import { Product } from "@/types/product";

/**
 * Wrapper que maneja errores de red y parsea JSON.
 * Deja listos los tipos Genéricos para que TypeScript infiera los retornos.
 */
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    // Intenta extraer mensaje de error útil si la API lo devuelve
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

// ──────────────────────────────────────────────────────────────────────────
// CRUD Products
// ──────────────────────────────────────────────────────────────────────────

/* GET /api/products */
export function fetchProducts(): Promise<Product[]> {
  return request<Product[]>(`${API_BASE_URL}/products`);
}

/* GET /api/products/:id  ─ alias para compatibilidad */
export function getProductById(id: string): Promise<Product> {
  return request<Product>(`${API_BASE_URL}/products/${id}`);
}
export const fetchProductById = getProductById; // alias legacy

/* POST /api/products */
export function createProduct(data: Partial<Product>): Promise<Product> {
  return request<Product>(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

/* PUT /api/products/:id */
export function updateProduct(
  id: string,
  data: Partial<Product>
): Promise<Product> {
  return request<Product>(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

/* DELETE /api/products/:id */
export async function deleteProduct(id: string): Promise<void> {
  await request(`${API_BASE_URL}/products/${id}`, { method: "DELETE" });
}

// ──────────────────────────────────────────────────────────────────────────
//  Extra helpers (opcional)
// ──────────────────────────────────────────────────────────────────────────
/**
 * Marca/Desmarca un producto como destacado sin necesitar cargar todos los campos.
 */
export function toggleFeatured(id: string, featured: boolean): Promise<Product> {
  return updateProduct(id, { featured });
}

/**
 * Cambia la disponibilidad rápidamente.
 */
export function setAvailability(id: string, available: boolean): Promise<Product> {
  return updateProduct(id, { available });
}
