"use client"

import { useEffect } from "react"
import { PageContainer } from "@/components/layout/page-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTicketStore } from "@/lib/store/ticket-store"
import { mockAnalyticsData } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function Page() {
  const { tickets, fetchTickets } = useTicketStore()

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  const COLORS = ["#9B7EDE", "#7DD3C0", "#FCA5A5", "#86EFAC", "#FDE047"]

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="heading-2">Analytics</h1>
          <p className="text-muted-foreground">Insights and statistics about your tickets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Tickets</CardTitle>
              <CardDescription>All tickets in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{tickets.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Resolution Rate</CardTitle>
              <CardDescription>Percentage of resolved tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(
                  (tickets.filter((t) => t.status === "resolved" || t.status === "closed").length / tickets.length) *
                    100,
                )}
                %
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Avg. Resolution Time</CardTitle>
              <CardDescription>Average days to resolve</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockAnalyticsData.averageResolutionTime} days</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Trends</CardTitle>
              <CardDescription>Created vs Resolved tickets over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  created: {
                    label: "Created",
                    color: "hsl(var(--primary))",
                  },
                  resolved: {
                    label: "Resolved",
                    color: "hsl(var(--success))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAnalyticsData.ticketTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="created" fill="var(--color-created)" />
                    <Bar dataKey="resolved" fill="var(--color-resolved)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tickets by Category</CardTitle>
              <CardDescription>Distribution across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockAnalyticsData.ticketsByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="category"
                      label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockAnalyticsData.ticketsByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Performance</CardTitle>
            <CardDescription>Ticket resolution metrics by user</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">User</th>
                    <th className="text-left p-2">Assigned</th>
                    <th className="text-left p-2">Resolved</th>
                    <th className="text-left p-2">Avg. Resolution Time (days)</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAnalyticsData.userPerformance.map((user, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{user.user}</td>
                      <td className="p-2">{user.assigned}</td>
                      <td className="p-2">{user.resolved}</td>
                      <td className="p-2">{user.averageTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
