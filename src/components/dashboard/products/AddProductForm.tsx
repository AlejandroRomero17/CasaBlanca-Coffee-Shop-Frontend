// src/components/dashboard/products/AddProductForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Product, ProductCategory } from "@/types/product";

interface AddProductFormProps {
  productToEdit?: Product | null;
  onClose: () => void;
  onSubmit: (data: Partial<Product>) => void;
}

export default function AddProductForm({
  productToEdit,
  onClose,
  onSubmit,
}: AddProductFormProps) {
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    category: "café",
    image: "",
    available: true,
    featured: false,
  });

  useEffect(() => {
    if (productToEdit) {
      setForm({ ...productToEdit });
    }
  }, [productToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleCategory = (value: ProductCategory) =>
    setForm((f) => ({ ...f, category: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.description && form.price !== undefined) {
      onSubmit(form);
      onClose();
    } else {
      alert("Completa todos los campos");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-4 text-black bg-white rounded-lg shadow-md"
    >
      <Input
        name="name"
        value={form.name ?? ""}
        onChange={handleChange}
        placeholder="Nombre del producto"
        className="text-black placeholder:text-gray-500"
        required
      />
      <Textarea
        name="description"
        value={form.description ?? ""}
        onChange={handleChange}
        placeholder="Descripción"
        className="text-black placeholder:text-gray-500"
        required
      />
      <Input
        type="number"
        name="price"
        value={form.price ?? 0}
        onChange={handleChange}
        placeholder="Precio"
        className="text-black placeholder:text-gray-500"
        required
      />

      <Select value={form.category!} onValueChange={handleCategory}>
        <SelectTrigger className="w-full text-black bg-white border border-gray-300">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent className="text-black bg-white border border-gray-200 shadow-lg">
          {["café", "bebidas", "postres", "desayunos", "almuerzos"].map(
            (cat) => (
              <SelectItem
                key={cat}
                value={cat}
                className="text-black hover:bg-gray-100"
              >
                {cat}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>

      <Input
        name="image"
        value={form.image ?? ""}
        onChange={handleChange}
        placeholder="URL de la imagen"
        className="text-black placeholder:text-gray-500"
      />

      <div className="flex justify-end pt-4 space-x-2">
        <Button
          variant="outline"
          onClick={onClose}
          className="text-black border-black hover:bg-gray-100"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="text-white bg-blue-600 hover:bg-blue-700"
        >
          {productToEdit ? "Actualizar" : "Crear"} Producto
        </Button>
      </div>
    </form>
  );
}
