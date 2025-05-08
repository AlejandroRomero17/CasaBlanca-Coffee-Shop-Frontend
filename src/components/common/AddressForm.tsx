import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Address } from "@/types/user";

interface Props {
  initial?: Partial<Address>;
  onSubmit: (addr: Omit<Address, "id" | "created_at" | "updated_at">) => void;
  onCancel?: () => void;
}

export default function AddressForm({
  initial = {},
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState({
    address_line1: initial.address_line1 || "",
    address_line2: initial.address_line2 || "",
    city: initial.city || "",
    state: initial.state || "",
    postal_code: initial.postal_code || "",
    country: initial.country || "Mexico",
    phone: initial.phone || "",
    isDefault: initial.isDefault || false,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          value={form.address_line1}
          placeholder="Calle y número"
          onChange={(e) => setForm({ ...form, address_line1: e.target.value })}
          required
        />
        <Input
          value={form.address_line2}
          placeholder="Interior / apto"
          onChange={(e) => setForm({ ...form, address_line2: e.target.value })}
        />
        <Input
          value={form.city}
          placeholder="Ciudad"
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
        />
        <Input
          value={form.state}
          placeholder="Estado"
          onChange={(e) => setForm({ ...form, state: e.target.value })}
          required
        />
        <Input
          value={form.postal_code}
          placeholder="Código postal"
          onChange={(e) => setForm({ ...form, postal_code: e.target.value })}
          required
        />
        <Input
          value={form.phone}
          placeholder="Teléfono"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={form.isDefault}
          id="default"
          onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
        />
        <label htmlFor="default">Usar como dirección predeterminada</label>
      </div>
      <div className="flex gap-2 mt-4">
        <Button type="submit">Guardar</Button>
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
