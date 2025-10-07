"use client"
import { notFound } from "next/navigation";
import { ProjectDetails } from "@/components/portfolio/project-details";
import { useProject } from "@/hooks/useProjects";

interface PageProps {
  params: {
    id: string;
  };
}

// Define the expected project type for ProjectDetails
interface Project {
  id: number; // Changed to number to match ProjectDetailsProps
  title: string;
  category: string;
  description: string;
  longDescription: string;
  images: string[];
  completionDate: string;
  location: string;
  area: string;
  team: { name: string; role: string }[];
  features: string[];
  client: string;
}

export default function ProjectPage({ params }: PageProps) {
  const { data: projectData, isLoading, error } = useProject(params.id);

  if (isLoading) {
    return <div>Loading project...</div>;
  }

  if (error || !projectData) {
    notFound();
  }

  // Transform the fetched project data
  const project: Project = {
    id: parseInt(projectData.id, 16) || 0, // Convert hex string ID to number, fallback to 0 if invalid
    title: projectData.title,
    category: projectData.category,
    description: projectData.shortDescription || "No description available",
    longDescription: projectData.detailedDescription || "No detailed description available",
    images: projectData.images || [],
    completionDate: new Date(projectData.completionDate).getFullYear().toString() || "Unknown",
    location: projectData.location || "Unknown",
    area: projectData.area || "Unknown",
    team: projectData.projectTeamMembers?.map((member: any) => ({
      name: member.teamMember.fullName,
      role: member.teamMember.role,
    })) || [],
    features: projectData.features || [],
    client: projectData.clientName || "Unknown",
  };

  return <ProjectDetails project={project} />;
}