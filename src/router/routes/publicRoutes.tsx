// src/router/routes/publicRoutes.tsx
import PublicLayout from "@/layouts/PublicLayout";
import Article from "@/pages/public/Article";
import Blog from "@/pages/public/Blog";
import Contact from "@/pages/public/Contact";
import Home from "@/pages/public/Home";
import Lounge from "@/pages/public/Lounge";
import Products from "@/pages/public/Products";
import Subscription from "@/pages/public/Subscription";
import { Route } from "react-router-dom";

export const publicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/lounge" element={<Lounge />} />
    <Route path="/products" element={<Products />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<Article />} />
    <Route path="/suscripcion" element={<Subscription />} />
  </Route>
);
