import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const EmptyCart = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-[#f9e8d9] to-[#fcefe2]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl"
      >
        <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-[#a46c4a]" />
        <h2 className="text-2xl font-bold font-fancy text-[#3B2F2F] mb-2">
          Tu carrito está vacío
        </h2>
        <p className="mb-6 text-black/70">
          Aún estás a tiempo de explorar nuestros productos y llenarlo con
          sabor.
        </p>
        <Button
          asChild
          size="lg"
          className="w-full rounded-full bg-[#3B2F2F] text-white hover:bg-[#5a4038]"
        >
          <Link to="/products">Ver productos</Link>
        </Button>
      </motion.div>
    </section>
  );
};

export default EmptyCart;
