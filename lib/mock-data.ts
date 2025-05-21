import type { Ticket, Category, User, Comment, Attachment, Notification, UserSettings } from "./types"

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "user@office.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "user",
    department: "Marketing",
    position: "Marketing Specialist",
    phone: "+1 (555) 123-4567",
    createdAt: new Date(2023, 0, 15),
    lastActive: new Date(),
    isActive: true,
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "admin@office.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "admin",
    department: "IT",
    position: "IT Director",
    phone: "+1 (555) 987-6543",
    createdAt: new Date(2022, 11, 10),
    lastActive: new Date(),
    isActive: true,
  },
  {
    id: "user3",
    name: "Robert Johnson",
    email: "robert@office.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "user",
    department: "Finance",
    position: "Financial Analyst",
    phone: "+1 (555) 234-5678",
    createdAt: new Date(2023, 2, 5),
    lastActive: new Date(2023, 5, 10),
    isActive: true,
  },
  {
    id: "user4",
    name: "Emily Davis",
    email: "emily@office.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "user",
    department: "HR",
    position: "HR Specialist",
    phone: "+1 (555) 345-6789",
    createdAt: new Date(2023, 1, 20),
    lastActive: new Date(),
    isActive: true,
  },
  {
    id: "user5",
    name: "Michael Wilson",
    email: "michael@office.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "manager",
    department: "Operations",
    position: "Operations Manager",
    phone: "+1 (555) 456-7890",
    createdAt: new Date(2022, 10, 15),
    lastActive: new Date(),
    isActive: true,
  },
  {
    id: "user6",
    name: "Sarah Thompson",
    email: "sarah@office.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "user",
    department: "Sales",
    position: "Sales Representative",
    phone: "+1 (555) 567-8901",
    createdAt: new Date(2023, 3, 12),
    lastActive: new Date(2023, 6, 1),
    isActive: false,
  },
  {
    id: "user7",
    name: "David Brown",
    email: "david@office.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "manager",
    department: "Product",
    position: "Product Manager",
    phone: "+1 (555) 678-9012",
    createdAt: new Date(2022, 9, 8),
    lastActive: new Date(),
    isActive: true,
  },
  {
    id: "user8",
    name: "Jennifer Miller",
    email: "jennifer@office.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "user",
    department: "Customer Support",
    position: "Support Specialist",
    phone: "+1 (555) 789-0123",
    createdAt: new Date(2023, 4, 25),
    lastActive: new Date(),
    isActive: true,
  },
]

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: "cat1",
    name: "Hardware",
    description: "Issues related to physical equipment",
    color: "#E8F5E8",
    icon: "laptop",
    itemCount: 12,
  },
  {
    id: "cat2",
    name: "Software",
    description: "Issues related to applications and programs",
    color: "#F0E6FF",
    icon: "code",
    itemCount: 18,
  },
  {
    id: "cat3",
    name: "Network",
    description: "Issues related to connectivity and internet",
    color: "#E6F3FF",
    icon: "wifi",
    itemCount: 8,
  },
  {
    id: "cat4",
    name: "Facilities",
    description: "Issues related to office space and amenities",
    color: "#FFE5E5",
    icon: "building",
    itemCount: 5,
  },
  {
    id: "cat5",
    name: "HR",
    description: "Issues related to human resources",
    color: "#F5F5F7",
    icon: "users",
    itemCount: 7,
  },
  {
    id: "cat6",
    name: "Security",
    description: "Issues related to security and access control",
    color: "#FFF3E0",
    icon: "shield",
    itemCount: 4,
  },
  {
    id: "cat7",
    name: "Training",
    description: "Requests for training and skill development",
    color: "#E0F7FA",
    icon: "graduation-cap",
    itemCount: 6,
  },
]

