// src/components/sections/products/ProductGrid.tsx
import { useRef, useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/sections/products/ProductCard";
import ProductModal from "@/components/sections/products/ProductModal";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";

type Props = { query: string; category: string; priceOrder: string };

const ProductGrid = ({ query, category, priceOrder }: Props) => {
  const sectionRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { filteredProducts, loading, error } = useFilteredProducts({
    query,
    category,
    priceOrder,
  });

  if (loading)
    return <div className="py-10 text-center">Cargando productos…</div>;
  if (error)
    return <div className="py-10 text-center text-red-500">{error}</div>;
  if (!filteredProducts.length)
    return (
      <div className="py-12 text-center">No hay productos disponibles.</div>
    );

  return (
    <section
      ref={sectionRef}
      className="bg-[#fefcf9] py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="products-heading"
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

export default ProductGrid;
