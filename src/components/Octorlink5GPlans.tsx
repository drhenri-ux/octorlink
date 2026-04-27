import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  { name: "Plano 14GB", data: "14 GB", price: "59,90" },
  { name: "Plano 21GB", data: "21 GB", price: "69,90" },
  { name: "Plano 29GB", data: "29 GB", price: "79,90", highlight: true },
  { name: "Plano 39GB", data: "39 GB", price: "89,90" },
  { name: "Plano 44GB", data: "44 GB", price: "99,90" },
];

const Octorlink5GPlans = () => {
  const handleAssinar = (planName: string) => {
    const message = encodeURIComponent(
      `Olá! Quero assinar o ${planName} do Octorlink 5G+.`
    );
    window.open(`https://wa.me/5573988221344?text=${message}`, "_blank");
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-5 border transition-all hover:-translate-y-1 ${
                plan.highlight
                  ? "shadow-xl border-secondary/40"
                  : "bg-card border-border shadow-md hover:shadow-lg"
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
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary text-[10px] font-bold px-2 py-1 rounded-full shadow whitespace-nowrap">
                  MAIS POPULAR
                </span>
              )}
              <h3 className={`text-base font-bold mb-1 text-center ${plan.highlight ? "text-white" : "text-foreground"}`}>
                {plan.name}
              </h3>
              <p className={`text-xs mb-3 text-center ${plan.highlight ? "text-white/80" : "text-muted-foreground"}`}>
                {plan.data} de internet
              </p>
              <div className="text-center mb-4">
                <span className={`text-xs ${plan.highlight ? "text-white/80" : "text-muted-foreground"}`}>R$</span>
                <span className={`text-2xl md:text-3xl font-extrabold ml-0.5 ${plan.highlight ? "text-white" : "text-foreground"}`}>
                  {plan.price}
                </span>
                <span className={`text-xs ml-0.5 ${plan.highlight ? "text-white/80" : "text-muted-foreground"}`}>/mês</span>
              </div>

              <ul className="space-y-1.5 mb-5 text-xs">
                <li className="flex items-start gap-1.5">
                  <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-white" : "text-secondary"}`} strokeWidth={3} />
                  <span className={plan.highlight ? "text-white/95" : "text-foreground/90"}>Minutos ilimitados</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-white" : "text-secondary"}`} strokeWidth={3} />
                  <span className={plan.highlight ? "text-white/95" : "text-foreground/90"}>100 SMS</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-white" : "text-secondary"}`} strokeWidth={3} />
                  <span className={plan.highlight ? "text-white/95" : "text-foreground/90"}>WhatsApp ilimitado</span>
                </li>
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
          ))}
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
