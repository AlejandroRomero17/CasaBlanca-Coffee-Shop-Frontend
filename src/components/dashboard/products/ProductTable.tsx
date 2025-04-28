// src/components/dashboard/products/ProductTable.tsx
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
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

const ProductTable = ({ products, onEdit, onDelete, isLoading }: Props) => (
  <div className="overflow-x-auto">
    <Table className="min-w-[700px] w-full bg-white border border-gray-200 rounded-lg shadow">
      <TableHeader className="sticky top-0 bg-white">
        <TableRow className="border-b border-gray-200">
          <TableHead
            scope="col"
            className="px-4 py-3 font-medium text-left text-black"
          >
            Nombre
          </TableHead>
          <TableHead
            scope="col"
            className="px-4 py-3 font-medium text-left text-black"
          >
            Categoría
          </TableHead>
          <TableHead
            scope="col"
            className="px-4 py-3 font-medium text-left text-black"
          >
            Precio
          </TableHead>
          <TableHead
            scope="col"
            className="px-4 py-3 font-medium text-left text-black"
          >
            Stock
          </TableHead>
          <TableHead
            scope="col"
            className="px-4 py-3 font-medium text-left text-black"
          >
            Estado
          </TableHead>
          <TableHead
            scope="col"
            className="px-4 py-3 font-medium text-right text-black"
          >
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={6} className="py-8 text-center">
              <Loader className="w-6 h-6 mx-auto text-gray-600 animate-spin" />
              <p className="mt-2 text-gray-600">Cargando…</p>
            </TableCell>
          </TableRow>
        ) : products.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
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

export default ProductTable;
