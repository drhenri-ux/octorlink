import { Wifi, Shield, Clock, Headphones, Gauge, Globe } from "lucide-react";

const benefits = [
  {
    icon: Gauge,
    title: "Velocidade Real",
    description: "Entregamos a velocidade contratada. Sem surpresas, sem enrolação.",
  },
  {
    icon: Shield,
    title: "Conexão Estável",
    description: "Fibra óptica de última geração para uma conexão sem quedas.",
  },
  {
    icon: Clock,
    title: "Instalação Rápida",
    description: "Instalação em até 24h úteis após aprovação do cadastro.",
  },
  {
    icon: Headphones,
    title: "Suporte 24 Horas",
    description: "Equipe técnica disponível a qualquer momento para te ajudar.",
  },
  {
    icon: Wifi,
    title: "Wi-Fi Potente",
    description: "Roteador de alta performance incluso em todos os planos.",
  },
  {
    icon: Globe,
    title: "Sem Franquia",
    description: "Use à vontade! Não temos limite de dados em nenhum plano.",
  },
];

const Benefits = () => {
  return (
    <section id="beneficios" className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-4">
            Por Que Escolher a Octorlink?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Benefícios que fazem a <span className="text-gradient">diferença</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais do que internet rápida, oferecemos uma experiência completa para você e sua família.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
