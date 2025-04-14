import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import floatingCup from "@/assets/images/floating-coffee-cup.png";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="min-h-screen w-full bg-gradient-to-r from-[#dfaf78] via-[#c58c5c] to-[#a46c4a] px-6 py-32 flex flex-col md:flex-row items-center justify-between gap-16 overflow-hidden"
    >
      {/* TEXTO */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex-1 text-center md:text-left md:pl-24"
      >
        <h1
          id="hero-heading"
          className="text-4xl md:text-6xl font-fancy font-extrabold text-black tracking-wide leading-snug mb-6"
        >
          Disfruta tu <span className="text-[#9c6b4a]">café</span>
          <br className="hidden md:block" /> antes de empezar tu día
        </h1>

        <p className="text-base md:text-lg text-black/80 max-w-xl mb-10 md:mb-12 leading-relaxed">
          Comienza tu mañana con nuestras mezclas <strong>premium</strong> y
          sabores únicos de <strong>Casa Blanca</strong>.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Button
            size="lg"
            className="bg-[#3B2F2F] text-white hover:bg-[#5a4038] rounded-full px-8 py-4 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Ordenar ahora
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#3B2F2F] text-[#3B2F2F] hover:bg-[#3B2F2F] hover:text-white rounded-full px-8 py-4 font-medium transition-all duration-300"
          >
            Ver menú
          </Button>
        </div>
      </motion.div>

      {/* IMAGEN */}
      <motion.figure
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex-1 flex justify-center"
      >
        <img
          src={floatingCup}
          alt="Taza de café flotante con vapor artístico"
          className="w-[36rem] h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      </motion.figure>
    </section>
  );
};

export default HeroSection;
