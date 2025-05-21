"use client"

import { useEffect, useState } from "react"
import { PageContainer } from "@/components/layout/page-container"
import { useUserStore } from "@/lib/store/user-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { UserCard } from "@/components/users/user-card"
import { Plus, Search, Filter } from "lucide-react"
import Link from "next/link"

export default function Page() {
  const { users, fetchUsers, isLoading } = useUserStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string | "all">("all")
  const [departmentFilter, setDepartmentFilter] = useState<string | "all">("all")
  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    let filtered = [...users]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.department?.toLowerCase().includes(query),
      )
    }

    // Apply role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter)
    }

    // Apply department filter
    if (departmentFilter !== "all") {
      filtered = filtered.filter((user) => user.department === departmentFilter)
    }

    setFilteredUsers(filtered)
  }, [users, searchQuery, roleFilter, departmentFilter])

  // Get unique departments from users
  const departments = Array.from(new Set(users.map((user) => user.department))).filter(Boolean)

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="heading-2">Users</h1>
            <p className="text-muted-foreground">Manage system users and permissions</p>
          </div>
          <Link href="/admin/users/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                className="bg-background border rounded-md px-2 py-1 text-sm"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                className="bg-background border rounded-md px-2 py-1 text-sm"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-8">
            <div>Loading users...</div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <Card className="p-8 flex justify-center">
            <div className="text-center">
              <p className="mb-2">No users found</p>
              <Link href="/admin/users/new">
                <Button size="sm">Add a new user</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <Link key={user.id} href={`/admin/users/${user.id}`}>
                <UserCard user={user} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  )
}
