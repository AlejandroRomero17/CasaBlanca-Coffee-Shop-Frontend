// src/hooks/useFilteredProducts.ts
import { useEffect, useState } from "react";
import { fetchProducts } from "@/services/productService";
import { Product } from "@/types/product";

type Params = {
  query: string;
  category: string;
  priceOrder: string;
};

export const useFilteredProducts = ({
  query,
  category,
  priceOrder,
}: Params) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data.filter((p) => p.available));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProducts = products
    .filter(
      (p) =>
        (!query || p.name.toLowerCase().includes(query.toLowerCase())) &&
        (!category || p.category === category)
    )
    .sort((a, b) =>
      priceOrder === "asc"
        ? a.price - b.price
        : priceOrder === "desc"
        ? b.price - a.price
        : 0
    );

  return { filteredProducts, loading, error };
};
