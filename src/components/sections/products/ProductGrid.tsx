// src/components/sections/products/ProductGrid.tsx
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Product = {
  name: string;
  description: string;
  image: string;
  price: string;
};

const sampleProducts: Product[] = [
  {
    name: "Café Etiopía",
    description: "Notas frutales y aroma floral.",
    image: "https://placehold.co/400x300?text=Café+Etiopía",
    price: "$180 MXN",
  },
  {
    name: "Té Matcha Premium",
    description: "Molido fino, ideal para rituales.",
    image: "https://placehold.co/400x300?text=Té+Matcha",
    price: "$220 MXN",
  },
  {
    name: "Croissant artesanal",
    description: "Hojaldre fresco con mantequilla importada.",
    image: "https://placehold.co/400x300?text=Croissant",
    price: "$65 MXN",
  },
  {
    name: "Taza Casa Blanca",
    description: "Cerámica con acabado mate y logo grabado.",
    image: "https://placehold.co/400x300?text=Taza",
    price: "$150 MXN",
  },
];

const ProductGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#fefcf9] py-20 px-6 md:px-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="mb-4 text-3xl font-bold md:text-4xl font-fancy text-coffee-dark">
          Todos los productos
        </h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-coffee-dark/80">
          Desde mezclas exclusivas hasta accesorios únicos.
        </p>
      </motion.div>

      <div className="grid max-w-6xl grid-cols-1 gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4">
        {sampleProducts.map((product, idx) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col h-full overflow-hidden transition-all bg-white shadow-md rounded-xl hover:shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full aspect-[4/3]"
              loading="lazy"
              decoding="async"
            />
            <div className="flex flex-col justify-between flex-grow p-5 text-left">
              <div>
                <h3 className="mb-1 text-lg font-semibold text-coffee-dark">
                  {product.name}
                </h3>
                <p className="text-sm text-coffee-dark/70">
                  {product.description}
                </p>
              </div>
              <div className="mt-4">
                <p className="mb-3 font-bold text-coffee-dark">
                  {product.price}
                </p>
                <Button
                  size="sm"
                  className="bg-[#3B2F2F] text-white hover:bg-[#5a4038] rounded-full px-5 py-2 text-sm flex gap-2 items-center"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCart size={16} />
                  Agregar al carrito
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
