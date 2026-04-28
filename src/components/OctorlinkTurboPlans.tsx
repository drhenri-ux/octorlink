import { Button } from "@/components/ui/button";
import { CheckCircle2, Smartphone } from "lucide-react";

const turboPlans = [
  {
    name: "W Móvel 39GB",
    price: "69,90",
    base: "29GB + 9GB Bônus",
    franquia: "39GB",
  },
  {
    name: "W Móvel 58GB",
    price: "79,90",
    base: "39GB + 19GB Bônus",
    franquia: "58GB",
    highlight: true,
  },
  {
    name: "W Móvel 68GB",
    price: "89,90",
    base: "44GB + 24GB Bônus",
    franquia: "68GB",
  },
];

const benefits = [
  "Internet 5G",
  "WhatsApp ilimitado",
  "Gigas acumulados",
  "Isenção de multa",
  "Sem fidelidade",
];

const OctorlinkTurboPlans = () => {
  const handlePedirChip = (planName: string) => {
    const message = encodeURIComponent(
      `Olá! Quero pedir o chip do ${planName} (Plano TURBO).`
    );
    window.open(`https://wa.me/5573988221344?text=${message}`, "_blank");
  };

  return (
    <section className="py-12 md:py-20 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 text-primary">
            Planos TURBO de Telefonia
          </h2>
          <p className="text-base md:text-xl text-muted-foreground">
            Bônus Trimestral pra você navegar!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {turboPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 bg-card border transition-all hover:-translate-y-1 ${
                plan.highlight
                  ? "border-primary/40 shadow-xl"
                  : "border-border shadow-md hover:shadow-lg"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full shadow whitespace-nowrap">
                  MAIS POPULAR
                </span>
              )}

              <h3 className="text-2xl font-extrabold text-primary mb-2">
                {plan.name}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-4">
                <Smartphone className="w-4 h-4" />
                +100 SMS + 1GB Portabilidade
              </p>

              <div className="mb-3">
                <span className="text-3xl font-extrabold text-foreground">
                  R${plan.price}
                </span>
                <span className="text-sm text-muted-foreground">/mês</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{plan.base}</p>

              <div className="bg-primary/10 rounded-lg px-4 py-2 mb-5 text-center">
                <span className="text-xl font-bold text-primary">
                  {plan.franquia}
                </span>
                <span className="text-sm text-foreground/80">/franquia mensal</span>
              </div>

              <ul className="space-y-2 mb-6 text-sm">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground/90">{b}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePedirChip(plan.name)}
                className="w-full font-semibold"
                size="lg"
              >
                Pedir chip! →
              </Button>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto mt-8 leading-relaxed">
          <strong>Promoção Turbo:</strong> Os planos de 39GB | 58GB e 68GB estão com condições
          promocionais disponíveis para recargas feitas até 28/02/2026. Recargas após essa data
          não terão promoção. Consulte condições.
        </p>
      </div>
    </section>
  );
};

export default OctorlinkTurboPlans;