import { API_BASE_URL } from "@/config/api";

export async function createOrder(orderData: any) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error("No se pudo crear la orden");
  return await res.json();
}

export async function fetchOrdersByUser(userId: string) {
  const res = await fetch(`${API_BASE_URL}/orders/user/${userId}`);
  if (!res.ok) throw new Error("No se pudieron obtener las órdenes del usuario");
  return await res.json();
}

export async function fetchOrderById(orderId: string) {
  const res = await fetch(`${API_BASE_URL}/orders/${orderId}`);
  if (!res.ok) throw new Error("No se pudo obtener la orden");
  return await res.json();
}

export async function fetchAllOrders() {
  const res = await fetch(`${API_BASE_URL}/orders`);
  if (!res.ok) throw new Error("No se pudieron obtener las órdenes");
  return await res.json();
}