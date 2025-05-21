import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Mail, Phone, Calendar } from "lucide-react"
import type { UserCardProps } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

export function UserCard({ user, actions = true }: UserCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-50 text-red-600 border-red-200"
      case "manager":
        return "bg-purple-50 text-purple-600 border-purple-200"
      default:
        return "bg-blue-50 text-blue-600 border-blue-200"
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar || "/placeholder.svg?height=48&width=48"} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-base truncate">{user.name}</h3>
              {actions && (
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">{user.position}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className={`text-xs ${getRoleBadgeColor(user.role)}`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {user.department}
              </Badge>
              {!user.isActive && (
                <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                  Inactive
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Mail className="h-3 w-3" />
          {user.email}
        </div>
        {user.phone && (
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            {user.phone}
          </div>
        )}
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          Joined {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
        </div>
      </CardFooter>
    </Card>
  )
}
