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
import { Plus, Search, BookOpen, Tag, Clock, ThumbsUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Article {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
  likes: number
}

const categories = [
  "Getting Started",
  "Tickets",
  "Tasks",
  "User Guide",
  "FAQ",
  "Troubleshooting",
]

const sampleArticles: Article[] = [
  {
    id: "1",
    title: "How to Create a New Ticket",
    content: "Learn how to create and manage tickets in the system...",
    category: "Tickets",
    tags: ["tickets", "create", "guide"],
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
    likes: 15,
  },
  {
    id: "2",
    title: "Managing Your Tasks",
    content: "A comprehensive guide to managing your tasks effectively...",
    category: "Tasks",
    tags: ["tasks", "management", "guide"],
    createdAt: "2024-03-14T15:30:00Z",
    updatedAt: "2024-03-14T15:30:00Z",
    likes: 8,
  },
]

export default function KnowledgeBasePage() {
  const { toast } = useToast()
  const [articles, setArticles] = useState<Article[]>(sampleArticles)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  })

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const tags = formData.tags.split(",").map(tag => tag.trim()).filter(Boolean)
    
    if (editingArticle) {
      // Update existing article
      setArticles(articles.map(article => 
        article.id === editingArticle.id 
          ? { 
              ...article, 
              ...formData, 
              tags,
              updatedAt: new Date().toISOString(),
            }
          : article
      ))
      toast({
        title: "Article Updated",
        description: "The article has been updated successfully.",
      })
    } else {
      // Create new article
      const newArticle: Article = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
      }
      setArticles([...articles, newArticle])
      toast({
        title: "Article Created",
        description: "A new article has been created successfully.",
      })
    }

    // Reset form and close dialog
    setFormData({
      title: "",
      content: "",
      category: "",
      tags: "",
    })
    setEditingArticle(null)
    setIsDialogOpen(false)
  }

  const handleLike = (articleId: string) => {
    setArticles(articles.map(article =>
      article.id === articleId
        ? { ...article, likes: article.likes + 1 }
        : article
    ))
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Knowledge Base</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingArticle ? "Edit Article" : "Create New Article"}</DialogTitle>
              <DialogDescription>
                {editingArticle 
                  ? "Make changes to your article here."
                  : "Add a new article to the knowledge base."}
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
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="min-h-[200px]"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="e.g., guide, tutorial, how-to"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  {editingArticle ? "Update Article" : "Create Article"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleLike(article.id)}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span className="ml-1 text-sm">{article.likes}</span>
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{article.category}</span>
                <Clock className="h-4 w-4 ml-2" />
                <span>{new Date(article.updatedAt).toLocaleDateString()}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {article.content}
              </p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredArticles.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No articles found. Try adjusting your search or filters.
          </div>
        )}
      </div>
    </div>
  )
} 