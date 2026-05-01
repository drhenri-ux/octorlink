import { Button } from "@/components/ui/button";
import { Check, Signal, Smartphone, Wifi, Phone, MessageSquare, Globe, Gift } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const benefits = [
  { icon: MessageSquare, title: "WhatsApp ilimitado", desc: "Sem descontar da sua franquia de internet." },
  { icon: Phone, title: "Ligações ilimitadas", desc: "Fale à vontade para qualquer operadora do Brasil." },
  { icon: Smartphone, title: "SMS ilimitado", desc: "Envie quantas mensagens quiser, sem custo extra." },
  { icon: Gift, title: "+1 GB de bônus", desc: "Ganhe 1 GB extra ao fazer a portabilidade." },
  { icon: Wifi, title: "Cobertura 4G e 5G", desc: "Velocidade máxima onde houver cobertura disponível." },
  { icon: Globe, title: "Roaming nacional", desc: "Use seu plano em todo o território brasileiro." },
];

const plans = [
  {
    name: "Plano 14GB",
    data: "14 GB",
    price: "59,90",
    highlight: false,
    features: [
      "14 GB de internet 4G/5G",
      "Minutos ilimitados",
      "100 SMS",
      "WhatsApp ilimitado",
    ],
  },
  {
    name: "Plano 21GB",
    data: "21 GB",
    price: "69,90",
    highlight: false,
    features: [
      "21 GB de internet 4G/5G",
      "Minutos ilimitados",
      "100 SMS",
      "WhatsApp ilimitado",
    ],
  },
  {
    name: "Plano 29GB",
    data: "29 GB",
    price: "79,90",
    highlight: true,
    features: [
      "29 GB de internet 4G/5G",
      "Minutos ilimitados",
      "100 SMS",
      "WhatsApp ilimitado",
    ],
  },
  {
    name: "Plano 39GB",
    data: "39 GB",
    price: "89,90",
    highlight: false,
    features: [
      "39 GB de internet 4G/5G",
      "Minutos ilimitados",
      "100 SMS",
      "WhatsApp ilimitado",
    ],
  },
  {
    name: "Plano 44GB",
    data: "44 GB",
    price: "99,90",
    highlight: false,
    features: [
      "44 GB de internet 4G/5G",
      "Minutos ilimitados",
      "100 SMS",
      "WhatsApp ilimitado",
    ],
  },
];

const Octorlink5GPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Octorlink 5G+ | Plano móvel com cobertura 4G e 5G";
  }, []);

  const handleAssinar = (planName: string) => {
    const message = encodeURIComponent(
      `Olá! Quero assinar o plano ${planName} do Octorlink 5G+.`
    );
    window.open(`https://wa.me/5573988221344?text=${message}`, "_blank");
  };

  const renderPlanCard = (plan: typeof plans[number]) => (
    <div
      key={plan.name}
      className={`relative rounded-2xl p-6 md:p-8 border transition-all hover:-translate-y-1 h-full ${
        plan.highlight
          ? "shadow-xl border-secondary/40"
          : "bg-card border-border shadow-md"
      }`}
      style={
        plan.highlight
          ? {
              background: "var(--gradient-primary)",
              color: "white",
              boxShadow: "var(--shadow-glow)",
            }
          : {}
      }
    >
      {plan.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary text-xs font-bold px-3 py-1 rounded-full shadow">
          MAIS POPULAR
        </span>
      )}
      <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-foreground"}`}>
        {plan.name}
      </h3>
      <p className={`text-sm mb-4 ${plan.highlight ? "text-white/80" : "text-muted-foreground"}`}>
        {plan.data} de internet
      </p>
      <div className="mb-6">
        <span className={`text-sm ${plan.highlight ? "text-white/80" : "text-muted-foreground"}`}>R$</span>
        <span className={`text-4xl md:text-5xl font-extrabold ml-1 ${plan.highlight ? "text-white" : "text-foreground"}`}>
          {plan.price}
        </span>
        <span className={`text-sm ml-1 ${plan.highlight ? "text-white/80" : "text-muted-foreground"}`}>/mês</span>
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
        onClick={() => handleAssinar(plan.name)}
        className="w-full text-white font-semibold transition-all"
        style={{
          backgroundColor: "hsla(142, 70%, 45%, 0.85)",
          border: "1px solid hsl(142, 80%, 55%)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 0.85)";
        }}
      >
        Assinar {plan.name}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section
          className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <Signal className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">Novidade Octorlink</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Octorlink <span className="text-secondary-foreground" style={{ color: "hsl(var(--pink-glow))" }}>5G+</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              O plano móvel da Octorlink com cobertura 4G e 5G, ligações ilimitadas, WhatsApp livre e benefícios exclusivos para você ficar sempre conectado.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                className="text-white font-semibold transition-all"
                style={{
                  backgroundColor: "hsla(142, 70%, 45%, 0.8)",
                  border: "1px solid hsl(142, 80%, 55%)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 0.95)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 0.8)";
                }}
                onClick={() => document.getElementById("planos-5g")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver planos
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white">
                <Link to="/">Voltar ao início</Link>
              </Button>
            </div>
          </div>
          {/* Wave divider */}
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ height: 60 }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="hsl(var(--background))" />
          </svg>
        </section>

        {/* Benefícios */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Benefícios <span className="text-secondary">inclusos</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Tudo que você precisa para ficar conectado, com a qualidade Octorlink.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Planos */}
        <section
          id="planos-5g"
          className="py-16 md:py-24 relative overflow-hidden"
          style={{ background: "linear-gradient(180deg, hsl(270 20% 96%) 0%, hsl(0 0% 100%) 100%)" }}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Escolha seu <span className="text-secondary">plano 5G+</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Planos pensados para o seu uso, com benefícios exclusivos para clientes Octorlink Fibra.
              </p>
            </div>

            {/* Desktop grid */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {plans.map((plan) => renderPlanCard(plan))}
            </div>

            {/* Mobile carousel */}
            <div className="sm:hidden max-w-md mx-auto pt-4">
              <Carousel
                opts={{ align: "center", loop: true }}
                plugins={[Autoplay({ delay: 3500, stopOnInteraction: true })]}
                className="w-full"
              >
                <CarouselContent>
                  {plans.map((plan) => (
                    <CarouselItem key={plan.name} className="basis-full">
                      {renderPlanCard(plan)}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-6">
                  <CarouselPrevious className="static translate-y-0" />
                  <CarouselNext className="static translate-y-0" />
                </div>
              </Carousel>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
              * Valores e franquias sujeitos a alteração. Cobertura 5G disponível em regiões selecionadas. Consulte disponibilidade na sua localidade.
            </p>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 md:py-20 relative overflow-hidden" style={{ background: "var(--gradient-primary)" }}>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Pronto para a velocidade do 5G+?
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Fale com nossa equipe e descubra o melhor plano Octorlink 5G+ para você.
            </p>
            <Button
              size="lg"
              onClick={() => handleAssinar("Octorlink 5G+")}
              className="text-white font-semibold transition-all"
              style={{
                backgroundColor: "hsla(142, 70%, 45%, 0.9)",
                border: "1px solid hsl(142, 80%, 55%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 0.9)";
              }}
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

export default Octorlink5GPage;
