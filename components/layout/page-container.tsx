"use client"

import type React from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useAuthStore } from "@/lib/store/auth-store"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
  withSidebar?: boolean
}

export function PageContainer({ children, className, fullWidth = false, withSidebar = true }: PageContainerProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { user } = useAuthStore()

  return (
    <div className="h-screen flex">
      {withSidebar && user && (
        <Sidebar className="hidden md:flex" collapsed={sidebarCollapsed} />
      )}
      <div className="flex-1 flex flex-col">
        {!user && <Header />}
        <main className={cn("flex-1 overflow-auto h-screen", className)}>
          <div className={cn("h-full", fullWidth ? "w-full" : "container")}>{children}</div>
        </main>
      </div>
    </div>
  )
}
