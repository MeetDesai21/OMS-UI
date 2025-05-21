import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SeverityBadge } from "./severity-badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { PriorityBadge } from "@/components/ui/priority-badge"
import { UpvoteButton } from "./upvote-button"
import type { TicketCardProps } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar, MessageSquare, Paperclip } from "lucide-react"

export function TicketCard({ ticket, variant, onUpvote, onStatusChange }: TicketCardProps) {
  const handleUpvote = () => {
    onUpvote(ticket.id)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const cardClasses = {
    list: "flex flex-col md:flex-row md:items-center gap-4",
    grid: "flex flex-col",
    kanban: "flex flex-col h-full",
  }

  return (
    <Card
      className={cn("overflow-hidden transition-all duration-200 hover:shadow-md", variant === "kanban" && "h-full")}
    >
      <CardHeader className="p-3 pb-0">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <StatusBadge status={ticket.status} />
              <SeverityBadge severity={ticket.severity} />
              {ticket.isPrivate && (
                <Badge variant="outline" className="text-xs bg-gray-50 border-gray-200">
                  Private
                </Badge>
              )}
            </div>
            <h3 className="font-medium text-base line-clamp-2">{ticket.title}</h3>
          </div>
          <UpvoteButton
            count={ticket.upvotes}
            voted={ticket.upvotedBy.includes("user1")}
            onVote={handleUpvote}
            size="sm"
          />
        </div>
      </CardHeader>
      <CardContent className={cn("p-3 pt-2", cardClasses[variant])}>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{ticket.description}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {ticket.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-2 py-0 h-5">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <PriorityBadge priority={ticket.priority} />

          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
          </div>

          {ticket.comments.length > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {ticket.comments.length}
            </div>
          )}

          {ticket.attachments.length > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="h-3 w-3" />
              {ticket.attachments.length}
            </div>
          )}
        </div>

        {ticket.assignee ? (
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={ticket.assignee.avatar || "/placeholder.svg?height=24&width=24"}
              alt={ticket.assignee.name}
            />
            <AvatarFallback className="text-xs">{getInitials(ticket.assignee.name)}</AvatarFallback>
          </Avatar>
        ) : (
          <Badge variant="outline" className="text-xs h-5 px-2 py-0">
            Unassigned
          </Badge>
        )}
      </CardFooter>
    </Card>
  )
}
