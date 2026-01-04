import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface App {
  id: string;
  name: string;
  icon_url: string | null;
}

interface Plan {
  id: string;
  name: string;
  speed: string;
  price: number | null;
  is_consultation: boolean;
  features: string[];
  is_popular: boolean;
  sort_order: number;
}

interface PlanApp {
  plan_id: string;
  app_id: string;
}

const PlansManager = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [planApps, setPlanApps] = useState<PlanApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    speed: "",
    price: "",
    is_consultation: false,
    features: [""],
    is_popular: false,
    sort_order: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [plansRes, appsRes, planAppsRes] = await Promise.all([
        supabase.from("plans").select("*").order("sort_order"),
        supabase.from("apps").select("*").order("name"),
        supabase.from("plan_apps").select("*"),
      ]);

      if (plansRes.data) setPlans(plansRes.data);
      if (appsRes.data) setApps(appsRes.data);
      if (planAppsRes.data) setPlanApps(planAppsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const openCreateDialog = () => {
    setEditingPlan(null);
    setFormData({
      name: "",
      speed: "",
      price: "",
      is_consultation: false,
      features: [""],
      is_popular: false,
      sort_order: plans.length + 1,
    });
    setSelectedApps([]);
    setIsDialogOpen(true);
  };

  const openEditDialog = (plan: Plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      speed: plan.speed,
      price: plan.price?.toString() || "",
      is_consultation: plan.is_consultation,
      features: plan.features.length > 0 ? plan.features : [""],
      is_popular: plan.is_popular,
      sort_order: plan.sort_order,
    });
    const currentApps = planApps
      .filter((pa) => pa.plan_id === plan.id)
      .map((pa) => pa.app_id);
    setSelectedApps(currentApps);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const planData = {
      name: formData.name,
      speed: formData.speed,
      price: formData.is_consultation ? null : parseFloat(formData.price) || null,
      is_consultation: formData.is_consultation,
      features: formData.features.filter((f) => f.trim() !== ""),
      is_popular: formData.is_popular,
      sort_order: formData.sort_order,
    };

    try {
      if (editingPlan) {
        // Update plan
        const { error } = await supabase
          .from("plans")
          .update(planData)
          .eq("id", editingPlan.id);

        if (error) throw error;

        // Update plan apps
        await supabase.from("plan_apps").delete().eq("plan_id", editingPlan.id);

        if (selectedApps.length > 0) {
          await supabase.from("plan_apps").insert(
            selectedApps.map((appId) => ({
              plan_id: editingPlan.id,
              app_id: appId,
            }))
          );
        }

        toast({ title: "Plano atualizado com sucesso!" });
      } else {
        // Create plan
        const { data: newPlan, error } = await supabase
          .from("plans")
          .insert(planData)
          .select()
          .single();

        if (error) throw error;

        if (selectedApps.length > 0 && newPlan) {
          await supabase.from("plan_apps").insert(
            selectedApps.map((appId) => ({
              plan_id: newPlan.id,
              app_id: appId,
            }))
          );
        }

        toast({ title: "Plano criado com sucesso!" });
      }

      setIsDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar plano",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (planId: string) => {
    if (!confirm("Tem certeza que deseja excluir este plano?")) return;

    try {
      const { error } = await supabase.from("plans").delete().eq("id", planId);
      if (error) throw error;

      toast({ title: "Plano excluído com sucesso!" });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir plano",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures.length > 0 ? newFeatures : [""] });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const toggleApp = (appId: string) => {
    setSelectedApps((prev) =>
      prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Planos de Internet</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Plano
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPlan ? "Editar Plano" : "Novo Plano"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Plano</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Essencial"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="speed">Velocidade</Label>
                  <Input
                    id="speed"
                    value={formData.speed}
                    onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
                    placeholder="Ex: 400 ou 1 GB"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Ex: 89.99"
                    disabled={formData.is_consultation}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sort_order">Ordem de Exibição</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) =>
                      setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_consultation"
                    checked={formData.is_consultation}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_consultation: checked })
                    }
                  />
                  <Label htmlFor="is_consultation">Sob Consulta</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_popular"
                    checked={formData.is_popular}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_popular: checked })
                    }
                  />
                  <Label htmlFor="is_popular">Mais Popular</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Características</Label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Ex: 400 Mega de Download"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeFeature(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Aplicativos Inclusos</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-muted/50 rounded-lg max-h-48 overflow-y-auto">
                  {apps.map((app) => (
                    <label
                      key={app.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedApps.includes(app.id)}
                        onCheckedChange={() => toggleApp(app.id)}
                      />
                      <span className="text-sm">{app.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="gradient">
                  {editingPlan ? "Salvar" : "Criar Plano"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Velocidade</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Popular</TableHead>
              <TableHead>Apps</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => {
              const appCount = planApps.filter((pa) => pa.plan_id === plan.id).length;
              return (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.speed}</TableCell>
                  <TableCell>
                    {plan.is_consultation
                      ? "Sob Consulta"
                      : `R$ ${plan.price?.toFixed(2)}`}
                  </TableCell>
                  <TableCell>
                    {plan.is_popular && (
                      <span className="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded-full">
                        Sim
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{appCount} apps</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(plan)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(plan.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PlansManager;
