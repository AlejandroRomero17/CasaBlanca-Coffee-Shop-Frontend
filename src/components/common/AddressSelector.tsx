import { useState } from "react";
import { Address } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AddressForm from "./AddressForm";

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddress: Address | null;
  onSelect: (address: Address) => void;
  onAddAddress: (
    address: Omit<Address, "id" | "created_at" | "updated_at">
  ) => Promise<boolean>;
}

export default function AddressSelector({
  addresses,
  selectedAddress,
  onSelect,
  onAddAddress,
}: AddressSelectorProps) {
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <span className="text-lg font-semibold">Dirección de envío</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div
              key="address-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <AddressForm
                onSubmit={async (address) => {
                  const success = await onAddAddress(address);
                  if (success) setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
                initial={selectedAddress || undefined}
              />
            </motion.div>
          ) : addresses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center p-6 space-y-3 text-center border rounded-lg bg-muted/20"
            >
              <MapPin className="w-8 h-8 text-muted-foreground" />
              <p className="text-muted-foreground">
                No hay direcciones guardadas
              </p>
              <Button size="sm" onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar dirección
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="address-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {/* Dirección seleccionada (ya no es siempre la predeterminada) */}
              {selectedAddress && (
                <div className="p-4 border rounded-lg bg-muted/10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">
                          {selectedAddress.isDefault && (
                            <Badge variant="secondary" className="mr-2">
                              Predeterminada
                            </Badge>
                          )}
                          {selectedAddress.address_line1}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {selectedAddress.address_line2 && (
                          <p>{selectedAddress.address_line2}</p>
                        )}
                        <p>
                          {selectedAddress.city}, {selectedAddress.state}{" "}
                          {selectedAddress.postal_code}
                        </p>
                        <p>{selectedAddress.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Botón para cambiar dirección */}
              {addresses.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-primary"
                  onClick={() => setShowAllAddresses(!showAllAddresses)}
                >
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Cambiar dirección
                </Button>
              )}

              {/* Lista de direcciones adicionales */}
              {showAllAddresses && (
                <div className="pt-2 space-y-3 border-t">
                  {addresses
                    .filter((addr) => addr.id !== selectedAddress?.id)
                    .map((addr) => (
                      <div
                        key={addr.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedAddress?.id === addr.id
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-muted hover:border-muted-foreground/30"
                        }`}
                        onClick={() => {
                          onSelect(addr);
                          setShowAllAddresses(false);
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">
                                {addr.isDefault && (
                                  <Badge variant="secondary" className="mr-2">
                                    Predeterminada
                                  </Badge>
                                )}
                                {addr.address_line1}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {addr.address_line2 && (
                                <p>{addr.address_line2}</p>
                              )}
                              <p>
                                {addr.city}, {addr.state} {addr.postal_code}
                              </p>
                              <p>{addr.country}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* Botón para añadir nueva dirección */}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => setShowForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Añadir otra dirección
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
