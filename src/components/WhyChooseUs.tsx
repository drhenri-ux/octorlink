import { Zap, Wifi, Headphones, Settings } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "100% Fibra Óptica",
    description: "Estabilidade real, sem quedas ou oscilações. Conexão direta até sua casa.",
  },
  {
    icon: Wifi,
    title: "Wi-Fi 6 de Última Geração",
    description: "Tecnologia mais recente para cobrir toda sua casa com sinal forte e estável.",
  },
  {
    icon: Headphones,
    title: "Suporte Local 24h",
    description: "Equipe técnica em Eunápolis, pronta para atender você a qualquer momento.",
  },
  {
    icon: Settings,
    title: "Planos Personalizáveis",
    description: "Internet + Streaming + Câmeras. Monte o combo perfeito para você.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por Que Escolher a <span className="text-gradient">Octorlink</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mais que internet: uma experiência completa de conectividade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
