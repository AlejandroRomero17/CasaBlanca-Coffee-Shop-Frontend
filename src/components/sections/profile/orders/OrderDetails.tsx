import { useState, useEffect } from "react";
import {
  ProfileOrder,
  OrderItem,
  ProductReference,
  ShippingAddress,
} from "@/types/order";
import { formatPrice } from "@/utils/formatPrice";
import { getProductsDetails } from "@/services/orderService";

// Verifica si el producto es un objeto completo
function isProductObject(
  product: string | ProductReference
): product is ProductReference {
  return typeof product !== "string" && "name" in product;
}

// Formatea la dirección para mostrarla como texto
function renderShippingAddress(
  address: string | ShippingAddress | null | undefined
) {
  if (!address) return "Sin dirección registrada";

  if (typeof address === "string") return address;

  const parts = [address.street, address.city, address.postal_code].filter(
    Boolean
  );
  return parts.length ? parts.join(", ") : "Dirección incompleta";
}

interface OrderDetailsProps {
  order: ProfileOrder & { items?: string[] | OrderItem[] };
}

export function OrderDetails({ order }: OrderDetailsProps) {
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    async function fetchDetails() {
      if (!order.items || typeof order.items[0] !== "string") {
        setItems(order.items as OrderItem[]);
        return;
      }

      // Si son strings, cargamos los productos desde el backend
      const detailed = await getProductsDetails(order.items as string[]);
      setItems(detailed);
    }

    fetchDetails();
  }, [order.items]);

  return (
    <div className="mt-4 pt-4 border-t border-[#f0e6db] space-y-4 text-sm">
      <div>
        <h4 className="mb-2 font-medium">Productos:</h4>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.quantity}x{" "}
                {isProductObject(item.product) ? item.product.name : "Producto"}
                {item.size && ` (${item.size})`}
              </span>
              <span>{formatPrice(item.quantity * item.price)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium">Enviado a:</h4>
        <p>{renderShippingAddress(order.shipping_address)}</p>
      </div>

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>{formatPrice(order.total)}</span>
      </div>
    </div>
  );
}
