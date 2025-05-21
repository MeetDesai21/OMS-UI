"use client"

import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import type { UpvoteButtonProps } from "@/lib/types"
import { cn } from "@/lib/utils"

export function UpvoteButton({ count, voted, onVote, size = "md" }: UpvoteButtonProps) {
  const sizeClasses = {
    sm: "h-7 min-w-[2.5rem] text-xs",
    md: "h-9 min-w-[3rem] text-sm",
    lg: "h-10 min-w-[3.5rem] text-base",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <Button
      variant={voted ? "default" : "outline"}
      size="sm"
      className={cn("flex flex-col items-center justify-center gap-0.5 p-1", sizeClasses[size])}
      onClick={onVote}
    >
      <ArrowUp className={cn("transition-transform", iconSizes[size], voted && "fill-current")} />
      <span>{count}</span>
    </Button>
  )
}
