import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Eletrônicos",
    description: "Smartphones, notebooks, tablets e acessórios",
    productsCount: 156,
    status: "Ativo",
    image: "/placeholder.svg?height=50&width=50",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Moda",
    description: "Roupas, calçados e acessórios de moda",
    productsCount: 89,
    status: "Ativo",
    image: "/placeholder.svg?height=50&width=50",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "Casa & Jardim",
    description: "Móveis, decoração e itens para jardim",
    productsCount: 234,
    status: "Ativo",
    image: "/placeholder.svg?height=50&width=50",
    createdAt: "2024-01-08",
  },
  {
    id: 4,
    name: "Esportes",
    description: "Equipamentos esportivos e fitness",
    productsCount: 67,
    status: "Inativo",
    image: "/placeholder.svg?height=50&width=50",
    createdAt: "2024-01-05",
  },
  {
    id: 5,
    name: "Livros",
    description: "Livros físicos e digitais",
    productsCount: 123,
    status: "Ativo",
    image: "/placeholder.svg?height=50&width=50",
    createdAt: "2024-01-03",
  },
]

export default function CategoriesTable() {
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
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    <span className="font-medium">{category.name}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="text-sm text-gray-600 truncate">{category.description}</p>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{category.productsCount}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={category.status === "Ativo" ? "default" : "secondary"}>{category.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {new Date(category.createdAt).toLocaleDateString("pt-BR")}
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
  )
}
