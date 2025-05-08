// src/components/sections/cart/OrderSummary.tsx
import { useCartStore } from "@/store/cartStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/formatPrice";

export default function OrderSummary() {
  const { items, selectedItems } = useCartStore();

  const selectedItemsList = items.filter((item) => selectedItems.has(item.id));

  const subtotal = selectedItemsList.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const totalQuantity = selectedItemsList.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const productTypes = selectedItemsList.length;

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Resumen del pedido</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Productos seleccionados</span>
          <span>
            {totalQuantity} {totalQuantity === 1 ? "pieza" : "piezas"} de{" "}
            {productTypes} {productTypes === 1 ? "producto" : "productos"}{" "}
            distintos
          </span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <Separator />

        <div className="flex justify-between text-base font-semibold text-gray-900">
          <span>Total a pagar</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
