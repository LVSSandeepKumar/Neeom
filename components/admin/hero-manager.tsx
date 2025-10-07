"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, X } from "lucide-react"
import Image from "next/image"
import {
  fetchHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  HeroSlide,
  CreateHeroSlide,
} from "@/lib/api/hero-slides"

// Form type matches DB
type HeroSlideForm = {
  mainTitle: string
  subTitle: string
  description: string
  backgroundImage: string
  isActive: boolean
}

export function HeroManager() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null)
  const [formData, setFormData] = useState<HeroSlideForm>({
    mainTitle: "",
    subTitle: "",
    description: "",
    backgroundImage: "",
    isActive: true,
  })
  const { toast } = useToast()

  useEffect(() => {
    loadSlides()
  }, [])

  const loadSlides = async () => {
    setIsLoading(true)
    try {
      const data = await fetchHeroSlides()
      setSlides(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load hero slides",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (isEditing && editingSlide) {
        await updateHeroSlide(editingSlide.id, formData)
        toast({
          title: "Slide Updated",
          description: "Hero slide has been successfully updated.",
        })
      } else {
        await createHeroSlide(formData)
        toast({
          title: "Slide Added",
          description: "New hero slide has been successfully added.",
        })
      }
      await loadSlides()
      setFormData({
        mainTitle: "",
        subTitle: "",
        description: "",
        backgroundImage: "",
        isActive: true,
      })
      setIsEditing(false)
      setEditingSlide(null)
    } catch (error) {
      toast({
        title: "Error",
        description: isEditing ? "Failed to update slide" : "Failed to add slide",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide)
    setFormData({
      mainTitle: slide.mainTitle,
      subTitle: slide.subTitle,
      description: slide.description,
      backgroundImage: slide.backgroundImage,
      isActive: slide.isActive,
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    setIsLoading(true)
    try {
      await deleteHeroSlide(id)
      toast({
        title: "Slide Deleted",
        description: "Hero slide has been successfully deleted.",
      })
      await loadSlides()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete slide",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Only one image per slide
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData({ ...formData, backgroundImage: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>{isEditing ? "Edit Hero Slide" : "Add New Hero Slide"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="mainTitle">Main Title</Label>
              <Input
                id="mainTitle"
                value={formData.mainTitle}
                onChange={(e) => setFormData({ ...formData, mainTitle: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="subTitle">Sub Title</Label>
              <Input
                id="subTitle"
                value={formData.subTitle}
                onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>
            <div>
              <Label htmlFor="backgroundImage">Background Image</Label>
              <Input
                id="backgroundImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1"
              />
              {formData.backgroundImage && (
                <div className="mt-2">
                  <Image
                    src={formData.backgroundImage || "/placeholder.svg"}
                    alt="Preview"
                    width={250}
                    height={120}
                    className="object-cover rounded border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                    onClick={() => setFormData({ ...formData, backgroundImage: "" })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Active Slide</Label>
            </div>
            <div className="flex space-x-2">
              <Button type="submit" className="bg-gray-600 hover:bg-gray-700">
                {isEditing ? "Update Slide" : "Add Slide"}
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setEditingSlide(null)
                    setFormData({
                      mainTitle: "",
                      subTitle: "",
                      description: "",
                      backgroundImage: "",
                      isActive: true,
                    })
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Slides List */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Slides</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : slides.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">No hero slides found.</p>
          ) : (
            <div className="space-y-4">
              {slides.map((slide) => (
                <Card key={slide.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="relative w-48 h-32">
                      <Image
                        src={slide.backgroundImage || "/placeholder.svg"}
                        alt={slide.mainTitle}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{slide.mainTitle}</h3>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            slide.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {slide.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{slide.subTitle}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{slide.description}</p>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(slide)}
                          className="border-gray-500 text-gray-500 hover:bg-gray-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(slide.id)}
                          className="border-red-500 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
