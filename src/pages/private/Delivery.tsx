// src/pages/private/Delivery.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressForm from "@/components/common/AddressForm";
import { Button } from "@/components/ui/button";
import * as userService from "@/services/userService";
import type { Address } from "@/types/user";

export default function Delivery() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [editing, setEditing] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const data = await userService.getAddresses();
      setAddresses(data);
      const defaultAddr = data.find((a) => a.isDefault) || data[0];
      setSelectedAddressId(defaultAddr?.id || null);
    } catch (err) {
      console.error("Error al cargar direcciones", err);
    }
  };

  const onAdd = async (
    addr: Omit<Address, "id" | "created_at" | "updated_at">
  ) => {
    await userService.addAddress(addr);
    await loadAddresses();
  };

  const onUpdate = async (
    addr: Omit<Address, "id" | "created_at" | "updated_at">
  ) => {
    if (!editing) return;
    await userService.updateAddress(editing, addr);
    setEditing(null);
    await loadAddresses();
  };

  const onDelete = async (id: string) => {
    await userService.deleteAddress(id);
    if (selectedAddressId === id) setSelectedAddressId(null);
    await loadAddresses();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Selecciona dirección de envío</h2>

      {addresses.map((addr) => (
        <div
          key={addr.id}
          className={`p-4 border rounded ${
            selectedAddressId === addr.id ? "border-primary" : "border-gray-200"
          }`}
        >
          <label className="flex items-center">
            <input
              type="radio"
              checked={selectedAddressId === addr.id}
              onChange={() => setSelectedAddressId(addr.id)}
              className="mr-2"
            />
            <div className="flex-1">
              <p>
                {addr.address_line1}
                {addr.address_line2 && `, ${addr.address_line2}`}
              </p>
              <p>
                {addr.city}, {addr.state}, {addr.postal_code}
              </p>
              <p>
                {addr.country} · {addr.phone}
              </p>
            </div>
          </label>
          <div className="flex gap-2 mt-2">
            <Button size="sm" onClick={() => setEditing(addr.id)}>
              Editar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(addr.id)}
            >
              Borrar
            </Button>
          </div>
          {editing === addr.id && (
            <AddressForm
              initial={addr}
              onSubmit={onUpdate}
              onCancel={() => setEditing(null)}
            />
          )}
        </div>
      ))}

      <div>
        <h3 className="text-lg font-medium">Agregar nueva dirección</h3>
        <AddressForm onSubmit={onAdd} />
      </div>

      <div className="mt-6">
        <Button
          disabled={!selectedAddressId}
          onClick={() => navigate("/checkout")}
        >
          Continuar al pago
        </Button>
      </div>
    </div>
  );
}
