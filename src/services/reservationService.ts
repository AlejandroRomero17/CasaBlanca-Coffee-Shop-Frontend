// src/services/reservationService.ts
import API from "./api";

export interface ReservationPayload {
  nombre_completo: string;
  correo_electronico: string;
  telefono: string;
  fecha_visita: string; // YYYY-MM-DD
  hora_visita: string;
  numero_personas: number;
  notas_adicionales?: string;
}

export interface ReservationResponse {
  id_reservaciones: number;
  created_at: string;
}

/**
 * Crea una nueva reservación en el backend
 */
export async function createReservation(
  payload: ReservationPayload
): Promise<ReservationResponse> {
  const res = await API.post<{ success: boolean; data: ReservationResponse }>(
    "/reservaciones",
    payload
  );
  return res.data.data;
}
