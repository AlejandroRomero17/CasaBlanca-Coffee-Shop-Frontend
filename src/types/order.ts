// src/types/order.ts

export interface OrderItem {
  id: string; // UUID del item de orden
  order_id: string; // Referencia a la orden
  product_id: string; // Referencia al producto
  quantity: number; // Cantidad ordenada
  price: number; // Precio unitario al momento de la compra
}

export type OrderStatus =
  | "pending"
  | "preparing"
  | "processing"
  | "ready"
  | "delivered"
  | "cancelled"
  | "Cancelado"
  | "Completado";

export interface ShippingAddress {
  id?: string; // ID de la dirección (opcional)
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country?: string;
  phone?: string;
  is_default?: boolean;
}

export interface Order {
  id: string; // UUID de la orden
  user_id: string; // ID del usuario
  items: OrderItem[]; // Items de la orden
  total: number; // Total de la orden
  status: OrderStatus; // Estado actual
  payment_method: string;
  shipping_address_id?: string;
  shipping_address?: string;
  created_at: string;
  updated_at?: string;
}

export interface ProfileOrder {
  id: string;
  payment_id?: string;
  payments?: Array<{
    id?: string;
    id_payments?: string;
    order_id?: string;
    status?: string;
    stripe_payment_id?: string;
  }>;
  items: Array<{
    order_item: OrderItem;
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
      description?: string;
    };
  }>;
  total: number;
  status: OrderStatus;
  payment_method: string;
  shipping_address?: string;
  created_at: string;
}
