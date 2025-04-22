// src/router/routes/privateRoutes.tsx
import { Route } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import PrivateRoute from "../PrivateRoute";
import Cart from "@/pages/private/Cart";
import Delivery from "@/pages/private/Delivery";
import Profile from "@/pages/private/Profile";

export const privateRoutes = (
  <Route element={<PublicLayout />}>
    <Route element={<PrivateRoute />}>
      <Route path="/cart" element={<Cart />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  </Route>
);
