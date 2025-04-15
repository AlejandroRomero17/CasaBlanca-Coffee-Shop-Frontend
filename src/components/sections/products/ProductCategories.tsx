import { motion } from "framer-motion";
import { Coffee, Leaf, Cookie, Sandwich, Shirt } from "lucide-react";

const categories = [
  {
    name: "Café en grano",
    icon: Coffee,
    color: "bg-[#E0C3A3]",
  },
  {
    name: "Tés exóticos",
    icon: Leaf, // ✅ reemplazo para 'Tea'
    color: "bg-[#C3D2A3]",
  },
  {
    name: "Postres",
    icon: Cookie,
    color: "bg-[#F7D1B0]",
  },
  {
    name: "Desayunos",
    icon: Sandwich, // ✅ representación de desayuno/comida
    color: "bg-[#B3DDE5]",
  },
  {
    name: "Merchandising",
    icon: Shirt,
    color: "bg-[#D6C6F2]",
  },
];

const ProductCategories = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-[#fcf8f2] text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="mb-4 text-3xl font-bold md:text-4xl font-fancy text-coffee-dark">
          Explora nuestras categorías
        </h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-coffee-dark/80">
          Selecciona entre una variedad de sabores y experiencias para todos los
          gustos.
        </p>
      </motion.div>

      <div className="grid max-w-6xl grid-cols-2 gap-6 mx-auto sm:grid-cols-3 md:grid-cols-5">
        {categories.map(({ name, icon: Icon, color }, idx) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer ${color}`}
          >
            <Icon className="w-8 h-8 mx-auto mb-3 text-black" />
            <p className="text-sm font-medium text-black/80">{name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductCategories;
