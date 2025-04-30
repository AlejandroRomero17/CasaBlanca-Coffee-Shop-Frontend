"use client";
import { motion } from "framer-motion";

export default function ReservationHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto mb-12 text-center"
    >
      <h2
        id="reservation-heading"
        className="text-3xl font-light tracking-tight text-[#3B2F2F] sm:text-4xl"
      >
        <span className="block font-serif italic text-[#3B2F2F]/90">
          Reservaciones
        </span>
        <span className="block mt-2 text-4xl font-bold sm:text-5xl">
          Lounge Premium
        </span>
      </h2>
      <p className="max-w-2xl mx-auto mt-4 text-base text-[#3B2F2F]/80 sm:text-lg">
        Reserva tu experiencia exclusiva en nuestro lounge de café y té
        artesanal.
      </p>
    </motion.div>
  );
}
