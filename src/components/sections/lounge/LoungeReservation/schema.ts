// src/components/sections/lounge/LoungeReservation/schema.ts
import * as z from "zod";

export const formSchema = z.object({
  fullName: z.string().min(2, { message: "Debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Correo inválido." }),
  phone: z.string().min(10, { message: "Al menos 10 dígitos." }),
  guests: z.coerce
    .number()
    .min(1, { message: "Al menos 1 persona." })
    .max(12, { message: "Máximo 12 personas." }),
  date: z.date({ required_error: "Por favor selecciona una fecha" }),
  time: z.string().min(1, { message: "Selecciona una hora." }),
  notes: z.string().optional(),
});

export type ReservationFormValues = z.infer<typeof formSchema>;

export const timeSlots = [
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
