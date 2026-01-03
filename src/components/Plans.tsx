import { Button } from "@/components/ui/button";
import { Check, Zap, Star } from "lucide-react";

// Import app icons
import bibliotecaIcon from "@/assets/apps/biblioteca.webp";
import casaConectadaIcon from "@/assets/apps/casa-conectada.webp";
import centralRadioIcon from "@/assets/apps/central-radio.webp";
import facillityEducacaoIcon from "@/assets/apps/facillity-educacao.webp";
import facillityPlayTvIcon from "@/assets/apps/facillity-play-tv.webp";
import facillitySaudeIcon from "@/assets/apps/facillity-saude.webp";
import historiasMagicasIcon from "@/assets/apps/historias-magicas.webp";
import deezerIcon from "@/assets/apps/deezer.webp";
import hboMaxIcon from "@/assets/apps/hbo-max.webp";

const appIcons = {
  biblioteca: { src: bibliotecaIcon, name: "Biblioteca Livre" },
  casaConectada: { src: casaConectadaIcon, name: "Casa Conectada" },
  centralRadio: { src: centralRadioIcon, name: "Central Rádio" },
  facillityEducacao: { src: facillityEducacaoIcon, name: "Facillity Educação" },
  facillityPlayTv: { src: facillityPlayTvIcon, name: "Facillity Play TV" },
  facillitySaude: { src: facillitySaudeIcon, name: "Facillity Saúde" },
  historiasMagicas: { src: historiasMagicasIcon, name: "Histórias Mágicas" },
  deezer: { src: deezerIcon, name: "Deezer" },
  hboMax: { src: hboMaxIcon, name: "HBO Max" },
};

const plans = [
  {
    name: "Essencial",
    speed: "400",
    price: "89,99",
    features: [
      "400 Mega de Download",
      "200 Mega de Upload",
      "Wi-Fi Grátis",
      "Instalação Grátis",
      "Suporte 24h",
    ],
    apps: ["biblioteca", "centralRadio", "historiasMagicas"],
    popular: false,
    isConsulta: false,
  },
  {
    name: "Turbo",
    speed: "600",
    price: "99,99",
    features: [
      "600 Mega de Download",
      "300 Mega de Upload",
      "Wi-Fi Dual Band Grátis",
      "Instalação Grátis",
      "Suporte 24h Prioritário",
    ],
    apps: ["biblioteca", "centralRadio", "historiasMagicas", "facillityEducacao"],
    popular: true,
    isConsulta: false,
  },
  {
    name: "Ultra",
    speed: "800",
    price: "115,99",
    features: [
      "800 Mega de Download",
      "400 Mega de Upload",
      "Wi-Fi Dual Band Grátis",
      "Instalação Grátis",
      "Suporte 24h VIP",
      "IP Fixo Opcional",
    ],
    apps: ["biblioteca", "centralRadio", "historiasMagicas", "facillityEducacao", "deezer"],
    popular: false,
    isConsulta: false,
  },
  {
    name: "Giga",
    speed: "1",
    speedUnit: "GB",
    price: null,
    features: [
      "1 Giga de Download",
      "500 Mega de Upload",
      "Wi-Fi Mesh Grátis",
      "Instalação Expressa Grátis",
      "Suporte 24h VIP",
      "IP Fixo Incluso",
      "Sem Limite de Dados",
    ],
    apps: ["hboMax", "facillityPlayTv", "deezer", "biblioteca", "centralRadio", "facillitySaude", "casaConectada"],
    popular: false,
    isConsulta: true,
  },
];

const Plans = () => {
  return (
    <section id="planos" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-full text-sm mb-4">
            Nossos Planos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Escolha o plano <span className="text-gradient">ideal</span> para você
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Internet de alta velocidade com o melhor custo-benefício. Todos os planos incluem instalação gratuita.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all duration-500 hover:scale-105 animate-scale-in flex flex-col ${
                plan.popular
                  ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-glow"
                  : "bg-card border border-border shadow-card"
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  Mais Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-5xl md:text-6xl font-extrabold ${plan.popular ? "text-primary-foreground" : "text-gradient"}`}>
                    {plan.speed}
                  </span>
                  <span className={`text-xl font-semibold ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {plan.speedUnit || "Mega"}
                  </span>
                </div>
                <div className="mt-4">
                  {plan.isConsulta ? (
                    <span className={`text-2xl font-bold ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                      Sob Consulta
                    </span>
                  ) : (
                    <>
                      <span className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        R$
                      </span>
                      <span className={`text-3xl font-bold ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                        {plan.price}
                      </span>
                      <span className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        /mês
                      </span>
                    </>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.popular ? "bg-primary-foreground/20" : "bg-secondary/20"
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? "text-primary-foreground" : "text-secondary"}`} />
                    </div>
                    <span className={`text-sm ${plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Apps Section */}
              <div className="mb-6 mt-auto">
                <p className={`text-sm font-semibold mb-3 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                  Aplicativos
                </p>
                <div className="flex flex-wrap gap-2">
                  {plan.apps.map((appKey) => {
                    const app = appIcons[appKey as keyof typeof appIcons];
                    return (
                      <img
                        key={appKey}
                        src={app.src}
                        alt={app.name}
                        title={app.name}
                        className="w-10 h-10 rounded-lg object-cover shadow-sm"
                      />
                    );
                  })}
                </div>
              </div>

              <Button
                variant={plan.popular ? "heroOutline" : "gradient"}
                size="lg"
                className="w-full"
              >
                <Zap className="w-4 h-4" />
                Assinar Agora
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
