"use client"

import { useEffect, useState } from "react"
import { PageContainer } from "../../components/layout/page-container"
import { useTicketStore } from "@/lib/store/ticket-store"
import { useAuthStore } from "@/lib/store/auth-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import type { Ticket, TicketStatus, Priority } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { TicketCard } from "@/components/tickets/ticket-card"

export default function Page() {
  const { tickets, fetchTickets, upvoteTicket, isLoading, categories, fetchCategories } = useTicketStore()
  const { user } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([])
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all")
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all")
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all")
  const [assigneeFilter, setAssigneeFilter] = useState<string | "all" | "unassigned">("all")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchTickets()
    fetchCategories()
  }, [fetchTickets, fetchCategories])

  useEffect(() => {
    let filtered = [...tickets]

    // Filter based on user role
    if (user?.role !== "admin") {
      filtered = filtered.filter(ticket => 
        ticket.reporter.id === user?.id || 
        ticket.assignee?.id === user?.id || 
        !ticket.isPrivate
      )
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query) ||
          ticket.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter)
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.priority === priorityFilter)
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.category.id === categoryFilter)
    }

    // Apply assignee filter
    if (assigneeFilter === "unassigned") {
      filtered = filtered.filter((ticket) => !ticket.assignee)
    } else if (assigneeFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.assignee?.id === assigneeFilter)
    }

    setFilteredTickets(filtered)
  }, [tickets, searchQuery, statusFilter, priorityFilter, categoryFilter, assigneeFilter, user])

  const handleUpvote = (id: string) => {
    upvoteTicket(id, user?.id || "user1")
  }

  const clearFilters = () => {
    setStatusFilter("all")
    setPriorityFilter("all")
    setCategoryFilter("all")
    setAssigneeFilter("all")
    setSearchQuery("")
  }

  const activeFilterCount = [
    statusFilter !== "all",
    priorityFilter !== "all",
    categoryFilter !== "all",
    assigneeFilter !== "all",
    searchQuery !== "",
  ].filter(Boolean).length

  const handleRefresh = async () => {
    await fetchTickets()
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="heading-2">Tickets</h1>
            <p className="text-muted-foreground">Manage and track all tickets</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
              {isLoading ? "Refreshing..." : "Refresh"}
            </Button>
            <Link href="/tickets/new">
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                New Ticket
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tickets..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">{activeFilterCount}</Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Ticket List */}
        <div className="grid grid-cols-1 gap-4 mt-6">
          {isLoading ? (
            <div>Loading tickets...</div>
          ) : filteredTickets.length === 0 ? (
            <div>No tickets found.</div>
          ) : (
            filteredTickets.map((ticket) => (
              <Link key={ticket.id} href={`/tickets/${ticket.id}`}>
                <TicketCard ticket={ticket} variant="list" onUpvote={handleUpvote} />
              </Link>
            ))
          )}
        </div>
      </div>
    </PageContainer>
  )
}
