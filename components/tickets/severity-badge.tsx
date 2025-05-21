import { Badge } from "@/components/ui/badge"
import { AlertTriangle, AlertCircle, AlertOctagon, Info } from "lucide-react"
import type { SeverityBadgeProps } from "@/lib/types"
import { cn } from "@/lib/utils"

export function SeverityBadge({ severity, showIcon = true }: SeverityBadgeProps) {
  const config = {
    low: {
      variant: "outline" as const,
      label: "Low",
      icon: Info,
      className: "text-blue-600 bg-blue-50 border-blue-200",
    },
    medium: {
      variant: "outline" as const,
      label: "Medium",
      icon: AlertCircle,
      className: "text-yellow-600 bg-yellow-50 border-yellow-200",
    },
    high: {
      variant: "outline" as const,
      label: "High",
      icon: AlertTriangle,
      className: "text-orange-600 bg-orange-50 border-orange-200",
    },
    critical: {
      variant: "outline" as const,
      label: "Critical",
      icon: AlertOctagon,
      className: "text-red-600 bg-red-50 border-red-200",
    },
  }

  const { variant, label, icon: Icon, className } = config[severity]

  return (
    <Badge variant={variant} className={cn("gap-1", className)}>
      {showIcon && <Icon className="h-3 w-3" />}
      {label}
    </Badge>
  )
}
