// src/App.tsx
import { useEffect, useState, Suspense } from "react";
import AppRoutes from "@/router";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useCartStore } from "@/store/cartStore";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const replaceItems = useCartStore((s) => s.replaceItems);

  // 🔁 Sync entre pestañas
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

  return (
    <>
      <Navbar
        isMenuOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen((o) => !o)}
      />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Suspense
        fallback={
          <div className="flex justify-center py-16">
            <Spinner size="large" />
          </div>
        }
      >
        <AppRoutes />
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
