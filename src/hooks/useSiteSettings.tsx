import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettings {
  id: string;
  indique_ganhe_visible: boolean;
  created_at: string;
  updated_at: string;
}

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "main")
        .single();

      if (error) throw error;
      return data as SiteSettings;
    },
  });
};

export const useUpdateSiteSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: Partial<Pick<SiteSettings, "indique_ganhe_visible">>) => {
      const { data, error } = await supabase
        .from("site_settings")
        .update(settings)
        .eq("id", "main")
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
};
