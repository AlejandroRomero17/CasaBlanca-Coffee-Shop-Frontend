// src/components/sections/products/ProductsHero.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImg from "@/assets/images/products/products-hero2.webp";
import heroImgVertical from "@/assets/images/products/vertical-hero-products.webp";
import clsx from "clsx";

const ProductsHero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax movement
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  // Dynamic blur filter
  const overlayBlur = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", "blur(10px)"]
  );

  return (
    <section
      ref={ref}
      role="banner"
      aria-labelledby="products-hero-heading"
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-r from-[#f5e8db] via-[#e9d4ba] to-[#d9b99b]"
    >
      {/* Parallax background with initial zoom-out */}
      <motion.picture
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      >
        <source media="(max-width:768px)" srcSet={heroImgVertical} />
        <img
          src={heroImg}
          alt="Fondo de productos premium Casa Blanca"
          loading="lazy"
          decoding="async"
          className="object-cover w-full h-full"
        />
      </motion.picture>

      {/* Overlays: gradient, noise, dynamic blur */}
      <div className="absolute inset-0 pointer-events-none bg-black/20 mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[url('/assets/images/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      <motion.div
        style={{ backdropFilter: overlayBlur }}
        className="absolute inset-0 pointer-events-none bg-white/10"
      />

      {/* Content - Versión corregida */}
      <div className="relative z-10 flex h-full min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={clsx(
            "w-full max-w-3xl px-6 mx-auto text-center",
            "md:pt-28", // Solo padding-top en desktop
            "self-center md:self-start" // Centrado en móvil, arriba en desktop
          )}
        >
          <h1
            id="products-hero-heading"
            className={clsx(
              "text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight",
              "text-[#3B2F2F] tracking-tight"
            )}
          >
            Nuestra Selección <br className="md:hidden" /> Premium
          </h1>
          <p className="mt-4 text-base md:text-lg text-[#3B2F2F]/80">
            Descubre lo mejor de Casa Blanca: café en grano, tés aromáticos,
            postres gourmet y artículos exclusivos.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsHero;
