// src/App.tsx
import { useEffect, Suspense } from "react";
import AppRoutes from "@/router";
import { Spinner } from "@/components/ui/spinner";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { getProfile } from "@/services/authService";

function App() {
  const replaceItems = useCartStore((s) => s.replaceItems);
  const token = useAuthStore((s) => s.token);
  const setUser = useAuthStore((s) => s.setUser);

  // 🔁 Sincronizar carrito entre pestañas
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "cart-storage" && e.newValue) {
        try {
          const data = JSON.parse(e.newValue);
          if (data?.state?.items) {
            replaceItems(data.state.items);
          }
        } catch (err) {
          console.error("Error al sincronizar carrito entre pestañas:", err);
        }
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [replaceItems]);

  // ✅ Cargar perfil del usuario si hay token
  useEffect(() => {
    if (token) {
      getProfile()
        .then(setUser)
        .catch((err) => {
          console.warn("No se pudo cargar el perfil del usuario:", err);
        });
    }
  }, [token, setUser]);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-16">
          <Spinner size="large" />
        </div>
      }
    >
      <AppRoutes />
    </Suspense>
  );
}

export default App;
