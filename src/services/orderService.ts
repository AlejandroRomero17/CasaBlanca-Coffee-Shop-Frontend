import API from "./api";

export async function getOrdersByUser() {
  console.log("📦 solicitando /orders/user"); // debug
  const response = await API.get("/orders/user");
  return response.data;
}
