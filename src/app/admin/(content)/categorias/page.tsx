import CategoriesTable from "./components/CategoriesTable";
import { Button } from "@/components/ui/button";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getCategories } from "./services/getCategories";

export default async function AdminCategoriesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
          <p className="text-gray-600">
            Gerencie as categorias dos seus produtos
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/categorias/nova">
            <Plus className="w-4 h-4 mr-2" />
            Nova Categoria
          </Link>
        </Button>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoriesTable />
      </HydrationBoundary>
    </div>
  );
}
