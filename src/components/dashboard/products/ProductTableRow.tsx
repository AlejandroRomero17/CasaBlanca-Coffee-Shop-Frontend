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
import { Coffee, Edit, MoreHorizontal, Trash, AlertCircle } from "lucide-react";
import { Product } from "@/types/product";

interface Props {
  product: Product & { stock?: number };
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductTableRow({ product, onEdit, onDelete }: Props) {
  const stock = product.stock ?? 0;
  const status = !product.available
    ? "Sin stock"
    : stock < 20
    ? "Bajo stock"
    : "Disponible";

  const statusStyles = {
    Disponible: "bg-blue-100 text-blue-800",
    "Bajo stock": "bg-yellow-100 text-yellow-800",
    "Sin stock": "bg-red-100 text-red-800",
  } as const;

  return (
    <TableRow className="hover:bg-gray-50">
      {/* Nombre */}
      <TableCell className="px-4 py-2">
        <div className="flex items-center gap-2">
          <Coffee className="w-5 h-5 text-black" />
          {product.name}
        </div>
      </TableCell>

      {/* Categoría */}
      <TableCell className="px-4 py-2">{product.category}</TableCell>

      {/* Precio */}
      <TableCell className="px-4 py-2">
        ${Number(product.price).toFixed(2)}
      </TableCell>

      {/* Stock */}
      <TableCell className="px-4 py-2 text-center">{stock}</TableCell>

      {/* Estado */}
      <TableCell className="px-4 py-2">
        <span
          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${statusStyles[status]}`}
        >
          {status !== "Disponible" && <AlertCircle className="w-4 h-4 mr-1" />}
          {status === "Disponible" && <span className="w-4 h-4 mr-1">✔️</span>}
          {status}
        </span>
      </TableCell>

      {/* Featured: solo Sí/No */}
      <TableCell className="px-4 py-2 text-center">
        {product.featured ? "Sí" : "No"}
      </TableCell>

      {/* Acciones */}
      <TableCell className="px-4 py-2 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="w-4 h-4" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={4}
            className="bg-white border border-gray-200 shadow-lg"
          >
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onEdit(product)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
            >
              <Edit className="w-4 h-4" /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(product.id)}
              className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50"
            >
              <Trash className="w-4 h-4" /> Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
