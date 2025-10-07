"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import {
  fetchLeadershipMembers,
  createLeadershipMember,
  updateLeadershipMember,
  deleteLeadershipMember,
  LeadershipMember,
  CreateLeadershipMember,
} from "@/lib/api/leadership"
import { ImageUploadButton } from "../ui/uploadButton"

// Adjust types to match DB
type TeamMemberForm = {
  fullName: string
  role: string
  description: string
  profileImage: string
}

export function LeadershipManager() {
  const [members, setMembers] = useState<LeadershipMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingMember, setEditingMember] = useState<LeadershipMember | null>(null)
  const [formData, setFormData] = useState<TeamMemberForm>({
    fullName: "",
    role: "",
    description: "",
    profileImage: "",
  })
  const { toast } = useToast()

  // Load members from API
  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    setIsLoading(true)
    try {
      const data = await fetchLeadershipMembers()
      setMembers(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load leadership members",
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
      if (isEditing && editingMember) {
        await updateLeadershipMember(editingMember.id, formData)
        toast({
          title: "Member Updated",
          description: "Leadership member has been successfully updated.",
        })
      } else {
        await createLeadershipMember(formData)
        toast({
          title: "Member Added",
          description: "New leadership member has been successfully added.",
        })
      }
      await loadMembers()
      setFormData({ fullName: "", role: "", description: "", profileImage: "" })
      setIsEditing(false)
      setEditingMember(null)
    } catch (error) {
      toast({
        title: "Error",
        description: isEditing ? "Failed to update member" : "Failed to add member",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (member: LeadershipMember) => {
    setEditingMember(member)
    setFormData({
      fullName: member.fullName,
      role: member.role,
      description: member.description,
      profileImage: member.profileImage,
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    setIsLoading(true)
    try {
      await deleteLeadershipMember(id)
      toast({
        title: "Member Deleted",
        description: "Leadership member has been successfully deleted.",
      })
      await loadMembers()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete member",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Set profileImage as base64 string
  const handleImageUpload = (urls: string[]) => {
    if (urls.length > 0) {
      setFormData({ ...formData, profileImage:urls[0]  });
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
              {isEditing ? "Edit Team Member" : "Add New Team Member"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Role/Position</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                />
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
              <Label htmlFor="profileImage">Profile Image</Label>
              <ImageUploadButton
                onUploadComplete={handleImageUpload}
                multiple={false}
              />
              {/* <Input id="profileImage" type="file" accept="image/*" onChange={handleImageUpload} className="mt-1" /> */}
              {formData.profileImage && (
                <div className="mt-2">
                  <Image
                    src={formData.profileImage || "/placeholder.svg"}
                    alt="Preview"
                    width={150}
                    height={150}
                    className="object-cover rounded-full"
                  />
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                type="submit"
                className="btn-custom"
              >
                {isEditing ? "Update Member" : "Add Member"}
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingMember(null);
                    setFormData({
                      fullName: "",
                      role: "",
                      description: "",
                      profileImage: "",
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

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Leadership Team</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : members.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">
              No team members found.
            </p>
          ) : (
            <div className="space-y-4">
              {members.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={member.profileImage || "/placeholder.svg"}
                        alt={member.fullName}
                        fill
                        className="object-cover rounded-l"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {member.fullName}
                          </h3>
                          <p className="text-orange-500 font-medium">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {member.description}
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(member)}
                          className="border-orange-500 text-orange-500 hover:bg-orange-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(member.id)}
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
  );
}