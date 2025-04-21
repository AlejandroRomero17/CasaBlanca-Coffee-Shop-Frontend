import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface CartItemProps {
  image: string;
  title: string;
  price: number;
  quantity: number;
  onRemove: () => void;
  onQuantityChange: (newQty: number) => void;
}

const CartItem = ({
  image,
  title,
  price,
  quantity,
  onRemove,
  onQuantityChange,
}: CartItemProps) => {
  const [custom, setCustom] = useState(quantity > 6);
  const [inputQty, setInputQty] = useState(quantity);

 
  useEffect(() => {
    setInputQty(quantity);
    setCustom(quantity > 6);
  }, [quantity]);

  const onSelect = (val: string) => {
    if (val === "more") {
      setCustom(true);
    } else {
      onQuantityChange(parseInt(val, 10));
      setCustom(false);
    }
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value, 10);
    setInputQty(v);
    if (v > 0) onQuantityChange(v);
  };

  
  useEffect(() => {
    console.log("[DEBUG CartItem props]", { quantity, onRemove, onQuantityChange });
  }, [quantity, onRemove, onQuantityChange]);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center"
    >
      {/* IMAGEN */}
      <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-100 rounded-md">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>

      {/* INFO */}
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-gray-900 line-clamp-2">{title}</h4>
        <div className="flex flex-wrap items-center gap-4">
          {!custom ? (
            <Select value={String(quantity)} onValueChange={onSelect}>
              <SelectTrigger className="h-8 text-sm bg-white border border-gray-300 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-primary-300">
                <SelectValue placeholder={String(quantity)} />
              </SelectTrigger>
              <SelectContent className="overflow-auto bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-gray-300">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <SelectItem
                    key={n}
                    value={n.toString()}
                    className="hover:bg-gray-100"
                  >
                    {n}
                  </SelectItem>
                ))}
                <SelectItem value="more" className="hover:bg-gray-100">
                  6+
                </SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input
              type="number"
              min={7}
              value={inputQty}
              onChange={onInput}
              className="w-20 h-8 text-sm bg-white border border-gray-300 rounded-md"
            />
          )}
          <span className="text-sm text-gray-600">${price.toFixed(2)} c/u</span>
        </div>
      </div>

      {/* ACCIONES */}
      <div className="flex flex-col items-end gap-2">
        <span className="font-semibold text-gray-900">
          ${(price * quantity).toFixed(2)}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-600 hover:bg-red-50"
          onClick={onRemove}
          aria-label={`Eliminar ${title}`}
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </motion.li>
  );
};

export default CartItem;
