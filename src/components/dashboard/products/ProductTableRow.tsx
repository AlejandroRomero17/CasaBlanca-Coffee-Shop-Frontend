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
import { Coffee, Edit, MoreHorizontal, Trash, AlertCircle } from "lucide-react";
import { Product } from "@/types/product";

interface ProductWithStock extends Product {
  stock?: number;
}

interface Props {
  product: ProductWithStock;
  onEdit: (id: string, data: Partial<Product>) => void;
  onDelete: (id: string) => void;
}

const ProductTableRow = ({ product, onEdit, onDelete }: Props) => {
  const stock = product.stock ?? 0;
  const status = !product.available
    ? "Sin stock"
    : stock < 20
    ? "Bajo stock"
    : "Disponible";

  // Colores sencillos para el badge
  const statusStyles = {
    Disponible: "bg-blue-100 text-blue-800",
    "Bajo stock": "bg-yellow-100 text-yellow-800",
    "Sin stock": "bg-red-100 text-red-800",
  } as const;

  return (
    <TableRow className="transition-colors hover:bg-gray-100">
      <TableCell className="px-4 py-2 text-sm text-black">
        <div className="flex items-center gap-2">
          <Coffee className="w-5 h-5 text-black" />
          {product.name}
        </div>
      </TableCell>
      <TableCell className="px-4 py-2 text-sm text-black">
        {product.category}
      </TableCell>
      <TableCell className="px-4 py-2 text-sm text-black">
        ${Number(product.price).toFixed(2)}
      </TableCell>
      <TableCell className="px-4 py-2 text-sm text-black">{stock}</TableCell>
      <TableCell className="px-4 py-2">
        <span
          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${statusStyles[status]}`}
        >
          {status === "Sin stock" && <AlertCircle className="w-4 h-4 mr-1" />}
          {status === "Bajo stock" && <AlertCircle className="w-4 h-4 mr-1" />}
          {status === "Disponible" && <span className="w-4 h-4 mr-1">✔️</span>}
          {status}
        </span>
      </TableCell>
      <TableCell className="px-4 py-2 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="text-black bg-white border border-gray-300 hover:bg-gray-50"
            >
              <MoreHorizontal className="w-4 h-4" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white border border-gray-200 shadow"
          >
            <DropdownMenuLabel className="px-3 py-1 text-sm text-black">
              Acciones
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onEdit(product)}
              className="flex items-center px-3 py-2 text-sm text-black hover:bg-gray-100"
            >
              <Edit className="w-4 h-4 mr-2" /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(product.id)}
              className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <Trash className="w-4 h-4 mr-2" /> Eliminar
              <Trash className="w-4 h-4 mr-2" /> Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
