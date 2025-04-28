// src/pages/Cart.tsx
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CartHeader from "@/components/sections/cart/CartHeader";
import CartList, { CartItemType } from "@/components/sections/cart/CartList";
import CartSummary from "@/components/sections/cart/CartSummary";
import EmptyCart from "@/components/sections/cart/EmptyCart";
import { useCart } from "@/context/CartContext";
import { useAuthStore } from "@/store/authStore";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY!);

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const { items, refreshCart } = useCart();
  const { user } = useAuthStore();

  // Debug: log items en esta página
  useEffect(() => {
    // console.log("📋 Items en Cart page:", items);
  }, [items]);

  if (loading) {
    return <div>Cargando carrito...</div>;
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-[#f9e8d9] to-[#fcefe2]">
      <CartHeader itemCount={itemCount} />
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="flex-1">
          <CartList items={items} onUpdate={() => {}} refreshCart={refreshCart} />
        </div>
        <div className="lg:w-[28rem]">
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: !isNaN(subtotal) && subtotal > 0 ? Math.round(subtotal * 100) : 1,
              currency: "mxn",
            }}
          >
            <CartSummary subtotal={subtotal} />
          </Elements>
        </div>
      </div>
    </main>
  );
};

export default Cart;