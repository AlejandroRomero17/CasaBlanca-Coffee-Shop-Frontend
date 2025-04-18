// src/components/sections/products/ProductGrid.tsx
import { motion, useInView } from "framer-motion";

// Motion-enabled ShadCN Button
const MotionButton = motion(Button);
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import clsx from "clsx";

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  category?: string;
};

const sampleProducts: Product[] = [
  {
    id: "prod-001",
    name: "Café Etiopía",
    description:
      "Notas frutales y aroma floral con toques de arándano y jazmín.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5",
    price: "$180 MXN",
    category: "café",
  },
  {
    id: "prod-002",
    name: "Té Matcha Premium",
    description: "Molido fino ceremonial, ideal para rituales de preparación.",
    image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256",
    price: "$220 MXN",
    category: "té",
  },
  {
    id: "prod-003",
    name: "Croissant Artesanal",
    description: "Hojaldre premium con mantequilla AOP francesa.",
    image: "https://images.unsplash.com/photo-1580913428735-bd3c269d6a82",
    price: "$65 MXN",
    category: "panadería",
  },
  {
    id: "prod-004",
    name: "Taza Casa Blanca",
    description: "Cerámica artesanal con acabado mate y logo grabado a mano.",
    image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae",
    price: "$350 MXN",
    category: "accesorios",
  },
];

const ProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const isVisible = useInView(cardRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

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
        {/* Product Image with zoom effect */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <motion.img
            src={`${product.image}?auto=format&fit=crop&w=800&q=80`}
            alt={`${product.name} - ${product.description}`}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          />
          {/* Category badge */}
          {product.category && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-full bg-[#3B2F2F] text-[#f5e8db]">
              {product.category}
            </span>
          )}
        </div>

        {/* Product Info */}
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
            <span className="font-medium text-[#3B2F2F]">{product.price}</span>
            <MotionButton
              size="sm"
              aria-label={`Agregar ${product.name} al carrito`}
              className={clsx(
                "bg-[#3B2F2F] hover:bg-[#5a4038] text-[#f5e8db] rounded-full",
                "px-4 py-2 text-sm flex gap-1.5 items-center",
                "transition-all duration-300 transform hover:scale-105",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5a4038]"
              )}
              onClick={() => navigate(`/product/${product.id}`)}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={16} strokeWidth={2} />
              <span className="hidden sm:inline">Agregar</span>
            </MotionButton>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductGrid = () => {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="bg-[#fefcf9] py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="products-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2
            id="products-heading"
            className="text-3xl font-light tracking-tight text-[#3B2F2F] sm:text-4xl"
          >
            <span className="block font-serif italic text-[#3B2F2F]/90">
              Nuestra
            </span>
            <span className="block mt-2 text-4xl font-bold sm:text-5xl">
              Colección Premium
            </span>
          </h2>
          <motion.p
            className="max-w-2xl mx-auto mt-4 text-base text-[#3B2F2F]/80 sm:text-lg"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Descubre la excelencia en cada detalle con nuestras selecciones
            cuidadosamente curadas.
          </motion.p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : ""}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {sampleProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* Optional View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Button
            variant="outline"
            className="border-[#3B2F2F] text-[#3B2F2F] hover:bg-[#3B2F2F]/10 rounded-full px-8 py-3"
            onClick={() => (window.location.href = "/products")}
          >
            Ver colección completa
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;
