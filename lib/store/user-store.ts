import { create } from "zustand"
import type { User } from "../types"
import { mockUsers } from "../mock-data"

interface UserState {
  users: User[]
  isLoading: boolean
  error: string | null
  fetchUsers: () => Promise<void>
  getUserById: (id: string) => User | undefined
  createUser: (userData: Omit<User, "id" | "createdAt" | "isActive">) => Promise<User>
  updateUser: (id: string, updates: Partial<Omit<User, "id">>) => Promise<User>
  deleteUser: (id: string) => Promise<void>
  toggleUserStatus: (id: string) => Promise<void>
  searchUsers: (query: string) => User[]
  getUsersByDepartment: (department: string | null) => User[]
  getUsersByRole: (role: string | null) => User[]
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Use mock data for demo
      set({ users: mockUsers, isLoading: false })
    } catch (error) {
      set({ error: "Failed to fetch users", isLoading: false })
    }
  },

  getUserById: (id: string) => {
    return get().users.find((user) => user.id === id)
  },

  createUser: async (userData) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        ...userData,
        id: `user-${Date.now()}`,
        createdAt: new Date(),
        isActive: true,
      }

      set((state) => ({
        users: [...state.users, newUser],
        isLoading: false,
      }))

      return newUser
    } catch (error) {
      set({ error: "Failed to create user", isLoading: false })
      throw error
    }
  },

  updateUser: async (id, updates) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let updatedUser: User | undefined

      set((state) => {
        const updatedUsers = state.users.map((user) => {
          if (user.id === id) {
            updatedUser = {
              ...user,
              ...updates,
            }
            return updatedUser
          }
          return user
        })

        return { users: updatedUsers, isLoading: false }
      })

      if (!updatedUser) {
        throw new Error("User not found")
      }

      return updatedUser
    } catch (error) {
      set({ error: "Failed to update user", isLoading: false })
      throw error
    }
  },

  deleteUser: async (id) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        isLoading: false,
      }))
    } catch (error) {
      set({ error: "Failed to delete user", isLoading: false })
      throw error
    }
  },

  toggleUserStatus: async (id) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => {
        const updatedUsers = state.users.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              isActive: !user.isActive,
              lastActive: user.isActive ? user.lastActive : new Date(),
            }
          }
          return user
        })

        return { users: updatedUsers, isLoading: false }
      })
    } catch (error) {
      set({ error: "Failed to toggle user status", isLoading: false })
      throw error
    }
  },

  searchUsers: (query) => {
    const { users } = get()
    if (!query) return users

    const searchQuery = query.toLowerCase()
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery) ||
        user.department?.toLowerCase().includes(searchQuery) ||
        user.position?.toLowerCase().includes(searchQuery),
    )
  },

  getUsersByDepartment: (department) => {
    const { users } = get()
    if (!department) return users
    return users.filter((user) => user.department === department)
  },

  getUsersByRole: (role) => {
    const { users } = get()
    if (!role) return users
    return users.filter((user) => user.role === role)
  },
}))
