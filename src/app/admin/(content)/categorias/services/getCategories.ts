"use server";
import { api } from "@/app/admin/config/api";

export async function getCategories() {
  const response = await api.get("/categories");
  return response.data;
}
