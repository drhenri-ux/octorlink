import { Button } from "@/components/ui/button";
import { Wifi, Zap, ArrowRight } from "lucide-react";
import octopusMascot from "@/assets/octopus-mascot.png";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen bg-hero overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto relative z-10 pt-32 pb-16 px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-2 mb-6">
              <Wifi className="w-4 h-4 text-secondary" />
              <span className="text-primary-foreground text-sm font-medium">
                Internet Fibra Óptica de Alta Velocidade
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Conectando você ao{" "}
              <span className="text-secondary">futuro</span> com a velocidade da{" "}
              <span className="text-secondary">fibra</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0">
              Internet ultrarrápida para sua casa ou empresa. Estabilidade, baixa latência e suporte 24h. Experimente a diferença da Octorlink!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" className="group">
                <Zap className="w-5 h-5" />
                Ver Planos
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="heroOutline" size="xl">
                Falar com Consultor
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-secondary/20">
              <div className="text-center lg:text-left">
                <p className="text-3xl md:text-4xl font-bold text-secondary">+10k</p>
                <p className="text-primary-foreground/70 text-sm">Clientes Satisfeitos</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl md:text-4xl font-bold text-secondary">99.9%</p>
                <p className="text-primary-foreground/70 text-sm">Uptime Garantido</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl md:text-4xl font-bold text-secondary">24/7</p>
                <p className="text-primary-foreground/70 text-sm">Suporte Técnico</p>
              </div>
            </div>
          </div>

          {/* Mascot */}
          <div className="flex justify-center lg:justify-end animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/30 rounded-full blur-3xl scale-75" />
              <img
                src={octopusMascot}
                alt="Polvo Octorlink"
                className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl animate-float drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
