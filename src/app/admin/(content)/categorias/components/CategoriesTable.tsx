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

interface DataProps {
  categories: CategoryProps[];
}

export default function CategoriesTable() {
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { data } = useQuery<DataProps>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Categorias</CardTitle>
      </CardHeader>
      <CardContent>
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
                    <span className="font-medium">{category.title}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="text-sm text-gray-600 truncate">
                    {category.description}
                  </p>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{category.product_count}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={category.is_active ? "default" : "secondary"}>
                    Ativo
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {new Date(category.created_at).toLocaleDateString("pt-BR")}
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
                      <Link href={`/admin/categorias/${category.id}/editar`}>
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
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
