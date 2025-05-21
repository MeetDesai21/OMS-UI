import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp, AlertTriangle, Zap } from "lucide-react"
import type { PriorityBadgeProps } from "@/lib/types"
import { cn } from "@/lib/utils"

export function PriorityBadge({ priority, showIcon = true }: PriorityBadgeProps) {
  const config = {
    low: {
      variant: "outline" as const,
      label: "Low",
      icon: ArrowDown,
      className: "text-blue-600 bg-blue-50 border-blue-200",
    },
    medium: {
      variant: "outline" as const,
      label: "Medium",
      icon: ArrowUp,
      className: "text-yellow-600 bg-yellow-50 border-yellow-200",
    },
    high: {
      variant: "outline" as const,
      label: "High",
      icon: AlertTriangle,
      className: "text-orange-600 bg-orange-50 border-orange-200",
    },
    urgent: {
      variant: "outline" as const,
      label: "Urgent",
      icon: Zap,
      className: "text-red-600 bg-red-50 border-red-200",
    },
  }

  const { variant, label, icon: Icon, className } = config[priority]

  return (
    <Badge variant={variant} className={cn("gap-1", className)}>
      {showIcon && <Icon className="h-3 w-3" />}
      {label}
    </Badge>
  )
}
