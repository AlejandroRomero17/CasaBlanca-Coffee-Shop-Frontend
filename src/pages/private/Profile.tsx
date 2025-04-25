"use client";

import { useEffect, useState } from "react";
import { getProfileOrders } from "@/services/orderService";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProfileOrder } from "@/types/order";

export default function ProfilePage() {
  const { user, token, logout } = useAuthStore();
  const [orders, setOrders] = useState<ProfileOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.log("[ProfilePage] No token, redirigiendo...");
      navigate("/login", { replace: true });
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        console.log("[ProfilePage] Fetching orders...");
        const ordersData = await getProfileOrders();
        setOrders(ordersData);
      } catch (err) {
        console.error("[ProfilePage] Error fetching orders:", err);
        logout();
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, logout, navigate]);

  if (token && !user) {
    return <div className="p-6 text-center">Cargando perfil…</div>;
  }

  return (
    <div className="max-w-2xl p-6 mx-auto mt-10 space-y-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-semibold text-center">Mi Perfil</h1>
      <div>
        <p className="font-medium">Nombre:</p>
        <p>{user?.name}</p>
      </div>
      <div>
        <p className="font-medium">Correo:</p>
        <p>{user?.email}</p>
      </div>
      <div>
        <p className="font-medium">Rol:</p>
        <p>{user?.role}</p>
      </div>

      <Button
        variant="destructive"
        className="w-full"
        onClick={() => {
          logout();
          navigate("/login", { replace: true });
        }}
      >
        Cerrar sesión
      </Button>

      <div className="pt-8 border-t">
        <h2 className="mb-4 text-xl font-semibold">Mis órdenes</h2>
        {loading ? (
          <p className="text-center text-gray-500">Cargando órdenes...</p>
        ) : orders.length === 0 ? (
          <p className="italic text-gray-600">No tienes órdenes registradas.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((o) => (
              <li
                key={o.id}
                className="p-4 border rounded-md shadow-sm bg-gray-50"
              >
                <p className="font-medium">Total: ${o.total.toFixed(2)}</p>
                <p>Estado: {o.status}</p>
                <p>Método de pago: {o.payment_method}</p>
                <p className="text-sm text-gray-500">
                  Fecha: {new Date(o.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
