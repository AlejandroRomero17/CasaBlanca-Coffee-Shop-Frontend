import API from "./api";
import { Order, ProfileOrder } from "@/types/order";

/** Tipo base para compatibilidad con posibles formatos del backend */
interface RawOrder {
  _id: string;
  total: number;
  status: string;
  paymentMethod?: string;
  payment_method?: string;
  createdAt?: string;
  created_at?: string;
}

/** Valores válidos para método de pago */
const validPaymentMethods = ["efectivo", "tarjeta", "transferencia"] as const;
type PaymentMethod = (typeof validPaymentMethods)[number];

/** Valida que el método de pago sea aceptado */
function validatePaymentMethod(input?: string): PaymentMethod {
  return validPaymentMethods.includes(input as PaymentMethod)
    ? (input as PaymentMethod)
    : "efectivo"; // Fallback por defecto
}

/** Obtiene todas las órdenes (solo admin) */
export async function getAllOrders(): Promise<Order[]> {
  const response = await API.get("/orders");
  return response.data;
}

/** Obtiene las órdenes del usuario autenticado */
export async function getOrdersByUser(): Promise<Order[]> {
  const response = await API.get("/orders/user");
  return response.data;
}

/** Obtiene una orden por su ID */
export async function getOrderById(id: string): Promise<Order> {
  const response = await API.get(`/orders/${id}`);
  return response.data;
}

/** Órdenes para el perfil del usuario autenticado */
export async function getProfileOrders(): Promise<ProfileOrder[]> {
  const response = await API.get("/orders/user");

  return response.data.map((order: RawOrder): ProfileOrder => {
    const rawPayment = order.paymentMethod ?? order.payment_method;
    const safePayment = validatePaymentMethod(rawPayment);
    const created = order.createdAt ?? order.created_at ?? "";

    return {
      _id: order._id,
      id: order._id,
      total: order.total,
      status: order.status as Order["status"],
      paymentMethod: safePayment,
      payment_method: rawPayment ?? "efectivo",
      createdAt: created,
      created_at: created,
    };
  });
}

/** Actualiza el estado de una orden */
export async function updateOrderStatus(
  id: string,
  newStatus: Order["status"]
): Promise<Order> {
  const response = await API.put(`/orders/${id}/status`, { status: newStatus });
  return response.data;
}

/** Crea una nueva orden */
export async function createOrder(
  orderData: Partial<Order> & { shipping_address_id: string }
): Promise<Order> {
  const response = await API.post("/orders", orderData);
  return response.data;
}
