// src/components/sections/products/ProductsHero.tsx
import { motion } from "framer-motion";

const ProductsHero = () => {
  return (
    <section
      id="products-hero"
      className="relative min-h-screen w-full flex items-center justify-center px-6 py-28 md:px-20 bg-gradient-to-r from-[#f5e8db] via-[#e9d4ba] to-[#d9b99b] overflow-hidden"
    >
      {/* Granos decorativos opcionales más adelante */}

      {/* Contenido principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="z-10 max-w-3xl text-center"
      >
        <h1 className="mb-4 text-4xl md:text-6xl font-bold font-fancy text-[#3B2F2F]">
          Nuestra Selección Premium
        </h1>
        <p className="text-base md:text-lg text-[#3B2F2F]/80">
          Descubre lo mejor de Casa Blanca: café en grano, tés aromáticos,
          postres gourmet y artículos exclusivos.
        </p>
      </motion.div>
    </section>
  );
};

export default ProductsHero;
