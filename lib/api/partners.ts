export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  isActive: boolean;
}

export type CreatePartner = Omit<Partner, "id">;

export async function fetchPartners(): Promise<Partner[]> {
  const response = await fetch("/api/partners");
  if (!response.ok) throw new Error("Failed to fetch partners");
  return response.json();
}

export async function createPartner(data: CreatePartner): Promise<Partner> {
  const response = await fetch("/api/partners", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create partner");
  return response.json();
}

export async function updatePartner(
  id: string,
  data: Partial<CreatePartner>
): Promise<Partner> {
  const response = await fetch(`/api/partners/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update partner");
  return response.json();
}

export async function deletePartner(id: string): Promise<void> {
  const response = await fetch(`/api/partners/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete partner");
}
