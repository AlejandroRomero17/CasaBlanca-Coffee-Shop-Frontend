import ProductsHero from "@/components/sections/products/ProductsHero";
// import ProductCategories from "@/components/sections/products/ProductCategories";
// import FeaturedProducts from "@/components/sections/products/FeaturedProducts";
import ProductGrid from "@/components/sections/products/ProductGrid";
import ProductFilterBar from "@/components/sections/products/ProductFilterBar";
// import MerchBanner from "@/components/sections/products/MerchBanner";
import SubscriptionCta from "@/components/sections/products/SubscriptionCta";
import { useState } from "react";
import type { ProductFilters } from "@/components/sections/products/ProductFilterBar";

const Products = () => {
  const [filters, setFilters] = useState<ProductFilters>({ search: "", category: "", priceOrder: "" });

  return (
    <>
      <ProductsHero />
      {/* <ProductCategories /> */}
      <ProductFilterBar filters={filters} setFilters={setFilters} />
      {/* <FeaturedProducts /> */}
      <ProductGrid
        filters={filters}
        query={filters.search || ""}
        category={filters.category || ""}
        priceOrder={filters.priceOrder || ""}
      />
      {/* <MerchBanner /> */}
      <SubscriptionCta />
    </>
  );
};

export default Products;
