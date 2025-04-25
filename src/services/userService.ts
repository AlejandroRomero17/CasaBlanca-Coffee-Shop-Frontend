// import { API_BASE_URL } from "@/config/api";

// export async function registerUser(userData: any) {
//   const res = await fetch(`${API_BASE_URL}/users/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });
//   if (!res.ok) throw new Error("No se pudo registrar el usuario");
//   return await res.json();
// }

// export async function loginUser(credentials: any) {
//   const res = await fetch(`${API_BASE_URL}/users/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(credentials),
//   });
//   if (!res.ok) throw new Error("Credenciales inválidas");
//   return await res.json();
// }

// export async function fetchUserProfile(token: string) {
//   const res = await fetch(`${API_BASE_URL}/users/profile`, {
//     headers: {
//       "Authorization": `Bearer ${token}`,
//     },
//   });
//   if (!res.ok) throw new Error("No se pudo obtener el perfil de usuario");
//   return await res.json();
// }
