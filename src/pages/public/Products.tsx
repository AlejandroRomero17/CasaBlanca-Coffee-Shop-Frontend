// src/pages/public/Products.tsx
import { useState } from "react";
import type { ProductFilters } from "@/components/sections/products/ProductFilterBar";
import ProductsHero from "@/components/sections/products/ProductsHero";
import ProductFilterBar from "@/components/sections/products/ProductFilterBar";
import ProductGrid from "@/components/sections/products/ProductGrid";
import SubscriptionCta from "@/components/sections/products/SubscriptionCta";

const Products = () => {
  const [filters, setFilters] = useState<ProductFilters>({});

  return (
    <>
      <ProductsHero />
      <ProductFilterBar filters={filters} setFilters={setFilters} />
      <ProductGrid
        filters={filters}
        query={filters.search || ""}
        category={filters.category || ""}
        priceOrder={filters.priceOrder || ""}
      />
      <SubscriptionCta />
    </>
  );
};

export default Products;
