// src/router/index.tsx
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "@/pages/Home";
const Lounge = lazy(() => import("@/pages/Lounge"));
const Products = lazy(() => import("@/pages/Products"));
const Delivery = lazy(() => import("@/pages/Delivery"));
const Cart = lazy(() => import("@/pages/Cart"));
const Contact = lazy(() => import("@/pages/Contact"));
const Blog = lazy(() => import("@/pages/Blog"));
const Article = lazy(() => import("@/pages/Article"));
const Subscription = lazy(() => import("@/pages/Subscription"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const AppRoutes = () => (
  <Suspense fallback={<div className="p-6 text-center">Cargando…</div>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lounge" element={<Lounge />} />
      <Route path="/products" element={<Products />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<Article />} />
      <Route path="/suscripcion" element={<Subscription />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
