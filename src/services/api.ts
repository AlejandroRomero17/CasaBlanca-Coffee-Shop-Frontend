// src/services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5050/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Inyecta el JWT en cada petición
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // console.log("📦 Enviando token:", token); // 👈 útil para debug
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
