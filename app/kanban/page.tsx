"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { PageContainer } from "@/components/layout/page-container"
import { useTicketStore } from "@/lib/store/ticket-store"
import { TicketCard } from "@/components/tickets/ticket-card"
import { Button } from "@/components/ui/button"
import { Plus, Filter } from "lucide-react"
import Link from "next/link"
import type { Ticket, TicketStatus } from "@/lib/types"

export default function Page() {
  const { tickets, fetchTickets, upvoteTicket, changeTicketStatus, isLoading } = useTicketStore()
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all")

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  const handleUpvote = (id: string) => {
    upvoteTicket(id, "user1")
  }

  const handleDragStart = (e: React.DragEvent, ticketId: string) => {
    e.dataTransfer.setData("ticketId", ticketId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, status: TicketStatus) => {
    e.preventDefault()
    const ticketId = e.dataTransfer.getData("ticketId")
    changeTicketStatus(ticketId, status)
  }

  const getFilteredTickets = (status: TicketStatus) => {
    return tickets.filter(
      (ticket) => ticket.status === status && (categoryFilter === "all" || ticket.category.id === categoryFilter),
    )
  }

  // Get unique categories from tickets
  const categories = Array.from(new Set(tickets.map((ticket) => ticket.category.id)))
    .map((id) => tickets.find((ticket) => ticket.category.id === id)?.category)
    .filter(Boolean) as Ticket["category"][]

  return (
    <PageContainer fullWidth>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="heading-2">Kanban Board</h1>
            <p className="text-muted-foreground">Visualize and manage your workflow</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                className="bg-background border rounded-md px-2 py-1 text-sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <Link href="/tickets/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Ticket
              </Button>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-8">
            <div>Loading tickets...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-[calc(100vh-200px)]">
            <div
              className="flex flex-col gap-4 bg-muted/50 p-4 rounded-lg overflow-y-auto"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "open")}
            >
              <div className="flex justify-between items-center sticky top-0 bg-muted/50 p-2 rounded-md z-10">
                <h3 className="font-medium">Open</h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {getFilteredTickets("open").length}
                </span>
              </div>
              {getFilteredTickets("open").map((ticket) => (
                <div key={ticket.id} draggable onDragStart={(e) => handleDragStart(e, ticket.id)}>
                  <Link href={`/tickets/${ticket.id}`}>
                    <TicketCard ticket={ticket} variant="kanban" onUpvote={handleUpvote} />
                  </Link>
                </div>
              ))}
            </div>

            <div
              className="flex flex-col gap-4 bg-muted/50 p-4 rounded-lg overflow-y-auto"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "in-progress")}
            >
              <div className="flex justify-between items-center sticky top-0 bg-muted/50 p-2 rounded-md z-10">
                <h3 className="font-medium">In Progress</h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {getFilteredTickets("in-progress").length}
                </span>
              </div>
              {getFilteredTickets("in-progress").map((ticket) => (
                <div key={ticket.id} draggable onDragStart={(e) => handleDragStart(e, ticket.id)}>
                  <Link href={`/tickets/${ticket.id}`}>
                    <TicketCard ticket={ticket} variant="kanban" onUpvote={handleUpvote} />
                  </Link>
                </div>
              ))}
            </div>

            <div
              className="flex flex-col gap-4 bg-muted/50 p-4 rounded-lg overflow-y-auto"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "review")}
            >
              <div className="flex justify-between items-center sticky top-0 bg-muted/50 p-2 rounded-md z-10">
                <h3 className="font-medium">Review</h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {getFilteredTickets("review").length}
                </span>
              </div>
              {getFilteredTickets("review").map((ticket) => (
                <div key={ticket.id} draggable onDragStart={(e) => handleDragStart(e, ticket.id)}>
                  <Link href={`/tickets/${ticket.id}`}>
                    <TicketCard ticket={ticket} variant="kanban" onUpvote={handleUpvote} />
                  </Link>
                </div>
              ))}
            </div>

            <div
              className="flex flex-col gap-4 bg-muted/50 p-4 rounded-lg overflow-y-auto"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "resolved")}
            >
              <div className="flex justify-between items-center sticky top-0 bg-muted/50 p-2 rounded-md z-10">
                <h3 className="font-medium">Resolved</h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {getFilteredTickets("resolved").length}
                </span>
              </div>
              {getFilteredTickets("resolved").map((ticket) => (
                <div key={ticket.id} draggable onDragStart={(e) => handleDragStart(e, ticket.id)}>
                  <Link href={`/tickets/${ticket.id}`}>
                    <TicketCard ticket={ticket} variant="kanban" onUpvote={handleUpvote} />
                  </Link>
                </div>
              ))}
            </div>

            <div
              className="flex flex-col gap-4 bg-muted/50 p-4 rounded-lg overflow-y-auto"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "closed")}
            >
              <div className="flex justify-between items-center sticky top-0 bg-muted/50 p-2 rounded-md z-10">
                <h3 className="font-medium">Closed</h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {getFilteredTickets("closed").length}
                </span>
              </div>
              {getFilteredTickets("closed").map((ticket) => (
                <div key={ticket.id} draggable onDragStart={(e) => handleDragStart(e, ticket.id)}>
                  <Link href={`/tickets/${ticket.id}`}>
                    <TicketCard ticket={ticket} variant="kanban" onUpvote={handleUpvote} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  )
}
