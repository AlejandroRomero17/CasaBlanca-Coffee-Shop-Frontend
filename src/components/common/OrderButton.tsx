// src/components/common/OrderButton.tsx
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface OrderButtonProps {
  label?: string;
  icon?: boolean;
  onClick?: () => void;
}

const OrderButton: React.FC<OrderButtonProps> = ({
  label = "Order Now",
  icon = true,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      className="bg-gold hover:bg-gold-dark text-white font-semibold px-6 py-3 rounded-full transition"
    >
      {icon && <ShoppingCart size={18} className="mr-2" />}
      {label}
    </Button>
  );
};

export default OrderButton;
