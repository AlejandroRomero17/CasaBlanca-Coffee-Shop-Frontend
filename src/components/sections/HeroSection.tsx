// src/components/sections/HeroSection.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import floatingCup from "@/assets/images/floating-coffee-cup.webp";
import coffeeGrain from "@/assets/images/coffee-grain.webp";
import { Coffee, Landmark } from "lucide-react";

const FLOATING_BEANS: {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay: number;
}[] = [
  { top: "5%", left: "10%", delay: 0 },
  { top: "15%", right: "8%", delay: 1.2 },
  { top: "28%", left: "18%", delay: 0.4 },
  { bottom: "12%", right: "10%", delay: 0.8 },
  { bottom: "6%", left: "15%", delay: 1.5 },
  { top: "38%", right: "22%", delay: 1.8 },
  { top: "44%", left: "45%", delay: 0.9 },
  { top: "52%", right: "48%", delay: 1.3 },
  { top: "20%", left: "45%", delay: 0.6 },
];

const HeroSection = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative min-h-screen w-full bg-gradient-to-r from-[#dfaf78] via-[#c58c5c] to-[#a46c4a] px-6 py-32 flex flex-col md:flex-row items-center justify-between gap-16 overflow-hidden"
    >
      {FLOATING_BEANS.map(({ top, left, right, bottom, delay }, i) => (
        <motion.img
          key={`bean-${i}`}
          src={coffeeGrain}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute w-12 h-12 pointer-events-none opacity-30 will-change-transform"
          style={{ top, left, right, bottom }}
          animate={{ y: [0, -14, 0], rotate: [0, 10, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        />
      ))}

      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="z-10 flex-1 text-center md:text-left md:pl-24"
      >
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-4xl font-extrabold leading-snug tracking-wide text-black md:text-6xl lg:text-7xl font-fancy"
        >
          Disfruta tu{" "}
          <span className="text-[#A4471C] italic font-semibold">café</span>
          <br className="hidden md:block" /> antes de empezar tu día
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mb-10 text-base leading-relaxed md:text-lg lg:text-xl text-black/80 md:mb-12"
        >
          Comienza tu mañana con nuestras mezclas{" "}
          <strong className="font-semibold">premium</strong> y sabores únicos de{" "}
          <strong className="font-semibold">Casa Blanca</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <Button
            size="lg"
            className="bg-[#3B2F2F] text-white hover:bg-[#5a4038] rounded-full px-8 py-4 font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
            onClick={() => scrollTo("especial")}
          >
            <Coffee
              size={18}
              className="transition-transform group-hover:rotate-12"
            />
            Descubrir el menú
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-[#3B2F2F] text-[#3B2F2F] hover:bg-[#3B2F2F]/90 hover:text-white rounded-full px-8 py-4 font-medium transition-all duration-300 flex items-center gap-2 group"
            onClick={() => scrollTo("about")}
          >
            <Landmark
              size={18}
              className="transition-transform group-hover:scale-110"
            />
            Bienvenido al lounge
          </Button>
        </motion.div>
      </motion.div>

      {/* Imagen de la taza animada */}
      <motion.figure
        animate={{ y: [0, -12, 0] }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="z-10 flex justify-center items-center flex-1 min-h-[300px]"
      >
        <img
          src={floatingCup}
          alt="Taza de café flotante"
          loading="eager"
          decoding="async"
          width={512}
          height={512}
          className="w-72 md:w-[26rem] lg:w-[30rem] h-auto drop-shadow-xl will-change-transform"
        />
      </motion.figure>
    </section>
  );
};

export default HeroSection;
