import ProductsHero from "@/components/sections/products/ProductsHero";
// import ProductCategories from "@/components/sections/products/ProductCategories";
// import FeaturedProducts from "@/components/sections/products/FeaturedProducts";
import ProductGrid from "@/components/sections/products/ProductGrid";
import ProductFilterBar from "@/components/sections/products/ProductFilterBar";
// import MerchBanner from "@/components/sections/products/MerchBanner";
import SubscriptionCta from "@/components/sections/products/SubscriptionCta";
import { useState } from "react";

const Products = () => {
  const [filters, setFilters] = useState({});

  return (
    <>
      <ProductsHero />
      {/* <ProductCategories /> */}
      <ProductFilterBar filters={filters} setFilters={setFilters} />
      {/* <FeaturedProducts /> */}
      <ProductGrid filters={filters} />
      {/* <MerchBanner /> */}
      <SubscriptionCta />
    </>
  );
};

export default Products;
