// src/components/sections/auth/RegisterForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { register as registerUser } from "@/services/authService";
import { addToUserCart } from "@/services/cartService";
import { useAuthStore } from "@/store/authStore";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Store de carrito invitado
import { useCartStore } from "@/store/cartStore";

const formSchema = z
  .object({
    name: z.string().min(2, "Mínimo 2 caracteres").max(50),
    email: z.string().email("Ingresa un correo válido"),
    password: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .regex(/[A-Z]/, "Al menos una mayúscula")
      .regex(/[0-9]/, "Al menos un número"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof formSchema>;

export default function RegisterForm() {
  useAuthRedirect();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  // Del store de invitado:
  const guestItems = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const replaceItems = useCartStore((s) => s.replaceItems);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterValues) => {
    setLoading(true);
    try {
      // 1) Crear usuario
      const res = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      setToken(res.token);
      setUser(res.user);

      // 2) Migrar cada ítem del invitado al carrito real
      await Promise.all(
        guestItems.map((item) =>
          addToUserCart({
            user_id: res.user.id,
            product_id: item.id,
            product_name: item.name,
            product_image: item.image,
            product_price: item.price,
            quantity: item.quantity,
          })
        )
      );

      // 3) Limpiar carrito invitado y volcar ítems migrados
      clearCart();
      replaceItems(
        guestItems.map((it) => ({
          id: it.id,
          name: it.name,
          image: it.image,
          price: it.price,
          quantity: it.quantity,
        }))
      );

      toast.success("Cuenta creada y carrito migrado", {
        description: "Redirigiendo…",
        position: "top-center",
      });

      // 4) Redirigir según rol
      setTimeout(() => {
        if (res.user.role === "admin") navigate("/dashboard");
        else navigate("/cart");
      }, 800);
    } catch (err: any) {
      console.error("[RegisterForm] error:", err);
      toast.error(
        err.message.includes("already exists")
          ? "Correo ya registrado"
          : "Error al registrar",
        {
          description: err.message.includes("already exists")
            ? "Prueba con otro correo o inicia sesión"
            : "Inténtalo de nuevo más tarde",
          position: "top-center",
        }
      );
      if (err.message.includes("already exists")) {
        form.setError("email", { message: "Correo ya registrado" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#F8F2E3]">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-medium text-[#3B2F2F]">Crear cuenta</h1>
          <p className="mt-2 text-sm text-[#3B2F2F]">
            Regístrate para continuar
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-8 mt-8 space-y-6 bg-white border border-[#D09E66] rounded-lg shadow-md"
          >
            {form.formState.errors.root && (
              <div className="px-4 py-3 text-sm text-red-600 rounded-md bg-red-50">
                {form.formState.errors.root.message}
              </div>
            )}

            <div className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className={cn(
                          "h-12 rounded-lg border-[#D09E66] focus:border-[#3B2F2F] focus:ring-1 focus:ring-[#D09E66]",
                          fieldState.error && "border-red-500"
                        )}
                        autoComplete="name"
                        aria-invalid={fieldState.invalid}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className={cn(
                          "h-12 rounded-lg border-[#D09E66] focus:border-[#3B2F2F] focus:ring-1 focus:ring-[#D09E66]",
                          fieldState.error && "border-red-500"
                        )}
                        autoComplete="email"
                        aria-invalid={fieldState.invalid}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className={cn(
                            "h-12 rounded-lg border-[#D09E66] focus:border-[#3B2F2F] focus:ring-1 focus:ring-[#D09E66] pr-10",
                            fieldState.error && "border-red-500"
                          )}
                          autoComplete="new-password"
                          aria-invalid={fieldState.invalid}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute -translate-y-1/2 right-3 top-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="text-[#3B2F2F]" />
                          ) : (
                            <Eye className="text-[#3B2F2F]" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          className={cn(
                            "h-12 rounded-lg border-[#D09E66] focus:border-[#3B2F2F] focus:ring-1 focus:ring-[#D09E66] pr-10",
                            fieldState.error && "border-red-500"
                          )}
                          autoComplete="new-password"
                          aria-invalid={fieldState.invalid}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((p) => !p)}
                          className="absolute -translate-y-1/2 right-3 top-1/2"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="text-[#3B2F2F]" />
                          ) : (
                            <Eye className="text-[#3B2F2F]" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-white bg-[#3B2F2F] rounded-lg hover:bg-[#D09E66]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creando…
                </>
              ) : (
                "Crear cuenta"
              )}
            </Button>

            <div className="text-sm text-center text-[#3B2F2F]">
              ¿Ya tienes una cuenta?{" "}
              <a
                href="/login"
                className="font-medium text-[#D09E66] hover:underline"
              >
                Inicia sesión
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
