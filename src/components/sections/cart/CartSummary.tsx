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

interface CartSummaryProps {
  subtotal: number;
}

const CartSummary = ({ subtotal }: CartSummaryProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!stripe || !elements) return;

    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMsg(error.message ?? "Algo salió mal.");
    } else {
      setSuccess(true);
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
          <div className="p-4 bg-white border border-gray-200 rounded-xl">
            <PaymentElement />
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
