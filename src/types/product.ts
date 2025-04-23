// src/types/product.ts

export type ProductCategory =
  | "café"
  | "bebidas"
  | "postres"
  | "desayunos"
  | "almuerzos";

export interface Product {
  id: string; // Supabase usa 'id' directamente
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  available: boolean;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  product: Product | string; // puede ser el objeto o solo el ID
  quantity: number;
  price: number;
}
