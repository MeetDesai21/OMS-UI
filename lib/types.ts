export type TicketStatus = "open" | "in-progress" | "review" | "resolved" | "closed"
export type Priority = "low" | "medium" | "high" | "urgent"
export type Severity = "low" | "medium" | "high" | "critical"
export type UserRole = "user" | "admin" | "manager"
export type NotificationType = "ticket_created" | "ticket_updated" | "ticket_assigned" | "ticket_resolved" | "mention"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  department?: string
  position?: string
  phone?: string
  createdAt: Date
  lastActive?: Date
  isActive: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  color: string
  icon: string
  parentId?: string
  children?: Category[]
  itemCount: number
}

export interface Comment {
  id: string
  content: string
  author: User
  createdAt: Date
  updatedAt?: Date
  mentions?: string[]
}

export interface Attachment {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadedBy: User
  uploadedAt: Date
}

export interface Ticket {
  id: string
  title: string
  description: string
  category: Category
  status: TicketStatus
  priority: Priority
  severity: Severity
  upvotes: number
  upvotedBy: string[]
  assignee?: User
  reporter: User
  comments: Comment[]
  attachments: Attachment[]
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
  dueDate?: Date
  tags: string[]
  isPrivate: boolean
  watchers: string[]
}

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  message: string
  relatedId?: string
  isRead: boolean
  createdAt: Date
}

export interface TicketCardProps {
  ticket: Ticket
  variant: "list" | "grid" | "kanban"
  onUpvote: (id: string) => void
  onStatusChange?: (id: string, status: TicketStatus) => void
}

export interface UpvoteButtonProps {
  count: number
  voted: boolean
  onVote: () => void
  size?: "sm" | "md" | "lg"
}

export interface SeverityBadgeProps {
  severity: Severity
  showIcon?: boolean
}

export interface PriorityBadgeProps {
  priority: Priority
  showIcon?: boolean
}

export interface StatusBadgeProps {
  status: TicketStatus
  showIcon?: boolean
}

export interface UserCardProps {
  user: User
  actions?: boolean
}

export interface DashboardStats {
  totalTickets: number
  openTickets: number
  resolvedTickets: number
  averageResolutionTime: number
  ticketsByCategory: { category: string; count: number }[]
  ticketsByPriority: { priority: Priority; count: number }[]
  recentActivity: {
    id: string
    type: string
    user: string
    target: string
    timestamp: Date
  }[]
}

export interface UserSettings {
  userId: string
  theme: "light" | "dark" | "system"
  emailNotifications: boolean
  desktopNotifications: boolean
  language: string
}
