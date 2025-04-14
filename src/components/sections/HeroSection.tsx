import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import floatingCup from "@/assets/images/floating-coffee-cup.webp";
import { Coffee, Menu } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="min-h-screen w-full bg-gradient-to-r from-[#dfaf78] via-[#c58c5c] to-[#a46c4a] px-6 py-32 flex flex-col md:flex-row items-center justify-between gap-16 overflow-hidden"
    >
      {/* TEXTO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex-1 text-center md:text-left md:pl-24"
      >
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-4xl font-extrabold leading-snug tracking-wide text-black md:text-6xl font-fancy"
        >
          Disfruta tu{" "}
          <span className="text-[#A4471C] italic font-semibold">café</span>
          <br className="hidden md:block" /> antes de empezar tu día
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mb-10 text-base leading-relaxed md:text-lg text-black/80 md:mb-12"
        >
          Comienza tu mañana con nuestras mezclas <strong>premium</strong> y
          sabores únicos de <strong>Casa Blanca</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <Button
            size="lg"
            className="bg-[#3B2F2F] text-white hover:bg-[#5a4038] rounded-full px-8 py-4 font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Coffee size={18} /> Ordenar ahora
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-[#3B2F2F] text-[#3B2F2F] hover:bg-[#3B2F2F] hover:text-white rounded-full px-8 py-4 font-medium transition-all duration-300 flex items-center gap-2"
          >
            <Menu size={18} /> Ver menú
          </Button>
        </motion.div>
      </motion.div>

      {/* IMAGEN */}
      <motion.figure
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex justify-center flex-1"
      >
        <img
          src={floatingCup}
          alt="Taza de café flotante con vapor artístico"
          loading="eager"
          decoding="async"
          className="w-[32rem] h-auto drop-shadow-md hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </motion.figure>
    </section>
  );
};

export default HeroSection;
