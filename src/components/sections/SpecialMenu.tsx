import { motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";

import coffeeCup1 from "@/assets/images/coffee-cups/coffee-cup.png";
import coffeeCup2 from "@/assets/images/coffee-cups/coffee-cup2.png";
import coffeeCup3 from "@/assets/images/coffee-cups/coffee-cup3.png";
import coffeeCup4 from "@/assets/images/coffee-cups/coffee-cup4.png";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  image: string;
};

const menuItems: MenuItem[] = [
  {
    name: "Waffle Ice Cream",
    description: "Crujiente waffle con helado de vainilla y caramelo.",
    price: "$65",
    image: coffeeCup1,
  },
  {
    name: "Hot Milk",
    description: "Leche caliente espumosa, ideal para relajarte.",
    price: "$45",
    image: coffeeCup2,
  },
  {
    name: "Cappuccino",
    description: "Café intenso con espuma cremosa.",
    price: "$55",
    image: coffeeCup3,
  },
  {
    name: "Sandwich",
    description: "Pan artesanal con ingredientes frescos.",
    price: "$60",
    image: coffeeCup4,
  },
];

const SpecialMenu = () => {
  return (
    <section
      id="especial"
      className="bg-beige-light py-20 px-6 md:px-16 lg:px-28 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="flex justify-center items-center gap-2 mb-4 text-gold">
          <UtensilsCrossed className="w-6 h-6" />
          <span className="uppercase tracking-wider font-semibold">
            Menú Especial
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-fancy font-bold text-coffee-dark">
          Menú Especial para Ti
        </h2>
        <p className="text-base md:text-lg text-coffee-dark/80 max-w-xl mx-auto mt-4">
          Descubre nuestras deliciosas opciones diseñadas para consentir tu
          paladar. ¡Recién hechas y listas para ti!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {menuItems.map((item, idx) => (
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
                className="w-full h-52 object-contain scale-100 group-hover:scale-105 transition-transform duration-500 mx-auto p-6"
              />
            </div>
            <div className="p-6 text-left flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-coffee-dark mb-2">
                {item.name}
              </h3>
              <p className="text-sm text-coffee-dark/70 mb-4 flex-grow">
                {item.description}
              </p>
              <div className="text-gold text-lg font-bold">{item.price}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpecialMenu;
