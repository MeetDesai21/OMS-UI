"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Ticket,
  KanbanSquare,
  BarChart3,
  Settings,
  Users,
  FolderKanban,
  LogOut,
  HelpCircle,
  User,
  Bell,
  Plus,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/auth-store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarProps {
  className?: string
  collapsed?: boolean
}

export function Sidebar({ className, collapsed = false }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, unreadNotificationsCount } = useAuthStore()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase() || "U"
    )
  }

  const adminNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Tickets",
      href: "/tickets",
      icon: Ticket,
    },
    {
      title: "Kanban",
      href: "/kanban",
      icon: KanbanSquare,
    },
    {
      title: "Categories",
      href: "/admin/categories",
      icon: FolderKanban,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
    },
    {
      title: "System Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  const userNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Tickets",
      href: "/tickets",
      icon: Ticket,
    },
  ]

  const navItems = user?.role === "admin" ? adminNavItems : userNavItems

  const bottomNavItems = [
    {
      title: "Profile",
      href: "/profile",
      icon: User,
    },
    {
      title: "Notifications",
      href: "/notifications",
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      title: "Help & Support",
      href: "/help",
      icon: HelpCircle,
    },
  ]

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex flex-col border-r bg-background transition-all duration-300 justify-between h-screen",
          collapsed ? "w-[70px]" : "w-64",
          className,
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <span className="font-playfair text-xl font-bold">OMS</span>
            </Link>
          )}
        </div>
        <div className="flex-1 pt-2 pb-2">
          <div className="px-4 mb-2">
            {!collapsed ? (
              <Link href="/tickets/new">
                <Button className="w-full justify-start gap-2">
                  <Plus className="h-4 w-4" />
                  New Ticket
                </Button>
              </Link>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/tickets/new">
                    <Button size="icon" className="w-10 h-10">
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">New Ticket</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">New Ticket</TooltipContent>
              </Tooltip>
            )}
          </div>
          <nav className="flex flex-col gap-0.5 px-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return collapsed ? (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md",
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{item.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-1 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="border-t py-1">
          <nav className="flex flex-col gap-0.5 px-2">
            {bottomNavItems.map((item) => {
              const Icon = item.icon
              return collapsed ? (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex h-10 w-10 items-center justify-center rounded-md",
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.badge && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                          {item.badge}
                        </Badge>
                      )}
                      <span className="sr-only">{item.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-1 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  <div className="relative">
                    <Icon className="h-5 w-5" />
                    {item.badge && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  {item.title}
                </Link>
              )
            })}
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-muted-foreground hover:text-foreground"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Logout</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Logout</TooltipContent>
              </Tooltip>
            ) : (
              <Button
                variant="ghost"
                className="justify-start gap-3 px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            )}
          </nav>
          {!collapsed && (
            <div className="px-2 mt-1">
              <div className="flex items-center gap-2 rounded-md border p-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user?.avatar || "/placeholder.svg?height=32&width=32"} alt={user?.name || "User"} />
                  <AvatarFallback>{getInitials(user?.name || "User")}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xs font-medium truncate">{user?.name}</span>
                  <span className="text-[10px] text-muted-foreground truncate">{user?.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}
