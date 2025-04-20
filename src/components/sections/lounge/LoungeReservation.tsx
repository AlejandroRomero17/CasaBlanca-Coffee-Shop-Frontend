"use client";

import { motion } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Check, Loader2 } from "lucide-react";
import { CalendarClock, PhoneCall, MailCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Correo inválido." }),
  phone: z.string().min(10, { message: "Al menos 10 dígitos." }),
  guests: z.coerce
    .number()
    .min(1, { message: "Al menos 1 persona." })
    .max(12, { message: "Máximo 12 personas." }),
  date: z.date({
    required_error: "Por favor selecciona una fecha",
  }),
  time: z.string().min(1, { message: "Selecciona una hora." }),
  notes: z.string().optional(),
});

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
];

export default function LoungeReservation() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      guests: 2,
      date: undefined,
      time: "",
      notes: "",
    },
  });

  // Watch form values for real-time preview
  const watchedValues = useWatch({
    control: form.control,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Validate required fields manually for better toast feedback
      if (
        !values.fullName ||
        !values.email ||
        !values.phone ||
        !values.date ||
        !values.time
      ) {
        toast.warning("Por favor completa todos los campos requeridos", {
          position: "top-center",
          duration: 3000,
        });
        return;
      }

      await new Promise((r) => setTimeout(r, 1500));

      toast.success(
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 mt-0.5 text-green-500" />
          <div>
            <p className="font-medium">
              ¡Gracias por reservar con Casa Blanca!
            </p>
            <p className="text-sm text-gray-600">
              Confirmaremos tu reserva para {values.fullName} el{" "}
              {format(values.date, "PPP")} a las {values.time}.
            </p>
          </div>
        </div>,
        {
          duration: 5000,
          position: "top-center",
        }
      );

      form.reset();
    } catch {
      toast.error(
        "Ocurrió un error al procesar tu reserva. Por favor intenta nuevamente.",
        {
          position: "top-center",
        }
      );
    }
  };

  return (
    <section
      aria-labelledby="reservation-heading"
      className="bg-[#fcf8f2] py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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

        <div className="grid gap-12 md:grid-cols-2">
          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {[
              {
                icon: <CalendarClock className="w-6 h-6 text-[#D09E66]" />,
                title: "Horario",
                detail: "Lun–Dom: 9 AM – 10 PM",
              },
              {
                icon: <PhoneCall className="w-6 h-6 text-[#D09E66]" />,
                title: "Teléfono",
                detail: "+52 55 1234 5678",
              },
              {
                icon: <MailCheck className="w-6 h-6 text-[#D09E66]" />,
                title: "Correo",
                detail: "reservaciones@casablanca.coffee",
              },
            ].map(({ icon, title, detail }) => (
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
                    <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-[#D09E66]" />
                    <span>{txt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Preview Section */}
            {watchedValues.fullName &&
              watchedValues.date &&
              watchedValues.time && (
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
                      <span className="font-medium">Nombre:</span>{" "}
                      {watchedValues.fullName}
                    </p>
                    {watchedValues.date && (
                      <p>
                        <span className="font-medium">Fecha:</span>{" "}
                        {format(watchedValues.date, "PPP")}
                      </p>
                    )}
                    {watchedValues.time && (
                      <p>
                        <span className="font-medium">Hora:</span>{" "}
                        {watchedValues.time}
                      </p>
                    )}
                    {watchedValues.guests && (
                      <p>
                        <span className="font-medium">Personas:</span>{" "}
                        {watchedValues.guests}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
          </motion.div>

          {/* Reservation Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-[#3B2F2F]">
                    Información personal
                  </h3>
                  <Separator className="bg-[#3B2F2F]/20" />

                  {/* Nombre completo */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          Nombre completo
                          <span className="text-red-500" aria-hidden="true">
                            *
                          </span>
                        </FormLabel>
                        <FormControl>
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <Input
                              placeholder="Tu nombre"
                              {...field}
                              className={cn(
                                form.formState.errors.fullName &&
                                  "border-red-300 focus:border-red-300",
                                "focus-visible:ring-[#D09E66] focus-visible:ring-offset-2 transition-all duration-200"
                              )}
                              aria-invalid={!!form.formState.errors.fullName}
                              aria-required="true"
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Email y Teléfono */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    {(["email", "phone"] as const).map((key) => (
                      <FormField
                        key={key}
                        control={form.control}
                        name={key}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              {key === "email"
                                ? "Correo electrónico"
                                : "Teléfono"}
                              <span className="text-red-500" aria-hidden="true">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <motion.div whileHover={{ scale: 1.01 }}>
                                <Input
                                  type={key === "email" ? "email" : "tel"}
                                  placeholder={
                                    key === "email"
                                      ? "correo@ejemplo.com"
                                      : "+52 55 1234 5678"
                                  }
                                  {...field}
                                  className={cn(
                                    form.formState.errors[key] &&
                                      "border-red-300 focus:border-red-300",
                                    "focus-visible:ring-[#D09E66] focus-visible:ring-offset-2 transition-all duration-200"
                                  )}
                                  aria-invalid={!!form.formState.errors[key]}
                                  aria-required="true"
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Reservation Details Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-[#3B2F2F]">
                    Detalles de la reservación
                  </h3>
                  <Separator className="bg-[#3B2F2F]/20" />

                  {/* Fecha y Hora */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="flex items-center gap-1">
                            Fecha de visita
                            <span className="text-red-500" aria-hidden="true">
                              *
                            </span>
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <motion.div whileHover={{ scale: 1.01 }}>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                      form.formState.errors.date &&
                                        "border-red-300 focus:border-red-300"
                                    )}
                                    aria-invalid={!!form.formState.errors.date}
                                    aria-required="true"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4 text-[#3B2F2F]/70" />
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Selecciona una fecha</span>
                                    )}
                                  </Button>
                                </motion.div>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0 bg-white" // Añade bg-white para fondo sólido
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            Hora aproximada
                            <span className="text-red-500" aria-hidden="true">
                              *
                            </span>
                          </FormLabel>
                          <FormControl>
                            <motion.div whileHover={{ scale: 1.01 }}>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger
                                  className={cn(
                                    form.formState.errors.time &&
                                      "border-red-300 focus:border-red-300",
                                    "focus-visible:ring-[#D09E66] focus-visible:ring-offset-2 transition-all duration-200"
                                  )}
                                  aria-invalid={!!form.formState.errors.time}
                                  aria-required="true"
                                >
                                  <SelectValue placeholder="Selecciona hora" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  {timeSlots.map((t) => (
                                    <SelectItem key={t} value={t}>
                                      {t}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </motion.div>
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Número de personas */}
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          Número de personas
                          <span className="text-red-500" aria-hidden="true">
                            *
                          </span>
                        </FormLabel>
                        <FormControl>
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <Input
                              type="number"
                              min="1"
                              max="12"
                              {...field}
                              className={cn(
                                form.formState.errors.guests &&
                                  "border-red-300 focus:border-red-300",
                                "focus-visible:ring-[#D09E66] focus-visible:ring-offset-2 transition-all duration-200"
                              )}
                              aria-invalid={!!form.formState.errors.guests}
                              aria-required="true"
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Notas adicionales */}
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notas adicionales</FormLabel>
                        <FormControl>
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <Textarea
                              placeholder="Alergias, preferencias o requerimientos especiales"
                              {...field}
                              className={cn(
                                form.formState.errors.notes &&
                                  "border-red-300 focus:border-red-300",
                                "focus-visible:ring-[#D09E66] focus-visible:ring-offset-2 transition-all duration-200"
                              )}
                              rows={4}
                              aria-describedby="notes-description"
                            />
                          </motion.div>
                        </FormControl>
                        <p
                          id="notes-description"
                          className="text-sm text-[#3B2F2F]/60"
                        >
                          Opcional. Ejemplo: "Alergia a nueces" o "Necesitamos
                          silla alta"
                        </p>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Botón de envío */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-[#3B2F2F] hover:bg-[#5a4038] text-[#f5e8db] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5a4038] group"
                    disabled={form.formState.isSubmitting}
                    aria-live="polite"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <span className="transition-transform duration-300 group-hover:scale-105">
                          Reservar ahora
                        </span>
                        <motion.span
                          className="ml-2"
                          initial={{ x: -5, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          →
                        </motion.span>
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
