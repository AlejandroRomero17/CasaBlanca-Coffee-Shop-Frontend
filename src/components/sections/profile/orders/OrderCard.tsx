import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/formatPrice";
import { formatDateForUser } from "@/utils/formatDate";
import { ProfileOrder } from "@/types/order";

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
    </Card>
  );
}
