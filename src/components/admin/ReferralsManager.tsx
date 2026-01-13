import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Phone, User, Users, Gift, Clock, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Referral {
  id: string;
  created_at: string;
  updated_at: string;
  titular_nome: string;
  titular_sobrenome: string;
  titular_cpf: string | null;
  titular_celular: string;
  amigo_nome: string;
  amigo_sobrenome: string;
  amigo_celular: string;
  status: string;
}

const statusOptions = [
  { value: "pendente", label: "Pendente", color: "bg-yellow-500" },
  { value: "contatado", label: "Contatado", color: "bg-blue-500" },
  { value: "convertido", label: "Convertido", color: "bg-green-500" },
  { value: "cancelado", label: "Cancelado", color: "bg-red-500" },
];

const ReferralsManager = () => {
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: referrals, isLoading } = useQuery({
    queryKey: ["referrals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("referrals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Referral[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("referrals")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referrals"] });
      toast({
        title: "Status atualizado",
        description: "O status da indicação foi atualizado com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Erro ao atualizar status:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o status.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("referrals").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referrals"] });
      toast({
        title: "Indicação removida",
        description: "A indicação foi removida com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Erro ao deletar:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao remover a indicação.",
        variant: "destructive",
      });
    },
  });

  const filteredReferrals = referrals?.filter((r) =>
    statusFilter === "todos" ? true : r.status === statusFilter
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = statusOptions.find((s) => s.value === status);
    return (
      <Badge className={`${statusConfig?.color || "bg-gray-500"} text-white`}>
        {statusConfig?.label || status}
      </Badge>
    );
  };

  const stats = {
    total: referrals?.length || 0,
    pendente: referrals?.filter((r) => r.status === "pendente").length || 0,
    contatado: referrals?.filter((r) => r.status === "contatado").length || 0,
    convertido: referrals?.filter((r) => r.status === "convertido").length || 0,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pendente}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Contatados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.contatado}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Convertidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.convertido}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            {statusOptions.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Titular</TableHead>
                  <TableHead>Amigo Indicado</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReferrals?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Nenhuma indicação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReferrals?.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(referral.created_at), "dd/MM/yyyy", { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">
                              {referral.titular_nome} {referral.titular_sobrenome}
                            </span>
                          </div>
                          <a
                            href={`https://wa.me/55${referral.titular_celular.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                          >
                            <Phone className="w-3 h-3" />
                            {referral.titular_celular}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">
                              {referral.amigo_nome} {referral.amigo_sobrenome}
                            </span>
                          </div>
                          <a
                            href={`https://wa.me/55${referral.amigo_celular.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                          >
                            <Phone className="w-3 h-3" />
                            {referral.amigo_celular}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={referral.status}
                          onValueChange={(value) =>
                            updateStatusMutation.mutate({ id: referral.id, status: value })
                          }
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue>{getStatusBadge(referral.status)}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm("Tem certeza que deseja remover esta indicação?")) {
                              deleteMutation.mutate(referral.id);
                            }
                          }}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralsManager;
