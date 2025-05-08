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
      toast.error("Debes iniciar sesión para poder pagar.", {
        description: "Te llevaremos a la página de inicio de sesión.",
      });
      return;
    }

    if (!shippingAddress) {
      setErrorMsg("Selecciona una dirección de envío antes de pagar.");
      toast.error("Selecciona una dirección de envío antes de pagar.");
      return;
    }

    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.href },
        redirect: "if_required",
      });

      if (result.error) throw result.error;

      const pi = result.paymentIntent;
      if (!pi) throw new Error("No se recibió el PaymentIntent.");

      const shippingStr = `${shippingAddress.address_line1}${
        shippingAddress.address_line2
          ? `, ${shippingAddress.address_line2}`
          : ""
      }, ${shippingAddress.city}, ${shippingAddress.state}, ${
        shippingAddress.postal_code
      }, ${shippingAddress.country}`;

      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/stripe/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cart: selectedProducts.map((i) => ({
              product_id: i.id,
              quantity: i.quantity,
              price: i.price,
            })),
            shippingAddress: shippingStr,
            paymentMethod: pi.payment_method_types?.[0] ?? "tarjeta",
            stripePaymentId: pi.id,
            amount: pi.amount,
            currency: pi.currency,
            receiptUrl: "",
            stripeEventData: pi,
          }),
        }
      );

      if (!resp.ok) throw new Error("Error al registrar la orden");

      toast.success("Pago completado y orden registrada 🎉");
      setSuccess(true);
      clearCart();
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Ocurrió un error inesperado";
      setErrorMsg(message);
      toast.error("Error en el pago", {
        description: message,
      });
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
