"use client";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { type HeroSlide, type CreateHeroSlide, fetchHeroSlides, fetchHeroSlide, createHeroSlide, updateHeroSlide, deleteHeroSlide } from "@/lib/api/hero-slides";

export const useHeroSlides = () =>
  useQuery({
    queryKey: ["hero-slides"],
    queryFn: fetchHeroSlides,
  });

export const useHeroSlide = (id?: string) =>
  useQuery({
    queryKey: ["hero-slide", id],
    queryFn: () => fetchHeroSlide(id!),
    enabled: !!id,
  });

// Create Hero Slide
export const useCreateHeroSlide = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: createHeroSlide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero-slides"] });
      toast({
        title: "Success",
        description: "Hero slide created successfully!",
      });
    },
  });
};

// Update Hero Slide
export const useUpdateHeroSlide = (id: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: Partial<CreateHeroSlide>) => updateHeroSlide(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero-slides"] });
      queryClient.invalidateQueries({ queryKey: ["hero-slide", id] });
      toast({
        title: "Success",
        description: "Hero slide updated successfully!",
      });
    },
  });
};

// Delete Hero Slide
export const useDeleteHeroSlide = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: deleteHeroSlide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero-slides"] });
      toast({
        title: "Success",
        description: "Hero slide deleted successfully!",
      });
    },
  });
};