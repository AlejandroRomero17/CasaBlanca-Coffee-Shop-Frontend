// src/router/routes/authRoutes.tsx
import { Route } from "react-router-dom";
import { lazy } from "react";
import PublicLayout from "@/layouts/PublicLayout";

const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));

export const authRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Route>
);
