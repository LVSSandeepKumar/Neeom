export interface HeroSlide {
  id: string;
  slideNumber: number;
  isActive: boolean;
  mainTitle: string;
  subTitle: string;
  description: string;
  backgroundImage: string;
}

export type CreateHeroSlide = {
  slideNumber: number;
  mainTitle: string;
  subTitle: string;
  description: string;
  backgroundImage: string;
  isActive: boolean;
};

export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  const response = await fetch("/api/hero-slides");
  if (!response.ok) throw new Error("Failed to fetch hero slides");
  return response.json();
}

export const fetchHeroSlide = async (id: string) => {
  const res = await fetch(`/api/hero-slides/${id}`);
  if (!res.ok) throw new Error("Failed to fetch hero slide");
  return res.json();
};

export async function createHeroSlide(data: CreateHeroSlide) {
  const response = await fetch("/api/hero-slides", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create hero slide");
  return response.json();
}

export async function updateHeroSlide(id: string, data: Partial<CreateHeroSlide>) {
  const response = await fetch(`/api/hero-slides/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update hero slide");
  return response.json();
}

export async function deleteHeroSlide(id: string) {
  const response = await fetch(`/api/hero-slides/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete hero slide");
  return response.json();
}
