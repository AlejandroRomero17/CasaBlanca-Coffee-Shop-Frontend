import { useMemo, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import type { Address } from "@/types/user";
import { formatPrice } from "@/utils/formatPrice";
import { PaymentElement } from "@stripe/react-stripe-js";

interface CartSummaryProps {
  shippingAddress: Address | null;
  disabled?: boolean;
}

const CartSummary = ({ shippingAddress, disabled }: CartSummaryProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { token } = useAuthStore();
  const { getSelectedProducts, getSubtotal, clearCart } = useCartStore();

  const selectedProducts = useMemo(
    () => getSelectedProducts(),
    [getSelectedProducts]
  );
  const subtotal = useMemo(() => getSubtotal(), [getSubtotal]);

  const totalQuantity = useMemo(
    () => selectedProducts.reduce((sum, item) => sum + item.quantity, 0),
    [selectedProducts]
  );

  const productTypes = selectedProducts.length;

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!token) {
      toast.error("Debes iniciar sesión para poder pagar.");
      return;
    }

    if (!shippingAddress) {
      toast.error("Selecciona una dirección de envío antes de pagar.");
      return;
    }

    if (!stripe || !elements) {
      toast.error("El sistema de pago no está disponible.");
      return;
    }

    setLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.href },
        redirect: "if_required",
      });

      if (result.error) throw result.error;

      const paymentIntent = result.paymentIntent;
      if (!paymentIntent) throw new Error("No se recibió el PaymentIntent.");

      // Estructura de datos consistente
      const requestData = {
        payment_data: {
          stripe_payment_id: paymentIntent.id,
          amount: getSubtotal(), // Usar el subtotal directamente (ya en centavos)
          currency: paymentIntent.currency,
          payment_method: paymentIntent.payment_method_types?.[0] || "card",
          status: "succeeded",
        },
        order_data: {
          items: selectedProducts.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
            unit_price: item.price, // Usar el precio directamente (ya en centavos)
          })),
          shipping_address: {
            line1: shippingAddress.address_line1,
            line2: shippingAddress.address_line2 || "",
            city: shippingAddress.city,
            state: shippingAddress.state,
            postal_code: shippingAddress.postal_code,
            country: shippingAddress.country,
          },
          subtotal: getSubtotal(), // Usar el mismo monto en centavos
        },
      };

      console.log("Enviando datos al backend:", requestData);

      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/stripe/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!resp.ok) {
        const errorData = await resp.json();
        console.error("Error del backend:", errorData);
        throw new Error(errorData.error || "Error al registrar la orden");
      }

      const responseData = await resp.json();
      console.log("Respuesta del backend:", responseData);

      if (!responseData.success) {
        throw new Error("La respuesta del servidor no indica éxito");
      }

      toast.success("Pago completado y orden registrada 🎉");
      setSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Error en el pago:", error);
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      setErrorMsg(message);
      toast.error("Error en el pago", { description: message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="bg-white">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Resumen del pedido</CardTitle>
          <CardDescription>Verifica tus datos antes de pagar.</CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm text-gray-700">
            <span>
              Subtotal ({totalQuantity}{" "}
              {totalQuantity === 1 ? "pieza" : "piezas"} de {productTypes}{" "}
              {productTypes === 1 ? "producto" : "productos"} distintos)
            </span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between text-base font-semibold text-gray-900">
            <span>Total a pagar:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-xl">
            <PaymentElement />
          </div>

          {errorMsg && (
            <p className="p-2 text-sm text-red-600 rounded-md bg-red-50">
              {errorMsg}
            </p>
          )}
        </CardContent>

        <Separator />

        <CardFooter className="pt-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            <Button
              type="submit"
              disabled={
                !stripe ||
                loading ||
                success ||
                disabled ||
                selectedProducts.length === 0
              }
              size="lg"
              className="w-full"
            >
              {loading ? "Procesando..." : success ? "¡Listo!" : "Pagar"}
            </Button>
          </motion.div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CartSummary;
