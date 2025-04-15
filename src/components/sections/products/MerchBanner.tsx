// src/components/sections/products/MerchBanner.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MerchBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-[#e5d8c5] py-20 px-6 md:px-20 overflow-hidden">
      <div className="flex flex-col items-center max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-fancy font-bold text-[#3B2F2F] mb-4"
        >
          Nueva colección de Merchandising
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[#3B2F2F]/80 text-base md:text-lg max-w-2xl mb-8"
        >
          Tazas, bolsas reutilizables, playeras y más... Inspirados en la
          esencia de Casa Blanca.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="bg-[#3B2F2F] text-white hover:bg-[#5a4038] rounded-full px-8 py-4 text-sm font-semibold"
            onClick={() => navigate("/products")}
          >
            Explorar colección
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default MerchBanner;
