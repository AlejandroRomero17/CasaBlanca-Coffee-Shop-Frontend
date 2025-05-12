// src/types/product.ts

export type ProductCategory =
  | "café"
  | "bebidas"
  | "postres"
  | "desayunos"
  | "almuerzos";

export interface Product {
  id: string;
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
