// src/components/sections/cart/CartSummary.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
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

interface CartSummaryProps {
  subtotal: number;
}

const CartSummary = ({ subtotal }: CartSummaryProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { token, user } = useAuthStore();
  const { items, clearCart } = useCartStore();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!token) {
      toast.error("Debes iniciar sesión para poder pagar.", {
        description: "Te llevaremos a la página de inicio de sesión.",
        duration: 6000,
      });
      navigate("/login");
      return;
    }

    if (!stripe || !elements) return;

    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (result.error) {
      console.error("STRIPE ERROR:", result.error);
      setErrorMsg(result.error.message ?? "Algo salió mal.");
      toast.error("Error procesando el pago", {
        description: result.error.message ?? "Intenta de nuevo más tarde.",
        duration: 6000,
      });
      setLoading(false);
      return;
    }

    const paymentIntent = result.paymentIntent;
    if (!paymentIntent) {
      toast.error("No se recibió el PaymentIntent.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/stripe/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cart: items.map((item) => ({
              product_id: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
            shippingAddress: "No proporcionado",
            paymentMethod: paymentIntent.payment_method_types?.[0] ?? "card",
            stripePaymentId: paymentIntent.id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            receiptUrl: "", // Este campo solo lo da Stripe en el webhook
            stripeEventData: paymentIntent,
          }),
        }
      );

      if (!response.ok) throw new Error("Error al registrar la orden");

      toast.success("Pago completado y orden registrada 🎉", {
        duration: 6000,
      });
      setSuccess(true);
      clearCart();
      navigate("/profile");
    } catch (err) {
      console.error("Error registrando orden:", err);
      toast.error("Pago procesado, pero hubo un error al registrar la orden.");
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
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold text-gray-900">
            <span>Total a pagar:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-xl">
            <PaymentElement />
          </div>

          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
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
