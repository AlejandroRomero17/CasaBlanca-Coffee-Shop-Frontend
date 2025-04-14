import { motion } from "framer-motion";

import coffeeSelect from "@/assets/images/delivery/choose-your-coffee.png";
import coffeeTruck from "@/assets/images/delivery/we-delivered-you.png";
import coffeeEnjoy from "@/assets/images/delivery/enjoy-your-coffee.png";

const steps = [
  {
    title: "Elige tu café",
    description: "Tenemos más de 20 opciones para ti.",
    image: coffeeSelect,
  },
  {
    title: "Te lo llevamos",
    description: "Elige tu método de entrega favorito.",
    image: coffeeTruck,
  },
  {
    title: "Disfrútalo",
    description: "Tu café listo para acompañarte.",
    image: coffeeEnjoy,
  },
];

const DeliveryInfo = () => {
  return (
    <section className="px-6 py-20 text-center bg-white md:px-16 lg:px-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold md:text-4xl text-coffee-dark">
          <span className="border-b-[6px] border-gold pb-1 inline-block">
            Cómo funciona nuestro delivery
          </span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-[#faf9f7] hover:bg-[#f3f1ef] rounded-2xl shadow-md hover:shadow-lg p-8 transition-all duration-300 group flex flex-col items-center text-center"
          >
            <div className="w-32 h-32 mb-6 transition-transform duration-500 group-hover:scale-110">
              <img
                src={step.image}
                alt={step.title}
                className="object-contain w-full h-full"
              />
            </div>
            <h3 className="mb-2 text-lg font-semibold md:text-xl text-coffee-dark">
              {step.title}
            </h3>
            <p className="text-sm text-coffee-dark/70">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DeliveryInfo;
