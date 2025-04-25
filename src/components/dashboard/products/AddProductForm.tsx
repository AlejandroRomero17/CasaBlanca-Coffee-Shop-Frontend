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
import { ProductCategory, Product } from "@/types/product";

export default function AddProductForm({
  productToEdit,
  onClose,
  onSubmit,
}: {
  productToEdit: Product | null;
  onClose: () => void;
  onSubmit: (data: Partial<Product>) => void;
}) {
  const [form, setForm] = useState<Partial<Product>>(
    productToEdit || {
      name: "",
      description: "",
      price: 0,
      category: "café",
      image: "",
      available: true,
      featured: false,
    }
  );

  useEffect(() => {
    if (productToEdit) setForm(productToEdit);
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

  const handleCategory = (value: ProductCategory) => {
    setForm((f) => ({ ...f, category: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.description && form.price !== undefined) {
      onSubmit(form);
      onClose();
    } else {
      alert("Completa todos los campos");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 p-4 bg-muted/10 rounded-lg">
      <Input
        name="name"
        value={form.name || ""}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <Textarea
        name="description"
        value={form.description || ""}
        onChange={handleChange}
        placeholder="Descripción"
        required
      />
      <Input
        type="number"
        name="price"
        value={form.price || 0}
        onChange={handleChange}
        placeholder="Precio"
        required
      />
      <Select value={form.category!} onValueChange={handleCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="café">Café</SelectItem>
          <SelectItem value="bebidas">Bebidas</SelectItem>
          <SelectItem value="postres">Postres</SelectItem>
          <SelectItem value="desayunos">Desayunos</SelectItem>
          <SelectItem value="almuerzos">Almuerzos</SelectItem>
        </SelectContent>
      </Select>
      <Input
        name="image"
        value={form.image || ""}
        onChange={handleChange}
        placeholder="URL de imagen"
      />
      <Button type="submit" className="w-full">
        {productToEdit ? "Actualizar" : "Crear"} Producto
      </Button>
      <Button variant="outline" onClick={onClose} className="w-full">
        Cancelar
      </Button>
    </form>
  );
}
