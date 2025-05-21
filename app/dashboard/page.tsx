"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContainer } from "@/components/layout/page-container"
import { useTicketStore } from "@/lib/store/ticket-store"
import { useAuthStore } from "@/lib/store/auth-store"
import { TicketCard } from "@/components/tickets/ticket-card"
import { Button } from "@/components/ui/button"
import { Plus, CheckCircle, Clock, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { StatusBadge } from "@/components/ui/status-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

export default function Page() {
  const { tickets, fetchTickets, upvoteTicket, isLoading } = useTicketStore()
  const { user } = useAuthStore()

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  const openTickets = tickets.filter((ticket) => ticket.status === "open")
  const inProgressTickets = tickets.filter((ticket) => ticket.status === "in-progress")
  const resolvedTickets = tickets.filter((ticket) => ticket.status === "resolved" || ticket.status === "closed")

  // Filter tickets based on user role
  const userTickets =
    user?.role === "admin"
      ? tickets
      : tickets.filter(
          (ticket) => ticket.reporter.id === user?.id || ticket.assignee?.id === user?.id || !ticket.isPrivate,
        )

  const recentTickets = [...userTickets]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  const handleUpvote = (id: string) => {
    upvoteTicket(id, user?.id || "user1")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="heading-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
          <Link href="/tickets/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Ticket
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Open Tickets</CardTitle>
                <AlertCircle className="h-5 w-5 text-blue-500" />
              </div>
              <CardDescription>Tickets awaiting action</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{openTickets.length}</div>
              <div className="mt-2">
                <Link href="/tickets?status=open" className="text-sm text-primary hover:underline flex items-center">
                  View all open tickets
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">In Progress</CardTitle>
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
              <CardDescription>Tickets being worked on</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{inProgressTickets.length}</div>
              <div className="mt-2">
                <Link
                  href="/tickets?status=in-progress"
                  className="text-sm text-primary hover:underline flex items-center"
                >
                  View in-progress tickets
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Resolved</CardTitle>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <CardDescription>Completed tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{resolvedTickets.length}</div>
              <div className="mt-2">
                <Link
                  href="/tickets?status=resolved"
                  className="text-sm text-primary hover:underline flex items-center"
                >
                  View resolved tickets
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="heading-3 mb-4">Recent Tickets</h2>

            <div className="grid grid-cols-1 gap-4">
              {isLoading ? (
                <Card className="p-8 flex justify-center">
                  <div>Loading tickets...</div>
                </Card>
              ) : recentTickets.length === 0 ? (
                <Card className="p-8 flex justify-center">
                  <div className="text-center">
                    <p className="mb-2">No tickets found</p>
                    <Link href="/tickets/new">
                      <Button size="sm">Create your first ticket</Button>
                    </Link>
                  </div>
                </Card>
              ) : (
                recentTickets.map((ticket) => (
                  <Link key={ticket.id} href={`/tickets/${ticket.id}`}>
                    <TicketCard
                      ticket={ticket}
                      variant="list"
                      onUpvote={(id) => {
                        handleUpvote(id)
                      }}
                    />
                  </Link>
                ))
              )}

              {recentTickets.length > 0 && (
                <div className="flex justify-center mt-2">
                  <Link href="/tickets">
                    <Button variant="outline">View All Tickets</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="heading-3 mb-4">Recent Activity</h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {tickets.slice(0, 6).map((ticket) => (
                    <div key={ticket.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={ticket.reporter.avatar || "/placeholder.svg?height=32&width=32"}
                            alt={ticket.reporter.name}
                          />
                          <AvatarFallback>{getInitials(ticket.reporter.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{ticket.reporter.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm">
                            Created ticket:{" "}
                            <Link href={`/tickets/${ticket.id}`} className="text-primary hover:underline">
                              {ticket.title}
                            </Link>
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <StatusBadge status={ticket.status} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
