"use client";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ReservationFormValues } from "./schema";

export default function ReservationPreview({
  watchedValues,
}: {
  watchedValues: Partial<ReservationFormValues>;
}) {
  const { fullName, date, time, guests } = watchedValues;
  if (!fullName || !date || !time) return null;
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="p-6 rounded-lg bg-[#3B2F2F]/5 border border-[#3B2F2F]/10"
    >
      <h3 className="mb-3 font-serif text-xl font-medium text-[#3B2F2F]">
        Resumen de tu reserva
      </h3>
      <div className="space-y-2 text-sm text-[#3B2F2F]/80">
        <p>
          <span className="font-medium">Nombre:</span> {fullName}
        </p>
        <p>
          <span className="font-medium">Fecha:</span> {format(date!, "PPP")}
        </p>
        <p>
          <span className="font-medium">Hora:</span> {time}
        </p>
        <p>
          <span className="font-medium">Personas:</span> {guests}
        </p>
      </div>
    </motion.div>
  );
}
