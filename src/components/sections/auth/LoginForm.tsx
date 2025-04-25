// src/pages/auth/Login.tsx
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
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { login } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
type Inputs = z.infer<typeof schema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = async (vals: Inputs) => {
    setLoading(true);
    try {
      const { token, user } = await login(vals);
      setToken(token);
      setUser(user);
      toast.success("¡Bienvenido!", { position: "top-center" });
      // redireccionar según rol:
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/cart", { replace: true });
      }
    } catch {
      toast.error("Credenciales incorrectas", { position: "top-center" });
      form.setError("root", { message: "Email o contraseña inválidos" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F2E3]">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="mb-4 text-2xl font-semibold text-center">
          Iniciar sesión
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {form.formState.errors.root && (
              <div className="p-2 text-sm text-red-700 bg-red-100 rounded">
                {form.formState.errors.root.message}
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={cn(fieldState.error && "border-red-500")}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPwd ? "text" : "password"}
                        {...field}
                        className={cn(
                          "pr-10",
                          fieldState.error && "border-red-500"
                        )}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd(!showPwd)}
                        className="absolute inset-y-0 flex items-center right-2"
                        aria-label={
                          showPwd ? "Ocultar contraseña" : "Mostrar contraseña"
                        }
                      >
                        {showPwd ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
