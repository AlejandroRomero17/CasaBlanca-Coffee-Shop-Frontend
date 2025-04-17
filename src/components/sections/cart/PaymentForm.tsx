import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: "#A4471C",
      color: "#1f1f1f",
      fontWeight: "500",
      fontSize: "16px",
      fontFamily: "Outfit, sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": { color: "#a0aec0" },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!stripe || !elements) return;
    setLoading(true);

    const card = elements.getElement(CardElement);
    if (!card) return;

    const result = await stripe.createToken(card);
    if (result.error) {
      setError(result.error.message || "Error en el pago");
    } else {
      setSuccess(true);
      console.log("Token generado:", result.token);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <CardElement options={CARD_OPTIONS} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && (
        <p className="text-sm text-green-600">Pago simulado exitosamente 🎉</p>
      )}

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[#A4471C] hover:bg-[#833614] text-white py-3 rounded-full"
      >
        {loading ? "Procesando..." : "Confirmar pago"}
      </Button>
    </form>
  );
};

export default PaymentForm;
