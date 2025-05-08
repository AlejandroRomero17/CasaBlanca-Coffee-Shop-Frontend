// src/services/adminUserService.ts
import API from "@/services/api";
import { User } from "@/types/user";

export async function getAllUsers(): Promise<User[]> {
  const { data } = await API.get("/users");
  return data;
}

export async function getUserById(id: string): Promise<User> {
  const { data } = await API.get(`/users/profile/${id}`);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  await API.delete(`/users/${id}`);
}

// ✔✔✔ ACTUALIZACIÓN DE USUARIO PARA ADMINISTRADOR (REQUIERE BACKEND FUNCIONAL)
export async function updateUserById(
  id: string,
  updatedData: Partial<User>
): Promise<User> {
  const { data } = await API.put(`/users/${id}`, updatedData);
  return data;
}