// Mock Comments
export const createMockComments = (userId: string, count = 2): Comment[] => {
  const comments: Comment[] = []

  for (let i = 0; i < count; i++) {
    const randomUserIndex = Math.floor(Math.random() * mockUsers.length)
    const commentDate = new Date()
    commentDate.setDate(commentDate.getDate() - Math.floor(Math.random() * 7))

    comments.push({
      id: `comment-${userId}-${i}`,
      content: `This is a sample comment ${i + 1} for the ticket. It provides additional context or updates.`,
      author: mockUsers[randomUserIndex],
      createdAt: commentDate,
      updatedAt: Math.random() > 0.5 ? new Date() : undefined,
      mentions: Math.random() > 0.7 ? [mockUsers[Math.floor(Math.random() * mockUsers.length)].id] : undefined,
    })
  }

  return comments
}

// Mock Attachments
export const createMockAttachments = (userId: string, count = 1): Attachment[] => {
  const attachments: Attachment[] = []
  const fileTypes = ["pdf", "docx", "xlsx", "png", "jpg"]

  for (let i = 0; i < count; i++) {
    const randomUserIndex = Math.floor(Math.random() * mockUsers.length)
    const randomFileType = fileTypes[Math.floor(Math.random() * fileTypes.length)]
    const attachmentDate = new Date()
    attachmentDate.setDate(attachmentDate.getDate() - Math.floor(Math.random() * 7))

    attachments.push({
      id: `attachment-${userId}-${i}`,
      name: `file-${i + 1}.${randomFileType}`,
      url: `/files/file-${i + 1}.${randomFileType}`,
      size: Math.floor(Math.random() * 5000000),
      type: `application/${randomFileType}`,
      uploadedBy: mockUsers[randomUserIndex],
      uploadedAt: attachmentDate,
    })
  }

  return attachments
}

// Generate random date within the last 30 days
const getRandomDate = () => {
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * 30))
  return date
}

// Generate future date within the next 14 days
const getRandomFutureDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + Math.floor(Math.random() * 14) + 1)
  return date
}

