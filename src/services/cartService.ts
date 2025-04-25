import axios from "axios";


export function isAuthenticated() {

  return !!localStorage.getItem('token');
}


export function getUserId() {
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user?.id || null;
}


export function getSessionId() {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

export async function fetchCart(session_id: string) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/cart/temp`,
      { params: { session_id } }
    );
    return response.data;
  } catch (error: any) {
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


export async function addToCart(product: {
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  quantity: number;
}) {
  if (isAuthenticated()) {
    const user_id = getUserId();
    console.log('[FRONTEND][addToCart] Authenticated user_id:', user_id);
    console.log('[FRONTEND][addToCart] Product payload:', product);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cart/user/add`, {
      user_id,
      ...product
    });
    console.log('[FRONTEND][addToCart] Backend response:', response.data);
   
    window.dispatchEvent(new Event('cart:refresh'));
    return response;
  } else {
    const session_id = getSessionId();
    console.log('[FRONTEND][addToCart] Guest session_id:', session_id);
    console.log('[FRONTEND][addToCart] Product payload:', product);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cart/temp`, {
      session_id,
      ...product
    });
    console.log('[FRONTEND][addToCart] Backend response:', response.data);
    return response;
  }
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

export async function updateCartQtyAuth(id_cart: string, quantity: number) {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/api/cart/user/update-qty`,
    { id_cart, quantity }
  );
}

export async function deleteFromCartAuth(id_cart: string) {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/api/cart/user/delete`,
    { id_cart }
  );
}

export async function transferTempCartToUser(session_id: string, user_id: string) {

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cart/transfer-temp-to-user`,
    { session_id, user_id }
  );
  return response.data;
}

export async function getCartByUser(user_id: string) {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart/user/${user_id}`);
  return response.data.cart;
}
