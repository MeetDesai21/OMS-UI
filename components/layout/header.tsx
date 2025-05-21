"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu, Moon, Search, Sun, Settings, LogOut, User, HelpCircle, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/lib/store/auth-store"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const router = useRouter()

  const { user, logout, notifications, unreadNotificationsCount, markNotificationAsRead, markAllNotificationsAsRead } =
    useAuthStore()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
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

  const formatNotificationTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()

    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <span className="font-playfair text-xl font-bold">OMS</span>
          </Link>
        </div>

        {searchOpen ? (
          <div className="absolute left-0 top-0 w-full h-16 px-4 flex items-center bg-background z-50">
            <Input
              type="search"
              placeholder="Search tickets, users, or categories..."
              className="flex-1 h-10"
              autoFocus
            />
            <Button variant="ghost" size="icon" className="ml-2" onClick={() => setSearchOpen(false)}>
              <Check className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link href="/tickets" className="text-sm font-medium hover:text-primary">
              Tickets
            </Link>
            <Link href="/kanban" className="text-sm font-medium hover:text-primary">
              Kanban
            </Link>
            {user?.role === "admin" && (
              <>
                <Link href="/admin/users" className="text-sm font-medium hover:text-primary">
                  Users
                </Link>
                <Link href="/admin/analytics" className="text-sm font-medium hover:text-primary">
                  Analytics
                </Link>
              </>
            )}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadNotificationsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                    {unreadNotificationsCount}
                  </Badge>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                {unreadNotificationsCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllNotificationsAsRead}>
                    Mark all as read
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-4 px-2 text-center text-muted-foreground">No notifications</div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`flex flex-col items-start p-3 ${!notification.isRead ? "bg-muted/50" : ""}`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between w-full">
                        <p className="text-sm">{notification.message}</p>
                        <span className="text-xs text-muted-foreground ml-2">
                          {formatNotificationTime(notification.createdAt)}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 ml-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || "/placeholder.svg?height=32&width=32"} alt={user?.name || "User"} />
                  <AvatarFallback>{getInitials(user?.name || "User")}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user?.name}</span>
                  <span className="text-xs text-muted-foreground">{user?.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/help")}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[250px] sm:w-[300px]">
          <SheetHeader>
            <SheetTitle className="font-playfair">Office Management</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 mt-8">
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/tickets"
              className="text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tickets
            </Link>
            <Link
              href="/kanban"
              className="text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kanban
            </Link>
            {user?.role === "admin" && (
              <>
                <Link
                  href="/admin/users"
                  className="text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Users
                </Link>
                <Link
                  href="/admin/analytics"
                  className="text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Analytics
                </Link>
                <Link
                  href="/admin/categories"
                  className="text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Categories
                </Link>
              </>
            )}
            <div className="border-t my-4"></div>
            <Link
              href="/profile"
              className="text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Settings
            </Link>
            <Link
              href="/help"
              className="text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Help & Support
            </Link>
            <Button variant="ghost" className="justify-start pl-2" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
