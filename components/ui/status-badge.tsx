import { Badge } from "@/components/ui/badge"
import { Clock, Play, CheckCircle, XCircle, RotateCcw } from "lucide-react"
import type { StatusBadgeProps } from "@/lib/types"
import { cn } from "@/lib/utils"

export function StatusBadge({ status, showIcon = true }: StatusBadgeProps) {
  const config = {
    open: {
      variant: "outline" as const,
      label: "Open",
      icon: Clock,
      className: "text-blue-600 bg-blue-50 border-blue-200",
    },
    "in-progress": {
      variant: "outline" as const,
      label: "In Progress",
      icon: Play,
      className: "text-yellow-600 bg-yellow-50 border-yellow-200",
    },
    review: {
      variant: "outline" as const,
      label: "Review",
      icon: RotateCcw,
      className: "text-purple-600 bg-purple-50 border-purple-200",
    },
    resolved: {
      variant: "outline" as const,
      label: "Resolved",
      icon: CheckCircle,
      className: "text-green-600 bg-green-50 border-green-200",
    },
    closed: {
      variant: "outline" as const,
      label: "Closed",
      icon: XCircle,
      className: "text-gray-600 bg-gray-50 border-gray-200",
    },
  }

  const { variant, label, icon: Icon, className } = config[status]

  return (
    <Badge variant={variant} className={cn("gap-1", className)}>
      {showIcon && <Icon className="h-3 w-3" />}
      {label}
    </Badge>
  )
}
