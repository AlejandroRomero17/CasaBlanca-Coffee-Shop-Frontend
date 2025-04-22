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
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/sales" element={<AdminSales />} />
      <Route path="/admin/products" element={<AdminProducts />} />
    </Route>
  </Route>
);
