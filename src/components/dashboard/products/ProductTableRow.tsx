// src/components/dashboard/products/ProductTableRow.tsx

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Coffee, Edit, MoreHorizontal, Trash, AlertCircle } from "lucide-react";
import { Product } from "@/types/product";

// Extendemos Product para incluir stock opcional sin usar `any`
interface ProductWithStock extends Product {
  stock?: number;
}

interface Props {
  product: ProductWithStock;
  onEdit: (product: ProductWithStock) => void;
  onDelete: (id: string) => void;
}

const ProductTableRow = ({ product, onEdit, onDelete }: Props) => {
  // Ahora stock viene tipado correctamente
  const stock = product.stock ?? 0;
  const status = !product.available
    ? "Sin stock"
    : stock < 20
    ? "Bajo stock"
    : "Disponible";

  const variant =
    status === "Disponible"
      ? "default"
      : status === "Bajo stock"
      ? "outline"
      : "destructive";

  return (
    <TableRow className="transition-all hover:bg-muted/10">
      <TableCell className="px-3 py-4 text-sm font-medium text-muted-foreground">
        <div className="flex items-center gap-x-2">
          <Coffee className="w-5 h-5 text-muted-foreground" />
          {product.name}
        </div>
      </TableCell>
      <TableCell className="px-3 py-4 text-sm text-muted-foreground">
        {product.category}
      </TableCell>
      <TableCell className="px-3 py-4 text-sm text-muted-foreground">
        ${Number(product.price).toFixed(2)}
      </TableCell>
      <TableCell className="px-3 py-4 text-sm text-muted-foreground">
        {stock}
      </TableCell>
      <TableCell className="px-3 py-4">
        <Badge variant={variant} className="px-3 py-1 text-xs w-fit">
          {status === "Sin stock" ? (
            <AlertCircle className="w-3 h-3 text-red-500" />
          ) : status === "Bajo stock" ? (
            <AlertCircle className="w-3 h-3 text-yellow-500" />
          ) : (
            <span className="w-3 h-3 text-green-500">✔️</span>
          )}
          {status}
        </Badge>
      </TableCell>
      <TableCell className="px-3 py-4 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-controls={`menu-${product.id}`}
            >
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            aria-labelledby={`menu-${product.id}`}
          >
            <DropdownMenuLabel className="text-sm">Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onEdit(product)}
              className="transition-all rounded-md hover:bg-muted/50"
            >
              <Edit className="w-4 h-4 mr-2 text-muted-foreground" /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(product.id)}
              className="transition-all rounded-md text-destructive hover:bg-muted/50"
            >
              <Trash className="w-4 h-4 mr-2 text-muted-foreground" /> Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
