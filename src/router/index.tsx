import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Lounge from "@/pages/Lounge";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lounge" element={<Lounge />} />
    </Routes>
  );
};

export default AppRoutes;
