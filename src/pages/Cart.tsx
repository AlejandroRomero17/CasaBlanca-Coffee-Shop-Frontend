// src/pages/Cart.tsx
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CartHeader from "@/components/sections/cart/CartHeader";
import CartList, { CartItemType } from "@/components/sections/cart/CartList";
import CartSummary from "@/components/sections/cart/CartSummary";
import EmptyCart from "@/components/sections/cart/EmptyCart";
import { fetchCart } from "@/services/cartService";
import { useCart } from "@/context/CartContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY!);

const Cart = () => {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshCart } = useCart();

  useEffect(() => {
    const session_id = localStorage.getItem("session_id");
    if (!session_id) return;
    fetchCart(session_id).then((data) => {
     
      setItems(
        data.map((item: any) => ({
          id_cart_temp: item.id_cart_temp,
          product_id: item.product_id,
          product_name: item.product_name,
          product_image: item.product_image || "https://via.placeholder.com/120",
          product_price: Number(item.product_price),
          quantity: item.quantity,
        }))
      );
      setLoading(false);
    });
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + (Number(i.quantity) || 0) * (Number(i.product_price) || 0),
    0
  );
 
  console.log("[DEBUG subtotal]", subtotal, items);

  if (loading) {
    return <div>Cargando carrito...</div>;
  }

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
            <CartList
              items={items}
              onUpdate={setItems}
              refreshCart={refreshCart}
            />
          </div>

          {/* RESUMEN + FORMULARIO DE PAGO */}
          <div className="lg:w-[28rem]">
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: !isNaN(subtotal) && subtotal > 0 ? Math.round(subtotal * 100) : 1, // nunca NaN ni 0
                currency: "usd", // ajusta según tu demoninación
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
