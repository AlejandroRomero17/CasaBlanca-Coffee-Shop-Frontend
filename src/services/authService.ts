// src/services/authService.ts
import API from "./api";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  name: string;
  role?: "customer" | "admin";
}

export async function login(payload: LoginPayload) {
  // Normalizar email
  const body = {
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
  };
  console.log("[authService] login payload:", body);
  const response = await API.post("/users/login", body);
  return response.data;
}

export async function register(payload: RegisterPayload) {
  // Normalizar email
  const body = {
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
    role: payload.role,
  };
  console.log("[authService] register payload:", body);
  const response = await API.post("/users/register", body);
  return response.data;
}

export async function getProfile() {
  const response = await API.get("/users/profile");
  return response.data;
}
