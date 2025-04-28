// src/router/routes/adminRoutes.tsx
import { Route } from "react-router-dom";
import AdminRoute from "../AdminRoute";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import AdminOrders from "@/pages/dashboard/AdminOrders";
import AdminSales from "@/pages/dashboard/AdminSales";
import AdminProducts from "@/pages/dashboard/AdminProducts";

export const adminRoutes = (
  <Route element={<AdminRoute />}>
    <Route element={<AdminLayout />}>
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/dashboard/orders" element={<AdminOrders />} />
      <Route path="/dashboard/sales" element={<AdminSales />} />
      <Route path="/dashboard/products" element={<AdminProducts />} />
    </Route>
  </Route>
);
