import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check, ChevronLeft, ChevronRight, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Import app icons
import deezer from "@/assets/apps/deezer.webp";
import hbomax from "@/assets/apps/hbomax.webp";
import disneyplus from "@/assets/apps/disneyplus.png";
import premiere from "@/assets/apps/premiere.webp";
import sky from "@/assets/apps/sky.png";
import playkids from "@/assets/apps/playkids.png";
import ubook from "@/assets/apps/ubook.webp";
import nba from "@/assets/apps/nba.png";

interface LeadCaptureFormProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  isCombo?: boolean;
}

interface App {
  id: string;
  name: string;
  icon_url: string | null;
}

const iconMap: Record<string, string> = {
  "deezer.webp": deezer,
  "hbomax.webp": hbomax,
  "disneyplus.png": disneyplus,
  "premiere.webp": premiere,
  "sky.png": sky,
  "playkids.png": playkids,
  "ubook.webp": ubook,
  "nba.png": nba,
};

const LeadCaptureForm = ({ isOpen, onClose, planName, isCombo = false }: LeadCaptureFormProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apps, setApps] = useState<App[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    // Step 1
    nomeCompleto: "",
    telefone: "",
    // Step 2
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    // Step 3
    servicosSelecionados: [] as string[],
    // Step 4
    cpfCnpj: "",
    rg: "",
    dataNascimento: "",
    nomeMae: "",
    email: "",
    diaVencimento: "",
  });

  // Fetch apps for step 3
  useEffect(() => {
    const fetchApps = async () => {
      setLoadingApps(true);
      const { data } = await supabase.from("apps").select("*");
      if (data) setApps(data);
      setLoadingApps(false);
    };
    fetchApps();
  }, []);

  const getAppIconUrl = (iconUrl: string | null) => {
    if (!iconUrl) return "/placeholder.svg";
    if (iconUrl.startsWith("http")) return iconUrl;
    if (iconMap[iconUrl]) return iconMap[iconUrl];
    return `https://hzxsaalutzoozjngpdki.supabase.co/storage/v1/object/public/app-icons/${iconUrl}`;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (appName: string) => {
    setFormData(prev => ({
      ...prev,
      servicosSelecionados: prev.servicosSelecionados.includes(appName)
        ? prev.servicosSelecionados.filter(s => s !== appName)
        : [...prev.servicosSelecionados, appName]
    }));
  };

  const buscarCep = async () => {
    if (formData.cep.length < 8) return;
    try {
      const cepClean = formData.cep.replace(/\D/g, "");
      const response = await fetch(`https://viacep.com.br/ws/${cepClean}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          endereco: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          estado: data.uf || "",
        }));
      }
    } catch {
      console.error("Erro ao buscar CEP");
    }
  };

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.nomeCompleto.trim() !== "" && formData.telefone.trim() !== "";
      case 2:
        return formData.endereco.trim() !== "" && formData.numero.trim() !== "";
      case 3:
        return true; // Services are optional
      case 4:
        return formData.cpfCnpj.trim() !== "" && formData.email.trim() !== "";
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert({
        nome_completo: formData.nomeCompleto,
        telefone: formData.telefone,
        cep: formData.cep,
        endereco: formData.endereco,
        numero: formData.numero,
        complemento: formData.complemento,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
        plano_selecionado: isCombo ? "Combo Personalizado" : planName || "Não informado",
        servicos_adicionais: formData.servicosSelecionados,
        cpf_cnpj: formData.cpfCnpj,
        rg: formData.rg,
        data_nascimento: formData.dataNascimento,
        nome_mae: formData.nomeMae,
        email: formData.email,
        dia_vencimento: formData.diaVencimento,
        status: "interessado",
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setSuccess(false);
    setFormData({
      nomeCompleto: "",
      telefone: "",
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      servicosSelecionados: [],
      cpfCnpj: "",
      rg: "",
      dataNascimento: "",
      nomeMae: "",
      email: "",
      diaVencimento: "",
    });
    onClose();
  };

  const stepTitles = [
    "Vamos começar!",
    "Verificar disponibilidade",
    "Serviços adicionais",
    "Últimos dados"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-background border-none">
        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Obrigado pelo interesse!</h2>
            <p className="text-muted-foreground mb-6">
              Recebemos seus dados com sucesso. Um de nossos consultores entrará em contato em breve para finalizar sua assinatura.
            </p>
            <Button onClick={handleClose} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Fechar
            </Button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-primary via-primary to-primary/80 p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                {stepTitles[step - 1]}
              </h2>
              <p className="text-primary-foreground/80 text-sm">
                Plano selecionado: <span className="font-semibold text-secondary">{isCombo ? "Combo Personalizado" : planName || "Internet"}</span>
              </p>
            </div>

            {/* Progress bar */}
            <div className="flex gap-2 mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    s <= step ? "bg-secondary" : "bg-primary-foreground/20"
                  }`}
                />
              ))}
            </div>

            {/* Form card */}
            <div className="bg-background rounded-xl p-6 shadow-xl">
              {/* Step 1: Personal Data */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nomeCompleto" className="text-foreground font-medium">
                      Nome completo *
                    </Label>
                    <Input
                      id="nomeCompleto"
                      placeholder="João da Silva"
                      value={formData.nomeCompleto}
                      onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone" className="text-foreground font-medium">
                      Telefone/WhatsApp *
                    </Label>
                    <Input
                      id="telefone"
                      placeholder="(73) 99999-9999"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange("telefone", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Address */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor="cep" className="text-foreground font-medium">CEP *</Label>
                      <Input
                        id="cep"
                        placeholder="00000-000"
                        value={formData.cep}
                        onChange={(e) => handleInputChange("cep", e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={buscarCep}
                      className="mt-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Buscar
                    </Button>
                  </div>
                  <div>
                    <Label htmlFor="endereco" className="text-foreground font-medium">Endereço *</Label>
                    <Input
                      id="endereco"
                      placeholder="Rua das Flores"
                      value={formData.endereco}
                      onChange={(e) => handleInputChange("endereco", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="numero" className="text-foreground font-medium">Número *</Label>
                      <Input
                        id="numero"
                        placeholder="123"
                        value={formData.numero}
                        onChange={(e) => handleInputChange("numero", e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="complemento" className="text-foreground font-medium">Complemento</Label>
                      <Input
                        id="complemento"
                        placeholder="Apto, Casa, Bloco..."
                        value={formData.complemento}
                        onChange={(e) => handleInputChange("complemento", e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bairro" className="text-foreground font-medium">Bairro</Label>
                    <Input
                      id="bairro"
                      placeholder="Centro"
                      value={formData.bairro}
                      onChange={(e) => handleInputChange("bairro", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cidade" className="text-foreground font-medium">Cidade</Label>
                      <Input
                        id="cidade"
                        placeholder="Eunápolis"
                        value={formData.cidade}
                        onChange={(e) => handleInputChange("cidade", e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="estado" className="text-foreground font-medium">Estado</Label>
                      <Input
                        id="estado"
                        placeholder="BA"
                        value={formData.estado}
                        onChange={(e) => handleInputChange("estado", e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Additional Services */}
              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm mb-4">
                    Aproveite para adicionar serviços que vão melhorar sua experiência:
                  </p>
                  {loadingApps ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto">
                      {apps.map((app) => (
                        <button
                          key={app.id}
                          onClick={() => toggleService(app.name)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                            formData.servicosSelecionados.includes(app.name)
                              ? "border-secondary bg-secondary/10"
                              : "border-border hover:border-secondary/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={getAppIconUrl(app.icon_url)}
                              alt={app.name}
                              className="w-10 h-10 rounded-lg object-contain"
                            />
                            <span className="font-medium text-foreground">{app.name}</span>
                          </div>
                          {formData.servicosSelecionados.includes(app.name) && (
                            <Check className="w-5 h-5 text-secondary" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Final Data */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cpfCnpj" className="text-foreground font-medium">CPF/CNPJ *</Label>
                    <Input
                      id="cpfCnpj"
                      placeholder="000.000.000-00"
                      value={formData.cpfCnpj}
                      onChange={(e) => handleInputChange("cpfCnpj", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rg" className="text-foreground font-medium">RG</Label>
                    <Input
                      id="rg"
                      placeholder="00.000.000-0"
                      value={formData.rg}
                      onChange={(e) => handleInputChange("rg", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataNascimento" className="text-foreground font-medium">Data de Nascimento</Label>
                    <Input
                      id="dataNascimento"
                      placeholder="dd/mm/aaaa"
                      value={formData.dataNascimento}
                      onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nomeMae" className="text-foreground font-medium">Nome da Mãe</Label>
                    <Input
                      id="nomeMae"
                      placeholder="Nome completo da mãe"
                      value={formData.nomeMae}
                      onChange={(e) => handleInputChange("nomeMae", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground font-medium">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="diaVencimento" className="text-foreground font-medium">Melhor dia para vencimento</Label>
                    <Select
                      value={formData.diaVencimento}
                      onValueChange={(value) => handleInputChange("diaVencimento", value)}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Selecione o dia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Dia 5</SelectItem>
                        <SelectItem value="10">Dia 10</SelectItem>
                        <SelectItem value="15">Dia 15</SelectItem>
                        <SelectItem value="20">Dia 20</SelectItem>
                        <SelectItem value="25">Dia 25</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                )}
                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Continuar
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Finalizar"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureForm;
