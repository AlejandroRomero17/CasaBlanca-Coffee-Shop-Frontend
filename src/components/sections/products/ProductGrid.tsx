// src/components/sections/products/ProductGrid.tsx
import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import clsx from "clsx";
import { Product, fetchProducts } from "@/services/productService";
import { useCartStore } from "@/store/cartStore";

const MotionButton = motion(Button);

const ProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const cardRef = useRef(null);
  const isVisible = useInView(cardRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  const addToCart = useCartStore((s) => s.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product.id) {
      console.error("❌ Producto sin id:", product);
      return;
    }

    console.log("➕ Agregando al carrito:", product.name);

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 0.77, 0.47, 0.99],
      }}
      whileHover={{ y: -5 }}
      className="relative h-full group"
    >
      <div
        className={clsx(
          "h-full overflow-hidden rounded-lg border border-[#f0e6db] bg-white",
          "transition-all duration-300 ease-out",
          "group-hover:shadow-lg group-hover:ring-1 group-hover:ring-[#e9d4ba]/50"
        )}
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <motion.img
            src={product.image}
            alt={`${product.name} - ${product.description}`}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          />
          <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-full bg-[#3B2F2F] text-[#f5e8db] capitalize">
            {product.category}
          </span>
        </div>

        <div className="flex flex-col justify-between p-5 h-[40%]">
          <div>
            <motion.h3
              className="mb-2 text-lg font-medium text-[#3B2F2F] md:text-xl"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
            >
              {product.name}
            </motion.h3>
            <motion.p
              className="text-sm text-[#3B2F2F]/80 line-clamp-2"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
            >
              {product.description}
            </motion.p>
          </div>

          <motion.div
            className="flex items-center justify-between mt-4"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
          >
            <span className="font-medium text-[#3B2F2F]">
              ${product.price.toFixed(2)}
            </span>

            <MotionButton
              size="sm"
              onClick={handleAddToCart}
              aria-label={`Agregar ${product.name} al carrito`}
              className={clsx(
                "rounded-full px-4 py-2 text-sm flex gap-1.5 items-center transition-all duration-300 transform",
                isAdded
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-[#3B2F2F] hover:bg-[#5a4038] text-[#f5e8db]"
              )}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={16} strokeWidth={2} />
              <span className="hidden sm:inline">
                {isAdded ? "Agregado" : "Agregar"}
              </span>
            </MotionButton>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

type Props = { query: string; category: string; priceOrder: string };

const ProductGrid = ({ query, category, priceOrder }: Props) => {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data.filter((p) => p.available));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = products
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

  if (loading)
    return <div className="py-10 text-center">Cargando productos…</div>;
  if (error)
    return <div className="py-10 text-center text-red-500">{error}</div>;

  return (
    <section
      ref={sectionRef}
      className="bg-[#fefcf9] py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="products-heading"
    >
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : ""}
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {filtered.map((p, idx) => (
          <ProductCard key={p.id} product={p} index={idx} />
        ))}
      </motion.div>
    </section>
  );
};

export default ProductGrid;
