import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/images/hero-image.webp";
import coffeeGrain from "@/assets/images/coffee-grain.webp";
import { Coffee, Landmark, ChevronDown } from "lucide-react";

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
  const containerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const buttonScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Background gradient animation
  const backgroundGradient = {
    initial: {
      backgroundPosition: "0% 50%",
    },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  // Text reveal animation
  const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Staggered children animation
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative flex flex-col items-center justify-between w-full min-h-screen gap-8 px-6 py-32 overflow-hidden md:flex-row md:gap-12"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        variants={backgroundGradient}
        initial="initial"
        animate="animate"
        style={{
          background:
            "linear-gradient(135deg, #dfaf78, #c58c5c, #a46c4a, #c58c5c, #dfaf78)",
          backgroundSize: "300% 300%",
        }}
      />

      {/* Animated noise texture */}
      <motion.div
        className="absolute inset-0 opacity-10 -z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 1 }}
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 200 200\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noiseFilter\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.65\\' numOctaves=\\'3\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23noiseFilter)\\' /%3E%3C/svg%3E')",
        }}
      />

      {/* Floating coffee beans */}
      <AnimatePresence>
        {FLOATING_BEANS.map((bean, i) => (
          <motion.img
            key={i}
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
              width: bean.size,
              height: bean.size,
              opacity: bean.opacity,
            }}
            initial={{ scale: 0, rotate: -45 }}
            animate={{
              y: [0, -20, 10, 0],
              rotate: bean.rotate,
              scale: [1, 1.05],
            }}
            transition={{
              duration: bean.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bean.delay,
              times: [0, 0.3, 0.7, 1],
              scale: { duration: 0.8, delay: i * 0.1, type: "spring" },
            }}
          />
        ))}
      </AnimatePresence>

      {/* Glass-like overlay with animated refraction effect */}
      <motion.div
        className="absolute inset-0 backdrop-blur-[2px] bg-white/5 pointer-events-none"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)",
            backgroundSize: "200% 200%",
          }}
        />
      </motion.div>

      {/* Text content with advanced animations */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ y: textY }}
        className="z-10 flex-1 text-center md:text-left md:pl-24"
      >
        <motion.h1
          id="hero-heading"
          variants={container}
          className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.5rem] font-extrabold leading-tight text-black font-fancy"
        >
          <motion.span
            variants={textReveal}
            className="relative block overflow-hidden"
          >
            <motion.span
              className="block"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Disfruta tu{" "}
            </motion.span>
          </motion.span>

          <motion.span
            variants={textReveal}
            className="relative italic font-semibold inline-block text-[#A4471C]"
          >
            <span className="relative z-10">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
              >
                café
              </motion.span>
            </span>
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-2 bg-[#A4471C]/20 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.span>

          <motion.span
            variants={textReveal}
            className="relative block overflow-hidden"
          >
            <motion.span
              className="block"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              antes de empezar tu día
            </motion.span>
          </motion.span>
        </motion.h1>

        <motion.p
          variants={textReveal}
          className="max-w-xl mb-10 text-lg md:text-xl lg:text-2xl text-black/80"
        >
          Comienza tu mañana con nuestras mezclas{" "}
          <strong className="relative inline-block font-semibold">
            <span className="relative z-10">premium</span>
            <motion.span
              className="absolute bottom-0 left-0 w-full h-1 bg-[#A4471C]/40 -z-0 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </strong>{" "}
          y sabores únicos de{" "}
          <strong className="relative inline-block font-semibold">
            <span className="relative z-10">Casa Blanca</span>
            <motion.span
              className="absolute bottom-0 left-0 w-full h-1 bg-[#A4471C]/40 -z-0 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </strong>
          .
        </motion.p>

        <motion.div
          variants={textReveal}
          style={{ scale: buttonScale }}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="relative bg-[#3B2F2F] text-white hover:bg-[#5a4038] rounded-full px-8 py-6 font-semibold shadow-lg transition group overflow-hidden"
              onClick={() => navigate("/products")}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Coffee
                  size={20}
                  className="transition group-hover:rotate-12"
                />
              </motion.div>
              <span className="relative z-10 ml-2">Descubrir el menú</span>
              <motion.span
                className="absolute inset-0 bg-[#5a4038] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ clipPath: "circle(0% at 50% 50%)" }}
                whileHover={{ clipPath: "circle(100% at 50% 50%)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="relative border-2 border-[#3B2F2F] text-[#3B2F2F] hover:bg-[#3B2F2F]/90 hover:text-white rounded-full px-8 py-6 font-medium transition group overflow-hidden"
              onClick={() => navigate("/lounge")}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Landmark
                  size={20}
                  className="transition group-hover:scale-110"
                />
              </motion.div>
              <span className="relative z-10 ml-2">Bienvenido al lounge</span>
              <motion.span
                className="absolute inset-0 bg-[#3B2F2F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ clipPath: "circle(0% at 50% 50%)" }}
                whileHover={{ clipPath: "circle(100% at 50% 50%)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Hero image with advanced animations */}
      <motion.figure
        className="z-10 flex justify-center items-center flex-1 min-h-[300px] -ml-0 md:-ml-12 lg:-ml-20 xl:-ml-28"
        style={{ y, scale }}
      >
        <motion.div
          initial={{ rotate: -5, scale: 1.2, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{
            rotate: 3,
            scale: 1.03,
            transition: { type: "spring", stiffness: 300, damping: 10 },
          }}
          className="relative group"
        >
          <motion.img
            src={heroImage}
            alt="Taza de café premium en el lounge Casa Blanca"
            loading="eager"
            decoding="async"
            width={1024}
            height={1024}
            className="w-80 md:w-[46rem] lg:w-[58rem] xl:w-[64rem] h-auto drop-shadow-[0_25px_40px_rgba(0,0,0,0.3)] will-change-transform"
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-[#f8e3c8] mix-blend-overlay opacity-0 group-hover:opacity-30 blur-[30px] transition-opacity duration-500"
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#f8e3c8]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            initial={{ backgroundPosition: "0% 0%" }}
            whileHover={{ backgroundPosition: "100% 100%" }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.figure>

      {/* Scroll indicator */}
      <motion.div
        className="absolute z-10 -translate-x-1/2 bottom-8 left-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={32} className="text-[#3B2F2F]/80" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
