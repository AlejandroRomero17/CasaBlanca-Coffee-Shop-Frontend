// src/router/routes/publicRoutes.tsx
import { Route } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import Home from "@/pages/public/Home";
import Lounge from "@/pages/public/Lounge";
import Products from "@/pages/public/Products";
import Contact from "@/pages/public/Contact";
import Blog from "@/pages/public/Blog";
import Article from "@/pages/public/Article";
import Subscription from "@/pages/public/Subscription";
import Cart from "@/pages/private/Cart";

export const publicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/lounge" element={<Lounge />} />
    <Route path="/products" element={<Products />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<Article />} />
    <Route path="/suscripcion" element={<Subscription />} />
    <Route path="/cart" element={<Cart />} /> {/* 👈 ahora cart es público */}
  </Route>
);
