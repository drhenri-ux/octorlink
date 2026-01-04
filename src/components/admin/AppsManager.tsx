import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Pencil, Trash2, Upload, ImageIcon } from "lucide-react";

interface App {
  id: string;
  name: string;
  icon_url: string | null;
}

const AppsManager = () => {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    icon_url: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("apps")
        .select("*")
        .order("name");

      if (error) throw error;
      if (data) setApps(data);
    } catch (error) {
      console.error("Error fetching apps:", error);
    }
    setLoading(false);
  };

  const openCreateDialog = () => {
    setEditingApp(null);
    setFormData({ name: "", icon_url: "" });
    setPreviewUrl(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (app: App) => {
    setEditingApp(app);
    setFormData({
      name: app.name,
      icon_url: app.icon_url || "",
    });
    setPreviewUrl(app.icon_url || null);
    setIsDialogOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from("app-icons")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("app-icons")
        .getPublicUrl(fileName);

      setFormData({ ...formData, icon_url: publicUrl });
      setPreviewUrl(publicUrl);

      toast({ title: "Imagem enviada com sucesso!" });
    } catch (error: any) {
      toast({
        title: "Erro ao enviar imagem",
        description: error.message,
        variant: "destructive",
      });
    }

    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingApp) {
        const { error } = await supabase
          .from("apps")
          .update({
            name: formData.name,
            icon_url: formData.icon_url || null,
          })
          .eq("id", editingApp.id);

        if (error) throw error;
        toast({ title: "Aplicativo atualizado com sucesso!" });
      } else {
        const { error } = await supabase.from("apps").insert({
          name: formData.name,
          icon_url: formData.icon_url || null,
        });

        if (error) throw error;
        toast({ title: "Aplicativo criado com sucesso!" });
      }

      setIsDialogOpen(false);
      fetchApps();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar aplicativo",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (appId: string) => {
    if (!confirm("Tem certeza que deseja excluir este aplicativo?")) return;

    try {
      const { error } = await supabase.from("apps").delete().eq("id", appId);
      if (error) throw error;

      toast({ title: "Aplicativo excluído com sucesso!" });
      fetchApps();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir aplicativo",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getAppIconUrl = (app: App): string | null => {
    if (!app.icon_url) return null;
    // If it's a full URL (from storage), return as is
    if (app.icon_url.startsWith("http")) return app.icon_url;
    // If it's a legacy key (like "biblioteca"), return null (will use placeholder)
    return null;
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
        <h2 className="text-xl font-semibold text-foreground">Aplicativos</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Aplicativo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingApp ? "Editar Aplicativo" : "Novo Aplicativo"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Aplicativo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Netflix"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Ícone</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center overflow-hidden border-2 border-dashed border-border">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="icon-upload"
                      className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                      <Upload className="w-4 h-4" />
                      {uploading ? "Enviando..." : "Escolher Imagem"}
                    </Label>
                    <input
                      id="icon-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      PNG, JPG ou WEBP. Recomendado: 100x100px
                    </p>
                  </div>
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
                <Button type="submit" variant="gradient" disabled={uploading}>
                  {editingApp ? "Salvar" : "Criar"}
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
              <TableHead>Ícone</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apps.map((app) => {
              const iconUrl = getAppIconUrl(app);
              return (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                      {iconUrl ? (
                        <img
                          src={iconUrl}
                          alt={app.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{app.name}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(app)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(app.id)}
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

export default AppsManager;
