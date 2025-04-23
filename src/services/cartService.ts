import axios from "axios";

export async function fetchCart(session_id: string) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/cart/temp`,
      { params: { session_id } }
    );
    return response.data;
  } catch (error: any) {
    // Si el carrito no existe, intenta crearlo y luego vuelve a pedirlo
    if (error.response && error.response.status === 404) {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/cart/temp`, { session_id });
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cart/temp`,
        { params: { session_id } }
      );
      return response.data;
    }
    throw error;
  }
}

export async function addToCart(
  session_id: string,
  product: { product_id: string; product_name: string; product_image: string; product_price: number; quantity?: number }
) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cart/temp`,
    { session_id, ...product }
  );
  return response.data;
}

export async function deleteFromCart(session_id: string, id_cart_temp: string) {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/api/cart/temp/delete`,
    { session_id, id_cart_temp }
  );
}

export async function updateCartQty(session_id: string, id_cart_temp: string, quantity: number) {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/api/cart/temp/update-qty`,
    { session_id, id_cart_temp, quantity }
  );
}

export async function transferTempCartToUser(session_id: string, user_id: string) {

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cart/transfer-temp-to-user`,
    { session_id, user_id }
  );
  return response.data;
}
