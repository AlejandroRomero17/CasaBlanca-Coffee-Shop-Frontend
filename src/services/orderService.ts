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

interface CancelOrderParams {
  order_id: string;
  payment_id: string;
  user_id: string;
  cancellation_reason?: string;
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

export async function cancelOrder(params: CancelOrderParams): Promise<{ success: boolean; message: string }> {
  try {
    const response = await API.post("/orders/cancel", params);
    return { 
      success: true, 
      message: response.data.message || "Pedido cancelado correctamente" 
    };
  } catch (error: any) {
    console.error("Error canceling order:", error);
    return { 
      success: false, 
      message: error.response?.data?.error || "Error al cancelar el pedido" 
    };
  }
}

export async function sendInvoiceByEmail(orderId: string): Promise<{ success: boolean; message: string }> {
  try {
    // The API client already includes the /api prefix in the baseURL
    // So we just need to use /invoices/:orderId/email
    const response = await API.post(`/invoices/${orderId}/email`, {
      // Send an empty email to let the backend use the user's email from their account
      email: ""
    });
    return { 
      success: true, 
      message: response.data.message || "Factura enviada correctamente por correo electrónico" 
    };
  } catch (error: any) {
    console.error("Error sending invoice by email:", error);
    return { 
      success: false, 
      message: error.response?.data?.error || "Error al enviar la factura por correo electrónico" 
    };
  }
}
