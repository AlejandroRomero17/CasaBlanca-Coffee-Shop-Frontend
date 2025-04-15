// src/components/sections/products/ProductFilterBar.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

const ProductFilterBar = () => {
  const [query, setQuery] = useState("");

  return (
    <section className="bg-[#fdfaf4] px-6 md:px-20 py-6 shadow-inner border-t border-b border-[#e0dcd5]">
      <div className="flex flex-col max-w-6xl gap-4 mx-auto md:flex-row md:items-center md:justify-between">
        {/* Búsqueda */}
        <div className="flex items-center w-full gap-2 md:w-1/2">
          <Search className="w-5 h-5 text-coffee-dark/60" />
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white border border-[#ddd3c1] focus:ring-[#c58c5c] rounded-full px-4 py-2 text-sm"
          />
        </div>

        {/* Filtros y ordenamiento */}
        <div className="flex flex-wrap justify-end gap-3">
          <Button
            variant="outline"
            className="border-[#b59f84] text-[#3B2F2F] hover:bg-[#f4e8d7] rounded-full text-sm"
          >
            Categoría <ChevronDown size={16} className="ml-1" />
          </Button>
          <Button
            variant="outline"
            className="border-[#b59f84] text-[#3B2F2F] hover:bg-[#f4e8d7] rounded-full text-sm"
          >
            Precio <ChevronDown size={16} className="ml-1" />
          </Button>
          <Button
            variant="outline"
            className="border-[#b59f84] text-[#3B2F2F] hover:bg-[#f4e8d7] rounded-full text-sm"
          >
            Más recientes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductFilterBar;
