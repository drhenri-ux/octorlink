import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Zap, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import LeadCaptureForm from "./LeadCaptureForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import app icons for legacy support
import bibliotecaIcon from "@/assets/apps/biblioteca.webp";
import casaConectadaIcon from "@/assets/apps/casa-conectada.webp";
import centralRadioIcon from "@/assets/apps/central-radio.webp";
import facillityEducacaoIcon from "@/assets/apps/facillity-educacao.webp";
import facillityPlayTvIcon from "@/assets/apps/facillity-play-tv.webp";
import facillitySaudeIcon from "@/assets/apps/facillity-saude.webp";
import historiasMagicasIcon from "@/assets/apps/historias-magicas.webp";
import deezerIcon from "@/assets/apps/deezer.webp";
import hboMaxIcon from "@/assets/apps/hbo-max.webp";
import kiddlePassIcon from "@/assets/apps/kiddle-pass.webp";
import viaLivrosIcon from "@/assets/apps/via-livros.webp";
import premiereIcon from "@/assets/apps/premiere.webp";
import playTvIcon from "@/assets/apps/play-tv.webp";
import ubookIcon from "@/assets/apps/ubook.webp";
import mundoQuadrinhosIcon from "@/assets/apps/mundo-quadrinhos.webp";

// Legacy icon mapping for existing apps
const legacyIcons: Record<string, string> = {
  biblioteca: bibliotecaIcon,
  casaConectada: casaConectadaIcon,
  centralRadio: centralRadioIcon,
  facillityEducacao: facillityEducacaoIcon,
  facillityPlayTv: facillityPlayTvIcon,
  facillitySaude: facillitySaudeIcon,
  historiasMagicas: historiasMagicasIcon,
  deezer: deezerIcon,
  hboMax: hboMaxIcon,
  kiddlePass: kiddlePassIcon,
  viaLivros: viaLivrosIcon,
  premiere: premiereIcon,
  playTv: playTvIcon,
  ubook: ubookIcon,
  mundoQuadrinhos: mundoQuadrinhosIcon,
};

interface App {
  id: string;
  name: string;
  icon_url: string | null;
}

interface Plan {
  id: string;
  name: string;
  speed: string;
  price: number | null;
  is_consultation: boolean;
  features: string[];
  is_popular: boolean;
  sort_order: number;
}

interface PlanWithApps extends Plan {
  apps: App[];
}

const Plans = () => {
  const [plans, setPlans] = useState<PlanWithApps[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleAssinar = (planName: string) => {
    setSelectedPlan(planName);
    setShowLeadForm(true);
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const [plansRes, appsRes, planAppsRes] = await Promise.all([
          supabase.from("plans").select("*").order("sort_order"),
          supabase.from("apps").select("*"),
          supabase.from("plan_apps").select("*"),
        ]);

        if (plansRes.data && appsRes.data && planAppsRes.data) {
          const plansWithApps = plansRes.data.map((plan) => {
            const planAppIds = planAppsRes.data
              .filter((pa) => pa.plan_id === plan.id)
              .map((pa) => pa.app_id);
            const apps = appsRes.data.filter((app) => planAppIds.includes(app.id));
            return { ...plan, apps };
          });
          setPlans(plansWithApps);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
      setLoading(false);
    };

    fetchPlans();
  }, []);

  const getAppIcon = (app: App): string => {
    // If icon_url is a full URL (from storage), use it
    if (app.icon_url?.startsWith("http")) {
      return app.icon_url;
    }
    // If icon_url is a legacy key, use the legacy icon
    if (app.icon_url && legacyIcons[app.icon_url]) {
      return legacyIcons[app.icon_url];
    }
    // Fallback placeholder
    return "/placeholder.svg";
  };

  if (loading) {
    return (
      <section id="planos" className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

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

        {/* Plans Carousel */}
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 pt-6">
              {plans.map((plan, index) => (
                <CarouselItem key={plan.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4 overflow-visible">
                  <div
                    className={`relative rounded-3xl p-8 transition-all duration-500 hover:scale-105 animate-scale-in flex flex-col h-full ${
                      plan.is_popular
                        ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-glow"
                        : "bg-card border border-border shadow-card"
                    }`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {plan.is_popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        Mais Popular
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className={`text-xl font-bold mb-2 ${plan.is_popular ? "text-primary-foreground" : "text-foreground"}`}>
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className={`text-5xl md:text-6xl font-extrabold ${plan.is_popular ? "text-primary-foreground" : "text-gradient"}`}>
                          {plan.speed.includes("GB") ? plan.speed.replace(" GB", "") : plan.speed}
                        </span>
                        <span className={`text-xl font-semibold ${plan.is_popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          {plan.speed.includes("GB") ? "GB" : "Mega"}
                        </span>
                      </div>
                      <div className="mt-4">
                        {plan.is_consultation ? (
                          <span className={`text-2xl font-bold ${plan.is_popular ? "text-primary-foreground" : "text-foreground"}`}>
                            Sob Consulta
                          </span>
                        ) : (
                          <>
                            <span className={`text-sm ${plan.is_popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                              R$
                            </span>
                            <span className={`text-3xl font-bold ${plan.is_popular ? "text-primary-foreground" : "text-foreground"}`}>
                              {plan.price?.toFixed(2).replace(".", ",")}
                            </span>
                            <span className={`text-sm ${plan.is_popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
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
                            plan.is_popular ? "bg-primary-foreground/20" : "bg-secondary/20"
                          }`}>
                            <Check className={`w-3 h-3 ${plan.is_popular ? "text-primary-foreground" : "text-secondary"}`} />
                          </div>
                          <span className={`text-sm ${plan.is_popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Apps Section */}
                    {plan.apps.length > 0 && (
                      <div className="mb-6 mt-auto">
                        <p className={`text-sm font-semibold mb-3 ${plan.is_popular ? "text-primary-foreground" : "text-foreground"}`}>
                          Aplicativos
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {plan.apps.map((app) => (
                            <img
                              key={app.id}
                              src={getAppIcon(app)}
                              alt={app.name}
                              title={app.name}
                              className="w-10 h-10 rounded-lg object-cover shadow-sm"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      variant={plan.is_popular ? "heroOutline" : "gradient"}
                      size="lg"
                      className="w-full mt-auto"
                      onClick={() => handleAssinar(`${plan.name} - ${plan.speed}`)}
                    >
                      <Zap className="w-4 h-4" />
                      Assinar Agora
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Desktop arrows */}
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
            {/* Mobile arrows */}
            <div className="flex md:hidden justify-center gap-4 mt-6">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>

        {/* Disclaimer Text */}
        <div className="text-center mt-12 space-y-2">
          <p className="text-muted-foreground">
            Todos os planos incluem Wi-Fi, instalação profissional e suporte 24h
          </p>
          <p className="text-muted-foreground text-sm italic">
            * Todos os planos possuem fidelidade de 12 meses
          </p>
          <p className="text-muted-foreground text-sm italic">
            * Planos para áreas rurais, consulte disponibilidade
          </p>
        </div>
      </div>

      <LeadCaptureForm
        isOpen={showLeadForm}
        onClose={() => setShowLeadForm(false)}
        planName={selectedPlan}
      />
    </section>
  );
};

export default Plans;
