// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import { getProfile } from "@/services/authService";
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
        if (!user) {
          const res = await getProfile();
          setUser(res);
        }
        const ordersData = await getProfileOrders();
        setOrders(ordersData);
      } catch (err) {
        console.error("Error fetching profile:", err);
        logout();
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, logout, navigate]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        <p className="text-base text-[#3B2F2F]">Cargando perfil...</p>
      </div>
    );
  }

  return (
    // 1. pt-20: espacio para el Navbar (ajusta según la altura real)
    // 2. px-4: padding lateral responsivo
    // 3. pb-16: espacio para el Footer
    <div className="flex justify-center px-4 pt-20 pb-16">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-3xl font-semibold text-center text-[#3B2F2F] mb-6">
          Mi Perfil
        </h1>

        <div className="mb-6 space-y-4">
          <div>
            <p className="text-sm font-medium text-[#3B2F2F]/80">Nombre</p>
            <p className="text-lg text-[#3B2F2F]">{user.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#3B2F2F]/80">Correo</p>
            <p className="text-lg text-[#3B2F2F]">{user.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#3B2F2F]/80">Rol</p>
            <p className="text-lg text-[#3B2F2F] capitalize">{user.role}</p>
          </div>
        </div>

        <Button
          variant="destructive"
          className="w-full mb-8"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Cerrar sesión
        </Button>

        <div>
          <h2 className="text-2xl font-semibold text-[#3B2F2F] mb-4">
            Mis Órdenes
          </h2>

          {orders.length === 0 ? (
            <p className="text-center text-[#3B2F2F]/60">
              No tienes órdenes registradas.
            </p>
          ) : (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="p-4 bg-[#fefcf9] rounded-lg border border-[#f0e6db] shadow"
                >
                  <p className="font-medium text-[#3B2F2F]">
                    Total:{" "}
                    <span className="text-lg">${order.total.toFixed(2)}</span>
                  </p>
                  <p className="text-[#3B2F2F]/80">Estado: {order.status}</p>
                  <p className="text-[#3B2F2F]/80">
                    Pago: {order.payment_method}
                  </p>
                  <p className="mt-2 text-sm text-[#3B2F2F]/60">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
