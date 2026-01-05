import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  icon_url: string | null;
  is_active: boolean;
  sort_order: number;
}

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    icon_url: "",
    is_active: true,
    sort_order: 0,
  });

  const fetchServices = async () => {
    setLoading(true);
    // Admin can see all services - use RPC or check auth
    const { data, error } = await supabase
      .from("additional_services")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error fetching services:", error);
      toast.error("Erro ao carregar serviços");
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateDialog = () => {
    setEditingService(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      icon_url: "",
      is_active: true,
      sort_order: services.length,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || "",
      price: service.price?.toString() || "",
      icon_url: service.icon_url || "",
      is_active: service.is_active,
      sort_order: service.sort_order,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }

    const serviceData = {
      name: formData.name.trim(),
      description: formData.description.trim() || null,
      price: formData.price ? parseFloat(formData.price) : null,
      icon_url: formData.icon_url.trim() || null,
      is_active: formData.is_active,
      sort_order: formData.sort_order,
    };

    if (editingService) {
      const { error } = await supabase
        .from("additional_services")
        .update(serviceData)
        .eq("id", editingService.id);

      if (error) {
        console.error("Error updating service:", error);
        toast.error("Erro ao atualizar serviço");
        return;
      }
      toast.success("Serviço atualizado!");
    } else {
      const { error } = await supabase
        .from("additional_services")
        .insert(serviceData);

      if (error) {
        console.error("Error creating service:", error);
        toast.error("Erro ao criar serviço");
        return;
      }
      toast.success("Serviço criado!");
    }

    setDialogOpen(false);
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Deseja realmente excluir este serviço?")) return;

    const { error } = await supabase
      .from("additional_services")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting service:", error);
      toast.error("Erro ao excluir serviço");
      return;
    }

    toast.success("Serviço excluído!");
    fetchServices();
  };

  const toggleActive = async (service: Service) => {
    const { error } = await supabase
      .from("additional_services")
      .update({ is_active: !service.is_active })
      .eq("id", service.id);

    if (error) {
      console.error("Error toggling service:", error);
      toast.error("Erro ao alterar status");
      return;
    }

    toast.success(service.is_active ? "Serviço desativado" : "Serviço ativado");
    fetchServices();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Serviços Adicionais</h2>
          <p className="text-muted-foreground">Gerencie os serviços disponíveis no formulário de captura</p>
        </div>
        <Button onClick={openCreateDialog} className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Serviço
        </Button>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground mb-4">Nenhum serviço cadastrado</p>
          <Button onClick={openCreateDialog} variant="outline">
            Adicionar primeiro serviço
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="text-center">Ativo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell className="text-muted-foreground max-w-[200px] truncate">
                    {service.description || "-"}
                  </TableCell>
                  <TableCell>
                    {service.price ? `R$ ${service.price.toFixed(2)}` : "Sob consulta"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={service.is_active}
                      onCheckedChange={() => toggleActive(service)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(service)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(service.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Editar Serviço" : "Novo Serviço"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: HBO Max"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição do serviço..."
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="29.90"
                className="mt-1.5"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Deixe vazio para "sob consulta"
              </p>
            </div>
            <div>
              <Label htmlFor="icon_url">URL do Ícone</Label>
              <Input
                id="icon_url"
                value={formData.icon_url}
                onChange={(e) => setFormData({ ...formData, icon_url: e.target.value })}
                placeholder="https://..."
                className="mt-1.5"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Serviço ativo (visível no formulário)</Label>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editingService ? "Salvar" : "Criar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesManager;
