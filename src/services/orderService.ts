import API from "./api";
import { Order, ProfileOrder } from "@/types/order";

/**
 * 📦 Obtiene todas las órdenes (solo admin)
 */
export async function getAllOrders(): Promise<Order[]> {
  console.log("📦 solicitando /orders");
  const response = await API.get("/orders");
  return response.data;
}

/**
 * 👤 Obtiene las órdenes del usuario autenticado
 */
export async function getOrdersByUser(): Promise<Order[]> {
  console.log("📦 solicitando /orders/user");
  const response = await API.get("/orders/user");
  return response.data;
}

/**
 * 🔍 Obtiene una orden por su ID
 */
export async function getOrderById(id: string): Promise<Order> {
  const response = await API.get(`/orders/${id}`);
  return response.data;
}

/**
 * 👤 Obtiene las órdenes del usuario (versión simplificada para perfil)
 */
export async function getProfileOrders(): Promise<ProfileOrder[]> {
  const response = await API.get("/orders/user");
  return response.data.map((order: Order) => ({
    _id: order._id,
    id: order._id, // Alias para compatibilidad
    total: order.total,
    status: order.status,
    paymentMethod: order.paymentMethod,
    payment_method: order.paymentMethod, // Alias
    createdAt: order.createdAt,
    created_at: order.createdAt, // Alias
  }));
}

/**
 * ✏️ Actualiza el estado de una orden
 */
export async function updateOrderStatus(
  id: string,
  newStatus: Order["status"]
): Promise<Order> {
  const response = await API.put(`/orders/${id}/status`, { status: newStatus });
  return response.data;
}

/**
 * ➕ Crea una nueva orden
 */
export async function createOrder(orderData: Partial<Order>): Promise<Order> {
  const response = await API.post("/orders", orderData);
  return response.data;
}
