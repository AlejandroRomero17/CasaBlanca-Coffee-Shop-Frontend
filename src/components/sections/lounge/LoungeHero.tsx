// src/components/sections/lounge/LoungeHero.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import loungeHeroHorizontal from "@/assets/images/lounge/lounge-hero.webp";
import loungeHeroVertical from "@/assets/images/lounge/lounge-hero-vertical.webp";
import { Leaf, Landmark } from "lucide-react";
import clsx from "clsx";

const LoungeHero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax movement for background
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  // Dynamic blur filter overlay
  const overlayBlur = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", "blur(8px)"]
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="lounge-hero"
      role="banner"
      aria-labelledby="lounge-hero-heading"
      className="relative w-full min-h-screen overflow-hidden bg-[#f4eee6]"
    >
      {/* Parallax background with zoom-out */}
      <motion.picture
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <source media="(max-width:768px)" srcSet={loungeHeroVertical} />
        <img
          src={loungeHeroHorizontal}
          alt="Interior elegante del lounge Casa Blanca"
          loading="lazy"
          decoding="async"
          className="object-cover w-full h-full"
        />
      </motion.picture>

      {/* Overlays: dark gradient + noise + dynamic blur */}
      <div className="absolute inset-0 pointer-events-none bg-black/20 mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[url('/assets/images/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      <motion.div
        style={{ backdropFilter: overlayBlur }}
        className="absolute inset-0 pointer-events-none bg-white/10"
      />

      {/* Content and CTAs */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full gap-16 px-6 py-32 md:flex-row md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={clsx(
            "flex-1 text-center md:text-left",
            "self-center md:self-start"
          )}
        >
          <motion.h1
            id="lounge-hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-4xl font-extrabold leading-snug tracking-wide text-black md:text-6xl font-fancy"
          >
            Bienvenido al{" "}
            <span className="text-[#A4471C] italic font-semibold">Lounge</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl mb-10 text-base leading-relaxed md:text-lg text-black/80"
          >
            Un espacio premium para disfrutar de tés exóticos, cafés especiales
            y momentos inolvidables.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
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
      </div>
    </section>
  );
};

export default LoungeHero;
