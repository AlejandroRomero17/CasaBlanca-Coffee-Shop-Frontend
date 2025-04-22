// src/pages/Products.tsx
import { useState } from "react";
import ProductsHero from "@/components/sections/products/ProductsHero";
import ProductFilterBar from "@/components/sections/products/ProductFilterBar";
import ProductGrid from "@/components/sections/products/ProductGrid";
import SubscriptionCta from "@/components/sections/products/SubscriptionCta";

const Products = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [priceOrder, setPriceOrder] = useState("");

  return (
    <>
      <ProductsHero />
      <ProductFilterBar
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        priceOrder={priceOrder}
        setPriceOrder={setPriceOrder}
      />
      <ProductGrid query={query} category={category} priceOrder={priceOrder} />
      <SubscriptionCta />
    </>
  );
};

export default Products;
