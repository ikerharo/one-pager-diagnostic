import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Proposal {
  id: string;
  client_name: string;
  status: "revision" | "aceptada";
  accepted_by: string | null;
  accepted_role: string | null;
  accepted_at: string | null;
}

export const useProposal = () => {
  const queryClient = useQueryClient();

  const { data: proposal, isLoading } = useQuery({
    queryKey: ["proposal"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("proposals")
        .select("*")
        .limit(1)
        .single();
      if (error) throw error;
      return data as Proposal;
    },
  });

  const acceptProposal = async (acceptedBy: string, role: string) => {
    if (!proposal) return;
    const { error } = await supabase
      .from("proposals")
      .update({
        status: "aceptada",
        accepted_by: acceptedBy,
        accepted_role: role,
        accepted_at: new Date().toISOString(),
      })
      .eq("id", proposal.id);
    if (error) throw error;
    queryClient.invalidateQueries({ queryKey: ["proposal"] });
  };

  return { proposal, isLoading, acceptProposal };
};
