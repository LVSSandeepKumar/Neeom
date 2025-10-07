"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, X } from "lucide-react"
import Image from "next/image"
import { ImageUploadButton } from "../ui/uploadButton"

interface Project {
  id: number
  title: string
  category: string
  description: string
  images: string[]
}

export function PortfolioManager() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Modern Villa Design",
      category: "Architecture",
      description: "A stunning modern villa with clean lines and sustainable features.",
      images: ["/project-1.jpg"],
    },
    {
      id: 2,
      title: "Corporate Office Interior",
      category: "Interior Design",
      description: "Contemporary office space designed for productivity and collaboration.",
      images: ["/project-2.jpg"],
    },
  ])

  const [isEditing, setIsEditing] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    images: [] as string[],
  })

  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditing && editingProject) {
      setProjects(projects.map((p) => (p.id === editingProject.id ? { ...editingProject, ...formData } : p)))
      toast({
        title: "Project Updated",
        description: "Project has been successfully updated.",
      })
    } else {
      const newProject: Project = {
        id: Date.now(),
        ...formData,
      }
      setProjects([...projects, newProject])
      toast({
        title: "Project Added",
        description: "New project has been successfully added.",
      })
    }

    setFormData({ title: "", category: "", description: "", images: [] })
    setIsEditing(false)
    setEditingProject(null)
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      images: project.images,
    })
    setIsEditing(true)
  }

  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id))
    toast({
      title: "Project Deleted",
      description: "Project has been successfully deleted.",
    })
  }

  const handleMultipleImageUpload = (urls: string[]) => {
    
      const newImages: string[] = urls;
      
      setFormData({
        ...formData,
        images: [...formData.images, ...newImages],
      });
    
  };

  const removeImage = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: updatedImages })
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>{isEditing ? "Edit Project" : "Add New Project"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Interior Design">
                      Interior Design
                    </SelectItem>
                    <SelectItem value="Architecture">Architecture</SelectItem>
                    <SelectItem value="Renovation">Renovation</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                required
              />
            </div>
            <div>
              <Label htmlFor="images">Project Imagess (Multiple)</Label>
              {/* <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleMultipleImageUpload}
                className="mt-1"
              /> */}

              <ImageUploadButton
                onUploadComplete={handleMultipleImageUpload}
                multiple={true}
              />
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        width={150}
                        height={100}
                        className="object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Button type="submit" className="bg-gray-600 hover:bg-gray-700">
                {isEditing ? "Update Project" : "Add Project"}
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingProject(null);
                    setFormData({
                      title: "",
                      category: "",
                      description: "",
                      images: [],
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={project.images[0] || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  {project.images.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      +{project.images.length - 1} more
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {project.category}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(project)}
                      className="border-gray-500 text-gray-500 hover:bg-gray-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(project.id)}
                      className="border-red-500 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
