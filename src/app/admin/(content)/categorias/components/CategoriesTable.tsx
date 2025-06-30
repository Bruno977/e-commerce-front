"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/getCategories";
import { CategoryProps } from "@/types/category";
import Pagination from "@/components/pagination";
import { PaginationProps } from "@/types/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorMessage } from "@/components/ui/error-message";
import { TableRowSkeleton } from "@/components/ui/skeleton";

interface DataProps {
  categories: CategoryProps[];
  pagination: PaginationProps;
}

export default function CategoriesTable() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = parseInt(searchParams.get("perPage") || "10", 10);

  const { data, isLoading, error, refetch } = useQuery<DataProps>({
    queryKey: ["categories", currentPage, itemsPerPage],
    queryFn: () => getCategories({ page: currentPage, perPage: itemsPerPage }),
    placeholderData: (previousData) => previousData,
  });

  const totalItems = data?.pagination.totalItems || 0;
  const totalPages = data?.pagination.totalPages || 1;
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    router.push(`?page=1&perPage=${newItemsPerPage}`);
  };

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}&perPage=${itemsPerPage}`);
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Categorias</CardTitle>
      </CardHeader>

      {error ? (
        <ErrorMessage message={error.message} onRetry={handleRetry} />
      ) : (
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Produtos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRowSkeleton rows={10} />
                ) : (
                  <>
                    {data?.categories?.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Image
                              src={"/placeholder.svg"}
                              alt={category.title}
                              width={50}
                              height={50}
                              className="rounded-md"
                            />
                            <span className="font-medium">
                              {category.title}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-gray-600 truncate">
                            {category.description}
                          </p>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            {category.product_count}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              category.is_active ? "default" : "secondary"
                            }
                          >
                            Ativo
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">
                            {new Date(category.created_at).toLocaleDateString(
                              "pt-BR"
                            )}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/admin/categorias/${category.id}`}>
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <Link
                                href={`/admin/categorias/${category.id}/editar`}
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </div>
          {!isLoading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </CardContent>
      )}
    </Card>
  );
}
