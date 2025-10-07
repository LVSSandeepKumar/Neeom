"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface GalleryImage {
  id: number
  url: string
  alt: string
  uploadedAt: Date
}

export function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: 1,
      url: "/project-1.jpg",
      alt: "Modern Villa Interior",
      uploadedAt: new Date(),
    },
    {
      id: 2,
      url: "/project-2.jpg",
      alt: "Corporate Office Design",
      uploadedAt: new Date(),
    },
    {
      id: 3,
      url: "/project-3.jpg",
      alt: "Luxury Apartment",
      uploadedAt: new Date(),
    },
    {
      id: 4,
      url: "/project-4.jpg",
      alt: "Commercial Space",
      uploadedAt: new Date(),
    },
  ])

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const { toast } = useToast()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files)
  }

  const handleUpload = () => {
    if (!selectedFiles) return

    const newImages: GalleryImage[] = []
    Array.from(selectedFiles).forEach((file, index) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage: GalleryImage = {
          id: Date.now() + index,
          url: e.target?.result as string,
          alt: file.name,
          uploadedAt: new Date(),
        }
        newImages.push(newImage)

        if (newImages.length === selectedFiles.length) {
          setImages((prev) => [...prev, ...newImages])
          toast({
            title: "Images Uploaded",
            description: `${selectedFiles.length} image(s) have been successfully uploaded.`,
          })
        }
      }
      reader.readAsDataURL(file)
    })

    setSelectedFiles(null)
    // Reset file input
    const fileInput = document.getElementById("gallery-upload") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleDelete = (id: number) => {
    setImages(images.filter((img) => img.id !== id))
    toast({
      title: "Image Deleted",
      description: "Image has been successfully deleted.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Upload Multiple Images</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="gallery-upload">Select Multiple Images</Label>
              <Input
                id="gallery-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                You can select multiple images at once by holding Ctrl (Windows) or Cmd (Mac) while clicking.
              </p>
            </div>
            {selectedFiles && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Selected: {selectedFiles.length} file(s)
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.from(selectedFiles).map((file, index) => (
                    <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {file.name}
                    </span>
                  ))}
                </div>
                <Button onClick={handleUpload} className="bg-gray-600 hover:bg-gray-700">
                  Upload {selectedFiles.length} Image(s)
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Gallery Images ({images.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={image.url || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-2">
                  <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{image.alt}</p>
                  <p className="text-xs text-gray-400">{image.uploadedAt.toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {images.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No images uploaded yet. Upload some images to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
