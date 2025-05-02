import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Star } from "lucide-react";
import { fetchProducts } from "@/services/productService";
import { Product } from "@/types/product";
import ProductCard from "@/components/sections/products/ProductCard";
import ProductModal from "@/components/sections/products/ProductModal";

const FeaturedProductsSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const allProducts = await fetchProducts();
        const featured = allProducts.filter((product) => product.featured);
        const recentFeatured = featured.slice(0, 4);
        setFeaturedProducts(recentFeatured);
      } catch (error) {
        console.error("Error loading featured products:", error);
      }
    };

    loadFeaturedProducts();
  }, []);

  // Animación para las estrellas decorativas
  const floatingStars = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
    size: Math.random() * 20 + 10,
    delay: Math.random() * 1,
    duration: Math.random() * 5 + 5,
    rotate: [0, Math.random() * 360],
  }));

  return (
    <section
      id="destacados"
      className="relative px-6 py-20 overflow-hidden text-center bg-beige-light md:px-16 lg:px-28"
    >
      {/* Estrellas decorativas animadas */}
      {floatingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute pointer-events-none text-gold/20"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: star.rotate,
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        >
          <Star className="w-full h-full" />
        </motion.div>
      ))}

      {/* Encabezado con animaciones mejoradas */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative mb-16"
        onHoverStart={() => setIsHoveringTitle(true)}
        onHoverEnd={() => setIsHoveringTitle(false)}
      >
        <motion.div
          className="flex items-center justify-center gap-2 mb-4 text-gold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={
              isHoveringTitle
                ? { rotate: 15, scale: 1.2 }
                : { rotate: 0, scale: 1 }
            }
            transition={{ type: "spring" }}
          >
            <UtensilsCrossed className="w-6 h-6" />
          </motion.div>
          <motion.span
            className="font-semibold tracking-wider uppercase"
            animate={
              isHoveringTitle
                ? { letterSpacing: "0.2em" }
                : { letterSpacing: "0.1em" }
            }
          >
            Productos destacados
          </motion.span>
        </motion.div>

        <motion.h2
          className="text-3xl font-bold md:text-5xl font-fancy text-coffee-dark"
          animate={isHoveringTitle ? { scale: 1.02 } : { scale: 1 }}
        >
          Para los gustos más exigentes
          <motion.span
            className="block h-1 mx-auto mt-2 bg-gold/30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.h2>

        <motion.p
          className="max-w-xl mx-auto mt-4 text-base md:text-lg text-coffee-dark/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          Descubre nuestras selecciones premium, hechas para quienes buscan
          sabor, aroma y calidad.
        </motion.p>
      </motion.div>

      {/* Grid de productos con animaciones escalonadas */}
      <motion.div
        className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.3,
            },
          },
        }}
      >
        {featuredProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 60, scale: 0.9 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                },
              },
            }}
            whileHover={{
              y: -10,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <ProductCard
              product={product}
              index={idx}
              onClick={() => setSelectedProduct(product)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Modal con animación mejorada */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>

      {/* Efecto de partículas al hacer hover en productos */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHoveringTitle ? 0.1 : 0,
          backgroundImage: isHoveringTitle
            ? "radial-gradient(circle at 50% 50%, rgba(208,158,102,0.2) 0%, transparent 70%)"
            : "none",
        }}
        transition={{ duration: 0.5 }}
      />
    </section>
  );
};

export default FeaturedProductsSection;
