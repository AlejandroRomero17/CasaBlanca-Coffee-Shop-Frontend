import { motion } from "framer-motion";

import teaImg from "@/assets/images/lounge/menu-tea.webp";
import dessertImg from "@/assets/images/lounge/menu-dessert.webp";
import coffeeImg from "@/assets/images/lounge/menu-coffee.webp";

const menuItems = [
  {
    name: "Té de Jazmín Imperial",
    description: "Infusión floral con notas suaves y relajantes.",
    image: teaImg,
  },
  {
    name: "Cheesecake de lavanda",
    description: "Postre gourmet con aroma delicado y base artesanal.",
    image: dessertImg,
  },
  {
    name: "Café Marroquí especiado",
    description: "Café intenso con especias tradicionales del norte de África.",
    image: coffeeImg,
  },
];

const LoungeMenuPreview = () => {
  return (
    <section className="bg-[#f5f0e6] py-20 px-6 md:px-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="mb-4 text-3xl font-bold md:text-4xl font-fancy text-coffee-dark">
          Nuestro Menú Exclusivo
        </h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-coffee-dark/80">
          Una selección especial de sabores que representan la esencia del
          lounge.
        </p>
      </motion.div>

      <div className="grid max-w-6xl grid-cols-1 gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="overflow-hidden transition-shadow duration-300 bg-white shadow-md rounded-xl hover:shadow-lg"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-5 text-left">
              <h3 className="mb-1 text-xl font-semibold text-coffee-dark">
                {item.name}
              </h3>
              <p className="text-sm text-coffee-dark/70">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LoungeMenuPreview;
