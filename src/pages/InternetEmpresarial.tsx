import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Shield, 
  Headphones, 
  TrendingUp, 
  Video, 
  Cloud, 
  Users, 
  Rocket, 
  Lock,
  CheckCircle2,
  ArrowRight,
  Building2,
  Monitor,
  Clock
} from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Velocidade que acompanha seu ritmo",
    description: "Navegação fluida, uploads rápidos, videoconferências sem falhas e sistemas de trabalho integrados funcionando sem interrupções.",
  },
  {
    icon: Shield,
    title: "Conexão estável e segura",
    description: "A infraestrutura da Octorlink garante conectividade contínua, protegendo dados e operações online da sua empresa.",
  },
  {
    icon: Headphones,
    title: "Suporte técnico empresarial",
    description: "Equipe especializada pronta para resolver qualquer situação com agilidade e eficiência, sem deixar sua equipe esperando.",
  },
  {
    icon: TrendingUp,
    title: "Escalabilidade conforme sua necessidade",
    description: "Planos flexíveis — aumente velocidade, adicione serviços ou expanda conexões conforme o crescimento da sua empresa.",
  },
];

const idealFor = [
  { icon: Video, text: "Dependem de videoconferências e comunicação online" },
  { icon: Cloud, text: "Utilizam sistemas de gestão em nuvem" },
  { icon: Users, text: "Possuem equipes altamente conectadas" },
  { icon: Rocket, text: "Estão em fase de expansão ou digitalização" },
  { icon: Lock, text: "Precisam de internet segura e contínua para atender clientes" },
];

const solutions = [
  "Internet empresarial com fibra de alta performance",
  "Atendimento personalizado",
  "Planos corporativos sob medida",
  "Monitoramento e suporte proativo",
  "Possibilidade de links dedicados e soluções específicas para grandes volumes de dados",
];

const InternetEmpresarial = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/5573982264379?text=Olá! Tenho interesse na Internet Empresarial da Octorlink.", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, hsl(var(--primary) / 0.95) 0%, hsl(var(--primary) / 0.85) 50%, hsl(var(--secondary) / 0.7) 100%), url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto animate-slide-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary font-medium text-sm mb-6">
                <Building2 className="w-4 h-4" />
                Soluções Empresariais
              </span>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Internet Empresarial de Alta Performance para seu{" "}
                <span className="text-secondary">Negócio</span>
              </h1>
              
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-4">
                Conexão ultrarrápida, estável e segura para empresas que não podem parar.
              </p>
              
              <p className="text-base md:text-lg text-primary-foreground/70 mb-10 max-w-3xl mx-auto">
                A Octorlink entrega internet fibra otimizada para produtividade, reuniões sem travamentos, gestão sem interrupções e operações conectadas 24/7.
              </p>
              
              <Button
                size="xl"
                variant="hero"
                onClick={handleWhatsApp}
                className="gap-2"
              >
                Solicite uma proposta personalizada
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Problem x Solution Section */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Problem */}
                <div className="animate-slide-in-left">
                  <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-8">
                    <div className="w-14 h-14 rounded-xl bg-destructive/20 flex items-center justify-center mb-6">
                      <Monitor className="w-7 h-7 text-destructive" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      O Problema
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Seu negócio depende de tecnologia e comunicação constante. Uma conexão lenta ou instável significa atrasos, reuniões interrompidas, perda de produtividade e clientes insatisfeitos.
                    </p>
                  </div>
                </div>

                {/* Solution */}
                <div className="animate-slide-in-right">
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
                    <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-7 h-7 text-secondary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      A Solução
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Com a internet empresarial da Octorlink, sua empresa tem:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span className="text-foreground font-medium">Alta velocidade sob demanda</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span className="text-foreground font-medium">Estabilidade contínua mesmo em horários de pico</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Headphones className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span className="text-foreground font-medium">Suporte técnico dedicado para que nada pare</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Benefícios <span className="text-gradient">Principais</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tudo o que sua empresa precisa para operar com máxima eficiência
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-secondary/50 hover:shadow-card transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-secondary/20 group-hover:border-secondary/30 transition-colors">
                    <benefit.icon className="w-7 h-7 text-primary group-hover:text-secondary transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ideal For Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to bottom, hsl(var(--primary) / 0.95), hsl(var(--primary) / 0.90)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                Para quem é <span className="text-secondary">ideal</span>
              </h2>
              <p className="text-lg text-primary-foreground/80">
                Este serviço é perfeito para empresas que:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {idealFor.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:border-secondary/50 transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <p className="text-primary-foreground font-medium">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 animate-slide-up">
                A Octorlink vai além da <span className="text-gradient">internet básica</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-12 animate-slide-up">
                Oferecemos soluções adaptáveis ao seu negócio
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-left mb-12">
                {solutions.map((solution, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0" />
                    <span className="text-foreground font-medium">{solution}</span>
                  </div>
                ))}
              </div>

              <Button
                size="xl"
                variant="hero"
                onClick={handleWhatsApp}
                className="gap-2 animate-slide-up"
              >
                <Headphones className="w-5 h-5" />
                Fale com um Especialista
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(var(--primary) / 0.95), hsl(var(--secondary) / 0.85)), url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto animate-slide-up">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                Pronto para transformar a conectividade da sua empresa?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-10">
                Entre em contato agora e receba uma proposta personalizada para o seu negócio.
              </p>
              <Button
                size="xl"
                className="bg-white text-primary hover:bg-white/90 font-bold gap-2"
                onClick={handleWhatsApp}
              >
                Solicitar Proposta Personalizada
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default InternetEmpresarial;
