import { Check, X } from "lucide-react";

const features = [
  {
    resource: "100% fibra óptica",
    octorlink: true,
    others: "Parcial",
  },
  {
    resource: "Wi-Fi 6 incluso",
    octorlink: true,
    others: false,
  },
  {
    resource: "Suporte local 24h",
    octorlink: true,
    others: false,
  },
  {
    resource: "Personalização de combos",
    octorlink: true,
    others: "Limitado",
  },
  {
    resource: "Segurança com câmeras",
    octorlink: true,
    others: true,
  },
  {
    resource: "Planos até 1Gb",
    octorlink: true,
    others: "Variável",
  },
];

const Comparison = () => {
  const renderOthersValue = (value: boolean | string) => {
    if (value === true) {
      return <Check className="w-5 h-5 text-muted-foreground mx-auto" />;
    }
    if (value === false) {
      return <X className="w-5 h-5 text-destructive mx-auto" />;
    }
    return <span className="text-muted-foreground">{value}</span>;
  };

  return (
    <section id="comparativo" className="py-20 lg:py-32 bg-[hsl(210,30%,96%)]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Veja a Diferença
          </h2>
          <p className="text-lg text-muted-foreground">
            Comparação transparente de recursos
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl overflow-hidden shadow-lg animate-scale-in">
            {/* Header Row */}
            <div className="grid grid-cols-3 bg-primary text-primary-foreground">
              <div className="p-4 md:p-6 font-semibold text-sm md:text-base">
                Recursos
              </div>
              <div className="p-4 md:p-6 font-semibold text-center text-sm md:text-base">
                Octorlink
              </div>
              <div className="p-4 md:p-6 font-semibold text-center text-sm md:text-base">
                Outros provedores
              </div>
            </div>

            {/* Feature Rows */}
            {features.map((feature, index) => (
              <div
                key={feature.resource}
                className={`grid grid-cols-3 border-b border-border last:border-b-0 ${
                  index % 2 === 0 ? "bg-background" : "bg-muted/30"
                }`}
              >
                <div className="p-4 md:p-6 text-foreground font-medium text-sm md:text-base">
                  {feature.resource}
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center">
                  <Check className="w-5 h-5 text-secondary" />
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center text-sm md:text-base">
                  {renderOthersValue(feature.others)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;