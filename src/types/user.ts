export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  /** URL de la foto de perfil (opcional) */
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
