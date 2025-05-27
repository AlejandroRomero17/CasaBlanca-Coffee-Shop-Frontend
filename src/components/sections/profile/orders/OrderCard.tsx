import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatPrice";
import { formatDateForUser } from "@/utils/formatDate";
import { ProfileOrder } from "@/types/order";
import { Download, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

interface OrderCardProps {
  order: ProfileOrder;
}

const formatAddress = (addressString: string) => {
  try {
    const address = JSON.parse(addressString);
    const lines = [
      address.line1,
      address.line2,
      `${address.city}, ${address.state}`,
      `C.P. ${address.postal_code}`,
      address.country,
    ].filter((line) => line && line.trim() !== "");

    return lines.join(", ");
  } catch (e) {
    console.error("Error parsing address:", e);
    return addressString;
  }
};

export function OrderCard({ order }: OrderCardProps) {
  const { token } = useAuthStore();
  const [isLoadingTicket, setIsLoadingTicket] = useState(false);
  const [isLoadingInvoice, setIsLoadingInvoice] = useState(false);
  
  // Debug: verifica los valores de precios
  console.log("Order data:", {
    orderTotal: order.total,
    items: order.items?.map((item) => ({
      unitPrice: item.order_item.price,
      quantity: item.order_item.quantity,
      subtotal: item.order_item.price * item.order_item.quantity,
    })),
  });

  // Calculamos el total basado en los items como respaldo
  const calculatedTotal =
    order.items?.reduce(
      (sum, item) => sum + item.order_item.price * item.order_item.quantity,
      0
    ) || 0;

  // Usamos el total de la orden o el calculado si no está disponible
  const displayTotal = order.total ?? calculatedTotal;
  
  // Función para descargar el ticket
  const downloadTicket = async () => {
    try {
      setIsLoadingTicket(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tickets/${order.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error al descargar el ticket: ${response.statusText}`);
      }
      
      // Obtener el blob del PDF
      const blob = await response.blob();
      
      // Crear una URL para el blob
      const url = window.URL.createObjectURL(blob);
      
      // Crear un enlace temporal
      const a = document.createElement('a');
      a.href = url;
      a.download = `ticket-orden-${order.id}.pdf`;
      
      // Simular un clic en el enlace
      document.body.appendChild(a);
      a.click();
      
      // Limpiar
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Ticket descargado correctamente");
    } catch (error) {
      console.error("Error al descargar el ticket:", error);
      toast.error(error instanceof Error ? error.message : "Error al descargar el ticket");
    } finally {
      setIsLoadingTicket(false);
    }
  };
  
  // Función para descargar la factura
  const downloadInvoice = async () => {
    try {
      setIsLoadingInvoice(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/invoices/${order.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error al descargar la factura: ${response.statusText}`);
      }
      
      // Obtener el blob del PDF
      const blob = await response.blob();
      
      // Crear una URL para el blob
      const url = window.URL.createObjectURL(blob);
      
      // Crear un enlace temporal
      const a = document.createElement('a');
      a.href = url;
      a.download = `factura-${order.id}.pdf`;
      
      // Simular un clic en el enlace
      document.body.appendChild(a);
      a.click();
      
      // Limpiar
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Factura descargada correctamente");
    } catch (error) {
      console.error("Error al descargar la factura:", error);
      toast.error(error instanceof Error ? error.message : "Error al descargar la factura");
    } finally {
      setIsLoadingInvoice(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto mb-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Orden #{order.id?.slice(0, 8).toUpperCase() || "N/A"}
        </CardTitle>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <p className="text-sm text-muted-foreground">
            Fecha:{" "}
            {order.created_at ? formatDateForUser(order.created_at) : "N/A"}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-medium">Total:</span>
            <span className="text-base font-semibold">
              {formatPrice(displayTotal)}
            </span>
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <p>
            Estado: <span className="capitalize">{order.status}</span>
          </p>
          <p>
            Método de pago:{" "}
            <span className="capitalize">{order.payment_method}</span>
          </p>
          {order.shipping_address && (
            <div>
              <p className="font-medium">Dirección de envío:</p>
              <p className="text-muted-foreground">
                {formatAddress(order.shipping_address)}
              </p>
            </div>
          )}
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 space-y-4">
        <h3 className="font-medium">Productos:</h3>
        {order.items && order.items.length > 0 ? (
          order.items.map((item) => (
            <div
              key={item.order_item.id}
              className="flex items-center space-x-4"
            >
              <img
                src={item.product.image || "/placeholder-product.jpg"}
                alt={item.product.name}
                className="object-cover w-16 h-16 rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/placeholder-product.jpg";
                }}
              />
              <div className="flex-1">
                <span className="font-medium">{item.product.name}</span>
                <div className="flex justify-between text-muted-foreground">
                  <span>
                    {formatPrice(item.order_item.price)} x{" "}
                    {item.order_item.quantity}
                  </span>
                  <span>
                    {formatPrice(
                      item.order_item.price * item.order_item.quantity
                    )}
                  </span>
                </div>
                {item.product.description && (
                  <p className="mt-1 text-xs text-gray-500">
                    {item.product.description}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay productos en esta orden</p>
        )}
      </CardContent>
      <div className="px-6 pb-4 flex flex-wrap gap-3 justify-end">
        <Button 
          onClick={downloadTicket} 
          variant={isLoadingTicket ? "default" : "outline"}
          size="sm" 
          className={`flex items-center gap-2 ${isLoadingTicket ? "bg-green-600 hover:bg-green-700 text-white" : ""}`}
          disabled={isLoadingTicket}
        >
          {isLoadingTicket ? (
            <>
              <Loader2 size={16} className="animate-spin text-white" />
              Descargando...
            </>
          ) : (
            <>
              <Download size={16} />
              Ticket
            </>
          )}
        </Button>
        <Button 
          onClick={downloadInvoice} 
          variant={isLoadingInvoice ? "default" : "outline"}
          size="sm" 
          className={`flex items-center gap-2 ${isLoadingInvoice ? "bg-green-600 hover:bg-green-700 text-white" : ""}`}
          disabled={isLoadingInvoice}
        >
          {isLoadingInvoice ? (
            <>
              <Loader2 size={16} className="animate-spin text-white" />
              Descargando...
            </>
          ) : (
            <>
              <FileText size={16} />
              Factura
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
