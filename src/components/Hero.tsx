import { Button } from "@/components/ui/button";
import { Wifi, MessageCircle, Zap, Shield, Clock } from "lucide-react";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/70" />
      
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 md:w-[500px] md:h-[500px] bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 md:w-96 md:h-96 bg-primary/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 md:w-[400px] md:h-[400px] bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-foreground to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-foreground to-transparent" />
      </div>

      <div className="container mx-auto relative z-10 pt-24 md:pt-32 pb-16 px-4 min-h-screen flex items-center">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-2 mb-6 md:mb-8 animate-fade-in">
            <Wifi className="w-4 h-4 text-secondary" />
            <span className="text-primary-foreground text-sm font-medium">
              100% Fibra Óptica
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-primary-foreground leading-[1.1] mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            A Internet Fibra Óptica{" "}
            <span className="text-secondary">Mais Rápida</span>{" "}
            da Região
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in px-4" style={{ animationDelay: '0.2s' }}>
            Velocidade de verdade, Wi-Fi de última geração e suporte técnico local. 
            Planos sob medida para sua casa ou empresa.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16 animate-fade-in px-4" style={{ animationDelay: '0.3s' }}>
            <Button 
              variant="cta" 
              size="xl" 
              className="text-base md:text-lg px-8 md:px-12 w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              Falar com Consultor
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl" 
              className="text-base md:text-lg px-8 md:px-12 w-full sm:w-auto"
            >
              Ver Planos
            </Button>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto animate-fade-in px-4" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col items-center gap-3 p-4 md:p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary-foreground">600</p>
                <p className="text-primary-foreground/70 text-sm">Mega de Velocidade</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 p-4 md:p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary-foreground">99.9%</p>
                <p className="text-primary-foreground/70 text-sm">Uptime Garantido</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 p-4 md:p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary-foreground">24/7</p>
                <p className="text-primary-foreground/70 text-sm">Suporte Técnico</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path
            d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 43.3C840 46.7 960 53.3 1080 56.7C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
