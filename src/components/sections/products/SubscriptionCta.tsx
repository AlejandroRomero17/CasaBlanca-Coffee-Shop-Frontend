// src/components/sections/products/SubscriptionCta.tsx
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SubscriptionCta = () => {
  return (
    <section className="bg-gradient-to-br from-[#f4eadd] to-[#e9dbc5] px-6 md:px-20 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="mb-4 text-3xl font-bold md:text-4xl font-fancy text-coffee-dark">
          Únete al Club Casa Blanca
        </h2>
        <p className="mb-8 text-base md:text-lg text-coffee-dark/80">
          Sé el primero en recibir promociones, nuevos productos y experiencias
          exclusivas.
        </p>

        <form className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Input
            type="email"
            placeholder="Tu correo electrónico"
            required
            className="w-full sm:w-72 bg-white/90 border border-[#c6b89e] rounded-full px-5 py-3 text-sm"
          />
          <Button
            type="submit"
            className="bg-[#3B2F2F] text-white hover:bg-[#5a4038] rounded-full px-6 py-3 text-sm font-semibold shadow-md"
          >
            Suscribirme
          </Button>
        </form>
      </motion.div>
    </section>
  );
};

export default SubscriptionCta;
