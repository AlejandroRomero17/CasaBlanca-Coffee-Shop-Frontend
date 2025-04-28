// src/components/sections/auth/LoginForm.tsx
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
import { login } from "@/services/authService";
import { addToUserCart, getUserCart } from "@/services/cartService"; // 👈 añadimos getUserCart
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email({ message: "Ingresa un correo válido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});
type LoginValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  useAuthRedirect();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);

  // Ítems en memoria (guest)
  const { items: guestItems, clearCart, replaceItems } = useCartStore();
  const navigate = useNavigate();

  const form = useForm<LoginValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    setLoading(true);
    try {
      // 1) Login
      const res = await login(values);
      console.log("[LoginForm] login success:", res);
      setToken(res.token);
      setUser(res.user);

      // 2) Migramos cada ítem invitado al carrito real
      for (const item of guestItems) {
        console.log("[LoginForm] migrando item:", item);
        await addToUserCart({
          user_id: res.user.id,
          product_id: item.id,
          product_name: item.name,
          product_image: item.image,
          product_price: item.price,
          quantity: item.quantity,
        });
      }

      // 3) Limpiamos el store (guest)
      clearCart();

      // 4) Volvemos a consultar el carrito real y lo volcamos al store
      const backendCart = await getUserCart(res.user.id);
      console.log("[LoginForm] carrito real tras migración:", backendCart);
      replaceItems(
        backendCart.map((it) => ({
          id: it.id_cart,
          name: it.product_name,
          image: it.product_image,
          price: Number(it.product_price),
          quantity: it.quantity,
        }))
      );

      // 5) Feedback y redirección
      toast.success("Sesión iniciada y carrito sincronizado", {
        description: "Redirigiendo…",
        position: "top-center",
      });

      setTimeout(() => {
        if (res.user.role === "admin") navigate("/dashboard");
        else navigate("/cart");
      }, 800);
    } catch (err: any) {
      console.error("[LoginForm] error:", err);
      toast.error("Credenciales incorrectas", {
        description: "Verifica tu correo y contraseña",
        position: "top-center",
      });
      form.setError("root", { message: "Correo o contraseña incorrectos" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#F8F2E3]">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-medium text-[#3B2F2F]">
            Iniciar sesión
          </h1>
          <p className="mt-2 text-sm text-[#3B2F2F]">
            Accede a tu cuenta para continuar
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
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#3B2F2F]">
                      Correo electrónico
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        className={cn(
                          "h-12 rounded-lg border-[#D09E66] focus:border-[#3B2F2F] focus:ring-1 focus:ring-[#D09E66]",
                          fieldState.error && "border-red-500"
                        )}
                        autoComplete="email"
                        aria-invalid={fieldState.invalid}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#3B2F2F]">
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className={cn(
                            "h-12 rounded-lg border-[#D09E66] focus:border-[#3B2F2F] focus:ring-1 focus:ring-[#D09E66] pr-10",
                            fieldState.error && "border-red-500"
                          )}
                          autoComplete="current-password"
                          aria-invalid={fieldState.invalid}
                        />
                        <button
                          type="button"
                          className="absolute text-[#3B2F2F] -translate-y-1/2 right-3 top-1/2 hover:text-[#D09E66]"
                          onClick={() => setShowPassword((p) => !p)}
                          aria-label={
                            showPassword
                              ? "Ocultar contraseña"
                              : "Mostrar contraseña"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-sm font-medium text-white bg-[#3B2F2F] rounded-lg hover:bg-[#D09E66]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Iniciando…
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-sm text-center text-[#3B2F2F]">
          ¿No tienes una cuenta?{" "}
          <a
            href="/register"
            className="font-medium text-[#D09E66] hover:text-[#3B2F2F] underline"
          >
            Regístrate
          </a>
        </div>
      </div>
    </div>
  );
}
