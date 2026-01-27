import { Button } from "@/components/ui/button";
import { Network, Shield, Zap, TrendingUp, Headphones, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Network,
    title: "Link Dedicado",
    description: "Conexão exclusiva com banda garantida 24/7",
  },
  {
    icon: Shield,
    title: "SLA Garantido",
    description: "Acordo de nível de serviço com suporte prioritário",
  },
  {
    icon: Zap,
    title: "Alta Performance",
    description: "Velocidade simétrica para upload e download",
  },
  {
    icon: TrendingUp,
    title: "Escalabilidade",
    description: "Planos flexíveis que crescem com seu negócio",
  },
];

const BusinessSolutions = () => {
  return (
    <section id="empresa" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, hsl(var(--primary) / 0.95), hsl(var(--primary) / 0.85)), url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-slide-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary font-medium text-sm">
            <Building2 className="w-4 h-4" />
            Soluções Empresariais
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Link Dedicado para Sua Empresa
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Conectividade de alta performance com banda garantida, ideal para empresas que não podem parar
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-card/10 backdrop-blur-sm border border-primary-foreground/10 hover:border-secondary/50 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/20 border border-secondary/30 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/70 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 border-t border-primary-foreground/10">
          <div className="w-16 h-16 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center mx-auto mb-6">
            <Headphones className="w-8 h-8 text-secondary" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Internet Empresarial de Alta Performance
          </h3>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Conexão ultrarrápida, estável e segura para empresas que não podem parar. Conheça nossas soluções corporativas.
          </p>
          <Link to="/internet-empresarial">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 gap-2"
            >
              Conhecer Soluções Empresariais
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutions;
