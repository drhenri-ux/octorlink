import { Button } from "@/components/ui/button";
import { Check, MapPin, Lock, Bell, History, Shield, Smartphone, Phone, Truck, Car, Users, BarChart3, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const benefits = [
  { icon: MapPin, title: "Rastreamento em tempo real", desc: "Acompanhe a localização do seu veículo 24h por dia, com atualização contínua." },
  { icon: Lock, title: "Bloqueio remoto", desc: "Em caso de roubo ou furto, bloqueie o veículo direto do app com total segurança." },
  { icon: History, title: "Histórico de trajetos", desc: "Consulte rotas, paradas e velocidade dos últimos dias com relatórios detalhados." },
  { icon: Shield, title: "Cerca virtual (Geofence)", desc: "Receba alertas quando o veículo entrar ou sair de áreas pré-definidas." },
  { icon: AlertTriangle, title: "Botão de pânico", desc: "Acionamento de emergência integrado à nossa central de monitoramento." },
  { icon: Smartphone, title: "Aplicativo intuitivo", desc: "App próprio para iOS e Android, fácil de usar para toda a família." },
  { icon: Phone, title: "Central 24h", desc: "Equipe especializada disponível dia e noite para emergências e suporte." },
  { icon: Bell, title: "Alertas inteligentes", desc: "Notificações de excesso de velocidade, ignição, movimentação e bateria baixa." },
];

const fleetFeatures = [
  { icon: Truck, title: "Gestão de frota completa", desc: "Controle de toda a operação em um único painel, com relatórios consolidados." },
  { icon: BarChart3, title: "Telemetria e relatórios", desc: "Indicadores de desempenho, consumo e produtividade dos veículos." },
  { icon: Users, title: "Identificação de motorista", desc: "Saiba quem está dirigindo cada veículo e avalie a condução." },
  { icon: Car, title: "Manutenção preventiva", desc: "Alertas de manutenção por quilometragem e horas de uso." },
];

const plans = [
  {
    name: "Pessoal",
    target: "Carros e motos",
    price: "59,90",
    highlight: false,
    features: [
      "Rastreamento em tempo real",
      "Bloqueio remoto via app",
      "Histórico de trajetos (30 dias)",
      "Cerca virtual",
      "App iOS e Android",
      "Suporte técnico",
    ],
  },
  {
    name: "Premium",
    target: "Proteção completa",
    price: "89,90",
    highlight: true,
    features: [
      "Tudo do plano Pessoal",
      "Botão de pânico",
      "Central de monitoramento 24h",
      "Histórico estendido (90 dias)",
      "Alertas inteligentes ilimitados",
      "Atendimento prioritário",
    ],
  },
  {
    name: "Frota",
    target: "Empresas e gestores",
    price: "Sob consulta",
    highlight: false,
    isQuote: true,
    features: [
      "Gestão multi-veículos",
      "Telemetria e relatórios",
      "Identificação de motorista",
      "Manutenção preventiva",
      "Integração com sistemas",
      "Gerente de conta dedicado",
    ],
  },
];

const RastreadorVeicularPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Octorlink Tracker — Proteção 24h para seu veículo";
  }, []);

  const handleWhatsApp = (subject: string) => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no Octorlink Tracker — ${subject}.`
    );
    window.open(`https://wa.me/5573988221344?text=${message}`, "_blank");
  };

  const greenBtn = {
    backgroundColor: "hsla(142, 70%, 45%, 0.85)",
    border: "1px solid hsl(142, 80%, 55%)",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">Novo serviço Octorlink</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Octorlink <span style={{ color: "hsl(var(--pink-glow))" }}>Tracker</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Proteção, monitoramento e gestão para o seu veículo ou frota — 24 horas por dia, com a tecnologia e o suporte do Octorlink Tracker.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                className="text-white font-semibold transition-all"
                style={greenBtn}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 0.85)"; }}
                onClick={() => handleWhatsApp("quero contratar")}
              >
                Quero contratar
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white"
                onClick={() => document.getElementById("planos-rastreador")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver planos
              </Button>
            </div>
          </div>
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ height: 60 }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="hsl(var(--background))" />
          </svg>
        </section>

        {/* Benefícios */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Tudo que você precisa em <span className="text-secondary">um só lugar</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Tecnologia de ponta para proteger o que é seu, com a confiança da Octorlink.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="group bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--gradient-primary)" }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frotas */}
        <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(270 20% 96%) 0%, hsl(0 0% 100%) 100%)" }}>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
                  <Truck className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-bold text-secondary uppercase tracking-wide">Para frotas</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Gestão inteligente da sua <span className="text-secondary">frota</span>
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mb-6">
                  Reduza custos, aumente a produtividade e tenha o controle total dos seus veículos com relatórios em tempo real, telemetria avançada e gestão de motoristas.
                </p>
                <Button
                  size="lg"
                  className="text-white font-semibold transition-all"
                  style={greenBtn}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 0.85)"; }}
                  onClick={() => handleWhatsApp("solução para frota")}
                >
                  Solicitar proposta para frota
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fleetFeatures.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: "var(--gradient-primary)" }}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-1">{title}</h3>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Planos */}
        <section id="planos-rastreador" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Escolha o <span className="text-secondary">plano ideal</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Planos pensados para proteger desde o seu carro pessoal até frotas inteiras.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-6 md:p-8 border transition-all hover:-translate-y-1 ${
                    plan.highlight ? "shadow-xl border-secondary/40" : "bg-card border-border shadow-md"
                  }`}
                  style={plan.highlight ? { background: "var(--gradient-primary)", color: "white", boxShadow: "var(--shadow-glow)" } : {}}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary text-xs font-bold px-3 py-1 rounded-full shadow">
                      MAIS COMPLETO
                    </span>
                  )}
                  <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-foreground"}`}>{plan.name}</h3>
                  <p className={`text-sm mb-4 ${plan.highlight ? "text-white/80" : "text-muted-foreground"}`}>{plan.target}</p>
                  <div className="mb-6">
                    {plan.isQuote ? (
                      <span className={`text-2xl font-extrabold ${plan.highlight ? "text-white" : "text-foreground"}`}>{plan.price}</span>
                    ) : (
                      <>
                        <span className={`text-sm ${plan.highlight ? "text-white/80" : "text-muted-foreground"}`}>R$</span>
                        <span className={`text-4xl md:text-5xl font-extrabold ml-1 ${plan.highlight ? "text-white" : "text-foreground"}`}>{plan.price}</span>
                        <span className={`text-sm ml-1 ${plan.highlight ? "text-white/80" : "text-muted-foreground"}`}>/mês</span>
                      </>
                    )}
                  </div>

                  <ul className="space-y-2 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-white" : "text-secondary"}`} strokeWidth={3} />
                        <span className={plan.highlight ? "text-white/95" : "text-foreground/90"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    onClick={() => handleWhatsApp(`plano ${plan.name}`)}
                    className="w-full text-white font-semibold transition-all"
                    style={greenBtn}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 1)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 0.85)"; }}
                  >
                    {plan.isQuote ? "Solicitar orçamento" : `Contratar ${plan.name}`}
                  </Button>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
              * Valores ilustrativos. Cobertura sujeita à disponibilidade. Instalação realizada por técnicos credenciados Octorlink.
            </p>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 md:py-20 relative overflow-hidden" style={{ background: "var(--gradient-primary)" }}>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Proteja seu veículo agora mesmo
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Fale com nossa equipe e descubra a melhor solução do Octorlink Tracker para você ou sua empresa.
            </p>
            <Button
              size="lg"
              onClick={() => handleWhatsApp("quero falar com a equipe")}
              className="text-white font-semibold transition-all"
              style={{ backgroundColor: "hsla(142, 70%, 45%, 0.9)", border: "1px solid hsl(142, 80%, 55%)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 0.9)"; }}
            >
              Falar com a Octorlink
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default RastreadorVeicularPage;
