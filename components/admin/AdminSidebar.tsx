"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Folder,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Produtos",
    href: "/admin/produtos",
    icon: Package,
  },
  {
    title: "Categorias",
    href: "/admin/categorias",
    icon: Folder,
  },
  {
    title: "Pedidos",
    href: "/admin/pedidos",
    icon: ShoppingCart,
  },
  {
    title: "Clientes",
    href: "/admin/clientes",
    icon: Users,
  },
  {
    title: "Relatórios",
    href: "/admin/relatorios",
    icon: BarChart3,
  },
  {
    title: "Configurações",
    href: "/admin/configuracoes",
    icon: Settings,
  },
]

function SidebarContent({ collapsed = false, onItemClick }: { collapsed?: boolean; onItemClick?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="p-4">
      <ul className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onItemClick}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100",
                  collapsed && "justify-center",
                )}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:block bg-white border-r border-gray-200 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <h2 className="text-lg xl:text-xl font-bold text-gray-900">Admin Panel</h2>}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="ml-auto">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
        <SidebarContent collapsed={collapsed} />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 bg-white shadow-md">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex items-center p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
            </div>
            <SidebarContent onItemClick={() => {}} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
