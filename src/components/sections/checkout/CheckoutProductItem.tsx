// src/components/sections/checkout/CheckoutProductItem.tsx
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import { Button } from "@/components/ui/button";

interface Props {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export default function CheckoutProductItem({
  id,
  name,
  image,
  price,
  quantity,
}: Props) {
  const { updateQuantity } = useCartStore();

  const increment = () => updateQuantity(id, quantity + 1);
  const decrement = () => {
    if (quantity > 1) updateQuantity(id, quantity - 1);
  };

  return (
    <div className="flex items-center p-3 border rounded-lg">
      <div className="w-16 h-16 mr-4 overflow-hidden rounded-md">
        <img src={image} alt={name} className="object-cover w-full h-full" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-gray-600">{formatPrice(price)} c/u</p>
        <div className="flex items-center mt-1 space-x-2">
          <Button onClick={decrement} size="sm" variant="outline">
            –
          </Button>
          <span className="w-6 text-center">{quantity}</span>
          <Button onClick={increment} size="sm" variant="outline">
            +
          </Button>
        </div>
      </div>
      <div className="font-semibold">{formatPrice(price * quantity)}</div>
    </div>
  );
}
