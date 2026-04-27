import { Button } from "@/components/ui/button";
import { Check, Signal } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  "WhatsApp sem descontar da franquia",
  "Ligações ilimitadas",
  "SMS ilimitado",
  "+1 GB de bônus na portabilidade",
  "Desconto de R$10 para clientes Octorlink Fibra",
  "Cobertura 4G e 5G",
  "Roaming nacional",
];

const Octorlink5G = () => {
  return (
    <section id="octorlink-5g" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 mb-4">
            <Signal className="w-4 h-4 text-secondary" />
            <span className="text-sm font-semibold text-secondary">Novidade</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Octorlink <span className="text-secondary">5G+</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça o nosso plano móvel com cobertura 4G e 5G, ligações ilimitadas e benefícios exclusivos para você ficar sempre conectado.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-10 shadow-lg">
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-foreground">
            Benefícios inclusos
          </h3>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 text-foreground/90"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/15 border border-secondary/40 flex items-center justify-center mt-0.5">
                  <Check className="w-3.5 h-3.5 text-secondary" strokeWidth={3} />
                </span>
                <span className="text-sm md:text-base">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-center">
            <Button
              asChild
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
            >
              <Link to="/octorlink-5g">Saiba mais</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Octorlink5G;