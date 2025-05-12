import API from "./api";
import { ProfileOrder, OrderStatus } from "@/types/order";

interface OrderItemResponse {
  id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    available: boolean;
  };
  quantity: number;
  price: number;
}

interface OrderResponse {
  id: string;
  items: OrderItemResponse[];
  total: number;
  status: OrderStatus;
  payment_method: string;
  shipping_address?: string;
  created_at: string;
  updated_at: string;
}

export async function getProfileOrders(): Promise<ProfileOrder[]> {
  try {
    const response = await API.get<OrderResponse[]>("/orders/user");

    return response.data.map((order) => ({
      id: order.id,
      items: order.items.map((item) => ({
        order_item: {
          id: item.id,
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        },
        product: {
          id: item.product.id,
          name: item.product.name,
          description: item.product.description,
          price: item.product.price,
          image: item.product.image,
          category: item.product.category,
          available: item.product.available,
        },
      })),
      total: order.total,
      status: order.status,
      payment_method: order.payment_method,
      shipping_address: order.shipping_address,
      created_at: order.created_at,
      updated_at: order.updated_at,
    }));
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}
