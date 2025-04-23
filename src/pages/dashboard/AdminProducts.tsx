// src/pages/dashboard/AdminProducts.tsx
"use client";

import { useEffect, useState } from "react";
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
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";
import { Product } from "@/types/product";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Carga inicial */
  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  /** Placeholder para crear producto: abre un modal real en producción */
  const handleAdd = async () => {
    try {
      const nuevo: Partial<Product> = {
        name: "Nuevo producto",
        description: "Descripción…",
        category: "café",
        price: 0,
        image: "",
        available: true,
        featured: false,
      };
      await createProduct(nuevo);
      await refresh();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleEdit = async (id: string, data: Partial<Product>) => {
    try {
      await updateProduct(id, data);
      await refresh();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar producto?")) return;
    try {
      await deleteProduct(id);
      await refresh();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#4A3520]">Productos</h1>
        <Button onClick={handleAdd} className="bg-[#8B5A2B] hover:bg-[#6E4A22]">
          <Plus className="w-4 h-4 mr-2" /> Añadir Producto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Inventario de Productos</CardTitle>
              <CardDescription>
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
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProducts;
