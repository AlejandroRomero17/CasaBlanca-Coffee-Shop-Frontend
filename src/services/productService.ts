import { API_BASE_URL } from "@/config/api";
import { getSessionId } from '../utils/session';

type ProductFilters = {
  search?: string;
  category?: string;
  priceOrder?: string;
  sort?: string;
};

export async function fetchProducts(filters: ProductFilters = {}) {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.category) params.append('category', filters.category);
  if (filters.priceOrder) params.append('priceOrder', filters.priceOrder);
  if (filters.sort) params.append('sort', filters.sort);

  // Obtén el token JWT desde localStorage (ajusta si lo guardas en otro lugar)
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
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

export async function addToCartTemp(product: {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity?: number;
}) {
  const session_id = getSessionId();
  const res = await fetch('/api/cart/temp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id,
      product_id: product.id,
      product_name: product.name,
      product_image: product.image,
      product_price: product.price,
      quantity: product.quantity || 1,
    })
  });
  return await res.json();
}
