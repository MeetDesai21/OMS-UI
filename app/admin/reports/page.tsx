"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Download,
  TrendingUp,
  Users,
  Ticket,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react"

// Sample data for reports
const ticketStats = {
  total: 150,
  open: 45,
  inProgress: 30,
  resolved: 65,
  closed: 10,
  averageResolutionTime: "2.5 days",
  satisfactionRate: "85%",
}

const userStats = {
  total: 25,
  active: 20,
  inactive: 5,
  newThisMonth: 3,
  averageTicketsPerUser: 6,
  topContributors: [
    { name: "John Doe", tickets: 25, resolutionRate: "92%" },
    { name: "Jane Smith", tickets: 20, resolutionRate: "88%" },
    { name: "Mike Johnson", tickets: 18, resolutionRate: "85%" },
  ],
}

const categoryStats = [
  { name: "Technical Support", tickets: 45, avgResolutionTime: "1.5 days" },
  { name: "Bug Reports", tickets: 35, avgResolutionTime: "2.0 days" },
  { name: "Feature Requests", tickets: 30, avgResolutionTime: "3.5 days" },
  { name: "General Inquiries", tickets: 25, avgResolutionTime: "1.0 days" },
  { name: "Account Issues", tickets: 15, avgResolutionTime: "1.2 days" },
]

const timeRangeOptions = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "quarter", label: "This Quarter" },
  { value: "year", label: "This Year" },
]

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("month")
  const [reportType, setReportType] = useState("overview")

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              {timeRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={reportType} onValueChange={setReportType} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ticketStats.total}</div>
                <p className="text-xs text-muted-foreground">
                  Across all categories
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.active}</div>
                <p className="text-xs text-muted-foreground">
                  Out of {userStats.total} total users
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ticketStats.averageResolutionTime}</div>
                <p className="text-xs text-muted-foreground">
                  Across all tickets
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ticketStats.satisfactionRate}</div>
                <p className="text-xs text-muted-foreground">
                  Based on user feedback
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-blue-500" />
                      <span>Open</span>
                    </div>
                    <Badge variant="secondary">{ticketStats.open}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span>In Progress</span>
                    </div>
                    <Badge variant="secondary">{ticketStats.inProgress}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Resolved</span>
                    </div>
                    <Badge variant="secondary">{ticketStats.resolved}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-gray-500" />
                      <span>Closed</span>
                    </div>
                    <Badge variant="secondary">{ticketStats.closed}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userStats.topContributors.map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Resolution Rate: {user.resolutionRate}
                        </p>
                      </div>
                      <Badge variant="secondary">{user.tickets} tickets</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="font-medium">Resolution Time</h3>
                    <p className="text-2xl font-bold">{ticketStats.averageResolutionTime}</p>
                    <p className="text-sm text-muted-foreground">Average time to resolve tickets</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Satisfaction Rate</h3>
                    <p className="text-2xl font-bold">{ticketStats.satisfactionRate}</p>
                    <p className="text-sm text-muted-foreground">Based on user feedback</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Tickets per User</h3>
                    <p className="text-2xl font-bold">{userStats.averageTicketsPerUser}</p>
                    <p className="text-sm text-muted-foreground">Average tickets per active user</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="font-medium">Total Users</h3>
                    <p className="text-2xl font-bold">{userStats.total}</p>
                    <p className="text-sm text-muted-foreground">All registered users</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Active Users</h3>
                    <p className="text-2xl font-bold">{userStats.active}</p>
                    <p className="text-sm text-muted-foreground">Users with recent activity</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">New This Month</h3>
                    <p className="text-2xl font-bold">{userStats.newThisMonth}</p>
                    <p className="text-sm text-muted-foreground">New user registrations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryStats.map((category, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Avg. Resolution Time: {category.avgResolutionTime}
                      </p>
                    </div>
                    <Badge variant="secondary">{category.tickets} tickets</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 