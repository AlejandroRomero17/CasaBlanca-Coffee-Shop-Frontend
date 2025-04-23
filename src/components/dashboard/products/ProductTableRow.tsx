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
import { Coffee, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Product } from "@/types/product";

/**
 * Puede que aún no tengas la columna `stock` en tu tipo `Product`.
 * La extendemos aquí de forma opcional para evitar `any` y cumplir eslint.
 */
export interface ProductWithStock extends Product {
  stock?: number;
}

interface Props {
  product: ProductWithStock;
  onEdit: (id: string, data: Partial<Product>) => void;
  onDelete: (id: string) => void;
}

const ProductTableRow = ({ product, onEdit, onDelete }: Props) => {
  const stock = product.stock ?? 0; // si no existe, asumimos 0
  const status = !product.available
    ? "Sin stock"
    : stock < 20
    ? "Bajo stock"
    : "Disponible";

  const badgeVariant =
    status === "Disponible"
      ? "default"
      : status === "Bajo stock"
      ? "outline"
      : "destructive";

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-x-2">
          <Coffee className="w-4 h-4 text-muted-foreground" />
          {product.name}
        </div>
      </TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>${product.price.toFixed(2)}</TableCell>
      <TableCell>{stock}</TableCell>
      <TableCell>
        <Badge variant={badgeVariant}>{status}</Badge>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(product.id, {})}>
              <Edit className="w-4 h-4 mr-2" /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(product.id)}
            >
              <Trash className="w-4 h-4 mr-2" /> Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
