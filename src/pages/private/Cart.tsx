// src/pages/private/Cart.tsx
import { useNavigate } from "react-router-dom";
import CartHeader from "@/components/sections/cart/CartHeader";
import CartList from "@/components/sections/cart/CartList";
import EmptyCart from "@/components/sections/cart/EmptyCart";
import OrderSummary from "@/components/sections/cart/OrderSummary";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const { items, selectedItems } = useCartStore();
  const navigate = useNavigate();

  const canCheckout = selectedItems.size > 0;

  if (items.length === 0) return <EmptyCart />;

  return (
    <main className="w-full min-h-screen px-4 py-16 bg-gray-50 md:py-24">
      <div className="max-w-screen-xl mx-auto space-y-8">
        <CartHeader itemCount={items.length} />

        <div className="p-6 space-y-6 bg-white rounded-lg shadow">
          <CartList />

          <OrderSummary />

          <div className="flex justify-end">
            <Button
              onClick={() => navigate("/checkout")}
              disabled={!canCheckout}
            >
              Proceder al pago ({selectedItems.size})
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
