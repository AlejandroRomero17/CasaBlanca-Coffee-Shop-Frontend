// src/types/user.ts

/** Representa una dirección de envío del usuario */
export interface Address {
  id: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
  isDefault: boolean;
  created_at?: string;
  updated_at?: string;
}

/** Información del usuario */
export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  /** URL de la foto de perfil (opcional) */
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  /** Direcciones asociadas al usuario */
  addresses?: Address[];
}
