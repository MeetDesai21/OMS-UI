import { create } from "zustand"
import type { Ticket, TicketStatus, Severity, Priority, Comment, Attachment, Category } from "../types"
import { mockTickets, mockCategories } from "../mock-data"
import { mockUsers } from "../mock-data" // Import mockUsers

interface TicketState {
  tickets: Ticket[]
  categories: Category[]
  isLoading: boolean
  error: string | null
  fetchTickets: () => Promise<void>
  fetchCategories: () => Promise<void>
  getTicketById: (id: string) => Ticket | undefined
  createTicket: (
    ticket: Omit<
      Ticket,
      "id" | "createdAt" | "updatedAt" | "upvotes" | "upvotedBy" | "comments" | "attachments" | "watchers" | "isPrivate"
    > & { isPrivate?: boolean },
  ) => Promise<Ticket>
  updateTicket: (id: string, updates: Partial<Ticket>) => Promise<Ticket>
  deleteTicket: (id: string) => Promise<void>
  upvoteTicket: (id: string, userId: string) => Promise<void>
  changeTicketStatus: (id: string, status: TicketStatus) => Promise<void>
  changePriority: (id: string, priority: Priority) => Promise<void>
  changeSeverity: (id: string, severity: Severity) => Promise<void>
  assignTicket: (id: string, userId: string | null) => Promise<void>
  addComment: (id: string, comment: Omit<Comment, "id" | "createdAt">) => Promise<void>
  addAttachment: (id: string, attachment: Omit<Attachment, "id" | "uploadedAt">) => Promise<void>
  removeAttachment: (ticketId: string, attachmentId: string) => Promise<void>
  addWatcher: (id: string, userId: string) => Promise<void>
  removeWatcher: (id: string, userId: string) => Promise<void>
  createCategory: (category: Omit<Category, "id" | "itemCount">) => Promise<Category>
  updateCategory: (id: string, updates: Partial<Omit<Category, "id" | "itemCount">>) => Promise<Category>
  deleteCategory: (id: string) => Promise<void>
  getFilteredTickets: (filters: {
    status?: TicketStatus | "all"
    category?: string | "all"
    priority?: Priority | "all"
    search?: string
    assignee?: string | "all" | "unassigned"
    reporter?: string | "all"
  }) => Ticket[]
}

// Utility functions for localStorage persistence
const TICKETS_KEY = "oms_tickets"
function saveTicketsToStorage(tickets: Ticket[]) {
  try {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
  } catch {}
}
function loadTicketsFromStorage(): Ticket[] | null {
  try {
    const data = localStorage.getItem(TICKETS_KEY)
    if (data) return JSON.parse(data)
  } catch {}
  return null
}

