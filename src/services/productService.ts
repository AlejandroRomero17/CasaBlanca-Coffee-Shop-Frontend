import { API_BASE_URL } from "@/config/api";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "café" | "bebidas" | "postres" | "desayunos" | "almuerzos";
  image: string;
  available: boolean;
  featured: boolean;
};

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products`);
  if (!res.ok) throw new Error("No se pudieron obtener los productos");

  return await res.json(); // ya viene con `id`
}
