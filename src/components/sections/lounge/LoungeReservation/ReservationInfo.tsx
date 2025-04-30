"use client";
import { motion } from "framer-motion";
import { CalendarClock, PhoneCall, MailCheck } from "lucide-react";

const info = [
  {
    icon: <CalendarClock />,
    title: "Horario",
    detail: "Lun–Dom: 9 AM – 10 PM",
  },
  { icon: <PhoneCall />, title: "Teléfono", detail: "+52 55 1234 5678" },
  {
    icon: <MailCheck />,
    title: "Correo",
    detail: "reservaciones@casablanca.coffee",
  },
];

export default function ReservationInfo() {
  return (
    <>
      {info.map(({ icon, title, detail }) => (
        <motion.div
          key={title}
          className="flex items-start gap-4"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
          <div>
            <p className="font-semibold text-[#3B2F2F]">{title}</p>
            <p className="text-sm text-[#3B2F2F]/70">{detail}</p>
          </div>
        </motion.div>
      ))}
      <motion.div
        className="p-6 rounded-lg bg-[#3B2F2F]/5 border border-[#3B2F2F]/10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="mb-3 font-serif text-xl font-medium text-[#3B2F2F]">
          Políticas de reservación
        </h3>
        <ul className="space-y-2 text-sm text-[#3B2F2F]/80">
          {[
            "Confirmación por correo electrónico",
            "Máximo 12 personas",
            "Cancelaciones con 24 h de anticipación",
          ].map((txt) => (
            <li key={txt} className="flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#D09E66] inline-block" />
              <span>{txt}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}
