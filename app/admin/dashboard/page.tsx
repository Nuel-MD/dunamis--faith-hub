"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { resources, type Resource } from "@/lib/data"
import { Edit, Trash2, Plus, LogOut } from "lucide-react"
import { getMetadataFromLink } from "@/lib/metadata"

export default function AdminDashboard() {
  const router = useRouter()
  const [localResources, setLocalResources] = useState<Resource[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Resource['category']>("sermons")
  const [currentResource, setCurrentResource] = useState<Partial<Resource>>({
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    externalLink: "",
    category: "sermons",
  })

  // Categories available in the system
  const CATEGORIES: Resource['category'][] = ["sermons", "worship", "books", "movies"]

  useEffect(() => {
    const url = currentResource.externalLink?.trim()
    if (!url) return

    const fetchMetadata = async () => {
      const metadata = await getMetadataFromLink(url)
      if (metadata) {
        setCurrentResource((prev) => ({
          ...prev,
          title: metadata.title,
          description: metadata.description,
          imageUrl: metadata.imageUrl,
        }))
      }
    }

    fetchMetadata()
  }, [currentResource.externalLink])

  useEffect(() => {
    const isAuthenticated = true // Mock authentication
    if (!isAuthenticated) {
      router.push("/admin")
      return
    }
    setLocalResources(resources)
  }, [router])

  const handleLogout = () => {
    router.push("/admin")
  }

  const handleAddNew = () => {
    setIsEditing(false)
    setCurrentResource({
      id: `resource-${Date.now()}`,
      title: "",
      description: "",
      imageUrl: "/placeholder.svg?height=400&width=600",
      externalLink: "",
      category: currentCategory,
    })
    setIsAddModalOpen(true)
  }

  const handleEdit = (resource: Resource) => {
    setIsEditing(true)
    setCurrentResource({ ...resource })
    setIsEditModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      setLocalResources(localResources.filter((resource) => resource.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentResource.title || !currentResource.description || !currentResource.externalLink) {
      alert("Please fill in all required fields")
      return
    }

    if (isEditing) {
      setLocalResources(
        localResources.map((resource) =>
          resource.id === currentResource.id ? { ...(currentResource as Resource) } : resource
        )
      )
      setIsEditModalOpen(false)
    } else {
      setLocalResources([...localResources, currentResource as Resource])
      setIsAddModalOpen(false)
    }

    setCurrentResource({
      id: "",
      title: "",
      description: "",
      imageUrl: "/placeholder.svg?height=400&width=600",
      externalLink: "",
      category: currentCategory,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentResource({ ...currentResource, [name]: value })
  }

  const handleSelectChange = (value: string) => {
    setCurrentResource({ ...currentResource, category: value as Resource["category"] })
  }

  const filteredResources = localResources.filter(resource => resource.category === currentCategory)

  const renderResourceModal = (isEdit: boolean) => (
    <Dialog 
      open={isEdit ? isEditModalOpen : isAddModalOpen} 
      onOpenChange={isEdit ? setIsEditModalOpen : setIsAddModalOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Resource" : "Add New Resource"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the details of an existing resource."
              : "Fill in the details to add a new resource to your collection."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={currentResource.title}
              onChange={handleInputChange}
              placeholder="Resource title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={currentResource.category} 
              onValueChange={handleSelectChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={currentResource.description}
              onChange={handleInputChange}
              placeholder="Resource description"
              required
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={currentResource.imageUrl}
              onChange={handleInputChange}
              placeholder="URL to resource image"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="externalLink">External Link</Label>
            <Input
              id="externalLink"
              name="externalLink"
              value={currentResource.externalLink}
              onChange={handleInputChange}
              placeholder="URL to external resource"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => isEdit ? setIsEditModalOpen(false) : setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEdit ? "Update Resource" : "Add Resource"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut size={16} />
          <span>Logout</span>
        </Button>
      </div>

      <Tabs 
        value={currentCategory} 
        onValueChange={(value) => setCurrentCategory(value as Resource['category'])}
      >
        <TabsList className="mb-6">
          {CATEGORIES.map(category => (
            <TabsTrigger key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map(category => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardHeader>
                <CardTitle>Manage {category.charAt(0).toUpperCase() + category.slice(1)} Resources</CardTitle>
                <CardDescription>View, edit, or delete resources in the {category} category.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button onClick={handleAddNew} className="flex items-center gap-2">
                    <Plus size={16} />
                    <span>Add New Resource</span>
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredResources.map((resource) => (
                        <TableRow key={resource.id}>
                          <TableCell className="font-medium">{resource.title}</TableCell>
                          <TableCell className="max-w-xs truncate">{resource.description}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={() => handleEdit(resource)}
                              >
                                <Edit size={16} />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDelete(resource.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 size={16} />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {renderResourceModal(isEditing)}
      {renderResourceModal(false)}
    </div>
  )
}