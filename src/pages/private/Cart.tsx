// src/pages/pivate/Cart.tsx
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import CartHeader from "@/components/sections/cart/CartHeader";
import CartList from "@/components/sections/cart/CartList";
import CartSummary from "@/components/sections/cart/CartSummary";
import EmptyCart from "@/components/sections/cart/EmptyCart";
import { useCartStore } from "@/store/cartStore";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY!);

const Cart = () => {
  const items = useCartStore((state) => state.items);

  // Debug: log items en esta página
  useEffect(() => {
    // console.log("📋 Items en Cart page:", items);
  }, [items]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="w-full min-h-screen px-4 py-16 bg-gray-50 md:py-24">
      <div className="max-w-screen-xl mx-auto space-y-8">
        <CartHeader itemCount={itemCount} />
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* LISTADO */}
          <div className="flex-1 p-6 bg-white rounded-lg shadow">
            <CartList />
          </div>
          {/* RESUMEN + PAGO */}
          <div className="lg:w-[28rem]">
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: Math.round(subtotal * 100), // en centavos
                currency: "usd",
              }}
            >
              <CartSummary subtotal={subtotal} />
            </Elements>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
