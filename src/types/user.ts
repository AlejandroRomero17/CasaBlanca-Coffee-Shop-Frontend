export interface User {
  id: string;
  name: string;
  email: string;
  role: "cliente" | "admin";
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
