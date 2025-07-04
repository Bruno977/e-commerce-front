"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { CategoryProps } from "@/types/category";
import { getCategory } from "../lib/actions/get-category";
import { ErrorMessage } from "@/components/ui/error-message";
import { ProductCardSkeleton } from "@/components/ui/skeleton";
import { CategoryBasicInfo } from "../[id]/components/CategoryBasicInfo";
import { CategorySeoInfo } from "../[id]/components/CategorySeoInfo";
import { CategoryStats } from "../[id]/components/CategoryStats";
import { CategoryActions } from "../[id]/components/CategoryActions";
import { CategorySystemInfo } from "../[id]/components/CategorySystemInfo";
import { CategoryRelatedLinks } from "../[id]/components/CategoryRelatedLinks";

interface CategoryViewProps {
  categoryId: string;
}

export default function CategoryView({ categoryId }: CategoryViewProps) {
  const { data, isLoading, error, refetch } = useQuery<CategoryProps>({
    queryKey: ["category", categoryId],
    queryFn: () => getCategory({ categoryId }),
  });

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <ErrorMessage
            type="server"
            title="Erro ao Carregar Categoria"
            message={error?.message}
            onRetry={refetch}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <CategoryBasicInfo category={data} />
        <CategorySeoInfo category={data} />
        <CategoryStats category={data} />
      </div>

      <div className="space-y-6">
        <CategoryActions category={data} categoryId={categoryId} />
        <CategorySystemInfo category={data} />
        <CategoryRelatedLinks categoryId={categoryId} />
      </div>
    </div>
  );
}
