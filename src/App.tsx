// src/App.tsx
import { useState, Suspense } from "react";
import AppRoutes from "@/router";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Spinner } from "@/components/ui/spinner";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
