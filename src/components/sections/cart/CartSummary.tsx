// src/components/sections/cart/CartSummary.tsx
import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
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

// Usa la URL absoluta del backend para las peticiones
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";
const PAYMENT_INTENT_URL = `${API_URL}/api/stripe/create-payment-intent`;
const CHECKOUT_URL = `${API_URL}/api/stripe/checkout`;

interface CartSummaryProps {
  subtotal: number;
}

const CartSummary = ({ subtotal }: CartSummaryProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!stripe || !elements) return;
    setLoading(true);

    // 1. Submit the PaymentElement first (required for deferred flows)
    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMsg(
          typeof submitError === "string"
            ? submitError
            : submitError.message || "Error al enviar los datos de pago."
        );
        setLoading(false);
        return;
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error al enviar los datos de pago.");
      setLoading(false);
      return;
    }

    try {
      // 2. Llama a tu backend para obtener el client_secret
      const res = await fetch(PAYMENT_INTENT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(subtotal * 100), // en centavos
          currency: "mxn",
          user_id: user?.id || "guest"
        }),
      });
      // Manejo robusto de respuesta (puede no ser JSON)
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Respuesta del servidor no es JSON: " + text);
      }
      if (!res.ok || !data.client_secret) {
        throw new Error(data.error || data.message || "No se pudo crear el pago");
      }
      const clientSecret = data.client_secret;

      // 3. Confirma el pago con Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: window.location.origin + "/pago-exitoso"
        },
        redirect: "if_required",
      });
      if (error) {
        setErrorMsg(error.message || "Error al procesar el pago");
        setLoading(false);
        return;
      }
      setSuccess(true);

      // 4. Llama a tu backend para registrar la orden y el pago en Supabase
      // Aquí deberías obtener los datos reales del carrito, dirección, etc.
      // Puedes obtenerlos de props/context/servicio según tu arquitectura
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const shippingAddress = localStorage.getItem("shipping_address") || "";
      await fetch(CHECKOUT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Enviar token JWT
        },
        body: JSON.stringify({
          cart: cart.map((item: any) => ({
            productId: item.product_id,
            quantity: item.quantity,
            price: item.product_price,
          })),
          shippingAddress,
          // Solución TS: casteo a any para acceder a propiedades extra
          ...(() => {
            const pi = paymentIntent as any;
            return {
              paymentMethod: pi?.payment_method_types?.[0] || "card",
              stripePaymentId: pi?.id,
              amount: pi?.amount_received ? pi.amount_received / 100 : subtotal,
              currency: pi?.currency,
              receiptUrl: pi?.charges?.data?.[0]?.receipt_url || null,
              stripeEventData: paymentIntent,
            };
          })(),
        }),
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Error de conexión con el servidor");
    }
    setLoading(false);
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
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold text-gray-900">
            <span>Total a pagar:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {/* Aquí Stripe inyecta los iconos de Visa, AmEx, etc. */}
          <div className="p-4 bg-white border border-gray-200 rounded-xl min-h-[140px]">
            <PaymentElement options={{ layout: 'tabs' }} />
          </div>

          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
          {success && (
            <p className="text-sm text-green-600">
              Pago completado con éxito 🎉
            </p>
          )}
        </CardContent>

        <Separator />

        <CardFooter className="pt-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={!stripe || loading || success}
              size="lg"
              className="w-full"
            >
              {loading
                ? "Procesando..."
                : success
                ? "¡Listo!"
                : "Pagar con tarjeta"}
            </Button>
          </motion.div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CartSummary;