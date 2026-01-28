import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  FileText, 
  ChevronRight,
  Loader2,
  Trash2,
  Eye,
  Building2,
  Monitor
} from "lucide-react";
import { toast } from "sonner";

interface Lead {
  id: string;
  status: string;
  nome_completo: string;
  telefone: string;
  email: string | null;
  cep: string | null;
  endereco: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  plano_selecionado: string | null;
  servicos_adicionais: string[] | null;
  cpf_cnpj: string | null;
  rg: string | null;
  data_nascimento: string | null;
  nome_mae: string | null;
  dia_vencimento: string | null;
  empresa_nome: string | null;
  qtd_dispositivos: string | null;
  tipo_lead: string | null;
  created_at: string;
  updated_at: string;
}

const statusConfig = {
  interessado: { label: "Interessado", color: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30" },
  proposta_enviada: { label: "Proposta Enviada", color: "bg-blue-500/20 text-blue-700 border-blue-500/30" },
  cliente: { label: "Cliente", color: "bg-green-500/20 text-green-700 border-green-500/30" },
};

const LeadsManager = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar leads");
      console.error(error);
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", leadId);

    if (error) {
      toast.error("Erro ao atualizar status");
      console.error(error);
    } else {
      toast.success("Status atualizado");
      fetchLeads();
    }
  };

  const deleteLead = async (leadId: string) => {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return;

    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", leadId);

    if (error) {
      toast.error("Erro ao excluir lead");
      console.error(error);
    } else {
      toast.success("Lead excluído");
      setSelectedLead(null);
      fetchLeads();
    }
  };

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: string) => {
    if (draggedLead && draggedLead.status !== status) {
      updateLeadStatus(draggedLead.id, status);
    }
    setDraggedLead(null);
  };

  const getLeadsByStatus = (status: string) => {
    return leads.filter((lead) => lead.status === status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">CRM de Leads</h2>
          <p className="text-muted-foreground text-sm">
            Arraste os cards para mover entre colunas
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {leads.length} leads total
        </Badge>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => (
          <div
            key={status}
            className="bg-muted/30 rounded-xl p-4"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(status)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${config.color.split(" ")[0].replace("/20", "")}`} />
                {config.label}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {getLeadsByStatus(status).length}
              </Badge>
            </div>

            <ScrollArea className="h-[calc(100vh-350px)] pr-2">
              <div className="space-y-3">
                {getLeadsByStatus(status).map((lead) => (
                  <Card
                    key={lead.id}
                    draggable
                    onDragStart={() => handleDragStart(lead)}
                    className="cursor-grab active:cursor-grabbing border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground text-sm">
                              {lead.nome_completo}
                            </h4>
                            {lead.tipo_lead === "empresarial" && (
                              <Badge className="bg-purple-500/20 text-purple-700 border-purple-500/30 text-[10px] px-1.5">
                                Empresa
                              </Badge>
                            )}
                          </div>
                          {lead.empresa_nome && (
                            <p className="text-xs text-muted-foreground font-medium">
                              {lead.empresa_nome}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {lead.telefone}
                          </p>
                          {lead.plano_selecionado && (
                            <Badge variant="outline" className="text-xs mt-2">
                              {lead.plano_selecionado}
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        {formatDate(lead.created_at)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
                {getLeadsByStatus(status).length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-8">
                    Nenhum lead
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>

      {/* Lead Details Modal */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {selectedLead?.nome_completo}
            </DialogTitle>
            <DialogDescription>
              Detalhes completos do lead
            </DialogDescription>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <div className="flex gap-2">
                  {Object.entries(statusConfig).map(([status, config]) => (
                    <Button
                      key={status}
                      variant={selectedLead.status === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateLeadStatus(selectedLead.id, status)}
                      className={selectedLead.status === status ? "" : ""}
                    >
                      {config.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Business Info */}
              {selectedLead.tipo_lead === "empresarial" && (
                <Card className="border-purple-500/30 bg-purple-500/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-600" />
                      Dados Empresariais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    {selectedLead.empresa_nome && (
                      <div>
                        <span className="text-muted-foreground">Empresa:</span>
                        <p className="font-medium">{selectedLead.empresa_nome}</p>
                      </div>
                    )}
                    {selectedLead.qtd_dispositivos && (
                      <div>
                        <span className="text-muted-foreground">Dispositivos:</span>
                        <p className="font-medium flex items-center gap-1">
                          <Monitor className="w-3 h-3" />
                          {selectedLead.qtd_dispositivos}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Contact Info */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {selectedLead.telefone}
                  </p>
                  {selectedLead.email && (
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {selectedLead.email}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Address */}
              {selectedLead.endereco && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Endereço</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <span>
                        {selectedLead.endereco}, {selectedLead.numero}
                        {selectedLead.complemento && ` - ${selectedLead.complemento}`}
                        <br />
                        {selectedLead.bairro && `${selectedLead.bairro}, `}
                        {selectedLead.cidade} - {selectedLead.estado}
                        {selectedLead.cep && `, CEP: ${selectedLead.cep}`}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Plan & Services */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Plano e Serviços</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    {selectedLead.plano_selecionado || "Não informado"}
                  </p>
                  {selectedLead.servicos_adicionais && selectedLead.servicos_adicionais.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedLead.servicos_adicionais.map((service, i) => (
                        <Badge key={i} variant="secondary">{service}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Documents */}
              {selectedLead.cpf_cnpj && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Documentos</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">CPF/CNPJ:</span>
                      <p>{selectedLead.cpf_cnpj}</p>
                    </div>
                    {selectedLead.rg && (
                      <div>
                        <span className="text-muted-foreground">RG:</span>
                        <p>{selectedLead.rg}</p>
                      </div>
                    )}
                    {selectedLead.data_nascimento && (
                      <div>
                        <span className="text-muted-foreground">Nascimento:</span>
                        <p>{selectedLead.data_nascimento}</p>
                      </div>
                    )}
                    {selectedLead.nome_mae && (
                      <div>
                        <span className="text-muted-foreground">Nome da Mãe:</span>
                        <p>{selectedLead.nome_mae}</p>
                      </div>
                    )}
                    {selectedLead.dia_vencimento && (
                      <div>
                        <span className="text-muted-foreground">Dia de Vencimento:</span>
                        <p>Dia {selectedLead.dia_vencimento}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-4">
                <p className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Criado em {formatDate(selectedLead.created_at)}
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteLead(selectedLead.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsManager;
