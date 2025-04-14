// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import SpecialMenu from "./components/sections/SpecialMenu";
import AboutUs from "./components/sections/AboutUs";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-beige-light to-[#f2c894]">
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route
          path="/products"
          element={<div className="p-12">Nuestros productos</div>}
        />
        <Route
          path="/delivery"
          element={<div className="p-12">Entrega a domicilio</div>}
        />
      </Routes>
      <SpecialMenu />
      <AboutUs />
    </div>
  );
}

export default App;
