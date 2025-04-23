import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProductSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const ProductSearchBar = ({
  searchTerm,
  onSearchChange,
}: ProductSearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar productos..."
        className="pl-8 w-[250px]"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default ProductSearchBar;
