"use client";

import { useEffect, useState } from "react";
import { fetchProjects, createProject, updateProject, deleteProject, Project, CreateProject } from "@/lib/api/projects";
import { fetchLeadershipMembers, LeadershipMember } from "@/lib/api/leadership";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, X, MoveUp, MoveDown, Eye } from "lucide-react";
import Image from "next/image";
import { ImageUploadButton } from "../ui/uploadButton";

function byteArrayToBase64(byteArray: number[] | string) {
  if (typeof byteArray === "string") return byteArray;
  const uint8Array = new Uint8Array(byteArray);
  let binary = "";
  uint8Array.forEach((byte) => (binary += String.fromCharCode(byte)));
  return window.btoa(binary);
}

export function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [nextProjectNumber, setNextProjectNumber] = useState<number>(1);
  const { toast } = useToast();

  const [formData, setFormData] = useState<CreateProject>({
    projectNo: 0,
    title: "",
    category: "",
    subcategory: "",
    shortDescription: "",
    detailedDescription: "",
    images: [],
    location: "",
    area: "",
    completionDate: "",
    clientName: "",
    features: [],
    teamMemberIds: [],
  });

  const [teamMembers, setTeamMembers] = useState<LeadershipMember[]>([]);

  useEffect(() => {
    loadProjects();
    loadTeamMembers();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadTeamMembers = async () => {
    try {
      const data = await fetchLeadershipMembers();
      setTeamMembers(data);
    } catch {
      setTeamMembers([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const apiPayload: CreateProject = {
        projectNo: formData.projectNo || nextProjectNumber,
        title: formData.title,
        category: formData.category,
        subcategory: formData.subcategory,
        shortDescription: formData.shortDescription,
        detailedDescription: formData.detailedDescription,
        images: formData.images,
        location: formData.location,
        area: formData.area,
        completionDate: new Date(formData.completionDate).toISOString(),
        clientName: formData.clientName,
        features: formData.features,
        teamMemberIds: formData.teamMemberIds,
      };

      if (isEditing && editingProject) {
        await updateProject(editingProject.id, apiPayload);
        toast({
          title: "Success",
          description: `Project ${apiPayload.projectNo} has been successfully updated.`,
        });
      } else {
        await createProject(apiPayload);
        toast({
          title: "Success",
          description: `Project ${apiPayload.projectNo} has been successfully created.`,
        });
      }
      await loadProjects();
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: isEditing ? "Failed to update project" : "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      await loadProjects();
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    console.log("Project coming into edit is:", project);

    // Set formData based on project values. Use direct values (strings) for completionDate.
    setFormData({
      projectNo: project.projectNo,
      title: project.title,
      category: project.category,
      subcategory: project.subcategory,
      shortDescription: project.shortDescription,
      detailedDescription: project.detailedDescription,
      images: project.images || [],
      location: project.location,
      area: project.area,
      // Keep completionDate as YYYY-MM-DD string (if project has ISO string)
      completionDate: project.completionDate ? new Date(project.completionDate).toISOString().split("T")[0] : "",
      clientName: project.clientName || "",
      features: project.features ? [...project.features] : [],
      teamMemberIds: (project.teamMembers || []).map((mem) => mem.id),
    });

    // Do not console.log formData immediately — it's async. Use useEffect to observe changes instead.
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      projectNo: 0,
      title: "",
      category: "",
      subcategory: "",
      shortDescription: "",
      detailedDescription: "",
      images: [],
      location: "",
      area: "",
      completionDate: "",
      clientName: "",
      features: [],
      teamMemberIds: [],
    });
    setIsEditing(false);
    setEditingProject(null);
  };

  // Log when formData changes while editing (for debugging). now depends on isEditing too.
  useEffect(() => {
    if (isEditing) console.log("Form data changed:", formData);
  }, [formData, isEditing]);

  const moveProject = (id: string, direction: "up" | "down") => {
    const projectIndex = projects.findIndex((p) => p.id === id);
    const newProjects = [...projects];
    const targetIndex = direction === "up" ? projectIndex - 1 : projectIndex + 1;

    if ((direction === "up" && projectIndex === 0) || (direction === "down" && projectIndex === projects.length - 1)) {
      return;
    }
    [newProjects[projectIndex], newProjects[targetIndex]] = [newProjects[targetIndex], newProjects[projectIndex]];

    // Update project numbers based on new order
    newProjects.forEach((project, index) => {
      project.projectNo = index + 1;
    });

    setProjects(newProjects);
  };

  const getNextProjectNumber = () => {
    const maxNumber = Math.max(...projects.map((p) => p.projectNo), 0);
    return maxNumber + 1;
  };

  useEffect(() => {
    setNextProjectNumber(getNextProjectNumber());
  }, [projects]);

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? `Edit Project ${formData.projectNo}` : "Add New Project"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="projectNumber">Project Number *</Label>
                <Input
                  id="projectNumber"
                  type="number"
                  value={formData.projectNo || nextProjectNumber || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      projectNo: Number.parseInt(e.target.value),
                    }))
                  }
                  placeholder="Auto-generated"
                  min="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will be Project {formData.projectNo || nextProjectNumber}
                </p>
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value, subcategory: "" }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subCategory">Sub Category</Label>
                <Select
                  value={formData.subcategory}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, subcategory: value }))}
                  disabled={!formData.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sub category" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.category === "Residential" && (
                      <>
                        <SelectItem value="Luxury Homes">Luxury Homes</SelectItem>
                        <SelectItem value="Apartments">Apartments</SelectItem>
                        <SelectItem value="Condominiums">Condominiums</SelectItem>
                        <SelectItem value="Townhouses">Townhouses</SelectItem>
                        <SelectItem value="Renovations">Renovations</SelectItem>
                      </>
                    )}
                    {formData.category === "Commercial" && (
                      <>
                        <SelectItem value="Office Spaces">Office Spaces</SelectItem>
                        <SelectItem value="Retail Stores">Retail Stores</SelectItem>
                        <SelectItem value="Restaurants">Restaurants</SelectItem>
                        <SelectItem value="Hotels">Hotels</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Educational">Educational</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Project Title and Descriptions */}
            <div>
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Modern Villa Design"
                required
              />
            </div>

            <div>
              <Label htmlFor="shortDescription">Short Description * (for portfolio grid)</Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                placeholder="Brief description that appears in portfolio grid..."
                rows={2}
                required
              />
            </div>

            <div>
              <Label htmlFor="detailedDescription">Detailed Description * (for project detail page)</Label>
              <Textarea
                id="detailedDescription"
                value={formData.detailedDescription}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    detailedDescription: e.target.value,
                  }))
                }
                placeholder="Detailed description that appears on project detail page..."
                rows={4}
                required
              />
            </div>

            {/* Project Images */}
            <div>
              <Label htmlFor="images">Project Images * (First image shows in portfolio grid)</Label>
              <ImageUploadButton
                onUploadComplete={(urls) => {
                  // Use functional setState to avoid stale closure
                  setFormData((prev) => ({
                    ...prev,
                    images: [...prev.images, ...urls],
                  }));
                }}
                multiple={true}
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload multiple images. The FIRST image will be displayed in the portfolio grid. All images will be
                shown in the project detail page.
              </p>
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
                      {index === 0 && (
                        <div className="absolute top-1 left-1 bg-green-500 text-white px-2 py-1 rounded text-xs">
                          Portfolio Cover
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => {
                          setFormData((prev) => {
                            const updatedImages = prev.images.filter((_, i) => i !== index);
                            return { ...prev, images: updatedImages };
                          });
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Beverly Hills, CA"
                  required
                />
              </div>
              <div>
                <Label htmlFor="area">Area *</Label>
                <Input
                  id="area"
                  value={formData.area}
                  onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
                  placeholder="e.g., 4,500 sq ft"
                  required
                />
              </div>
              <div>
                <Label htmlFor="completionDate">Completion Date *</Label>
                <Input
                  id="completionDate"
                  type="date"
                  value={formData.completionDate || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, completionDate: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="clientName">Client *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, clientName: e.target.value }))}
                  placeholder="e.g., Private Residence"
                  required
                />
              </div>
            </div>

            {/* Project Features */}
            <div>
              <Label>Project Features</Label>
              <div className="space-y-2 mt-2">
                {(formData?.features ?? []).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={feature}
                      onChange={(e) => {
                        setFormData((prev) => {
                          const updatedFeatures = prev.features.map((f, i) => (i === index ? e.target.value : f));
                          return { ...prev, features: updatedFeatures };
                        });
                      }}
                      placeholder="e.g., Sustainable Materials"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFormData((prev) => {
                          const updatedFeatures = prev.features.filter((_, i) => i !== index);
                          return { ...prev, features: updatedFeatures };
                        });
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    // Avoid mutating previous array; create a new one
                    setFormData((prev) => ({
                      ...prev,
                      features: [...prev.features, ""],
                    }));
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
            </div>

            {/* Team Members */}
            <div>
              <Label>Project Team</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <Select
                    value=""
                    onValueChange={(value) => {
                      setFormData((prev) => {
                        if (!prev.teamMemberIds.includes(value)) {
                          return { ...prev, teamMemberIds: [...prev.teamMemberIds, value] };
                        }
                        return prev;
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Add team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.fullName} ({member.role})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Display selected team members */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.teamMemberIds.map((id) => {
                    const member = teamMembers.find((m) => m.id === id);
                    if (!member) return null;
                    return (
                      <div
                        key={id}
                        className="flex items-center bg-gray-100 dark:bg-gray-800 rounded px-3 py-1 mr-2 mb-2"
                      >
                        <span className="mr-2">
                          {member.fullName} <span className="text-xs text-gray-500">({member.role})</span>
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, teamMemberIds: prev.teamMemberIds.filter((mid) => mid !== id) }));
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button type="submit" className="btn-custom">
                {isEditing ? "Update Project" : "Add Project"}
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

      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle>Projects ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project, index) => {
                return (
                  // Use stable unique key: project.id
                  <Card key={project.id}>
                    <div className="flex">
                      <div className="relative w-48 h-32">
                        <Image
                          src={project.images[0] || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                          Project {project.projectNo}
                        </div>
                        {project.images.length > 1 && (
                          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                            +{project.images.length - 1} more
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{project.title}</h3>
                            <p className="text-sm text-gray-600">
                              {project.category} - {project.subcategory}
                            </p>
                            <p className="text-sm text-gray-500">
                              {project.location} • {project.area}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {project.shortDescription}
                        </p>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => moveProject(project.id, "up")}
                            disabled={index === 0}
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => moveProject(project.id, "down")}
                            disabled={index === projects.length - 1}
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`/portfolio/${project.id}`, "_blank")}
                            className="border-blue-500 text-blue-500 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
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
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
