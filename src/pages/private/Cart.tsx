import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CartHeader from "@/components/sections/cart/CartHeader";
import CartList from "@/components/sections/cart/CartList";
import CartSummary from "@/components/sections/cart/CartSummary";
import EmptyCart from "@/components/sections/cart/EmptyCart";
import { useCartStore } from "@/store/cartStore";
import { stripePromise } from "@/lib/stripe";
import { useAuthStore } from "@/store/authStore";
import API from "@/services/api";

const Cart = () => {
  const { items } = useCartStore();
  const { user } = useAuthStore();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  useEffect(() => {
    if (!user) return;

    const createIntent = async () => {
      try {
        setLoading(true);
        const res = await API.post("/stripe/create-payment-intent", {
          user_id: user.id,
          amount: Math.round(subtotal * 100), // centavos
        });
        setClientSecret(res.data.client_secret);
      } catch (err: any) {
        console.error("Error al crear PaymentIntent:", err);
        setError("No se pudo inicializar el pago.");
      } finally {
        setLoading(false);
      }
    };

    createIntent();
  }, [subtotal, user]);

  if (items.length === 0) return <EmptyCart />;
  if (loading) return <div className="text-center">Inicializando pago...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!clientSecret) return null;

  return (
    <main className="w-full min-h-screen px-4 py-16 bg-gray-50 md:py-24">
      <div className="max-w-screen-xl mx-auto space-y-8">
        <CartHeader itemCount={items.length} />
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 p-6 bg-white rounded-lg shadow">
            <CartList />
          </div>
          <div className="lg:w-[28rem]">
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CartSummary subtotal={subtotal} />
            </Elements>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
