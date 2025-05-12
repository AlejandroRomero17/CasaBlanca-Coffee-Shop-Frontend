// import { useEffect, useState } from "react";
// import {
//   Check,
//   Clock,
//   Eye,
//   MoreHorizontal,
//   Search,
//   ShoppingBag,
//   X,
//   MapPin,
//   CreditCard,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { getAllOrders, updateOrderStatus } from "@/services/orderService";
// import { fetchProducts } from "@/services/productService";
// import { Order } from "@/types/order";
// import { Product } from "@/types/product";

// const OrdersTable = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [productsMap, setProductsMap] = useState<Record<string, Product>>({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [ordersData, productsData] = await Promise.all([
//           getAllOrders(),
//           fetchProducts(),
//         ]);

//         const map: Record<string, Product> = {};
//         productsData.forEach((product) => {
//           map[product.id] = product;
//         });

//         // Asegurar que cada orden tenga un array de items
//         const normalizedOrders = ordersData.map((order) => ({
//           ...order,
//           items: Array.isArray(order.items) ? order.items : [],
//         }));

//         setProductsMap(map);
//         setOrders(normalizedOrders);
//       } catch (error) {
//         console.error("Error al obtener datos:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleStatusChange = async (id: string, status: Order["status"]) => {
//     try {
//       const updated = await updateOrderStatus(id, status);
//       setOrders((prev) =>
//         prev.map((o) =>
//           o._id === updated._id ? { ...o, status: updated.status } : o
//         )
//       );
//     } catch (error) {
//       console.error("Error al actualizar estado:", error);
//     }
//   };

//   const filteredOrders = orders.filter((order) => {
//     const matchesSearch = (order._id ?? "")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       statusFilter === "all" || order.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-[#4A4A4A]">Pedidos</h1>
//         <div className="flex items-center gap-x-2">
//           <Select defaultValue="all" onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Filtrar por estado" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Todos los estados</SelectItem>
//               <SelectItem value="pendiente">Pendiente</SelectItem>
//               <SelectItem value="preparando">Preparando</SelectItem>
//               <SelectItem value="listo">Listo</SelectItem>
//               <SelectItem value="entregado">Entregado</SelectItem>
//               <SelectItem value="cancelado">Cancelado</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <Card className="bg-white rounded-lg shadow-md">
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle>Pedidos Recientes</CardTitle>
//               <CardDescription>
//                 Gestiona los pedidos de tus clientes
//               </CardDescription>
//             </div>
//             <div className="relative">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Buscar pedidos..."
//                 className="pl-8 w-[250px]"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-[#f9f7f4]">
//                 <TableHead>ID</TableHead>
//                 <TableHead>Cliente</TableHead>
//                 <TableHead>Items</TableHead>
//                 <TableHead>Total</TableHead>
//                 <TableHead>Pago</TableHead>
//                 <TableHead>Dirección</TableHead>
//                 <TableHead>Estado</TableHead>
//                 <TableHead className="text-right">Acciones</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredOrders.map((order) => (
//                 <TableRow key={order._id} className="bg-white">
//                   <TableCell className="font-medium text-[#4A4A4A]">
//                     {order._id?.slice(-6)}
//                   </TableCell>
//                   <TableCell>{order.isDelivery ? "Envío" : "Mesa"}</TableCell>
//                   <TableCell>
//                     <div className="flex flex-col">
//                       {Array.isArray(order.items) &&
//                         order.items.map((item, index) => {
//                           const product = productsMap[item.product as string];
//                           return (
//                             <span key={index} className="text-sm">
//                               {item.quantity}x {product?.name ?? "Producto"}
//                             </span>
//                           );
//                         })}
//                     </div>
//                   </TableCell>
//                   <TableCell>${order.total.toFixed(2)}</TableCell>
//                   <TableCell className="flex items-center gap-1">
//                     <CreditCard className="w-4 h-4" />
//                     {order.paymentMethod}
//                   </TableCell>
//                   <TableCell className="text-sm">
//                     <div className="flex items-start gap-1">
//                       <MapPin className="w-4 h-4 mt-0.5" />
//                       <span>{order.shipping_address ?? "-"}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge
//                       variant={
//                         order.status === "entregado"
//                           ? "default"
//                           : order.status === "preparando"
//                           ? "outline"
//                           : order.status === "pendiente"
//                           ? "secondary"
//                           : order.status === "cancelado"
//                           ? "destructive"
//                           : "secondary"
//                       }
//                       className="flex items-center gap-1 w-fit"
//                     >
//                       {order.status === "entregado" && (
//                         <Check className="w-3 h-3" />
//                       )}
//                       {order.status === "preparando" && (
//                         <Clock className="w-3 h-3" />
//                       )}
//                       {order.status === "pendiente" && (
//                         <ShoppingBag className="w-3 h-3" />
//                       )}
//                       {order.status === "cancelado" && (
//                         <X className="w-3 h-3" />
//                       )}
//                       {order.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="outline" size="icon">
//                           <MoreHorizontal className="w-4 h-4" />
//                           <span className="sr-only">Abrir menú</span>
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Acciones</DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem>
//                           <Eye className="w-4 h-4 mr-2" /> Ver detalles
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={() =>
//                             handleStatusChange(order._id, "entreg`ad`o")
//                           }
//                         >
//                           <Check className="w-4 h-4 mr-2" /> Marcar como
//                           entregado
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           className="text-destructive"
//                           onClick={() =>
//                             handleStatusChange(order._id, "cancelado")
//                           }
//                         >
//                           <X className="w-4 h-4 mr-2" /> Cancelar pedido
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </>
//   );
// };

// export default OrdersTable;
