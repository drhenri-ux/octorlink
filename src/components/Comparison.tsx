import { Check, X } from "lucide-react";

const technologies = [
  {
    name: "Fibra Óptica",
    isOctorlink: true,
    features: {
      velocidade: { value: "Até 600 Mbps", available: true },
      estabilidade: { value: "99.9% uptime", available: true },
      latencia: { value: "1-5ms", available: true },
      clima: { value: "Não afeta", available: true },
      simetrico: { value: "Upload = Download", available: true },
      franquia: { value: "Ilimitada", available: true },
    },
  },
  {
    name: "Internet via Rádio",
    isOctorlink: false,
    features: {
      velocidade: { value: "Até 50 Mbps", available: true },
      estabilidade: { value: "Variável", available: false },
      latencia: { value: "20-100ms", available: false },
      clima: { value: "Afeta muito", available: false },
      simetrico: { value: "Assimétrico", available: false },
      franquia: { value: "Limitada", available: false },
    },
  },
  {
    name: "Internet via Satélite",
    isOctorlink: false,
    features: {
      velocidade: { value: "Até 100 Mbps", available: true },
      estabilidade: { value: "Instável", available: false },
      latencia: { value: "500-700ms", available: false },
      clima: { value: "Afeta muito", available: false },
      simetrico: { value: "Assimétrico", available: false },
      franquia: { value: "Limitada", available: false },
    },
  },
];

const featureLabels = {
  velocidade: "Velocidade",
  estabilidade: "Estabilidade",
  latencia: "Latência (Ping)",
  clima: "Influência do Clima",
  simetrico: "Upload/Download",
  franquia: "Franquia de Dados",
};

const Comparison = () => {
  return (
    <section id="comparativo" className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <span className="inline-block bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-full text-sm mb-4">
            Comparativo
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Por que escolher <span className="text-gradient">Fibra Óptica</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja a diferença entre a fibra óptica e outras tecnologias disponíveis no mercado.
          </p>
        </div>

        {/* Comparison Table - Desktop */}
        <div className="hidden lg:block max-w-5xl mx-auto">
          <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-4 bg-muted/50">
              <div className="p-6 font-semibold text-foreground">Característica</div>
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className={`p-6 text-center font-bold ${
                    tech.isOctorlink
                      ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground"
                      : "text-foreground"
                  }`}
                >
                  {tech.name}
                  {tech.isOctorlink && (
                    <span className="block text-xs font-normal mt-1 text-primary-foreground/80">
                      Octorlink
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Feature Rows */}
            {Object.entries(featureLabels).map(([key, label], index) => (
              <div
                key={key}
                className={`grid grid-cols-4 ${index % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
              >
                <div className="p-5 font-medium text-foreground border-r border-border">
                  {label}
                </div>
                {technologies.map((tech) => {
                  const feature = tech.features[key as keyof typeof tech.features];
                  return (
                    <div
                      key={`${tech.name}-${key}`}
                      className={`p-5 text-center flex items-center justify-center gap-2 ${
                        tech.isOctorlink ? "bg-primary/5" : ""
                      }`}
                    >
                      {feature.available ? (
                        <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-destructive flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.available ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {feature.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Cards - Mobile */}
        <div className="lg:hidden space-y-6">
          {technologies.map((tech, techIndex) => (
            <div
              key={tech.name}
              className={`rounded-2xl overflow-hidden animate-scale-in ${
                tech.isOctorlink
                  ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-glow"
                  : "bg-card border border-border shadow-card"
              }`}
              style={{ animationDelay: `${techIndex * 0.1}s` }}
            >
              <div className={`p-5 ${tech.isOctorlink ? "" : "border-b border-border"}`}>
                <h3 className={`text-xl font-bold ${tech.isOctorlink ? "text-primary-foreground" : "text-foreground"}`}>
                  {tech.name}
                </h3>
                {tech.isOctorlink && (
                  <span className="text-sm text-primary-foreground/80">Octorlink</span>
                )}
              </div>
              <div className={`p-5 space-y-3 ${tech.isOctorlink ? "bg-primary-foreground/10" : ""}`}>
                {Object.entries(featureLabels).map(([key, label]) => {
                  const feature = tech.features[key as keyof typeof tech.features];
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className={`text-sm ${tech.isOctorlink ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {label}
                      </span>
                      <div className="flex items-center gap-2">
                        {feature.available ? (
                          <Check className={`w-4 h-4 ${tech.isOctorlink ? "text-primary-foreground" : "text-secondary"}`} />
                        ) : (
                          <X className="w-4 h-4 text-destructive" />
                        )}
                        <span className={`text-sm font-medium ${tech.isOctorlink ? "text-primary-foreground" : "text-foreground"}`}>
                          {feature.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comparison;
