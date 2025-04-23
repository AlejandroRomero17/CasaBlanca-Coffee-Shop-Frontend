import { useEffect, useState } from "react";
import { getProfile } from "@/services/authService";
import { getProfileOrders } from "@/services/orderService"; // Cambiado a getProfileOrders
import { useAuthStore } from "@store/authStore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProfileOrder } from "@/types/order"; // Importamos el tipo específico

export default function ProfilePage() {
  const { user, setUser, logout } = useAuthStore();
  const [orders, setOrders] = useState<ProfileOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!user) {
          const res = await getProfile();
          setUser(res);
        }
        const ordersData = await getProfileOrders(); // Usamos la nueva función
        setOrders(ordersData);
      } catch (err) {
        console.error("Error:", err);
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, setUser, logout, navigate]);

  if (loading || !user) {
    return <div className="p-6 text-center">Cargando perfil...</div>;
  }

  return (
    <div className="max-w-2xl p-6 mx-auto mt-10 space-y-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-semibold text-center">Mi Perfil</h1>
      <div>
        <p className="font-medium">Nombre:</p>
        <p>{user.name}</p>
      </div>
      <div>
        <p className="font-medium">Correo:</p>
        <p>{user.email}</p>
      </div>
      <div>
        <p className="font-medium">Rol:</p>
        <p>{user.role}</p>
      </div>

      <Button
        className="w-full"
        variant="destructive"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Cerrar sesión
      </Button>

      <div className="pt-8 border-t">
        <h2 className="mb-4 text-xl font-semibold">Mis órdenes</h2>
        {orders.length === 0 ? (
          <p className="text-muted-foreground">
            No tienes órdenes registradas.
          </p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="p-4 border rounded-md shadow-sm">
                <p className="font-medium">Total: ${order.total.toFixed(2)}</p>
                <p>Estado: {order.status}</p>
                <p>Método de pago: {order.payment_method}</p>
                <p className="text-sm text-muted-foreground">
                  Fecha: {new Date(order.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
