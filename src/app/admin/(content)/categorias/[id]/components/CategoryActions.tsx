import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CategoryProps } from "@/types/category";
import { Edit, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";

interface CategoryDataProps {
  category?: CategoryProps;
  categoryId?: string;
}
export function CategoryActions({ category, categoryId }: CategoryDataProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full" asChild>
          <Link href={`/admin/categorias/${categoryId}/editar`}>
            <Edit className="w-4 h-4 mr-2" />
            Editar Categoria
          </Link>
        </Button>

        <Button variant="outline" className="w-full bg-transparent" asChild>
          <Link href={`/categorias/${category?.slug}`} target="_blank">
            <ExternalLink className="w-4 h-4 mr-2" />
            Ver na Loja
          </Link>
        </Button>

        <Separator />

        <Button
          variant="destructive"
          className="w-full"
          // onClick={handleDelete}
          // disabled={deleteCategory.loading}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Deletar Categoria
          {/* {deleteCategory.loading ? "Deletando..." : "Deletar Categoria"} */}
        </Button>
      </CardContent>
    </Card>
  );
}