export const useTicketStore = create<TicketState>((set, get) => ({
  tickets: [],
  categories: [],
  isLoading: false,
  error: null,

  fetchTickets: async () => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const stored = loadTicketsFromStorage()
      set({
        tickets: stored && Array.isArray(stored) ? stored : mockTickets,
        isLoading: false,
      })
    } catch (error) {
      set({ error: "Failed to fetch tickets", isLoading: false })
    }
  },

  fetchCategories: async () => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Use mock data for demo
      set({ categories: mockCategories, isLoading: false })
    } catch (error) {
      set({ error: "Failed to fetch categories", isLoading: false })
    }
  },

  getTicketById: (id: string) => {
    return get().tickets.find((ticket) => ticket.id === id)
  },

  createTicket: async (ticketData) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const newTicket: Ticket = {
        ...ticketData,
        id: `ticket-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        upvotes: 0,
        upvotedBy: [],
        comments: [],
        attachments: [],
        isPrivate: ticketData.isPrivate || false,
        watchers: [],
      }
      set((state) => {
        const updated = [newTicket, ...state.tickets]
        saveTicketsToStorage(updated)
        return { tickets: updated, isLoading: false }
      })
      return newTicket
    } catch (error) {
      set({ error: "Failed to create ticket", isLoading: false })
      throw error
    }
  },

  updateTicket: async (id, updates) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      let updatedTicket: Ticket | undefined
      set((state) => {
        const updatedTickets = state.tickets.map((ticket) => {
          if (ticket.id === id) {
            updatedTicket = {
              ...ticket,
              ...updates,
              updatedAt: new Date(),
            }
            return updatedTicket
          }
          return ticket
        })
        saveTicketsToStorage(updatedTickets)
        return { tickets: updatedTickets, isLoading: false }
      })
      if (!updatedTicket) {
        throw new Error("Ticket not found")
      }
      return updatedTicket
    } catch (error) {
      set({ error: "Failed to update ticket", isLoading: false })
      throw error
    }
  },

  deleteTicket: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      set((state) => {
        const updated = state.tickets.filter((ticket) => ticket.id !== id)
        saveTicketsToStorage(updated)
        return { tickets: updated, isLoading: false }
      })
    } catch (error) {
      set({ error: "Failed to delete ticket", isLoading: false })
      throw error
    }
  },

  upvoteTicket: async (id, userId) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => {
        const updatedTickets = state.tickets.map((ticket) => {
          if (ticket.id === id) {
            const alreadyVoted = ticket.upvotedBy.includes(userId)

            if (alreadyVoted) {
              return {
                ...ticket,
                upvotes: ticket.upvotes - 1,
                upvotedBy: ticket.upvotedBy.filter((id) => id !== userId),
                updatedAt: new Date(),
              }
            } else {
              // Check if upvotes will exceed threshold for severity increase
              let severity = ticket.severity
              if (ticket.upvotes + 1 > 5 && ticket.severity !== "critical") {
                const severityLevels: Severity[] = ["low", "medium", "high", "critical"]
                const currentIndex = severityLevels.indexOf(ticket.severity)
                if (currentIndex < severityLevels.length - 1) {
                  severity = severityLevels[currentIndex + 1]
                }
              }

              return {
                ...ticket,
                upvotes: ticket.upvotes + 1,
                upvotedBy: [...ticket.upvotedBy, userId],
                severity,
                updatedAt: new Date(),
              }
            }
          }
          return ticket
        })

        return { tickets: updatedTickets, isLoading: false }
      })
    } catch (error) {
      set({ error: "Failed to upvote ticket", isLoading: false })
      throw error
    }
  },

  changeTicketStatus: async (id, status) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => {
        const updatedTickets = state.tickets.map((ticket) => {
          if (ticket.id === id) {
            const resolvedAt = status === "resolved" ? new Date() : ticket.resolvedAt

            return {
              ...ticket,
              status,
              resolvedAt,
              updatedAt: new Date(),
            }
          }
          return ticket
        })

        return { tickets: updatedTickets, isLoading: false }
      })
    } catch (error) {
      set({ error: "Failed to change ticket status", isLoading: false })
      throw error
    }
  },

  changePriority: async (id, priority) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => {
        const updatedTickets = state.tickets.map((ticket) => {
          if (ticket.id === id) {
            return {
              ...ticket,
              priority,
              updatedAt: new Date(),
            }
          }
          return ticket
        })

        return { tickets: updatedTickets, isLoading: false }
      })
    } catch (error) {
      set({ error: "Failed to change ticket priority", isLoading: false })
      throw error
    }
  },

  changeSeverity: async (id, severity) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => {
        const updatedTickets = state.tickets.map((ticket) => {
          if (ticket.id === id) {
            return {
              ...ticket,
              severity,
              updatedAt: new Date(),
            }
          }
          return ticket
        })

        return { tickets: updatedTickets, isLoading: false }
      })
    } catch (error) {
      set({ error: "Failed to change ticket severity", isLoading: false })
      throw error
    }
  },

  assignTicket: async (id, userId) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => {
        const updatedTickets = state.tickets.map((ticket) => {
          if (ticket.id === id) {
            // If userId is null, unassign the ticket
            if (userId === null) {
              const { assignee, ...rest } = ticket
              return {
                ...rest,
                updatedAt: new Date(),
              }
            }

            // Find the user to assign
            const assignee = mockUsers.find((user) => user.id === userId)
            if (!assignee) return ticket

            return {
              ...ticket,
              assignee,
              updatedAt: new Date(),
            }
          }
          return ticket
        })

        return { tickets: updatedTickets, isLoading: false }
      })
    } catch (error) {
      set({ error: "Failed to assign ticket", isLoading: false })
      throw error
    }
  },

  addComment: async (id, commentData) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => {
        const updatedTickets = state.tickets.map((ticket) => {
          if (ticket.id === id) {
            const newComment: Comment = {
              ...commentData,
              id: `comment-${Date.now()}`,
              createdAt: new Date(),
            }

            return {
              ...ticket,
              comments: [...ticket.comments, newComment],
              updatedAt: new Date(),
            }
          }
          return ticket
        })

        return { tickets: updatedTickets, isLoading: false }
      })
    } catch (error) {
      set({ error: "Failed to add comment", isLoading: false })
      throw error
    }
  },

  addAttachment: async (id, attachmentData) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => {
        const updatedTickets = state.tickets.map((ticket) => {
          if (ticket.id === id) {
            const newAttachment: Attachment = {
              ...attachmentData,
              id: `attachment-${Date.now()}`,
              uploadedAt: new Date(),
            }

            return {
              ...ticket,
              attachments: [...ticket.attachments, newAttachment],
              updatedAt: new Date(),
            }
          }
          return ticket
        })

        return { tickets: updatedTickets, isLoading: false }
      })
    } catch (error) {
      set({ error: "Failed to add attachment", isLoading: false })
      throw error
    }
  },

  removeAttachment: async (ticketId, attachmentId) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => {
        const updatedTickets = state.tickets.map((ticket) => {
          if (ticket.id === ticketId) {
            return {
              ...ticket,
              attachments: ticket.attachments.filter((attachment) => attachment.id !== attachmentId),
              updatedAt: new Date(),
            }
          }
          return ticket
        })

        return { tickets: updatedTickets, isLoading: false }
      })
    } catch (error) {
      set({ error: "Failed to remove attachment", isLoading: false })
      throw error
    }
  },

  addWatcher: async (id, userId) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => {
        const updatedTickets = state.tickets.map((ticket) => {
          if (ticket.id === id && !ticket.watchers.includes(userId)) {
            return {
              ...ticket,
              watchers: [...ticket.watchers, userId],
              updatedAt: new Date(),
            }
          }
          return ticket
        })

        return { tickets: updatedTickets, isLoading: false }
      })
    } catch (error) {
      set({ error: "Failed to add watcher", isLoading: false })
      throw error
    }
  },

  removeWatcher: async (id, userId) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => {
        const updatedTickets = state.tickets.map((ticket) => {
          if (ticket.id === id) {
            return {
              ...ticket,
              watchers: ticket.watchers.filter((watcher) => watcher !== userId),
              updatedAt: new Date(),
            }
          }
          return ticket
        })

        return { tickets: updatedTickets, isLoading: false }
      })
    } catch (error) {
      set({ error: "Failed to remove watcher", isLoading: false })
      throw error
    }
  },

  createCategory: async (categoryData) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newCategory: Category = {
        ...categoryData,
        id: `cat-${Date.now()}`,
        itemCount: 0,
      }

      set((state) => ({
        categories: [...state.categories, newCategory],
        isLoading: false,
      }))

      return newCategory
    } catch (error) {
      set({ error: "Failed to create category", isLoading: false })
      throw error
    }
  },

  updateCategory: async (id, updates) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let updatedCategory: Category | undefined

      set((state) => {
        const updatedCategories = state.categories.map((category) => {
          if (category.id === id) {
            updatedCategory = {
              ...category,
              ...updates,
            }
            return updatedCategory
          }
          return category
        })

        return { categories: updatedCategories, isLoading: false }
      })

      if (!updatedCategory) {
        throw new Error("Category not found")
      }

      return updatedCategory
    } catch (error) {
      set({ error: "Failed to update category", isLoading: false })
      throw error
    }
  },

  deleteCategory: async (id) => {
    set({ isLoading: true, error: null })

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      set((state) => ({
        categories: state.categories.filter((category) => category.id !== id),
        isLoading: false,
      }))
    } catch (error) {
      set({ error: "Failed to delete category", isLoading: false })
      throw error
    }
  },

  getFilteredTickets: (filters) => {
    const { tickets } = get()
    let filtered = [...tickets]

    // Filter by status
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === filters.status)
    }

    // Filter by category
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((ticket) => ticket.category.id === filters.category)
    }

    // Filter by priority
    if (filters.priority && filters.priority !== "all") {
      filtered = filtered.filter((ticket) => ticket.priority === filters.priority)
    }

    // Filter by assignee
    if (filters.assignee) {
      if (filters.assignee === "unassigned") {
        filtered = filtered.filter((ticket) => !ticket.assignee)
      } else if (filters.assignee !== "all") {
        filtered = filtered.filter((ticket) => ticket.assignee?.id === filters.assignee)
      }
    }

    // Filter by reporter
    if (filters.reporter && filters.reporter !== "all") {
      filtered = filtered.filter((ticket) => ticket.reporter.id === filters.reporter)
    }

    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase()
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query) ||
          ticket.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    return filtered
  },
}))
