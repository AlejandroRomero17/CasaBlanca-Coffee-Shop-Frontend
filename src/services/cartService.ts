// src/services/cartService.ts
import API from "./api";
import { getSessionId } from "@/utils/session";

export interface TempCartItem {
  id_cart_temp: string;
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  quantity: number;
}

export interface UserCartItem {
  id_cart: string;
  user_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  quantity: number;
}

/**
 * Agrega un producto al carrito temporal
 */
export async function addToTempCart(item: {
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  quantity: number;
}) {
  const session_id = getSessionId();
  const res = await API.post<{ success: boolean; cartCount: number }>(
    "/cart/temp",
    { session_id, ...item }
  );
  return res.data;
}

/**
 * Trae todos los items del carrito temporal
 */
export async function fetchTempCart(): Promise<TempCartItem[]> {
  const session_id = getSessionId();
  const res = await API.get<TempCartItem[]>("/cart/temp", {
    params: { session_id },
  });
  return res.data;
}

/**
 * Elimina un item del carrito temporal
 */
export async function deleteFromTempCart(id_cart_temp: string) {
  const session_id = getSessionId();
  await API.post("/cart/temp/delete", { session_id, id_cart_temp });
}

/**
 * Actualiza qty en carrito temporal
 */
export async function updateTempCartQty(
  id_cart_temp: string,
  quantity: number
) {
  const session_id = getSessionId();
  await API.post("/cart/temp/update-qty", {
    session_id,
    id_cart_temp,
    quantity,
  });
}

/**
 * Agrega al carrito de un usuario autenticado
 */
export async function addToUserCart(item: {
  user_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  quantity: number;
}) {
  const res = await API.post<{ success: boolean; cartCount: number }>(
    "/cart/user/add",
    item
  );
  return res.data;
}

/**
 * Obtiene el carrito del usuario
 */
export async function getUserCart(user_id: string): Promise<UserCartItem[]> {
  const res = await API.get<{ cart: UserCartItem[] }>(`/cart/user/${user_id}`);
  return res.data.cart;
}

/**
 * Transfiere el carrito temporal al usuario
 */
export async function transferTempCartToUser(
  session_id: string,
  user_id: string
) {
  const res = await API.post("/cart/transfer-temp-to-user", {
    session_id,
    user_id,
  });
  return res.data;
}

/**
 * Elimina item del carrito de usuario
 */
export async function deleteFromUserCart(id_cart: string) {
  await API.post("/cart/user/delete", { id_cart });
}

/**
 * Actualiza qty en carrito de usuario
 */
export async function updateUserCartQty(id_cart: string, quantity: number) {
  await API.post("/cart/user/update-qty", { id_cart, quantity });
}
