// src/components/sections/cart/CartList.tsx
import { useCartStore } from "@/store/cartStore";
import CartItem from "./CartItem";
import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";

const CartList = () => {
  const {
    items,
    selectedItems,
    toggleItemSelection,
    toggleAllItems,
    removeItem,
    updateQuantity,
  } = useCartStore();

  const allSelected = items.length > 0 && selectedItems.size === items.length;

  if (items.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        Tu carrito está vacío
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Cabecera con selección múltiple */}
      <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={allSelected}
            onCheckedChange={() => toggleAllItems(!allSelected)}
          />
          <label htmlFor="select-all" className="text-sm font-medium">
            {allSelected ? "Deseleccionar todos" : "Seleccionar todos"}
          </label>
        </div>
        <span className="text-sm text-gray-500">
          {selectedItems.size} de {items.length} seleccionados
        </span>
      </div>

      {/* Lista de productos */}
      <ul className="space-y-4">
        {items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.name}
            price={item.price}
            quantity={item.quantity}
            selected={selectedItems.has(item.id)}
            onToggleSelect={() => toggleItemSelection(item.id)}
            onRemove={() => removeItem(item.id)}
            onQuantityChange={(q) => updateQuantity(item.id, q)}
          />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
