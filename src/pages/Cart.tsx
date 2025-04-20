// src/pages/Cart.tsx
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CartHeader from "@/components/sections/cart/CartHeader";
import CartList, { CartItemType } from "@/components/sections/cart/CartList";
import CartSummary from "@/components/sections/cart/CartSummary";
import EmptyCart from "@/components/sections/cart/EmptyCart";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY!);

const Cart = () => {
  const [items, setItems] = useState<CartItemType[]>([
    {
      id: 1,
      name: "Café Etiopía",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPb_SE9SxxHNnSUgb694JsSaIqQnZGlpUW6A&s",
      quantity: 2,
      price: 189,
    },
    {
      id: 2,
      name: "Té Oolong Premium",
      image:
        "https://e00-telva.uecdn.es/assets/multimedia/imagenes/2022/12/14/16710170883286.jpg",
      quantity: 1,
      price: 159,
    },
  ]);

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
            <CartList items={items} onUpdate={setItems} />
          </div>

          {/* RESUMEN + FORMULARIO DE PAGO */}
          <div className="lg:w-[28rem]">
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: Math.round(subtotal * 100), // en céntimos
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
