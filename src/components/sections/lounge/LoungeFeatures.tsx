// src/components/sections/lounge/LoungeFeatures.tsx
import { motion } from "framer-motion";
import { Wifi, Music, Sparkles, CalendarCheck } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="w-7 h-7 text-gold" />,
    title: "Ambiente Elegante",
    description: "Diseñado con inspiración marroquí y detalles artesanales.",
  },
  {
    icon: <Wifi className="w-7 h-7 text-gold" />,
    title: "Wi-Fi Rápido",
    description:
      "Conexión estable para trabajar o disfrutar sin interrupciones.",
  },
  {
    icon: <Music className="w-7 h-7 text-gold" />,
    title: "Música Suave",
    description: "Selección musical para un ambiente relajado y sofisticado.",
  },
  {
    icon: <CalendarCheck className="w-7 h-7 text-gold" />,
    title: "Reservaciones Disponibles",
    description: "Reserva tu lugar para eventos, citas o reuniones íntimas.",
  },
];

const LoungeFeatures = () => {
  return (
    <section className="bg-[#f7f4ef] py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 text-3xl font-bold md:text-4xl text-coffee-dark font-fancy"
        >
          Servicios destacados del Lounge
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 md:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-6 text-center transition bg-white shadow-md rounded-xl hover:shadow-lg"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-coffee-dark">
                {feature.title}
              </h3>
              <p className="text-sm text-coffee-dark/80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoungeFeatures;