// Mock Tickets
export const mockTickets: Ticket[] = [
  {
    id: "ticket1",
    title: "Computer won't turn on",
    description: "My desktop computer is not powering on. I've checked the power cable and it's properly connected.",
    category: mockCategories[0],
    status: "open",
    priority: "high",
    severity: "medium",
    upvotes: 4,
    upvotedBy: ["user1", "user3"],
    assignee: mockUsers[1],
    reporter: mockUsers[0],
    comments: createMockComments("ticket1", 3),
    attachments: createMockAttachments("ticket1", 1),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
    dueDate: getRandomFutureDate(),
    tags: ["hardware", "desktop", "power"],
    isPrivate: false,
    watchers: ["user5", "user7"],
  },
  {
    id: "ticket2",
    title: "Email client not syncing",
    description:
      "The email client is not syncing with the server. I've tried restarting the application but it didn't help.",
    category: mockCategories[1],
    status: "in-progress",
    priority: "medium",
    severity: "low",
    upvotes: 2,
    upvotedBy: ["user4"],
    assignee: mockUsers[4],
    reporter: mockUsers[3],
    comments: createMockComments("ticket2", 2),
    attachments: createMockAttachments("ticket2", 0),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
    dueDate: getRandomFutureDate(),
    tags: ["software", "email", "sync"],
    isPrivate: false,
    watchers: ["user2"],
  },
  {
    id: "ticket3",
    title: "Internet connection unstable",
    description:
      "The internet connection in the meeting room is unstable. It disconnects frequently during video calls.",
    category: mockCategories[2],
    status: "review",
    priority: "high",
    severity: "high",
    upvotes: 7,
    upvotedBy: ["user1", "user3", "user4"],
    assignee: mockUsers[1],
    reporter: mockUsers[2],
    comments: createMockComments("ticket3", 4),
    attachments: createMockAttachments("ticket3", 2),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
    dueDate: getRandomFutureDate(),
    tags: ["network", "wifi", "meeting-room"],
    isPrivate: false,
    watchers: ["user5", "user8"],
  },
  {
    id: "ticket4",
    title: "Broken chair in office",
    description: "The chair at desk #42 has a broken wheel and needs to be replaced or repaired.",
    category: mockCategories[3],
    status: "resolved",
    priority: "low",
    severity: "low",
    upvotes: 1,
    upvotedBy: ["user2"],
    assignee: mockUsers[4],
    reporter: mockUsers[0],
    comments: createMockComments("ticket4", 2),
    attachments: createMockAttachments("ticket4", 1),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
    resolvedAt: getRandomDate(),
    tags: ["facilities", "furniture", "repair"],
    isPrivate: false,
    watchers: [],
  },
  {
    id: "ticket5",
    title: "Request for new software license",
    description: "I need a license for Adobe Photoshop for the upcoming marketing campaign.",
    category: mockCategories[1],
    status: "closed",
    priority: "medium",
    severity: "low",
    upvotes: 0,
    upvotedBy: [],
    assignee: mockUsers[1],
    reporter: mockUsers[3],
    comments: createMockComments("ticket5", 3),
    attachments: createMockAttachments("ticket5", 0),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
    resolvedAt: getRandomDate(),
    tags: ["software", "license", "request"],
    isPrivate: false,
    watchers: ["user1"],
  },
  {
    id: "ticket6",
    title: "Printer out of toner",
    description: "The printer on the 3rd floor is out of toner and needs to be replaced.",
    category: mockCategories[0],
    status: "open",
    priority: "medium",
    severity: "low",
    upvotes: 3,
    upvotedBy: ["user3", "user4"],
    assignee: undefined,
    reporter: mockUsers[2],
    comments: createMockComments("ticket6", 1),
    attachments: createMockAttachments("ticket6", 0),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
    dueDate: getRandomFutureDate(),
    tags: ["hardware", "printer", "supplies"],
    isPrivate: false,
    watchers: ["user7"],
  },
  {
    id: "ticket7",
    title: "Request for time off",
    description: "I would like to request time off from July 15-22 for a family vacation.",
    category: mockCategories[4],
    status: "in-progress",
    priority: "low",
    severity: "low",
    upvotes: 0,
    upvotedBy: [],
    assignee: mockUsers[4],
    reporter: mockUsers[0],
    comments: createMockComments("ticket7", 2),
    attachments: createMockAttachments("ticket7", 0),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
    dueDate: getRandomFutureDate(),
    tags: ["hr", "time-off", "vacation"],
    isPrivate: true,
    watchers: ["user4"],
  },
  {
    id: "ticket8",
    title: "Conference room projector not working",
    description: "The projector in the main conference room is not connecting to laptops.",
    category: mockCategories[0],
    status: "open",
    priority: "high",
    severity: "medium",
    upvotes: 5,
    upvotedBy: ["user1", "user2", "user3"],
    assignee: mockUsers[1],
    reporter: mockUsers[4],
    comments: createMockComments("ticket8", 3),
    attachments: createMockAttachments("ticket8", 1),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
    dueDate: getRandomFutureDate(),
    tags: ["hardware", "projector", "conference-room"],
    isPrivate: false,
    watchers: ["user6", "user8"],
  },
  {
    id: "ticket9",
    title: "Need access to shared drive",
    description: "I need access to the marketing shared drive to upload new campaign materials.",
    category: mockCategories[5],
    status: "review",
    priority: "medium",
    severity: "low",
    upvotes: 1,
    upvotedBy: ["user3"],
    assignee: mockUsers[1],
    reporter: mockUsers[0],
    comments: createMockComments("ticket9", 2),
    attachments: createMockAttachments("ticket9", 0),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
    dueDate: getRandomFutureDate(),
    tags: ["security", "access", "shared-drive"],
    isPrivate: false,
    watchers: ["user2"],
  },
  {
    id: "ticket10",
    title: "Request for Excel training",
    description: "Our team needs advanced Excel training for data analysis tasks.",
    category: mockCategories[6],
    status: "in-progress",
    priority: "low",
    severity: "low",
    upvotes: 4,
    upvotedBy: ["user1", "user3", "user8"],
    assignee: mockUsers[4],
    reporter: mockUsers[7],
    comments: createMockComments("ticket10", 3),
    attachments: createMockAttachments("ticket10", 1),
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
    dueDate: getRandomFutureDate(),
    tags: ["training", "excel", "data-analysis"],
    isPrivate: false,
    watchers: ["user5"],
  },
]

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: "notif1",
    userId: "user1",
    type: "ticket_assigned",
    message: "You have been assigned to ticket 'Computer won't turn on'",
    relatedId: "ticket1",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "notif2",
    userId: "user1",
    type: "ticket_updated",
    message: "Ticket 'Email client not syncing' has been updated",
    relatedId: "ticket2",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "notif3",
    userId: "user1",
    type: "mention",
    message: "You were mentioned in a comment on 'Internet connection unstable'",
    relatedId: "ticket3",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
  {
    id: "notif4",
    userId: "user1",
    type: "ticket_resolved",
    message: "Ticket 'Broken chair in office' has been resolved",
    relatedId: "ticket4",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "notif5",
    userId: "user2",
    type: "ticket_created",
    message: "New ticket created: 'Request for new software license'",
    relatedId: "ticket5",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
  },
]

