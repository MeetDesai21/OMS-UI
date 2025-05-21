"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, Plus, Clock, Users, MapPin, Tag } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

interface Event {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  location: string
  type: "meeting" | "task" | "reminder" | "other"
  attendees: string[]
  createdAt: Date
}

const eventTypes = [
  { value: "meeting", label: "Meeting", color: "bg-blue-100 text-blue-800" },
  { value: "task", label: "Task", color: "bg-green-100 text-green-800" },
  { value: "reminder", label: "Reminder", color: "bg-yellow-100 text-yellow-800" },
  { value: "other", label: "Other", color: "bg-gray-100 text-gray-800" },
]

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Team Standup",
    description: "Daily team standup meeting",
    startDate: new Date(2024, 2, 20, 10, 0),
    endDate: new Date(2024, 2, 20, 10, 30),
    location: "Conference Room A",
    type: "meeting",
    attendees: ["John Doe", "Jane Smith", "Mike Johnson"],
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Project Deadline",
    description: "Submit final project deliverables",
    startDate: new Date(2024, 2, 25, 17, 0),
    endDate: new Date(2024, 2, 25, 17, 0),
    location: "Office",
    type: "task",
    attendees: ["John Doe"],
    createdAt: new Date(),
  },
]

export default function CalendarPage() {
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>(sampleEvents)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    location: "",
    type: "meeting",
    attendees: "",
  })

  const eventsForSelectedDate = events.filter(event => {
    if (!selectedDate) return false
    const eventDate = new Date(event.startDate)
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    )
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const attendees = formData.attendees.split(",").map(name => name.trim()).filter(Boolean)
    
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === editingEvent.id 
          ? { 
              ...event, 
              ...formData, 
              attendees,
              createdAt: event.createdAt,
            }
          : event
      ))
      toast({
        title: "Event Updated",
        description: "The event has been updated successfully.",
      })
    } else {
      // Create new event
      const newEvent: Event = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        attendees,
        createdAt: new Date(),
      }
      setEvents([...events, newEvent])
      toast({
        title: "Event Created",
        description: "A new event has been created successfully.",
      })
    }

    // Reset form and close dialog
    setFormData({
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      location: "",
      type: "meeting",
      attendees: "",
    })
    setEditingEvent(null)
    setIsDialogOpen(false)
  }

  const handleDelete = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId))
    toast({
      title: "Event Deleted",
      description: "The event has been deleted successfully.",
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Team Calendar</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
              <DialogDescription>
                {editingEvent 
                  ? "Make changes to your event here."
                  : "Add a new event to the calendar."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Start Date & Time</Label>
                    <Input
                      type="datetime-local"
                      value={format(formData.startDate, "yyyy-MM-dd'T'HH:mm")}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        startDate: new Date(e.target.value)
                      })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>End Date & Time</Label>
                    <Input
                      type="datetime-local"
                      value={format(formData.endDate, "yyyy-MM-dd'T'HH:mm")}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        endDate: new Date(e.target.value)
                      })}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Conference Room A, Online Meeting"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: Event["type"]) => 
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="attendees">Attendees (comma-separated)</Label>
                  <Input
                    id="attendees"
                    value={formData.attendees}
                    onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                    placeholder="e.g., John Doe, Jane Smith"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  {editingEvent ? "Update Event" : "Create Event"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate 
                  ? `Events for ${format(selectedDate, "MMMM d, yyyy")}`
                  : "Select a date to view events"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {eventsForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {eventsForSelectedDate.map((event) => {
                    const eventType = eventTypes.find(type => type.value === event.type)
                    return (
                      <Card key={event.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{event.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {event.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge className={eventType?.color}>
                                  <Tag className="h-3 w-3 mr-1" />
                                  {eventType?.label}
                                </Badge>
                                <Badge variant="outline">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {format(event.startDate, "h:mm a")} - {format(event.endDate, "h:mm a")}
                                </Badge>
                                {event.location && (
                                  <Badge variant="outline">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {event.location}
                                  </Badge>
                                )}
                              </div>
                              {event.attendees.length > 0 && (
                                <div className="mt-2">
                                  <Badge variant="outline">
                                    <Users className="h-3 w-3 mr-1" />
                                    {event.attendees.join(", ")}
                                  </Badge>
                                </div>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(event.id)}
                            >
                              <CalendarIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No events scheduled for this date.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 