  // src/components/sections/products/ProductFilterBar.tsx
  import { useState } from "react";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select";
  import { ChevronDown, Search, X } from "lucide-react";

  const categoryLabels: Record<string, string> = {
    cafe: "Café en grano",
    tes: "Tés exóticos",
    postres: "Postres",
    desayunos: "Desayunos",
    merch: "Merchandising",
  };

  const ProductFilterBar = () => {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const [priceOrder, setPriceOrder] = useState("");

    const clearAll = () => {
      setQuery("");
      setCategory("");
      setPriceOrder("");
    };

    return (
      <section className="bg-[#fdfaf4] px-6 md:px-20 py-6 shadow-inner border-t border-b border-[#e0dcd5]">
        <div className="flex flex-col max-w-6xl gap-4 mx-auto md:flex-row md:items-center md:justify-between">
          {/* Búsqueda */}
          <div className="flex items-center w-full gap-2 md:w-1/2">
            <Search className="w-5 h-5 text-coffee-dark/60" aria-hidden="true" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-white border border-[#ddd3c1] focus:ring-[#c58c5c] rounded-full px-4 py-2 text-sm"
              aria-label="Buscar productos"
            />
          </div>

          {/* Filtros y ordenamiento */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Categoría */}
            <Select value={category} onValueChange={setCategory} defaultValue="">
              <SelectTrigger className="inline-flex items-center border border-[#b59f84] text-[#3B2F2F] hover:bg-[#f4e8d7] rounded-full text-sm px-4 py-2">
                <SelectValue placeholder="Categoría" />
                <ChevronDown size={16} className="ml-2" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-md shadow-lg border border-[#ddd3c1]">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    className="text-[#3B2F2F] hover:bg-[#f4e8d7] focus:bg-[#f4e8d7]"
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Precio */}
            <Select
              value={priceOrder}
              onValueChange={setPriceOrder}
              defaultValue=""
            >
              <SelectTrigger className="inline-flex items-center border border-[#b59f84] text-[#3B2F2F] hover:bg-[#f4e8d7] rounded-full text-sm px-4 py-2">
                <SelectValue placeholder="Precio" />
                <ChevronDown size={16} className="ml-2" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-md shadow-lg border border-[#ddd3c1]">
                <SelectItem
                  value="asc"
                  className="text-[#3B2F2F] hover:bg-[#f4e8d7] focus:bg-[#f4e8d7]"
                >
                  Menor precio
                </SelectItem>
                <SelectItem
                  value="desc"
                  className="text-[#3B2F2F] hover:bg-[#f4e8d7] focus:bg-[#f4e8d7]"
                >
                  Mayor precio
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Más recientes */}
            <Button
              variant="outline"
              className="border-[#b59f84] text-[#3B2F2F] hover:bg-[#f4e8d7] rounded-full text-sm px-4 py-2"
            >
              Más recientes
            </Button>
          </div>
        </div>

        {/* Filter chips */}
        {(query || category || priceOrder) && (
          <div className="flex flex-wrap items-center max-w-6xl gap-2 px-6 mx-auto mt-4 md:px-20">
            {query && (
              <span className="inline-flex items-center bg-[#c58c5c]/20 text-[#3B2F2F] px-3 py-1 rounded-full text-sm">
                <span className="max-w-xs truncate">"{query}"</span>
                <X
                  className="w-4 h-4 ml-1 cursor-pointer text-[#3B2F2F] hover:text-[#b2594a]"
                  onClick={() => setQuery("")}
                  aria-label="Eliminar búsqueda"
                />
              </span>
            )}
            {category && (
              <span className="inline-flex items-center bg-[#c58c5c]/20 text-[#3B2F2F] px-3 py-1 rounded-full text-sm">
                {categoryLabels[category]}
                <X
                  className="w-4 h-4 ml-1 cursor-pointer text-[#3B2F2F] hover:text-[#b2594a]"
                  onClick={() => setCategory("")}
                  aria-label="Eliminar categoría"
                />
              </span>
            )}
            {priceOrder && (
              <span className="inline-flex items-center bg-[#c58c5c]/20 text-[#3B2F2F] px-3 py-1 rounded-full text-sm">
                {priceOrder === "asc" ? "Menor precio" : "Mayor precio"}
                <X
                  className="w-4 h-4 ml-1 cursor-pointer text-[#3B2F2F] hover:text-[#b2594a]"
                  onClick={() => setPriceOrder("")}
                  aria-label="Eliminar orden de precio"
                />
              </span>
            )}
            <Button
              variant="ghost"
              className="text-[#3B2F2F] hover:bg-[#f4e8d7] text-sm"
              onClick={clearAll}
            >
              Limpiar todos
            </Button>
          </div>
        )}
      </section>
    );
  };

  export default ProductFilterBar;
