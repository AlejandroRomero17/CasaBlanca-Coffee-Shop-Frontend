import API from "./api";
import { Address } from "@/types/user";

export async function getAddresses(): Promise<Address[]> {
  const res = await API.get<Address[]>("/users/addresses");
  return res.data;
}

export async function addAddress(
  addr: Omit<Address, "id" | "created_at" | "updated_at">
): Promise<Address[]> {
  const res = await API.post<Address[]>("/users/addresses", addr);
  return res.data;
}
