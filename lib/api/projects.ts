export interface TeamMember {
  id: string;
  fullName: string;
  role: string;
  description: string;
  profileImage: string;
}

export interface Project {
  id: string;
  projectNo: number;
  category: string;
  subcategory: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  images: string[];
  location: string;
  area: string;
  completionDate: Date;
  clientName: string;
  features: string[];
  teamMembers: TeamMember[];
}

export interface CreateProject {
  projectNo?: number;
  category: string;
  subcategory: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  images: string[];
  location: string;
  area: string;
  completionDate: Date | string | number;
  clientName: string;
  features: string[];
  teamMemberIds: string[];
}


export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch("/api/projects");
  if (!response.ok) throw new Error("Failed to fetch projects");
  return response.json();
};


export const createProject = async (
  projectData: CreateProject
): Promise<Project> => {
 

  const response = await fetch("/api/projects", {
    method: "POST",
    body: JSON.stringify(projectData), // No Content-Type header — browser will set it
  });

  if (!response.ok) throw new Error("Failed to create project");
  return response.json();
};



export const updateProject = async (
  id: string,
  projectData: Partial<CreateProject>
): Promise<Project> => {
  const response = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });
  if (!response.ok) throw new Error("Failed to update project");
  return response.json();
};


export const deleteProject = async (id: string): Promise<{ message: string }> => {
  const response = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete project");
  return response.json();
};
