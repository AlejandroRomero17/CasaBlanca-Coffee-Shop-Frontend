import API from "@/services/api";
import type { Address } from "@/types/user";

// ——— Auth
export async function registerUser(userData: any) {
  const res = await API.post("/users/register", userData);
  if (res.status !== 201) throw new Error("No se pudo registrar el usuario");
  return res.data;
}

export async function loginUser(credentials: any) {
  const res = await API.post("/users/login", credentials);
  if (res.status !== 200) throw new Error("Credenciales inválidas");
  return res.data;
}

export async function fetchUserProfile(token: string) {
  const res = await API.get("/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status !== 200)
    throw new Error("No se pudo obtener el perfil de usuario");
  return res.data;
}

// ——— Direcciones
export async function getAddresses(): Promise<Address[]> {
  const res = await API.get<Address[]>("/users/addresses");
  return res.data;
}

export async function addAddress(
  addr: Omit<Address, "id" | "created_at" | "updated_at">
): Promise<Address[]> {
  const res = await API.post<Address[]>("/users/addresses", addr);
  return res.data;
}

export async function updateAddress(
  id: string,
  updates: Partial<Address>
): Promise<Address[]> {
  const res = await API.put<Address[]>(`/users/addresses/${id}`, updates);
  return res.data;
}

export async function deleteAddress(id: string): Promise<void> {
  await API.delete<void>(`/users/addresses/${id}`);
}
