// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import { CartProvider } from "@/context/CartContext";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner"; // ✅ Toast elegante

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
          <Toaster
            position="top-center" // 📍 centrado arriba
            theme="light" // 🌓 claro (o puedes cambiar a "dark" si quieres)
            richColors // 🎨 colores automáticos más vivos
            duration={5000} // ⏳ 5 segundos de duración
            visibleToasts={3} // 👀 máximo 3 visibles a la vez
            expand // 🎯 efecto expandible para toasts largos
            offset={16} // 📏 margen del top
          />
        </Elements>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
