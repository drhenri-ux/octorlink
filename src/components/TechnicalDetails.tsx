import { Gauge, Upload, Wifi, Router, Network, Infinity } from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "Baixa Latência",
    description: "Perfeito para gamers e streaming sem lag",
  },
  {
    icon: Upload,
    title: "Alta Taxa de Upload",
    description: "Excelente para home office e videoconferências",
  },
  {
    icon: Wifi,
    title: "Fibra Dedicada",
    description: "Conexão direta até dentro da sua casa",
  },
  {
    icon: Router,
    title: "Roteadores Premium",
    description: "Equipamentos de última geração inclusos",
  },
  {
    icon: Network,
    title: "Backbone Próprio",
    description: "Redundância e estabilidade garantidas",
  },
  {
    icon: Infinity,
    title: "Sem Franquia",
    description: "Internet ilimitada sem redução de velocidade",
  },
];

const TechnicalDetails = () => {
  return (
    <section className="py-20 lg:py-32 bg-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-4">
            Detalhes Técnicos
          </h2>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            Para quem valoriza a tecnologia por trás da conexão
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-background/5 border border-background/10 hover:border-secondary/50 hover:bg-background/10 transition-all duration-300 animate-scale-in text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                <feature.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-base font-semibold text-background mb-2">
                {feature.title}
              </h3>
              <p className="text-background/60 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div className="max-w-4xl mx-auto">
          <div className="py-6 px-8 rounded-2xl bg-background/5 border border-background/10 text-center">
            <p className="text-lg text-background">
              <span className="font-bold">Infraestrutura robusta</span>{" "}
              <span className="text-background/70">preparada para crescer com você</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalDetails;
