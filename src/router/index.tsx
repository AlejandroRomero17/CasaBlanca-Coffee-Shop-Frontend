import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Lounge from "@/pages/Lounge";
import Products from "@/pages/Products";
import Delivery from "@/pages/Delivery";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lounge" element={<Lounge />} />
      <Route path="/products" element={<Products />} />
      <Route path="/delivery" element={<Delivery />} />
    </Routes>
  );
};

export default AppRoutes;
