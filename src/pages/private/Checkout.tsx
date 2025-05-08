// src/pages/private/Checkout.tsx

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { getAddresses, addAddress } from "@/services/addressService";
import type { Address } from "@/types/user";
import CartSummary from "@/components/sections/cart/CartSummary";
import AddressSelector from "@/components/common/AddressSelector";
import { Loader2, MapPin, AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CheckoutProductItem from "@/components/sections/checkout/CheckoutProductItem";

export default function Checkout() {
  const { items, selectedItems } = useCartStore();
  const { user, token } = useAuthStore();

  const selectedProducts = items.filter((item) => selectedItems.has(item.id));
  const subtotal = selectedProducts.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  );

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(true);
  const [errorIntent, setErrorIntent] = useState<string | null>(null);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  useEffect(() => {
    if (!token) return;

    const loadAddresses = async () => {
      try {
        setLoadingAddresses(true);
        const data = await getAddresses();
        setAddresses(data);
        setSelectedAddress(data.find((a) => a.isDefault) || data[0] || null);
      } catch (err) {
        console.error("Error cargando direcciones", err);
      } finally {
        setLoadingAddresses(false);
      }
    };

    loadAddresses();
  }, [token]);

  useEffect(() => {
    if (!user || subtotal <= 0) return;

    const createPaymentIntent = async () => {
      try {
        setLoadingIntent(true);
        setErrorIntent(null);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/stripe/create-payment-intent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              user_id: user.id,
              amount: Math.round(subtotal * 100),
            }),
          }
        );
        const { client_secret } = await res.json();
        setClientSecret(client_secret);
      } catch (err) {
        console.error("Error creando paymentIntent", err);
        setErrorIntent(
          "No se pudo inicializar el pago. Por favor intenta nuevamente."
        );
      } finally {
        setLoadingIntent(false);
      }
    };

    createPaymentIntent();
  }, [subtotal, user, token]);

  const handleAddAddress = async (
    address: Omit<Address, "id" | "created_at" | "updated_at">
  ) => {
    try {
      const data = await addAddress(address);
      setAddresses(data);
      const defaultAddr = data.find((a) => a.isDefault) || data[0];
      setSelectedAddress(defaultAddr);
      return true;
    } catch (err) {
      console.error("Error guardando dirección", err);
      return false;
    }
  };

  const EmptyCart = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 space-y-4 text-center"
    >
      <MapPin className="w-12 h-12 text-muted-foreground" />
      <h2 className="text-2xl font-semibold tracking-tight">
        Tu carrito está vacío
      </h2>
      <p className="text-muted-foreground">
        Agrega productos para continuar con la compra
      </p>
      <Button className="mt-4">Explorar productos</Button>
    </motion.div>
  );

  const LoadingState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 space-y-4"
    >
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-lg font-medium">Preparando tu compra...</p>
    </motion.div>
  );

  const ErrorState = ({ message }: { message: string }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 space-y-4"
    >
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <Button
        variant="outline"
        onClick={() => window.location.reload()}
        className="mt-4"
      >
        Reintentar
      </Button>
    </motion.div>
  );

  if (selectedProducts.length === 0) return <EmptyCart />;
  if (loadingIntent || loadingAddresses) return <LoadingState />;
  if (errorIntent) return <ErrorState message={errorIntent} />;
  if (!clientSecret) return <LoadingState />;

  return (
    <main className="w-full min-h-screen px-4 py-8 bg-muted/40 md:py-12">
      <div className="max-w-screen-xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Finalizar compra
          </h1>
          <p className="text-muted-foreground">
            Revisa tu pedido y completa la información
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <AddressSelector
              addresses={addresses}
              selectedAddress={selectedAddress}
              onSelect={setSelectedAddress}
              onAddAddress={handleAddAddress}
            />

            <div className="space-y-4">
              {selectedProducts.map((item) => (
                <CheckoutProductItem key={item.id} {...item} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CartSummary
                shippingAddress={selectedAddress}
                disabled={!selectedAddress}
              />
            </Elements>
          </div>
        </div>
      </div>
    </main>
  );
}
