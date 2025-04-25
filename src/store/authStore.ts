// src/store/authStore.ts
import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  avatarUrl?: string;
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
