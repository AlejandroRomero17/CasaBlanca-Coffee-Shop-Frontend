// src/router/index.tsx
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { publicRoutes } from "./routes/publicRoutes";
import { authRoutes } from "./routes/authRoutes";
import { privateRoutes } from "./routes/privateRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => (
  <Suspense fallback={<div className="p-6 text-center">Cargando…</div>}>
    <Routes>
      {publicRoutes}
      {authRoutes}
      {privateRoutes}
      {adminRoutes}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
