// src/components/sections/products/FeaturedProducts.tsx
import { motion } from "framer-motion";

import coffeeBagImg from "@/assets/images/lounge/menu-coffee.webp";
import teaSetImg from "@/assets/images/lounge/menu-tea.webp";
import mugImg from "@/assets/images/lounge/menu-tea.webp";

const featuredProducts = [
  {
    name: "Blend Casablanca",
    description:
      "Café de especialidad con notas a chocolate oscuro y especias.",
    image: coffeeBagImg,
    price: "$320 MXN",
  },
  {
    name: "Set de Té Imperial",
    description: "Selección de tés exóticos para una experiencia auténtica.",
    image: teaSetImg,
    price: "$280 MXN",
  },
  {
    name: "Taza artesanal CasaBlanca",
    description: "Diseño elegante para disfrutar tus bebidas favoritas.",
    image: mugImg,
    price: "$150 MXN",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="bg-[#fdf9f3] py-20 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold md:text-4xl font-fancy text-coffee-dark">
          Productos destacados
        </h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-coffee-dark/80">
          Descubre nuestras recomendaciones especiales de temporada.
        </p>
      </motion.div>

      <div className="grid max-w-6xl grid-cols-1 gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="overflow-hidden transition bg-white shadow-md rounded-xl hover:shadow-xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full aspect-[4/3]"
              loading="lazy"
              decoding="async"
            />
            <div className="p-5 text-left">
              <h3 className="text-lg font-bold text-coffee-dark">
                {product.name}
              </h3>
              <p className="text-sm text-coffee-dark/70">
                {product.description}
              </p>
              <p className="mt-2 font-semibold text-gold">{product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
