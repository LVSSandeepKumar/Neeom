"use client";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  type CreateLeadershipMember,
  fetchLeadershipMembers,
  fetchLeadershipMember,
  createLeadershipMember,
  updateLeadershipMember,
  deleteLeadershipMember,
} from "@/lib/api/leadership";

export const useTeamMembers = () =>
  useQuery({
    queryKey: ["team-members"],
    queryFn: fetchLeadershipMembers,
  });

export const useTeamMember = (id?: string) =>
  useQuery({
    queryKey: ["team-member", id],
    queryFn: () => fetchLeadershipMember(id!),
    enabled: !!id,
  });

// Create Team Member
export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: createLeadershipMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast({
        title: "Success",
        description: "Team member created successfully!",
      });
    },
  });
};

// Update Team Member
export const useUpdateTeamMember = (id: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: Partial<CreateLeadershipMember>) => updateLeadershipMember(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      queryClient.invalidateQueries({ queryKey: ["team-member", id] });
      toast({
        title: "Success",
        description: "Team member updated successfully!",
      });
    },
  });
};

// Delete Team Member
export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: deleteLeadershipMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast({
        title: "Success",
        description: "Team member deleted successfully!",
      });
    },
  });
};
