"use server";
import { api } from "../../../../config/api";
import { CategoryFormData } from "../../components/CategoryForm";

export async function createCategory({
  title,
  description,
  isActive,
}: CategoryFormData) {
  await api.post("/categories", {
    title,
    description,
    isActive,
  });
}
