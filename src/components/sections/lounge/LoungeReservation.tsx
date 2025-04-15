import { motion } from "framer-motion";
import { CalendarClock, MailCheck, PhoneCall } from "lucide-react";

const LoungeReservation = () => {
  return (
    <section className="bg-[#fcf8f2] py-20 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="mb-4 text-3xl font-bold md:text-4xl font-fancy text-coffee-dark">
          Reservaciones Exclusivas
        </h2>
        <p className="mb-8 text-base md:text-lg text-coffee-dark/80">
          Agenda tu visita al lounge y asegura tu experiencia premium de café y
          té.
        </p>

        <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3">
          <div className="flex items-start gap-4">
            <CalendarClock className="w-6 h-6 text-gold" />
            <div>
              <p className="font-semibold text-coffee-dark">Horario</p>
              <p className="text-sm text-coffee-dark/70">
                Lunes a Domingo: 9:00 AM – 10:00 PM
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <PhoneCall className="w-6 h-6 text-gold" />
            <div>
              <p className="font-semibold text-coffee-dark">Teléfono</p>
              <p className="text-sm text-coffee-dark/70">+52 55 1234 5678</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MailCheck className="w-6 h-6 text-gold" />
            <div>
              <p className="font-semibold text-coffee-dark">
                Correo electrónico
              </p>
              <p className="text-sm text-coffee-dark/70">
                reservaciones@casablanca.coffee
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LoungeReservation;
