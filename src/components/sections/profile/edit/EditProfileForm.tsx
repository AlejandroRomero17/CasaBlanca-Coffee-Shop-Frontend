// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Form } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useAuthStore } from "@/store/authStore";
// import { updateProfile } from "@/services/userService";
// import { useNavigate } from "react-router-dom";

// const profileSchema = z.object({
//   name: z.string().min(2, "Nombre demasiado corto"),
//   email: z.string().email("Correo inválido"),
//   phone: z.string().optional(),
// });

// type ProfileFormValues = z.infer<typeof profileSchema>;

// export function EditProfileForm() {
//   const { user, setUser } = useAuthStore();
//   const navigate = useNavigate();

//   const form = useForm<ProfileFormValues>({
//     resolver: zodResolver(profileSchema),
//     defaultValues: {
//       name: user?.name || "",
//       email: user?.email || "",
//       phone: user?.phone || "",
//     },
//   });

//   const onSubmit = async (data: ProfileFormValues) => {
//     try {
//       const updatedUser = await updateProfile(data);
//       setUser(updatedUser);
//       navigate("/profile");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <Form.Field
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <Form.Item>
//               <Form.Label>Nombre</Form.Label>
//               <Form.Control>
//                 <Input placeholder="Tu nombre" {...field} />
//               </Form.Control>
//               <Form.Message />
//             </Form.Item>
//           )}
//         />

//         <Form.Field
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <Form.Item>
//               <Form.Label>Correo electrónico</Form.Label>
//               <Form.Control>
//                 <Input type="email" placeholder="tu@email.com" {...field} />
//               </Form.Control>
//               <Form.Message />
//             </Form.Item>
//           )}
//         />

//         <Form.Field
//           control={form.control}
//           name="phone"
//           render={({ field }) => (
//             <Form.Item>
//               <Form.Label>Teléfono</Form.Label>
//               <Form.Control>
//                 <Input placeholder="+52 000 000 0000" {...field} />
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
//             Guardar cambios
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }
