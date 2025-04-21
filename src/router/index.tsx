// src/router/index.tsx
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "@/pages/Home";
import PrivateRoute from "./PrivateRoute"; // 👈 Asegúrate de crear este componente

const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Lounge = lazy(() => import("@/pages/Lounge"));
const Products = lazy(() => import("@/pages/Products"));
const Delivery = lazy(() => import("@/pages/Delivery"));
const Cart = lazy(() => import("@/pages/Cart"));
const Contact = lazy(() => import("@/pages/Contact"));
const Blog = lazy(() => import("@/pages/Blog"));
const Article = lazy(() => import("@/pages/Article"));
const Subscription = lazy(() => import("@/pages/Subscription"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Profile = lazy(() => import("@/pages/Profile"));


const AppRoutes = () => (
  <Suspense fallback={<div className="p-6 text-center">Cargando…</div>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lounge" element={<Lounge />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<Article />} />
      <Route path="/suscripcion" element={<Subscription />} />

      {/* 🔒 Rutas privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 👤 Rutas públicas de auth */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
