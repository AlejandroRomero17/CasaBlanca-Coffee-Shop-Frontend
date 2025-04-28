// src/pages/dashboard/AdminProducts.tsx
"use client";

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

const AdminProducts = () => {
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
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header + Añadir */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">Productos</h1>
        <Button
          onClick={() => {
            setProductToEdit(null);
            setIsFormOpen(true);
          }}
          className="text-white bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" /> Añadir Producto
        </Button>
      </div>

      {/* Modal Añadir / Editar */}
      <Dialog
        open={isFormOpen}
        onOpenChange={(o) => !o && setIsFormOpen(false)}
      >
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/30" />
          <DialogContent className="fixed w-11/12 max-w-lg p-6 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-lg shadow-lg top-1/2 left-1/2">
            <DialogHeader>
              <DialogTitle className="text-xl text-black">
                {productToEdit ? "Editar Producto" : "Crear Producto"}
              </DialogTitle>
            </DialogHeader>
            <AddProductForm
              productToEdit={productToEdit}
              onClose={() => setIsFormOpen(false)}
              onSubmit={async (data) => {
                if (productToEdit) {
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

      {/* Tabla de productos */}
      <Card className="border border-gray-200 rounded-lg shadow-sm">
        <CardHeader className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-black">
                Inventario
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Administra tu catálogo de productos
              </CardDescription>
            </div>
            <ProductSearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        </CardHeader>
        <CardContent className="bg-white">
          {error && <p className="mb-4 text-red-600">{error}</p>}
          <ProductTable
            products={filtered}
            onEdit={(p) => {
              setProductToEdit(p);
              setIsFormOpen(true);
            }}
            onDelete={(id) => setDeleteId(id)}
            isLoading={loading}
          />
        </CardContent>
      </Card>

      {/* Confirmación de eliminación */}
      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/30" />
          <DialogContent className="fixed w-11/12 max-w-sm p-6 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-lg shadow-lg top-1/2 left-1/2">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium text-black">
                Confirmar Eliminación
              </DialogTitle>
            </DialogHeader>
            <p className="mt-2 text-sm text-black">
              ¿Seguro que deseas eliminar este producto? Esta acción es
              irreversible.
            </p>
            <DialogFooter className="flex justify-end mt-6 space-x-3">
              <Button
                variant="outline"
                className="px-4 py-2 text-black border-gray-300 hover:bg-gray-100"
                onClick={() => setDeleteId(null)}
              >
                Cancelar
              </Button>
              <Button
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600"
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
};

export default AdminProducts;
