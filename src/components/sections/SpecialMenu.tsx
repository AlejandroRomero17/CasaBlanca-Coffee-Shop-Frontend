// src/components/SpecialMenu.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed } from 'lucide-react';
import { fetchProducts } from '@/services/productService'; // Cambié a la función que obtiene todos los productos
import { Product } from '@/types/product';

const SpecialMenu = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        // Obtener todos los productos
        const allProducts = await fetchProducts();

        // Filtrar productos destacados
        const featured = allProducts.filter((product) => product.featured);

        // Ordenar por fecha si es necesario, y tomar los primeros 4 productos
        const recentFeatured = featured.slice(0, 4); // Limitar a los primeros 4 productos

        setFeaturedProducts(recentFeatured); // Establecer en el estado
      } catch (error) {
        console.error("Error loading featured products:", error);
      }
    };

    loadFeaturedProducts(); // Llamar a la función de carga
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <section id="especial" className="px-6 py-20 text-center bg-beige-light md:px-16 lg:px-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="flex items-center justify-center gap-2 mb-4 text-gold">
          <UtensilsCrossed className="w-6 h-6" />
          <span className="font-semibold tracking-wider uppercase">Menú Especial</span>
        </div>
        <h2 className="text-3xl font-bold md:text-5xl font-fancy text-coffee-dark">
          Menú Especial para Ti
        </h2>
        <p className="max-w-xl mx-auto mt-4 text-base md:text-lg text-coffee-dark/80">
          Descubre nuestras deliciosas opciones diseñadas para consentir tu paladar. ¡Recién hechas y listas para ti!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
          >
            <div className="relative bg-[#f9f4ed]">
              <img
                src={item.image}
                alt={item.name}
                className="object-contain w-full p-6 mx-auto transition-transform duration-500 scale-100 h-52 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col flex-1 p-6 text-left">
              <h3 className="mb-2 text-xl font-semibold text-coffee-dark">{item.name}</h3>
              <p className="flex-grow mb-4 text-sm text-coffee-dark/70">{item.description}</p>
              <div className="text-lg font-bold text-gold">{item.price}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpecialMenu;
