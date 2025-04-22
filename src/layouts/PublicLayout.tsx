import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import { Outlet } from "react-router-dom"; // ✅ Importar Outlet

const PublicLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar
        isMenuOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen((open) => !open)}
      />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Aquí se renderizarán las rutas hijas */}
      <main className="min-h-screen bg-[#fefcf9]">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default PublicLayout;
