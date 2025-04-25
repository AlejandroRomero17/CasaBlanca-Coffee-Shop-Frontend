import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Product } from "@/types/product";
import ProductTableRow from "./ProductTableRow";
import { Loader } from "lucide-react";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void; // Ahora recibe Product
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const ProductTable = ({ products, onEdit, onDelete, isLoading }: Props) => (
  <div className="overflow-x-auto">
    <Table className="min-w-[700px] w-full text-sm table-auto bg-white rounded-xl shadow-sm ring-1 ring-muted">
      <TableHeader className="sticky top-0 z-10 bg-muted">
        <TableRow className="border-b text-muted-foreground border-muted">
          <TableHead scope="col" className="px-4 py-3 text-left">
            Nombre
          </TableHead>
          <TableHead scope="col" className="px-4 py-3 text-left">
            Categoría
          </TableHead>
          <TableHead scope="col" className="px-4 py-3 text-left">
            Precio
          </TableHead>
          <TableHead scope="col" className="px-4 py-3 text-left">
            Stock
          </TableHead>
          <TableHead scope="col" className="px-4 py-3 text-left">
            Estado
          </TableHead>
          <TableHead scope="col" className="px-4 py-3 text-right">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={6} className="py-8 text-center">
              <Loader className="w-6 h-6 mx-auto animate-spin" />
              Cargando...
            </TableCell>
          </TableRow>
        ) : products.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="py-8 italic text-center text-muted-foreground"
            >
              No hay productos registrados
            </TableCell>
          </TableRow>
        ) : (
          products.map((p) => (
            <ProductTableRow
              key={p.id}
              product={p}
              onEdit={onEdit} // Pasa el Product directamente
              onDelete={onDelete}
            />
          ))
        )}
      </TableBody>
    </Table>
  </div>
);

export default ProductTable;
