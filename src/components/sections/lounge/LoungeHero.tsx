// src/components/sections/lounge/LoungeHero.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import loungeHeroImage from "@/assets/images/lounge/lounge-hero2.webp";
import coffeeGrain from "@/assets/images/coffee-grain.webp";
import { Leaf, Landmark } from "lucide-react";

const floatingBeans = [
  { top: "6%", left: "12%", delay: 0 },
  { top: "18%", right: "10%", delay: 1.2 },
  { top: "32%", left: "15%", delay: 0.4 },
  { bottom: "14%", right: "12%", delay: 0.8 },
  { bottom: "7%", left: "18%", delay: 1.5 },
  { top: "42%", right: "25%", delay: 1.8 },
  { top: "48%", left: "48%", delay: 0.9 },
  { top: "20%", left: "44%", delay: 0.6 },
];

const LoungeHero = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="lounge-hero"
      className="relative min-h-screen w-full bg-[#f4eee6] flex items-center justify-between gap-16 overflow-hidden px-6 py-32 md:px-20 flex-col md:flex-row"
    >
      {/* ☕ Granos flotando */}
      {floatingBeans.map((pos, i) => (
        <motion.img
          key={i}
          src={coffeeGrain}
          alt="Grano de café"
          className="absolute w-12 h-12 pointer-events-none opacity-30 will-change-transform"
          style={{ ...pos }}
          loading="lazy"
          decoding="async"
          animate={{ y: [0, -14, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: pos.delay,
          }}
        />
      ))}

      {/* TEXTO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="z-10 flex-1 text-center md:text-left"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-4xl font-extrabold leading-snug tracking-wide text-black md:text-6xl font-fancy"
        >
          Bienvenido al{" "}
          <span className="text-[#A4471C] italic font-semibold">Lounge</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mb-10 text-base leading-relaxed md:text-lg text-black/80 md:mb-12"
        >
          Un espacio premium para disfrutar de tés exóticos, cafés especiales y
          momentos inolvidables.
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
            onClick={() => scrollTo("menu")}
          >
            <Leaf size={18} /> Ver menú
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-[#3B2F2F] text-[#3B2F2F] hover:bg-[#3B2F2F] hover:text-white rounded-full px-8 py-4 font-medium transition-all duration-300 flex items-center gap-2"
            onClick={() => scrollTo("info")}
          >
            <Landmark size={18} /> Sobre el lounge
          </Button>
        </motion.div>
      </motion.div>

      {/* Imagen de fondo animada */}
      <motion.figure
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="z-10 flex justify-center flex-1"
      >
        <img
          src={loungeHeroImage}
          alt="Interior elegante del lounge"
          className="w-[32rem] h-auto drop-shadow-md transition-transform duration-500 ease-in-out will-change-transform rounded-xl"
          loading="eager"
          decoding="async"
        />
      </motion.figure>
    </section>
  );
};

export default LoungeHero;
