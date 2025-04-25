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
  console.log("🟠 Intentando login con:", payload);
  try {
    
    const response = await API.post("/api/users/login", payload);
    //console.log("🟢 Respuesta login:", response.data);
    
    if (response.data && response.data.user && response.data.token) {
      return response.data;
    }
    
    if (response.data && response.data.data && response.data.data.user && response.data.data.token) {
      return response.data.data;
    }
  
    throw new Error("Respuesta inesperada del backend: " + JSON.stringify(response.data));
  } catch (error: any) {
    if (error.response) {
      //console.error("🔴 Error login:", error.response.data);
    } else {
      //console.error("🔴 Error login:", error.message);
    }
    throw error;
  }
}

export async function register(payload: RegisterPayload) {
  const response = await API.post("/api/users/register", payload);
  return response.data;
}

export async function getProfile() {
  const response = await API.get("/api/users/profile");
  return response.data;
}
