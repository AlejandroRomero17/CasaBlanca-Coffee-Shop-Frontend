export interface OrderItem {
  product: string | { _id: string; name: string };
  quantity: number;
  price: number;
}

export type OrderStatus =
  | "pendiente"
  | "preparando"
  | "listo"
  | "entregado"
  | "cancelado";

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: "efectivo" | "tarjeta" | "transferencia";
  tableNumber?: number;
  isDelivery: boolean;
  deliveryAddress?: {
    street?: string;
    city?: string;
    zipCode?: string;
    details?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Añade este tipo para la vista simplificada
export type ProfileOrder = Pick<
  Order,
  "_id" | "total" | "status" | "paymentMethod" | "createdAt"
> & {
  id: string; // Alias para _id
  payment_method: string; // Alias para paymentMethod
  created_at: string; // Alias para createdAt
};
