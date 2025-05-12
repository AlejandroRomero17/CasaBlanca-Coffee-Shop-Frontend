import { useEffect, useState } from "react";
import { getProfileOrders } from "@/services/orderService";
import { ProfileOrder } from "@/types/order";
import { OrderCard } from "./OrderCard";
import { Spinner } from "@/components/ui/spinner";

export function OrderList() {
  const [orders, setOrders] = useState<ProfileOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const ordersData = await getProfileOrders();
        setOrders(ordersData);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Error al cargar las órdenes");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <p className="text-center text-[#3B2F2F]/60 py-8">
          No tienes órdenes registradas.
        </p>
      ) : (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      )}
    </div>
  );
}
