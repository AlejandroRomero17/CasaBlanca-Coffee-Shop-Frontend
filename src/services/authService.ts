import API from "@/services/api";
import { User } from "@/store/authStore";

export async function login(payload: { email: string; password: string }) {
  const response = await API.post<{ token: string; user: User }>(
    "/users/login",
    payload
  );
  return response.data;
}

export async function register(payload: {
  email: string;
  password: string;
  name: string;
  role?: "customer" | "admin";
}) {
  const response = await API.post("/users/register", payload);
  return response.data;
}

export async function getProfile(): Promise<User> {
  const { data } = await API.get("/users/profile");

  console.log("[authService] getProfile raw data:", data);

  const user: User = {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role === "cliente" ? "customer" : data.role,
    avatarUrl: undefined,
  };

  console.log("[authService] getProfile mapped user:", user);

  return user;
}
