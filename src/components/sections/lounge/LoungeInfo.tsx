// src/components/sections/lounge/LoungeInfo.tsx
import { motion } from "framer-motion";
import { Coffee, Leaf } from "lucide-react";
import loungeInfoImage from "@/assets/images/lounge/lounge-info.webp";

const LoungeInfo = () => {
  return (
    <section className="bg-[#fcf8f2] py-20 px-6 md:px-20">
      <div className="grid items-center max-w-5xl gap-12 mx-auto md:grid-cols-2">
        {/* TEXTO */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-coffee-dark font-fancy">
            Un espacio para relajarte
          </h2>
          <p className="mb-6 text-base leading-relaxed md:text-lg text-coffee-dark/80">
            Nuestro lounge está diseñado para ofrecer una experiencia
            multisensorial, donde cada taza de café o té es acompañada de un
            ambiente envolvente. Disfruta de música suave, aromas intensos y
            atención personalizada.
          </p>
          <ul className="space-y-3 text-coffee-dark/90">
            <li className="flex items-center gap-3">
              <Coffee className="w-5 h-5 text-gold" />
              Cafés de especialidad preparados por baristas expertos
            </li>
            <li className="flex items-center gap-3">
              <Leaf className="w-5 h-5 text-gold" />
              Tés exóticos y postres artesanales de temporada
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-block w-5 h-5 rounded-full bg-gold" />
              Ambiente inspirado en Casa Blanca con decoración elegante
            </li>
          </ul>
        </motion.div>

        {/* IMAGEN AMBIENTAL */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full h-full"
        >
          <img
            src={loungeInfoImage}
            alt="Vista del interior del lounge premium de Casa Blanca"
            className="object-cover w-full h-auto shadow-lg rounded-xl aspect-video"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default LoungeInfo;
