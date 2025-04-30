// src/pages/dashboard/AdminProducts.tsx
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import ProductSearchBar from "@/components/dashboard/products/ProductSearchBar";
import ProductTable from "@/components/dashboard/products/ProductTable";
import AddProductForm from "@/components/dashboard/products/AddProductForm";
import { useProductStore } from "@/store/productStore";
import { Product } from "@/types/product";

export default function AdminProducts() {
  const {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
  } = useProductStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 space-y-8 bg-gray-50">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Productos</h1>
        <div className="flex items-center gap-2">
          <ProductSearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <Button
            onClick={() => {
              setProductToEdit(null);
              setIsFormOpen(true);
            }}
            className="flex items-center text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" /> Añadir Producto
          </Button>
        </div>
      </div>

      {/* Modal Crear/Editar */}
      <Dialog
        open={isFormOpen}
        onOpenChange={(o) => !o && setIsFormOpen(false)}
      >
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/40" />
          <DialogContent className="fixed w-full max-w-2xl p-8 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl top-1/2 left-1/2 rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-gray-800">
                {productToEdit?.id ? "Editar Producto" : "Crear Producto"}
              </DialogTitle>
            </DialogHeader>
            <AddProductForm
              productToEdit={productToEdit}
              onClose={() => setIsFormOpen(false)}
              onSubmit={async (data) => {
                if (productToEdit?.id) {
                  await editProduct(productToEdit.id, data);
                } else {
                  await addProduct(data);
                }
                setIsFormOpen(false);
              }}
            />
            <DialogFooter />
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {/* Tabla */}
      <Card className="shadow-lg">
        <CardHeader className="bg-white border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Inventario
              </CardTitle>
              <CardDescription className="text-gray-600">
                Administra tu catálogo de productos
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-white">
          {error && (
            <p className="px-4 py-2 mb-4 text-red-700 bg-red-100 rounded">
              {error}
            </p>
          )}
          <ProductTable
            products={filtered}
            isLoading={loading}
            onEdit={(p) => {
              setProductToEdit(p);
              setIsFormOpen(true);
            }}
            onDelete={(id) => setDeleteId(id)}
          />
        </CardContent>
      </Card>

      {/* Confirmación eliminación */}
      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/40" />
          <DialogContent className="fixed w-full max-w-md p-6 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl top-1/2 left-1/2 rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-800">
                Confirmar Eliminación
              </DialogTitle>
            </DialogHeader>
            <p className="mt-4 text-gray-700">
              ¿Estás seguro de eliminar este producto? Esta acción no se puede
              deshacer.
            </p>
            <DialogFooter className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setDeleteId(null)}
                className="text-gray-800"
              >
                Cancelar
              </Button>
              <Button
                className="text-white bg-red-600 hover:bg-red-700"
                onClick={async () => {
                  if (deleteId) await removeProduct(deleteId);
                  setDeleteId(null);
                }}
              >
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
