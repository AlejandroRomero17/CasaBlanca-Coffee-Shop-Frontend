import aboutCoffee from "@/assets/images/about-us.png";
import { Coffee } from "lucide-react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="bg-[#f5f0e6] relative overflow-hidden py-20 px-6 md:px-16 lg:px-32">
      {/* Fondo decorativo con tazas (usa tu coffee-icon.svg en /public/) */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none bg-repeat bg-[length:80px_80px]"
        style={{ backgroundImage: "url('/coffee-icon.svg')" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col lg:flex-row items-center gap-16"
      >
        {/* Imagen con sombra y borde redondeado */}
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

        {/* Texto con estructura visual clara */}
        <div className="w-full lg:w-1/2 text-left">
          <div className="flex items-center gap-2 mb-2 text-gold">
            <Coffee className="w-6 h-6" />
            <span className="uppercase tracking-wider font-semibold">
              About Us
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">
            <span className="border-b-[6px] border-gold pb-1 inline-block">
              We provide quality coffee,
            </span>
            <br />
            and ready to deliver.
          </h2>

          <p className="text-coffee-dark/70 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
            We are a company that makes and distributes delicious drinks. Our
            main product is made with a secret recipe and available in stores
            worldwide.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-coffee-dark text-white font-medium py-3 px-6 rounded-full shadow-md hover:bg-[#5a4038] transition-all"
          >
            Get your coffee
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
