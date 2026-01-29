import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Gift, Loader2 } from "lucide-react";
import { useSiteSettings, useUpdateSiteSettings } from "@/hooks/useSiteSettings";
import { toast } from "sonner";

const SiteSettingsManager = () => {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();

  const handleToggleIndiqueGanhe = async (checked: boolean) => {
    try {
      await updateSettings.mutateAsync({ indique_ganhe_visible: checked });
      toast.success(checked ? "Indique e Ganhe ativado no menu" : "Indique e Ganhe ocultado do menu");
    } catch (error) {
      toast.error("Erro ao atualizar configuração");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Visibilidade do Menu
          </CardTitle>
          <CardDescription>
            Configure quais itens aparecem no menu do site. Ideal para campanhas sazonais.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="indique-ganhe-toggle" className="text-base font-medium">
                Indique e Ganhe
              </Label>
              <p className="text-sm text-muted-foreground">
                Mostrar link "Indique e Ganhe" no menu principal e rodapé
              </p>
            </div>
            <Switch
              id="indique-ganhe-toggle"
              checked={settings?.indique_ganhe_visible ?? true}
              onCheckedChange={handleToggleIndiqueGanhe}
              disabled={updateSettings.isPending}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettingsManager;
