// src/store/authStore.ts
import { create } from "zustand";

/**
 * Tipado centralizado del usuario.
 * Incluye `avatarUrl` opcional para la foto de perfil.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: "cliente" | "admin";
  avatarUrl?: string; // URL opcional del avatar
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,

  setUser: (user) => set({ user }),

  setToken: (token) => {
    if (typeof window === "undefined") {
      set({ token });
      return;
    }
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    set({ token });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    set({ user: null, token: null });
  },
}));
