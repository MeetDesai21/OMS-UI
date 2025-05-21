"use client"

import { useState } from "react"
import { PageContainer } from "@/components/layout/page-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, FolderPlus } from "lucide-react"
import { mockCategories } from "@/lib/mock-data"

export default function Page() {
  const [categories, setCategories] = useState(mockCategories)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    color: "#E8F5E8",
    icon: "folder",
  })

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return

    const newCategoryObj = {
      id: `cat-${Date.now()}`,
      name: newCategory.name,
      description: newCategory.description,
      color: newCategory.color,
      icon: newCategory.icon,
      itemCount: 0,
    }

    setCategories([...categories, newCategoryObj])
    setNewCategory({
      name: "",
      description: "",
      color: "#E8F5E8",
      icon: "folder",
    })
    setIsAddingCategory(false)
  }

  const handleDeleteCategory = (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== id))
    }
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="heading-2">Categories</h1>
            <p className="text-muted-foreground">Manage ticket categories and organization</p>
          </div>
          <Button className="gap-2" onClick={() => setIsAddingCategory(true)}>
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isAddingCategory && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
              <CardDescription>Create a new category for organizing tickets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Category name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Brief description"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="color" className="text-sm font-medium">
                    Color
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="color"
                      type="color"
                      value={newCategory.color}
                      onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                      className="w-12 h-8 p-1"
                    />
                    <Input
                      value={newCategory.color}
                      onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="icon" className="text-sm font-medium">
                    Icon
                  </label>
                  <select
                    id="icon"
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="folder">Folder</option>
                    <option value="laptop">Laptop</option>
                    <option value="code">Code</option>
                    <option value="wifi">Wifi</option>
                    <option value="building">Building</option>
                    <option value="users">Users</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsAddingCategory(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory}>Add Category</Button>
            </CardFooter>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center"
                      style={{ backgroundColor: category.color }}
                    >
                      <FolderPlus className="h-4 w-4 text-white" />
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">{category.itemCount}</span> tickets in this category
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
