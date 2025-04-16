import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/images/hero-image.webp";
import coffeeGrain from "@/assets/images/coffee-grain.webp";
import { Coffee, Landmark } from "lucide-react";
import { useRef } from "react";

const FLOATING_BEANS = [
  {
    top: "6%",
    left: "8%",
    delay: 0,
    size: 56,
    opacity: 0.5,
    duration: 7,
    rotate: [0, 6, -4, 0],
  },
  {
    top: "18%",
    right: "12%",
    delay: 0.5,
    size: 48,
    opacity: 0.4,
    duration: 7.5,
    rotate: [0, -5, 3, 0],
  },
  {
    top: "35%",
    left: "20%",
    delay: 1.1,
    size: 60,
    opacity: 0.45,
    duration: 8,
    rotate: [0, 7, -5, 0],
  },
  {
    top: "50%",
    right: "18%",
    delay: 1.4,
    size: 50,
    opacity: 0.55,
    duration: 6.8,
    rotate: [0, -6, 4, 0],
  },
  {
    top: "62%",
    left: "6%",
    delay: 0.7,
    size: 64,
    opacity: 0.4,
    duration: 7.2,
    rotate: [0, 8, -6, 0],
  },
  {
    bottom: "22%",
    right: "8%",
    delay: 1.6,
    size: 58,
    opacity: 0.6,
    duration: 6.5,
    rotate: [0, -4, 2, 0],
  },
  {
    bottom: "12%",
    left: "18%",
    delay: 1.2,
    size: 52,
    opacity: 0.5,
    duration: 7.3,
    rotate: [0, 5, -3, 0],
  },
  {
    bottom: "5%",
    right: "24%",
    delay: 0.9,
    size: 46,
    opacity: 0.45,
    duration: 6.9,
    rotate: [0, -6, 2, 0],
  },
  {
    top: "40%",
    left: "50%",
    delay: 1.3,
    size: 54,
    opacity: 0.6,
    duration: 8.4,
    rotate: [0, 10, -8, 0],
  },
];


const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative min-h-screen w-full bg-gradient-to-br from-[#dfaf78] via-[#c58c5c] to-[#a46c4a] px-6 py-32 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#f8e3c8] mix-blend-soft-light blur-[80px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-[#f5d5a8] mix-blend-soft-light blur-[60px]"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      {/* Floating coffee beans with improved animation */}
      {FLOATING_BEANS.map((bean, i) => (
        <motion.img
          key={`bean-${i}`}
          src={coffeeGrain}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute pointer-events-none will-change-transform"
          style={{
            top: bean.top,
            left: bean.left,
            right: bean.right,
            bottom: bean.bottom,
            width: `${bean.size}px`,
            height: `${bean.size}px`,
            opacity: bean.opacity,
          }}
          animate={{
            y: [0, -20, 10, 0],
            rotate: bean.rotate,
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: bean.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bean.delay,
            times: [0, 0.3, 0.7, 1],
          }}
        />
      ))}

      {/* Glass background effect */}
      <motion.div
        className="absolute inset-0 backdrop-blur-[2px] bg-white/5"
        style={{ opacity }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="z-10 flex-1 text-center md:text-left md:pl-24"
      >
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.5rem] font-extrabold leading-tight tracking-tight text-black font-fancy"
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Disfruta tu{" "}
          </motion.span>
          <motion.span
            className="relative text-[#A4471C] italic font-semibold inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
          >
            <span className="relative z-10">café</span>
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-2 bg-[#A4471C]/20 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            antes de empezar tu día
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-xl mb-10 text-lg leading-relaxed md:text-xl lg:text-2xl text-black/80 md:mb-12"
        >
          Comienza tu mañana con nuestras mezclas{" "}
          <strong className="relative inline-block font-semibold">
            <span className="relative z-10">premium</span>
            <motion.span
              className="absolute bottom-0 left-0 w-full h-1 bg-[#A4471C]/40 -z-0"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            />
          </strong>{" "}
          y sabores únicos de{" "}
          <strong className="relative inline-block font-semibold">
            <span className="relative z-10">Casa Blanca</span>
            <motion.span
              className="absolute bottom-0 left-0 w-full h-1 bg-[#A4471C]/40 -z-0"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            />
          </strong>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <Button
            size="lg"
            className="relative bg-[#3B2F2F] text-white hover:bg-[#5a4038] rounded-full px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 group overflow-hidden"
            onClick={() => scrollTo("especial")}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-[#5a4038]/30 to-[#3B2F2F]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ scale: 0.5 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <Coffee
              size={20}
              className="transition-transform group-hover:rotate-12 group-hover:scale-110"
            />
            <span className="relative z-10">Descubrir el menú</span>
            <motion.span
              className="absolute -inset-2 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#5a4038]/50"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="relative border-2 border-[#3B2F2F] text-[#3B2F2F] hover:bg-[#3B2F2F]/90 hover:text-white rounded-full px-8 py-6 font-medium transition-all duration-300 flex items-center gap-3 group overflow-hidden"
            onClick={() => scrollTo("about")}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-[#3B2F2F]/10 to-[#3B2F2F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ scale: 0.5 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <Landmark
              size={20}
              className="transition-transform group-hover:scale-110 group-hover:rotate-3"
            />
            <span className="relative z-10">Bienvenido al lounge</span>
            <motion.span
              className="absolute -inset-2 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-[#3B2F2F]/30"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
          </Button>
        </motion.div>
      </motion.div>

      {/* Main image with parallax and hover effects */}
      <motion.figure
        className="z-10 flex justify-center items-center flex-1 min-h-[300px] -ml-0 md:-ml-12 lg:-ml-20 xl:-ml-28"
        style={{ y, scale }}
      >
        <motion.div
          whileHover={{ rotate: 3, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className="relative group"
        >
          <motion.img
            src={heroImage}
            alt="Taza de café premium en el lounge Casa Blanca"
            loading="eager"
            decoding="async"
            width={512}
            height={512}
            className="w-80 md:w-[46rem] lg:w-[58rem] xl:w-[64rem] h-auto drop-shadow-[0_25px_40px_rgba(0,0,0,0.3)] will-change-transform"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-[#f8e3c8] mix-blend-overlay opacity-0 group-hover:opacity-30 blur-[30px] transition-opacity duration-500"
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </motion.figure>
    </section>
  );
};

export default HeroSection;
