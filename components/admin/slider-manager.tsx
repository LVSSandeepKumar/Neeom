"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, MoveUp, MoveDown, Eye, X } from "lucide-react";
import Image from "next/image";
import {
  fetchHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  HeroSlide,
  CreateHeroSlide,
} from "@/lib/api/hero-slides";
import { ImageUploadButton } from "../ui/uploadButton";

type SliderForm = {
  slideNumber: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  isActive: boolean;
};

export function SliderManager() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState<SliderForm>({
    slideNumber: 0,
    title: "",
    subtitle: "",
    description: "",
    image: "",
    isActive: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    setIsLoading(true);
    try {
      const data = await fetchHeroSlides();
      setSlides(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load hero slides",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getNextSlideNumber = () => {
    const maxNumber = Math.max(...slides.map((s) => s.slideNumber), 0);
    return maxNumber + 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Map UI fields to API fields, include slideNumber
      const apiPayload: CreateHeroSlide = {
        slideNumber: formData.slideNumber || getNextSlideNumber(),
        mainTitle: formData.title,
        subTitle: formData.subtitle,
        description: formData.description,
        backgroundImage: formData.image,
        isActive: formData.isActive,
      };
      if (isEditing && editingSlide) {
        await updateHeroSlide(editingSlide.id, apiPayload);
        toast({
          title: "Slide Updated",
          description: `Slide ${apiPayload.slideNumber} has been successfully updated.`,
        });
      } else {
        await createHeroSlide(apiPayload);
        toast({
          title: "Slide Added",
          description: `Slide ${apiPayload.slideNumber} has been successfully added to hero slider.`,
        });
      }
      await loadSlides();
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: isEditing
          ? "Failed to update slide"
          : "Failed to add slide",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      slideNumber: 0,
      title: "",
      subtitle: "",
      description: "",
      image: "",
      isActive: true,
    });
    setIsEditing(false);
    setEditingSlide(null);
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      slideNumber: slide.slideNumber,
      title: slide.mainTitle,
      subtitle: slide.subTitle,
      description: slide.description,
      image: slide.backgroundImage,
      isActive: slide.isActive,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteHeroSlide(id);
      toast({
        title: "Slide Deleted",
        description: "Hero slide has been successfully deleted.",
      });
      // await loadSlides();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete slide",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (urls: string[]) => {
    if (urls.length>0) {
      setFormData({ ...formData, image: urls[0] });
    }
  };

  const moveSlide = async (id: string, direction: "up" | "down") => {
    const slideIndex = slides.findIndex((s) => s.id === id);
    const newSlides = [...slides];
    const targetIndex = direction === "up" ? slideIndex - 1 : slideIndex + 1;

    if (
      (direction === "up" && slideIndex === 0) ||
      (direction === "down" && slideIndex === slides.length - 1)
    ) {
      return;
    }

    // Swap positions
    [newSlides[slideIndex], newSlides[targetIndex]] = [
      newSlides[targetIndex],
      newSlides[slideIndex],
    ];

    // Update slide numbers based on new order and call API
    try {
      setIsLoading(true);
      // Update both slides that were swapped
      await Promise.all([
        updateHeroSlide(newSlides[slideIndex].id, {
          slideNumber: slideIndex + 1,
        }),
        updateHeroSlide(newSlides[targetIndex].id, {
          slideNumber: targetIndex + 1,
        }),
      ]);

      // Refresh slides after successful update
      await loadSlides();

      toast({
        title: "Success",
        description: "Slide order updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to update slide order",
        variant: "destructive"
      });
      // Revert the local state on error
      loadSlides();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>
              {isEditing
                ? `Edit Slide ${formData.slideNumber}`
                : "Add New Hero Slide"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="slideNumber">Slide Number *</Label>
                <Input
                  id="slideNumber"
                  type="number"
                  value={formData.slideNumber || getNextSlideNumber() || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slideNumber: Number.parseInt(e.target.value),
                    })
                  }
                  placeholder="Auto-generated"
                  min="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will be Slide{" "}
                  {formData.slideNumber || getNextSlideNumber()}
                </p>
              </div>
              <div className="flex items-center space-x-2 mt-6">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
                <Label htmlFor="isActive">Active Slide</Label>
              </div>
            </div>

            <div>
              <Label htmlFor="title">Main Title * (Large text)</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., TRANSFORMING SPACES"
                required
              />
            </div>

            <div>
              <Label htmlFor="subtitle">Subtitle * (Medium text)</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                placeholder="e.g., Where Design Meets Innovation"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description * (Small text)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description that appears below the subtitle..."
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Slide Background Image *</Label>
              {/* <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="mt-1" /> */}
              <ImageUploadButton
                onUploadComplete={handleImageUpload}
                multiple={false}
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload a high-quality image for the slide background.
                Recommended size: 1920x1080px
              </p>
              {formData.image && (
                <div className="mt-4">
                  <Image
                    src={formData.image || "/placeholder.svg"}
                    alt="Slide Preview"
                    width={300}
                    height={180}
                    className="object-cover rounded border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                    onClick={() => setFormData({ ...formData, image: "" })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button type="submit" className="btn-custom">
                {isEditing ? "Update Slide" : "Add Slide"}
              </Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={resetForm}>
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
          <CardTitle>
            Hero Slider ({slides.filter((s) => s.isActive).length} active
            slides)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {slides
              .sort((a, b) => a.slideNumber - b.slideNumber)
              .map((slide, index) => (
                <Card key={slide.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="relative w-48 h-32">
                      <Image
                        src={slide.backgroundImage || "/placeholder.svg"}
                        alt={slide.mainTitle}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold">
                        Slide {slide.slideNumber}
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {slide.mainTitle}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {slide.subTitle}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              slide.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {slide.isActive ? "Active" : "Inactive"}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open("/", "_blank")}
                            className="border-blue-500 text-blue-500 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {slide.description}
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveSlide(slide.id, "up")}
                          disabled={index === 0}
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveSlide(slide.id, "down")}
                          disabled={index === slides.length - 1}
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
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
        </CardContent>
      </Card>
    </div>
  );
}
