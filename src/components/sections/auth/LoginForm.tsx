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
import { useAuthStore } from "@store/authStore";
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
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const form = useForm<LoginValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setLoading(true);
    try {
      const res = await login(values);
      setToken(res.token);
      setUser(res.user);
      toast.success("Sesión iniciada", {
        description: "Redirigiendo a tu cuenta...",
        position: "top-center",
      });
      setTimeout(() => navigate("/"), 1000);
    } catch {
      toast.error("Credenciales incorrectas", {
        description: "Verifica tu correo y contraseña",
        position: "top-center",
      });
      form.setError("root", {
        message: "Correo o contraseña incorrectos",
      });
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
                          onClick={() => setShowPassword(!showPassword)}
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

              <div className="flex items-center justify-end">
                <a
                  href="/forgot-password"
                  className="text-sm font-medium text-[#D09E66] hover:text-[#3B2F2F] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full h-12 text-sm font-medium text-white bg-[#3B2F2F] rounded-lg hover:bg-[#D09E66] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D09E66] focus-visible:ring-offset-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Iniciando sesión...
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
            className="font-medium text-[#D09E66] hover:text-[#3B2F2F] hover:underline"
          >
            Regístrate
          </a>
        </div>
      </div>
    </div>
  );
}
