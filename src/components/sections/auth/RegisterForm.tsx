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
import { useAuthStore } from "@store/authStore";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Se requieren al menos 2 caracteres" })
      .max(50),
    email: z.string().email({ message: "Ingresa un correo válido" }),
    password: z
      .string()
      .min(8, { message: "Mínimo 8 caracteres" })
      .regex(/[A-Z]/, { message: "Al menos una mayúscula" })
      .regex(/[0-9]/, { message: "Al menos un número" }),
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
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

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
      const res = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      setToken(res.token);
      setUser(res.user);
      toast.success("Cuenta creada", {
        description: "Redirigiendo...",
        position: "top-center",
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const err = error as Error;
      if (err.message.includes("already exists")) {
        toast.error("Correo ya registrado", {
          description: "Prueba con otro correo o inicia sesión",
          position: "top-center",
        });
        form.setError("email", { message: "Correo ya registrado" });
      } else {
        toast.error("Error al registrar", {
          description: "Inténtalo de nuevo más tarde",
          position: "top-center",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-medium text-gray-900">Crear cuenta</h1>
          <p className="mt-2 text-sm text-gray-600">
            Regístrate para continuar
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-8 mt-8 space-y-6 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Nombre completo
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        className={cn(
                          "h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
                          fieldState.error && "border-red-500"
                        )}
                        autoComplete="name"
                        aria-invalid={fieldState.invalid}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Correo electrónico
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder=""
                        {...field}
                        className={cn(
                          "h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
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
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder=""
                          {...field}
                          className={cn(
                            "h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10",
                            fieldState.error && "border-red-500"
                          )}
                          autoComplete="new-password"
                          aria-invalid={fieldState.invalid}
                        />
                        <button
                          type="button"
                          className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
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
                    <div className="mt-1 text-xs text-gray-500">
                      Mínimo 8 caracteres con mayúscula y número
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Confirmar contraseña
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder=""
                          {...field}
                          className={cn(
                            "h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10",
                            fieldState.error && "border-red-500"
                          )}
                          autoComplete="new-password"
                          aria-invalid={fieldState.invalid}
                        />
                        <button
                          type="button"
                          className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          aria-label={
                            showConfirmPassword
                              ? "Ocultar contraseña"
                              : "Mostrar contraseña"
                          }
                        >
                          {showConfirmPassword ? (
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
                className="w-full h-12 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  "Crear cuenta"
                )}
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-sm text-center text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
          >
            Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
}
