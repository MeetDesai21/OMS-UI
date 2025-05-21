"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { PageContainer } from "@/components/layout/page-container"
import { useTicketStore } from "@/lib/store/ticket-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function EditTicketPage() {
  const params = useParams()
  const router = useRouter()
  const { tickets, updateTicket, fetchCategories, categories } = useTicketStore()
  const ticket = tickets.find((t) => t.id === params.id)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    priority: "medium",
    severity: "low",
    tags: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    categoryId: "",
  })

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title,
        description: ticket.description,
        categoryId: ticket.category.id,
        priority: ticket.priority,
        severity: ticket.severity,
        tags: ticket.tags.join(", "),
      })
    }
  }, [ticket])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      title: "",
      description: "",
      categoryId: "",
    }
    let isValid = true
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
      isValid = false
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
      isValid = false
    }
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required"
      isValid = false
    }
    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    try {
      const category = categories.find((cat) => cat.id === formData.categoryId)
      if (!category) throw new Error("Invalid category")
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)
      await updateTicket(ticket.id, {
        title: formData.title,
        description: formData.description,
        category,
        priority: formData.priority,
        severity: formData.severity,
        tags: tagsArray,
      })
      router.push(`/tickets/${ticket.id}`)
    } catch (error) {
      alert("Failed to update ticket. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!ticket) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-muted-foreground mb-4">Ticket not found</p>
          <Link href="/tickets">
            <Button>Back to Tickets</Button>
          </Link>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Ticket</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a descriptive title"
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide details about the issue or request"
                  rows={5}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryId">Category</Label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && <p className="text-sm text-destructive">{errors.categoryId}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity</Label>
                  <select
                    id="severity"
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="hardware, software, network (comma separated)"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageContainer>
  )
} 