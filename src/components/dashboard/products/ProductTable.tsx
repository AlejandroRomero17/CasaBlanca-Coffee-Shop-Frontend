import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/product";
import ProductTableRow from "./ProductTableRow";

interface Props {
  products: Product[];
  onEdit: (id: string, data: Partial<Product>) => void;
  onDelete: (id: string) => void;
}

const ProductTable = ({ products, onEdit, onDelete }: Props) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Nombre</TableHead>
        <TableHead>Categoría</TableHead>
        <TableHead>Precio</TableHead>
        <TableHead>Stock</TableHead>
        <TableHead>Estado</TableHead>
        <TableHead className="text-right">Acciones</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {products.map((p) => (
        <ProductTableRow
          key={p.id}
          product={p}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </TableBody>
  </Table>
);

export default ProductTable;
