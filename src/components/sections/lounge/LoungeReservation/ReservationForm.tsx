// src/components/sections/lounge/LoungeReservation/ReservationForm.tsx
"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { createReservation } from "@/services/reservationService";
import { ReservationFormValues, timeSlots } from "./schema";

type Props = {
  form: ReturnType<
    typeof import("react-hook-form").useForm<ReservationFormValues>
  >;
};

export default function ReservationForm({ form }: Props) {
  const { handleSubmit, formState, reset } = form;

  const onSubmit = async (values: ReservationFormValues) => {
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

    try {
      await createReservation({
        nombre_completo: values.fullName,
        correo_electronico: values.email,
        telefono: values.phone,
        fecha_visita: format(values.date, "yyyy-MM-dd"),
        hora_visita: values.time,
        numero_personas: values.guests,
        notas_adicionales: values.notes,
      });

      toast.success(
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 mt-0.5 text-green-500" />
          <div>
            <p className="font-medium">¡Reservación creada!</p>
            <p className="text-sm text-gray-600">
              Confirmaremos tu reserva para {values.fullName} el{" "}
              {format(values.date, "PPP")} a las {values.time}.
            </p>
          </div>
        </div>,
        { duration: 5000, position: "top-center" }
      );

      reset();
    } catch (err) {
      console.error(err);
      toast.error("Error al crear la reserva. Por favor inténtalo de nuevo.", {
        position: "top-center",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Información personal */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-[#3B2F2F]">
            Información personal
          </h3>
          <Separator className="bg-[#3B2F2F]/20" />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  Nombre completo <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tu nombre"
                    {...field}
                    className={cn(
                      fieldState.error && "border-red-300 focus:border-red-300"
                    )}
                    aria-invalid={!!fieldState.error}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {(["email", "phone"] as const).map((key) => (
              <FormField
                key={key}
                control={form.control}
                name={key}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      {key === "email" ? "Correo electrónico" : "Teléfono"}{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={key === "email" ? "email" : "tel"}
                        placeholder={
                          key === "email"
                            ? "correo@ejemplo.com"
                            : "+52 55 1234 5678"
                        }
                        {...field}
                        className={cn(
                          fieldState.error &&
                            "border-red-300 focus:border-red-300"
                        )}
                        aria-invalid={!!fieldState.error}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {/* Detalles de la reservación */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-[#3B2F2F]">
            Detalles de la reservación
          </h3>
          <Separator className="bg-[#3B2F2F]/20" />

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Fecha */}
            <FormField
              control={form.control}
              name="date"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Fecha de visita <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          !field.value && "text-muted-foreground",
                          fieldState.error &&
                            "border-red-300 focus:border-red-300"
                        )}
                        aria-invalid={!!fieldState.error}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-[#3B2F2F]/70" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Selecciona una fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-white"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Hora */}
            <FormField
              control={form.control}
              name="time"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Hora aproximada <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          fieldState.error &&
                            "border-red-300 focus:border-red-300"
                        )}
                        aria-invalid={!!fieldState.error}
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
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {/* Personas */}
          <FormField
            control={form.control}
            name="guests"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  Número de personas <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={12}
                    {...field}
                    className={cn(
                      fieldState.error && "border-red-300 focus:border-red-300"
                    )}
                    aria-invalid={!!fieldState.error}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Notas */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Notas adicionales</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Alergias, preferencias..."
                    {...field}
                    className={cn(
                      fieldState.error && "border-red-300 focus:border-red-300"
                    )}
                    rows={4}
                  />
                </FormControl>
                <p className="text-sm text-[#3B2F2F]/60">
                  Opcional. Ej: "Alergia a nueces", "Necesitamos silla alta"
                </p>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        {/* Botón de envío */}
        <div>
          <Button
            type="submit"
            className="w-full bg-[#3B2F2F] hover:bg-[#5a4038] text-[#f5e8db]"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Procesando...
              </>
            ) : (
              "Reservar ahora →"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
