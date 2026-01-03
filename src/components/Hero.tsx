import { Button } from "@/components/ui/button";
import { Wifi, MessageCircle } from "lucide-react";
import mascotWoman from "@/assets/mascot-woman.png";

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

      <div className="container mx-auto relative z-10 pt-20 md:pt-28 pb-0 px-4 min-h-screen flex flex-col justify-center">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
          
          {/* Mascot - Mobile: Top */}
          <div className="lg:hidden w-full flex justify-center">
            <img 
              src={mascotWoman} 
              alt="Atendente Octorlink" 
              className="w-44 h-auto drop-shadow-2xl"
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-2 mb-4 md:mb-6 animate-fade-in">
              <Wifi className="w-4 h-4 text-secondary" />
              <span className="text-primary-foreground text-sm font-medium">
                100% Fibra Óptica
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-primary-foreground leading-[1.1] mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              A Internet Fibra Óptica{" "}
              <span className="text-secondary">Mais Rápida</span>{" "}
              da Região
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-primary-foreground/80 mb-6 md:mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Velocidade de verdade, Wi-Fi de última geração e suporte técnico local. 
              Planos sob medida para sua casa ou empresa.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                variant="cta" 
                size="lg" 
                className="text-sm md:text-base px-6 md:px-10 w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                Falar com Consultor
              </Button>
              <Button 
                variant="heroOutline" 
                size="lg" 
                className="text-sm md:text-base px-6 md:px-10 w-full sm:w-auto"
              >
                Ver Planos
              </Button>
            </div>
          </div>

          {/* Mascot - Desktop: Right side */}
          <div className="hidden lg:flex flex-1 justify-center items-end">
            <img 
              src={mascotWoman} 
              alt="Atendente Octorlink" 
              className="w-[320px] xl:w-[380px] h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
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
