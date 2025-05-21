"use client"

import { useEffect } from "react"
import { PageContainer } from "@/components/layout/page-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTicketStore } from "@/lib/store/ticket-store"
import { useUserStore } from "@/lib/store/user-store"
import { Users, Ticket } from "lucide-react"

export default function Page() {
  const { tickets, fetchTickets } = useTicketStore()
  const { users, fetchUsers } = useUserStore()

  useEffect(() => {
    fetchTickets()
    fetchUsers()
  }, [fetchTickets, fetchUsers])

  const openTickets = tickets.filter((ticket) => ticket.status === "open")
  const inProgressTickets = tickets.filter((ticket) => ticket.status === "in-progress")
  const resolvedTickets = tickets.filter((ticket) => ticket.status === "resolved" || ticket.status === "closed")

  const COLORS = ["#9B7EDE", "#7DD3C0", "#FCA5A5", "#86EFAC", "#FDE047"]

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="heading-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and key metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Total Users</CardTitle>
                <Users className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>System users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{users.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Total Tickets</CardTitle>
                <Ticket className="h-5 w-5 text-secondary" />
              </div>
              <CardDescription>All tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{tickets.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Open Tickets</Car
