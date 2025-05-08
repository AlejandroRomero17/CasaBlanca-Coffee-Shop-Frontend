import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
  selected: boolean;
  onToggleSelect: () => void;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void; 
}


const CartItem = ({
  id,
  image,
  title,
  price,
  quantity,
  selected,
}: CartItemProps) => {
  const [custom, setCustom] = useState(quantity > 6);
  const [inputQty, setInputQty] = useState(quantity);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { toggleItemSelection, updateQuantity, removeItem } = useCartStore();

  const onSelect = (val: string) => {
    if (val === "more") {
      setDialogOpen(true);
    } else {
      const newQty = parseInt(val, 10);
      updateQuantity(id, newQty);
      setInputQty(newQty);
      setCustom(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setInputQty(value);
  };

  const handleConfirmQuantity = () => {
    if (inputQty > 6) {
      updateQuantity(id, inputQty);
      setCustom(true);
      setDialogOpen(false);
    }
  };

  const handleSwitchToNormal = () => {
    setCustom(false);
    updateQuantity(id, 6);
    setInputQty(6);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3 }}
      className={`bg-white border rounded-lg shadow-sm hover:shadow-md transition p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center ${
        !selected ? "opacity-70" : ""
      }`}
    >
      {/* Checkbox de selección */}
      <div className="flex items-center">
        <Checkbox
          id={`select-${id}`}
          checked={selected}
          onCheckedChange={() => toggleItemSelection(id)}
          className="w-5 h-5"
        />
      </div>

      {/* Contenido del producto */}
      <div className="flex gap-4">
        {/* Imagen */}
        <div className="relative w-24 h-24 overflow-hidden bg-white border border-gray-200 rounded-md">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 gap-2">
          <h4 className="font-semibold text-gray-900 line-clamp-2">{title}</h4>
          <div className="flex flex-wrap items-center gap-4">
            {!custom ? (
              <>
                <Select value={String(quantity)} onValueChange={onSelect}>
                  <SelectTrigger className="h-8 text-sm bg-white border border-gray-300 rounded-md">
                    <SelectValue placeholder={String(quantity)} />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n}
                      </SelectItem>
                    ))}
                    <SelectItem value="more">6+</SelectItem>
                  </SelectContent>
                </Select>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogContent className="w-full max-w-md p-6">
                    <DialogHeader>
                      <DialogTitle>Cantidad para {title}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      <div>
                        <Input
                          type="number"
                          min="7"
                          value={inputQty}
                          onChange={handleInputChange}
                          autoFocus
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          Ingresa la cantidad deseada (mínimo 7 unidades)
                        </p>
                      </div>
                      <div className="flex justify-end pt-2 space-x-3">
                        <Button
                          variant="outline"
                          onClick={() => setDialogOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleConfirmQuantity}
                          disabled={inputQty < 7}
                        >
                          Confirmar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  value={inputQty}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10) || 0;
                    setInputQty(value);
                    if (value > 0) updateQuantity(id, value);
                  }}
                  className="w-20 h-8 text-sm"
                />
                {inputQty <= 6 && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={handleSwitchToNormal}
                  >
                    Usar selector normal
                  </Button>
                )}
              </div>
            )}
            <span className="text-sm text-gray-600">
              {formatPrice(price)} c/u
            </span>
          </div>
        </div>
      </div>

      {/* Precio total y acciones */}
      <div className="flex flex-col items-end gap-2">
        <span className="font-semibold text-gray-900">
          {formatPrice(price * quantity)}
        </span>
        <Button variant="ghost" size="icon" onClick={() => removeItem(id)}>
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </motion.li>
  );
};

export default CartItem;
