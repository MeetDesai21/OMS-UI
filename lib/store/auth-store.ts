import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Notification, UserSettings } from "../types"
import { mockUsers, mockNotifications, mockUserSettings } from "../mock-data"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  notifications: Notification[]
  unreadNotificationsCount: number
  userSettings: UserSettings | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  markNotificationAsRead: (id: string) => void
  markAllNotificationsAsRead: () => void
  updateUserSettings: (settings: Partial<UserSettings>) => void
  hasPermission: (permission: string) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      notifications: [],
      unreadNotificationsCount: 0,
      userSettings: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true })

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Find user by email
        const user = mockUsers.find((u) => u.email === email)

        if (
          user &&
          ((email === "user@office.com" && password === "user123") ||
            (email === "admin@office.com" && password === "admin123"))
        ) {
          // Get user notifications
          const userNotifications = mockNotifications.filter((n) => n.userId === user.id)
          const unreadCount = userNotifications.filter((n) => !n.isRead).length

          // Get user settings or create default
          const userSettings = mockUserSettings.find((s) => s.userId === user.id) || {
            userId: user.id,
            theme: "light",
            emailNotifications: true,
            desktopNotifications: true,
            language: "en",
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            notifications: userNotifications,
            unreadNotificationsCount: unreadCount,
            userSettings,
          })

          // Store in localStorage for persistence
          localStorage.setItem("user", JSON.stringify(user))
        } else {
          throw new Error("Invalid credentials")
        }
      },

      logout: () => {
        localStorage.removeItem("user")
        set({
          user: null,
          isAuthenticated: false,
          notifications: [],
          unreadNotificationsCount: 0,
          userSettings: null,
        })
      },

      checkAuth: async () => {
        set({ isLoading: true })

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // For demo purposes, we'll just check localStorage
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          const user = JSON.parse(storedUser) as User

          // Get user notifications
          const userNotifications = mockNotifications.filter((n) => n.userId === user.id)
          const unreadCount = userNotifications.filter((n) => !n.isRead).length

          // Get user settings or create default
          const userSettings = mockUserSettings.find((s) => s.userId === user.id) || {
            userId: user.id,
            theme: "light",
            emailNotifications: true,
            desktopNotifications: true,
            language: "en",
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            notifications: userNotifications,
            unreadNotificationsCount: unreadCount,
            userSettings,
          })
        } else {
          set({ isLoading: false })
        }
      },

      markNotificationAsRead: (id: string) => {
        set((state) => {
          const updatedNotifications = state.notifications.map((notification) => {
            if (notification.id === id && !notification.isRead) {
              return { ...notification, isRead: true }
            }
            return notification
          })

          const unreadCount = updatedNotifications.filter((n) => !n.isRead).length

          return {
            notifications: updatedNotifications,
            unreadNotificationsCount: unreadCount,
          }
        })
      },

      markAllNotificationsAsRead: () => {
        set((state) => {
          const updatedNotifications = state.notifications.map((notification) => ({
            ...notification,
            isRead: true,
          }))

          return {
            notifications: updatedNotifications,
            unreadNotificationsCount: 0,
          }
        })
      },

      updateUserSettings: (settings: Partial<UserSettings>) => {
        set((state) => {
          if (!state.userSettings || !state.user) return state

          const updatedSettings = {
            ...state.userSettings,
            ...settings,
          }

          return {
            userSettings: updatedSettings,
          }
        })
      },

      hasPermission: (permission: string) => {
        const { user } = get()
        if (!user) return false

        // Define permissions based on roles
        const rolePermissions: Record<string, string[]> = {
          admin: [
            "view_dashboard",
            "create_ticket",
            "edit_ticket",
            "delete_ticket",
            "assign_ticket",
            "manage_users",
            "manage_categories",
            "view_analytics",
            "manage_settings",
          ],
          manager: [
            "view_dashboard",
            "create_ticket",
            "edit_ticket",
            "assign_ticket",
            "view_analytics",
            "manage_settings",
          ],
          user: ["view_dashboard", "create_ticket", "edit_own_ticket"],
        }

        return rolePermissions[user.role]?.includes(permission) || false
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
)
