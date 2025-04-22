import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [dialogOpen, setDialogOpen] = useState(false);

  const onSelect = (val: string) => {
    if (val === "more") {
      setDialogOpen(true);
    } else {
      const newQty = parseInt(val, 10);
      onQuantityChange(newQty);
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
      onQuantityChange(inputQty);
      setCustom(true);
      setDialogOpen(false);
    }
  };

  const handleSwitchToNormal = () => {
    setCustom(false);
    onQuantityChange(6);
    setInputQty(6);
  };

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
            <>
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

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-xl">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-gray-900">
                      Cantidad para {title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 space-y-4">
                    <div>
                      <Input
                        type="number"
                        min="7"
                        value={inputQty}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-base border-gray-300 focus-visible:ring-2 focus-visible:ring-primary"
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
                        className="border-gray-300 hover:bg-gray-50"
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleConfirmQuantity}
                        disabled={inputQty < 7}
                        className="bg-primary hover:bg-primary-dark"
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
                  if (value > 0) onQuantityChange(value);
                }}
                className="w-20 h-8 text-sm bg-white border border-gray-300 rounded-md"
              />
              {inputQty <= 6 && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={handleSwitchToNormal}
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  Usar selector normal
                </Button>
              )}
            </div>
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
