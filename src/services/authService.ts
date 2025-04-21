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
  const response = await API.post("/users/login", payload);
  return response.data;
}

export async function register(payload: RegisterPayload) {
  const response = await API.post("/users/register", payload);
  return response.data;
}

export async function getProfile() {
  const response = await API.get("/users/profile");
  return response.data;
}
