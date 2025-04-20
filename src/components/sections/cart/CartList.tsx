import CartItem from "./CartItem";

export type CartItemType = {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
};

interface CartListProps {
  items: CartItemType[];
  onUpdate: (items: CartItemType[]) => void;
}

const CartList = ({ items, onUpdate }: CartListProps) => {
  const handleRemove = (id: number) =>
    onUpdate(items.filter((x) => x.id !== id));
  const handleQty = (id: number, qty: number) =>
    onUpdate(items.map((x) => (x.id === id ? { ...x, quantity: qty } : x)));

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.id}
          image={item.image}
          title={item.name}
          price={item.price}
          quantity={item.quantity}
          onRemove={() => handleRemove(item.id)}
          onQuantityChange={(q) => handleQty(item.id, q)}
        />
      ))}
    </ul>
  );
};

export default CartList;
