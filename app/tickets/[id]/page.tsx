"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { PageContainer } from "@/components/layout/page-container"
import { useTicketStore } from "@/lib/store/ticket-store"
import { useAuthStore } from "@/lib/store/auth-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SeverityBadge } from "@/components/tickets/severity-badge"
import { UpvoteButton } from "@/components/tickets/upvote-button"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { ArrowLeft, Paperclip, Send, Trash2, Edit, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Page() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuthStore()
  const { tickets, getTicketById, fetchTickets, upvoteTicket, changeTicketStatus, deleteTicket, updateTicket } =
    useTicketStore()
  const [ticket, setTicket] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const loadTicket = async () => {
      setIsLoading(true)
      await fetchTickets()
      const foundTicket = getTicketById(params.id)
      if (foundTicket) {
        setTicket(foundTicket)
      }
      setIsLoading(false)
    }

    loadTicket()
  }, [fetchTickets, getTicketById, params.id])

  const handleUpvote = () => {
    if (ticket) {
      upvoteTicket(ticket.id, "user1")
      // Update local state
      setTicket({
        ...ticket,
        upvotes: ticket.upvotedBy.includes("user1") ? ticket.upvotes - 1 : ticket.upvotes + 1,
        upvotedBy: ticket.upvotedBy.includes("user1")
          ? ticket.upvotedBy.filter((id) => id !== "user1")
          : [...ticket.upvotedBy, "user1"],
      })
    }
  }

  const handleStatusChange = async (status) => {
    if (ticket) {
      await changeTicketStatus(ticket.id, status)
      // Update local state
      setTicket({
        ...ticket,
        status,
        resolvedAt: status === "resolved" ? new Date() : ticket.resolvedAt,
        updatedAt: new Date(),
      })
    }
  }

  const handleAddComment = async () => {
    if (!newComment.trim() || !ticket) return

    setIsSubmittingComment(true)

    try {
      const updatedTicket = await updateTicket(ticket.id, {
        comments: [
          ...ticket.comments,
          {
            id: `comment-${Date.now()}`,
            content: newComment,
            author: {
              id: "user1",
              name: "John Doe",
              email: "user@office.com",
              role: "user",
              department: "Marketing",
            },
            createdAt: new Date(),
          },
        ],
      })

      setTicket(updatedTicket)
      setNewComment("")
    } catch (error) {
      console.error("Failed to add comment:", error)
    } finally {
      setIsSubmittingComment(false)
    }
  }

  const handleDeleteTicket = async () => {
    if (!ticket) return

    if (!confirm("Are you sure you want to delete this ticket? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteTicket(ticket.id)
      router.push("/tickets")
    } catch (error) {
      console.error("Failed to delete ticket:", error)
      setIsDeleting(false)
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-64">
          <p>Loading ticket...</p>
        </div>
      </PageContainer>
    )
  }

  if (!ticket) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-muted-foreground mb-4">Ticket not found</p>
          <Link href="/tickets">
            <Button>Back to Tickets</Button>
          </Link>
        </div>
      </PageContainer>
    )
  }

  const statusColors = {
    open: "bg-blue-50 text-blue-700 border-blue-200",
    "in-progress": "bg-yellow-50 text-yellow-700 border-yellow-200",
    review: "bg-purple-50 text-purple-700 border-purple-200",
    resolved: "bg-green-50 text-green-700 border-green-200",
    closed: "bg-gray-50 text-gray-700 border-gray-200",
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link href="/tickets">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Tickets
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className={cn("px-2 py-0.5 text-xs font-medium border", statusColors[ticket.status])}>
                        {ticket.status.replace("-", " ")}
                      </Badge>
                      <SeverityBadge severity={ticket.severity} />
                      <Badge variant="outline">{ticket.priority}</Badge>
                    </div>
                    <CardTitle className="text-2xl">{ticket.title}</CardTitle>
                    <CardDescription>
                      Created {format(new Date(ticket.createdAt), "PPP")} by {ticket.reporter.name}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <UpvoteButton
                      count={ticket.upvotes}
                      voted={ticket.upvotedBy.includes("user1")}
                      onVote={handleUpvote}
                    />
                    <Link href={`/tickets/${ticket.id}/edit`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-destructive hover:text-destructive"
                      onClick={handleDeleteTicket}
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4" />
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line">{ticket.description}</p>
                </div>

                <div className="flex flex-wrap gap-1 mt-4">
                  {ticket.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {ticket.attachments.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Attachments</h3>
                    <div className="space-y-2">
                      {ticket.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center gap-2 p-2 border rounded-md hover:bg-muted/50"
                        >
                          <Paperclip className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{attachment.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(attachment.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Comments</h3>
                  <div className="space-y-4">
                    {ticket.comments.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No comments yet.</p>
                    ) : (
                      ticket.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                            <AvatarFallback>{getInitials(comment.author.name)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-muted p-3 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div className="font-medium">{comment.author.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {format(new Date(comment.createdAt), "PPp")}
                                </div>
                              </div>
                              <p className="mt-1 text-sm whitespace-pre-line">{comment.content}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-4">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="Your Avatar" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex justify-end mt-2">
                          <Button
                            onClick={handleAddComment}
                            disabled={!newComment.trim() || isSubmittingComment}
                            className="gap-1"
                          >
                            <Send className="h-4 w-4" />
                            {isSubmittingComment ? "Sending..." : "Send"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ticket Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                  <Badge className={cn("px-2 py-1 text-sm font-medium border", statusColors[ticket.status])}>
                    {ticket.status.replace("-", " ")}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Category</h3>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: ticket.category.color || "#9B7EDE" }}
                    ></div>
                    <span>{ticket.category.name}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Assignee</h3>
                  {ticket.assignee ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={ticket.assignee.avatar || "/placeholder.svg"} alt={ticket.assignee.name} />
                        <AvatarFallback>{getInitials(ticket.assignee.name)}</AvatarFallback>
                      </Avatar>
                      <span>{ticket.assignee.name}</span>
                    </div>
                  ) : (
                    <Badge variant="outline">Unassigned</Badge>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Reporter</h3>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={ticket.reporter.avatar || "/placeholder.svg"} alt={ticket.reporter.name} />
                      <AvatarFallback>{getInitials(ticket.reporter.name)}</AvatarFallback>
                    </Avatar>
                    <span>{ticket.reporter.name}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Created</h3>
                  <p>{format(new Date(ticket.createdAt), "PPP")}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Updated</h3>
                  <p>{format(new Date(ticket.updatedAt), "PPP")}</p>
                </div>

                {ticket.resolvedAt && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Resolved</h3>
                    <p>{format(new Date(ticket.resolvedAt), "PPP")}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                {user?.role === "admin" && (
                  <>
                    <h3 className="text-sm font-medium w-full">Change Status</h3>
                    <div className="grid grid-cols-2 gap-2 w-full">
                      {ticket.status !== "open" && (
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange("open")}>
                          Set as Open
                        </Button>
                      )}
                      {ticket.status !== "in-progress" && (
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange("in-progress")}>
                          Set In Progress
                        </Button>
                      )}
                      {ticket.status !== "review" && (
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange("review")}>
                          Set for Review
                        </Button>
                      )}
                      {ticket.status !== "resolved" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-green-600"
                          onClick={() => handleStatusChange("resolved")}
                        >
                          <CheckCircle className="h-4 w-4" />
                          Resolve
                        </Button>
                      )}
                      {ticket.status !== "closed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-gray-600"
                          onClick={() => handleStatusChange("closed")}
                        >
                          <XCircle className="h-4 w-4" />
                          Close
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
