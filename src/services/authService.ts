import API from "./api";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  name: string;
  role?: "cliente" | "admin";
}

export async function login(payload: LoginPayload) {
  const response = await API.post("/users/login", payload);
  return response.data;
}

export async function register(payload: RegisterPayload) {
  const response = await API.post("/api/users/register", payload);
  return response.data;
}


export async function getProfile() {
  const response = await API.get("/api/users/profile");
  return response.data;
}