// Mock User Settings
export const mockUserSettings: UserSettings[] = [
  {
    userId: "user1",
    theme: "light",
    emailNotifications: true,
    desktopNotifications: true,
    language: "en",
  },
  {
    userId: "user2",
    theme: "dark",
    emailNotifications: true,
    desktopNotifications: false,
    language: "en",
  },
]

// Analytics Data
export const mockAnalyticsData = {
  ticketsByStatus: [
    { status: "open", count: 3 },
    { status: "in-progress", count: 3 },
    { status: "review", count: 2 },
    { status: "resolved", count: 1 },
    { status: "closed", count: 1 },
  ],
  ticketsByCategory: [
    { category: "Hardware", count: 4 },
    { category: "Software", count: 2 },
    { category: "Network", count: 1 },
    { category: "Facilities", count: 1 },
    { category: "HR", count: 1 },
    { category: "Security", count: 1 },
    { category: "Training", count: 1 },
  ],
  ticketsByPriority: [
    { priority: "low", count: 4 },
    { priority: "medium", count: 4 },
    { priority: "high", count: 3 },
    { priority: "urgent", count: 0 },
  ],
  ticketTrend: [
    { date: "2023-01-01", created: 3, resolved: 1 },
    { date: "2023-01-02", created: 2, resolved: 2 },
    { date: "2023-01-03", created: 4, resolved: 3 },
    { date: "2023-01-04", created: 1, resolved: 2 },
    { date: "2023-01-05", created: 3, resolved: 1 },
    { date: "2023-01-06", created: 2, resolved: 3 },
    { date: "2023-01-07", created: 5, resolved: 2 },
  ],
  averageResolutionTime: 2.3, // in days
  userPerformance: [
    { user: "Jane Smith", assigned: 4, resolved: 3, averageTime: 1.8 },
    { user: "Michael Wilson", assigned: 3, resolved: 2, averageTime: 2.5 },
    { user: "David Brown", assigned: 2, resolved: 1, averageTime: 3.2 },
  ],
  ticketsByDepartment: [
    { department: "Marketing", count: 2 },
    { department: "IT", count: 3 },
    { department: "Finance", count: 1 },
    { department: "HR", count: 1 },
    { department: "Operations", count: 2 },
    { department: "Sales", count: 1 },
  ],
  monthlyTicketVolume: [
    { month: "Jan", tickets: 45 },
    { month: "Feb", tickets: 52 },
    { month: "Mar", tickets: 49 },
    { month: "Apr", tickets: 62 },
    { month: "May", tickets: 58 },
    { month: "Jun", tickets: 65 },
    { month: "Jul", tickets: 59 },
    { month: "Aug", tickets: 70 },
    { month: "Sep", tickets: 63 },
    { month: "Oct", tickets: 68 },
    { month: "Nov", tickets: 72 },
    { month: "Dec", tickets: 55 },
  ],
}
