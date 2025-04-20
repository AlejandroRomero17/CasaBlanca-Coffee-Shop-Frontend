import { API_BASE_URL } from "@/config/api";

export async function fetchProducts() {
  const res = await fetch(`${API_BASE_URL}/products`);
  if (!res.ok) throw new Error("No se pudieron obtener los productos");
  return await res.json();
}

export async function fetchProductById(id: string) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("No se pudo obtener el producto");
  return await res.json();
}

export async function fetchFeaturedProducts() {
  const res = await fetch(`${API_BASE_URL}/products/featured`);
  if (!res.ok) throw new Error("No se pudieron obtener los productos destacados");
  return await res.json();
}

export async function fetchProductsByCategory(category: string) {
  const res = await fetch(`${API_BASE_URL}/products/category/${category}`);
  if (!res.ok) throw new Error("No se pudieron obtener los productos por categoría");
  return await res.json();
}
