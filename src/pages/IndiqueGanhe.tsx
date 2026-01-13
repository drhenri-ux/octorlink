import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Gift, Users, CheckCircle, ArrowLeft, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const referralSchema = z.object({
  titular_nome: z.string().min(2, "Nome é obrigatório"),
  titular_sobrenome: z.string().min(2, "Sobrenome é obrigatório"),
  titular_cpf: z.string().optional(),
  titular_celular: z.string().min(10, "Celular inválido"),
  amigo_nome: z.string().min(2, "Nome do amigo é obrigatório"),
  amigo_sobrenome: z.string().min(2, "Sobrenome do amigo é obrigatório"),
  amigo_celular: z.string().min(10, "Celular do amigo inválido"),
});

type ReferralFormData = z.infer<typeof referralSchema>;

const IndiqueGanhe = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      titular_nome: "",
      titular_sobrenome: "",
      titular_cpf: "",
      titular_celular: "",
      amigo_nome: "",
      amigo_sobrenome: "",
      amigo_celular: "",
    },
  });

  const onSubmit = async (data: ReferralFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("referrals").insert({
        titular_nome: data.titular_nome,
        titular_sobrenome: data.titular_sobrenome,
        titular_cpf: data.titular_cpf || null,
        titular_celular: data.titular_celular,
        amigo_nome: data.amigo_nome,
        amigo_sobrenome: data.amigo_sobrenome,
        amigo_celular: data.amigo_celular,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Indicação enviada!",
        description: "Sua indicação foi registrada com sucesso. Entraremos em contato em breve!",
      });
    } catch (error) {
      console.error("Erro ao enviar indicação:", error);
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua indicação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary-dark flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Indicação Enviada!</h2>
            <p className="text-muted-foreground mb-6">
              Obrigado por indicar um amigo! Entraremos em contato com ele para apresentar nossos planos.
              Quando seu amigo contratar, você ganha <strong>50% de desconto</strong> na próxima fatura!
            </p>
            <div className="space-y-3">
              <Button onClick={() => setIsSuccess(false)} className="w-full">
                Fazer outra indicação
              </Button>
              <Link to="/">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao site
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-primary via-primary to-primary-dark pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-4">
                <Gift className="w-5 h-5" />
                <span className="font-medium">Programa de Indicação</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-background mb-4">
                Indique e Ganhe!
              </h1>
              <p className="text-background/80 text-lg max-w-2xl mx-auto">
                Indique um amigo para a Octorlink e ganhe <strong className="text-secondary">50% de desconto</strong> na sua próxima fatura! 
              </p>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-background/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-background font-semibold mb-2">Indique Amigos</h3>
                <p className="text-background/70 text-sm">Preencha o formulário com os dados do amigo que deseja indicar</p>
              </div>
              <div className="bg-background/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-background font-semibold mb-2">Amigo Contratou</h3>
                <p className="text-background/70 text-sm">Entraremos em contato com seu amigo para oferecer os melhores planos</p>
              </div>
              <div className="bg-background/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Percent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-background font-semibold mb-2">50% de Desconto</h3>
                <p className="text-background/70 text-sm">Após a contratação, você ganha 50% de desconto na próxima fatura</p>
              </div>
            </div>

            {/* Form */}
            <div className="bg-background rounded-2xl p-6 md:p-10 shadow-2xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Dados do Titular */}
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-primary text-background rounded-full flex items-center justify-center text-sm font-bold">1</span>
                      Dados do Titular da Conta
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="titular_nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="titular_sobrenome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sobrenome</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu sobrenome" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name="titular_cpf"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CPF (opcional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="000.000.000-00" 
                                {...field}
                                onChange={(e) => field.onChange(formatCPF(e.target.value))}
                                maxLength={14}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="titular_celular"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Celular</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="(00) 00000-0000" 
                                {...field}
                                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                                maxLength={15}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Dados do Amigo */}
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center text-sm font-bold">2</span>
                      Dados do seu Amigo
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="amigo_nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do Amigo</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome do seu amigo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="amigo_sobrenome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sobrenome do Amigo</FormLabel>
                            <FormControl>
                              <Input placeholder="Sobrenome do seu amigo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name="amigo_celular"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Celular do Amigo</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="(00) 00000-0000" 
                                {...field}
                                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                                maxLength={15}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Indicação"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default IndiqueGanhe;
