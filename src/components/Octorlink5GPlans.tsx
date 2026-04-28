import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Plan {
  id: string;
  name: string;
  price: number | null;
  features: string[];
  metadata: Record<string, any> | null;
  is_popular: boolean;
}

const Octorlink5GPlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("octorlink_5g_plans")
      .select("id, name, price, features, metadata, is_popular")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setPlans(data as unknown as Plan[]);
        setLoading(false);
      });
  }, []);

  const handleAssinar = (planName: string) => {
    const message = encodeURIComponent(
      `Olá! Quero assinar o ${planName} do Octorlink 5G+.`
    );
    window.open(`https://wa.me/5573988221344?text=${message}`, "_blank");
  };

  if (loading || plans.length === 0) return null;

  const renderCard = (plan: Plan) => {
    const dataLabel = plan.metadata?.data ?? "";
    const priceFormatted = plan.price?.toFixed(2).replace(".", ",") ?? "—";
    return (
      <div
        className={`relative rounded-2xl p-5 border transition-all hover:-translate-y-1 h-full ${
          plan.is_popular
            ? "shadow-xl border-secondary/40"
            : "bg-card border-border shadow-md hover:shadow-lg"
        }`}
        style={
          plan.is_popular
            ? {
                background: "var(--gradient-primary)",
                color: "white",
                boxShadow: "var(--shadow-glow)",
              }
            : {}
        }
      >
        {plan.is_popular && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary text-[10px] font-bold px-2 py-1 rounded-full shadow whitespace-nowrap">
            MAIS POPULAR
          </span>
        )}
        <h3 className={`text-base font-bold mb-1 text-center ${plan.is_popular ? "text-white" : "text-foreground"}`}>
          {plan.name}
        </h3>
        {dataLabel && (
          <p className={`text-xs mb-3 text-center ${plan.is_popular ? "text-white/80" : "text-muted-foreground"}`}>
            {dataLabel} de internet
          </p>
        )}
        <div className="text-center mb-4">
          <span className={`text-xs ${plan.is_popular ? "text-white/80" : "text-muted-foreground"}`}>R$</span>
          <span className={`text-2xl md:text-3xl font-extrabold ml-0.5 ${plan.is_popular ? "text-white" : "text-foreground"}`}>
            {priceFormatted}
          </span>
          <span className={`text-xs ml-0.5 ${plan.is_popular ? "text-white/80" : "text-muted-foreground"}`}>/mês</span>
        </div>

        <ul className="space-y-1.5 mb-5 text-xs">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-1.5">
              <Check
                className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${plan.is_popular ? "text-white" : "text-secondary"}`}
                strokeWidth={3}
              />
              <span className={plan.is_popular ? "text-white/95" : "text-foreground/90"}>{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          size="sm"
          onClick={() => handleAssinar(plan.name)}
          className="w-full text-white font-semibold transition-all text-xs"
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
          Assinar
        </Button>
      </div>
    );
  };

  return (
    <section className="py-12 md:py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 text-foreground">
            Planos <span className="text-secondary">5G+</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha a franquia ideal para você. Todos com minutos ilimitados, 100 SMS e benefícios inclusos.
          </p>
        </div>

        {/* Desktop: grid */}
        <div className="hidden sm:grid grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.id}>{renderCard(plan)}</div>
          ))}
        </div>

        {/* Mobile: carrossel com setas e autoplay em loop */}
        <div className="sm:hidden max-w-xs mx-auto px-10 relative">
          <Carousel
            opts={{ loop: true, align: "center" }}
            plugins={[
              Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: false }),
            ]}
          >
            <CarouselContent>
              {plans.map((plan) => (
                <CarouselItem key={plan.id} className="basis-full pt-4">
                  {renderCard(plan)}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2" />
            <CarouselNext className="-right-2" />
          </Carousel>
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link to="/octorlink-5g">Ver detalhes dos planos 5G+</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Octorlink5GPlans;