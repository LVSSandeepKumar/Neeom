export interface LeadershipMember {
  id: string;
  fullName: string;
  role: string;
  description: string;
  profileImage: string;
}

export type CreateLeadershipMember = Omit<LeadershipMember, "id">;

export async function fetchLeadershipMembers(): Promise<LeadershipMember[]> {
  const response = await fetch("/api/team-members");
  if (!response.ok) throw new Error("Failed to fetch leadership members");
  return response.json();
}

export const fetchLeadershipMember = async (id: string) => {
  const res = await fetch(`/api/team-members/${id}`);
  if (!res.ok) throw new Error("Failed to fetch team member");
  return res.json();
};

export async function createLeadershipMember(data: CreateLeadershipMember) {
  const response = await fetch("/api/team-members", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create leadership member");
  return response.json();
}

export async function updateLeadershipMember(id: string, data: Partial<CreateLeadershipMember>) {
  const response = await fetch(`/api/team-members/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update leadership member");
  return response.json();
}

export async function deleteLeadershipMember(id: string) {
  const response = await fetch(`/api/team-members/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete leadership member");
  return response.json();
}
