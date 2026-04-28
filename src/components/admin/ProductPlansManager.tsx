import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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

type TableName = "octorlink_5g_plans" | "tracker_plans" | "turbo_plans";

interface ProductPlan {
  id: string;
  name: string;
  price: number | null;
  badge_text: string | null;
  features: string[];
  metadata: Record<string, any>;
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
}

interface Props {
  table: TableName;
  title: string;
  /** Hint shown above the metadata textarea, e.g. '{"data": "29 GB"}' */
  metadataHint?: string;
}

const ProductPlansManager = ({ table, title, metadataHint }: Props) => {
  const [plans, setPlans] = useState<ProductPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<ProductPlan | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    badge_text: "",
    features: [""],
    metadataJson: "{}",
    is_popular: false,
    is_active: true,
    sort_order: 0,
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("sort_order");
    if (error) {
      console.error(error);
    } else if (data) {
      setPlans(data as unknown as ProductPlan[]);
    }
    setLoading(false);
  };

  const openCreateDialog = () => {
    setEditingPlan(null);
    setFormData({
      name: "",
      price: "",
      badge_text: "",
      features: [""],
      metadataJson: "{}",
      is_popular: false,
      is_active: true,
      sort_order: plans.length + 1,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (plan: ProductPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price?.toString() || "",
      badge_text: plan.badge_text || "",
      features: plan.features.length > 0 ? plan.features : [""],
      metadataJson: JSON.stringify(plan.metadata || {}, null, 2),
      is_popular: plan.is_popular,
      is_active: plan.is_active,
      sort_order: plan.sort_order,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let parsedMetadata: Record<string, any> = {};
    try {
      parsedMetadata = formData.metadataJson.trim()
        ? JSON.parse(formData.metadataJson)
        : {};
    } catch {
      toast({
        title: "JSON inválido",
        description: "Verifique o campo de dados extras (metadata).",
        variant: "destructive",
      });
      return;
    }

    const planData = {
      name: formData.name,
      price: formData.price === "" ? null : parseFloat(formData.price),
      badge_text: formData.badge_text || null,
      features: formData.features.filter((f) => f.trim() !== ""),
      metadata: parsedMetadata,
      is_popular: formData.is_popular,
      is_active: formData.is_active,
      sort_order: formData.sort_order,
    };

    try {
      if (editingPlan) {
        const { error } = await supabase
          .from(table)
          .update(planData)
          .eq("id", editingPlan.id);
        if (error) throw error;
        toast({ title: "Plano atualizado com sucesso!" });
      } else {
        const { error } = await supabase.from(table).insert(planData);
        if (error) throw error;
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
    const { error } = await supabase.from(table).delete().eq("id", planId);
    if (error) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Plano excluído com sucesso!" });
    fetchData();
  };

  const addFeature = () =>
    setFormData({ ...formData, features: [...formData.features, ""] });

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: newFeatures.length > 0 ? newFeatures : [""],
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
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
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
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
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="Deixe vazio para 'Sob consulta'"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="badge_text">Texto do Badge (opcional)</Label>
                  <Input
                    id="badge_text"
                    value={formData.badge_text}
                    onChange={(e) =>
                      setFormData({ ...formData, badge_text: e.target.value })
                    }
                    placeholder="Ex: Mais escolhido"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sort_order">Ordem de Exibição</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sort_order: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
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
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_active: checked })
                    }
                  />
                  <Label htmlFor="is_active">Ativo (visível no site)</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Características / Benefícios</Label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Ex: Minutos ilimitados"
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
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metadata">Dados Extras (JSON)</Label>
                <p className="text-xs text-muted-foreground">
                  Campos adicionais específicos deste tipo de plano.
                  {metadataHint && (
                    <>
                      {" "}
                      Exemplo: <code className="text-foreground">{metadataHint}</code>
                    </>
                  )}
                </p>
                <Textarea
                  id="metadata"
                  value={formData.metadataJson}
                  onChange={(e) =>
                    setFormData({ ...formData, metadataJson: e.target.value })
                  }
                  rows={4}
                  className="font-mono text-xs"
                />
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
              <TableHead>Preço</TableHead>
              <TableHead>Popular</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Ordem</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell>
                  {plan.price === null || plan.price === 0
                    ? "Sob consulta"
                    : `R$ ${plan.price.toFixed(2)}`}
                </TableCell>
                <TableCell>
                  {plan.is_popular && (
                    <span className="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded-full">
                      Sim
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      plan.is_active
                        ? "bg-green-500/20 text-green-700"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {plan.is_active ? "Ativo" : "Inativo"}
                  </span>
                </TableCell>
                <TableCell>{plan.sort_order}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductPlansManager;