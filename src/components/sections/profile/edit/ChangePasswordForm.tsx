// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Form } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { changePassword } from "@/services/authService";

// const passwordSchema = z
//   .object({
//     currentPassword: z.string().min(6, "Mínimo 6 caracteres"),
//     newPassword: z.string().min(6, "Mínimo 6 caracteres"),
//     confirmPassword: z.string().min(6, "Mínimo 6 caracteres"),
//   })
//   .refine((data) => data.newPassword === data.confirmPassword, {
//     message: "Las contraseñas no coinciden",
//     path: ["confirmPassword"],
//   });

// type PasswordFormValues = z.infer<typeof passwordSchema>;

// export function ChangePasswordForm() {
//   const navigate = useNavigate();
//   const form = useForm<PasswordFormValues>({
//     resolver: zodResolver(passwordSchema),
//   });

//   const onSubmit = async (data: PasswordFormValues) => {
//     try {
//       await changePassword({
//         currentPassword: data.currentPassword,
//         newPassword: data.newPassword,
//       });
//       navigate("/profile");
//     } catch (error) {
//       console.error("Error changing password:", error);
//       form.setError("currentPassword", {
//         type: "manual",
//         message: "Contraseña actual incorrecta",
//       });
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <Form.Field
//           control={form.control}
//           name="currentPassword"
//           render={({ field }) => (
//             <Form.Item>
//               <Form.Label>Contraseña actual</Form.Label>
//               <Form.Control>
//                 <Input type="password" {...field} />
//               </Form.Control>
//               <Form.Message />
//             </Form.Item>
//           )}
//         />

//         <Form.Field
//           control={form.control}
//           name="newPassword"
//           render={({ field }) => (
//             <Form.Item>
//               <Form.Label>Nueva contraseña</Form.Label>
//               <Form.Control>
//                 <Input type="password" {...field} />
//               </Form.Control>
//               <Form.Message />
//             </Form.Item>
//           )}
//         />

//         <Form.Field
//           control={form.control}
//           name="confirmPassword"
//           render={({ field }) => (
//             <Form.Item>
//               <Form.Label>Confirmar nueva contraseña</Form.Label>
//               <Form.Control>
//                 <Input type="password" {...field} />
//               </Form.Control>
//               <Form.Message />
//             </Form.Item>
//           )}
//         />

//         <div className="flex gap-4 pt-4">
//           <Button
//             type="button"
//             variant="outline"
//             className="w-full"
//             onClick={() => navigate("/profile")}
//           >
//             Cancelar
//           </Button>
//           <Button type="submit" className="w-full">
//             Cambiar contraseña
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }
