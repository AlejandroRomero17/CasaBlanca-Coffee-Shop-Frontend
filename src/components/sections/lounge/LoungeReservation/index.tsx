"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, ReservationFormValues } from "./schema";
import ReservationHeader from "./ReservationHeader";
import ReservationInfo from "./ReservationInfo";
import ReservationPreview from "./ReservationPreview";
import ReservationForm from "./ReservationForm";

export default function LoungeReservation() {
  const form = useForm<ReservationFormValues>({
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

  const watchedValues = useWatch({ control: form.control });

  return (
    <section
      aria-labelledby="reservation-heading"
      className="bg-[#fcf8f2] py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <ReservationHeader />
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <ReservationInfo />
            <ReservationPreview watchedValues={watchedValues} />
          </div>
          <ReservationForm form={form} />
        </div>
      </div>
    </section>
  );
}
