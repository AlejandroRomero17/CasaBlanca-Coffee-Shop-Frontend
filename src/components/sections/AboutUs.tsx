import aboutCoffee from "@/assets/images/about-us.png";
import { Coffee } from "lucide-react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="bg-[#f5f0e6] relative overflow-hidden py-20 px-6 md:px-16 lg:px-32">
      {/* Fondo decorativo con íconos de taza */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none bg-repeat bg-[length:80px_80px]"
        style={{ backgroundImage: "url('/coffee-icon.svg')" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col items-center gap-16 lg:flex-row"
      >
        {/* Imagen con sombra y bordes redondeados */}
        <div className="w-full lg:w-1/2">
          <motion.img
            src={aboutCoffee}
            alt="Café con arte latte"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="w-full max-h-[500px] object-cover rounded-2xl shadow-xl"
          />
        </div>

        {/* Texto descriptivo */}
        <div className="w-full text-left lg:w-1/2">
          <div className="flex items-center gap-2 mb-2 text-gold">
            <Coffee className="w-6 h-6" />
            <span className="font-semibold tracking-wider uppercase">
              Sobre nosotros
            </span>
          </div>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-coffee-dark">
            <span className="border-b-[6px] border-gold pb-1 inline-block">
              Ofrecemos café de calidad
            </span>
            <br />y listo para disfrutar.
          </h2>

          <p className="max-w-xl mb-6 text-base leading-relaxed text-coffee-dark/70 md:text-lg">
            Somos una cafetería que crea y distribuye bebidas deliciosas.
            Nuestro producto principal se elabora con una receta secreta y está
            disponible en nuestras tiendas alrededor del mundo.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-coffee-dark text-white font-medium py-3 px-6 rounded-full shadow-md hover:bg-[#5a4038] transition-all"
          >
            Consigue tu café
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
