// src/components/dashboard/products/ProductTable.tsx
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableHead as Th,
} from "@/components/ui/table";
import { Loader } from "lucide-react";
import { Product } from "@/types/product";
import ProductTableRow from "./ProductTableRow";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  isLoading,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[800px] w-full bg-white border border-gray-200 rounded-lg shadow">
        <TableHeader className="sticky top-0 bg-white">
          <TableRow className="border-b border-gray-200">
            <Th className="px-4 py-3 text-left">Nombre</Th>
            <Th className="px-4 py-3 text-left">Categoría</Th>
            <Th className="px-4 py-3 text-left">Precio</Th>
            <Th className="px-4 py-3 text-center">Stock</Th>
            <Th className="px-4 py-3 text-left">Estado</Th>
            <Th className="px-4 py-3 text-center">Featured</Th>
            <Th className="px-4 py-3 text-right">Acciones</Th>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="py-8 text-center">
                <Loader className="w-6 h-6 mx-auto animate-spin" />
                <p className="mt-2 text-gray-600">Cargando…</p>
              </TableCell>
            </TableRow>
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-8 italic text-center text-gray-600"
              >
                No hay productos registrados
              </TableCell>
            </TableRow>
          ) : (
            products.map((p) => (
              <ProductTableRow
                key={p.id}
                product={p}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
