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
  const [isAdding, setIsAdding] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAdd = () => {
    setProductToEdit(null);
    setIsAdding(true);
  };

  const handleCloseForm = () => {
    setIsAdding(false);
    setProductToEdit(null);
  };

  // Ahora onEdit recibe TODO el producto
  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setIsAdding(true);
  };

  const handleSubmit = async (data: Partial<Product>) => {
    if (productToEdit) {
      // edición
      await editProduct(productToEdit.id, data);
    } else {
      // creación
      await addProduct(data);
    }
    setIsAdding(false);
    setProductToEdit(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Eliminar producto?")) {
      await removeProduct(id);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
        <Button
          onClick={handleAdd}
          className="text-white bg-blue-600 hover:bg-blue-500"
        >
          <Plus className="w-4 h-4 mr-2" /> Añadir Producto
        </Button>
      </div>

      {isAdding && (
        <AddProductForm
          productToEdit={productToEdit}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      )}

      <Card className="bg-white rounded-lg shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Inventario de Productos
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Gestiona tu inventario de café y alimentos
              </CardDescription>
            </div>
            <ProductSearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        </CardHeader>
        <CardContent>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          {loading ? (
            <p>Cargando…</p>
          ) : (
            <ProductTable
              products={filtered}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isLoading={loading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProducts;
