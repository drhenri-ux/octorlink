import { Button } from "@/components/ui/button";
import { Wifi, MessageCircle } from "lucide-react";
import heroCharacter from "@/assets/hero-character.png";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen bg-hero overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/80" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 border border-primary-foreground/20 rounded-full" />
        <div className="absolute top-40 left-20 w-96 h-96 border border-primary-foreground/10 rounded-full" />
        <div className="absolute bottom-20 right-40 w-80 h-80 border border-primary-foreground/10 rounded-full" />
      </div>

      <div className="container mx-auto relative z-10 pt-28 md:pt-32 pb-8 md:pb-0 px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[85vh]">
          {/* Content - Left Side */}
          <div className="text-left order-2 lg:order-1 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-2 mb-6">
              <Wifi className="w-4 h-4 text-primary-foreground" />
              <span className="text-primary-foreground text-sm font-medium">
                100% Fibra Óptica
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-primary-foreground leading-[1.1] mb-6">
              A Internet Fibra Óptica Mais Estável da Região
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-xl leading-relaxed">
              Velocidade de verdade, Wi-Fi de última geração, suporte técnico local e planos sob medida para sua casa ou empresa.
            </p>

            <Button 
              variant="cta" 
              size="xl" 
              className="group text-base md:text-lg px-8 md:px-12"
            >
              <MessageCircle className="w-5 h-5" />
              Falar com um consultor agora!
            </Button>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-primary-foreground/10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">99%</span>
                </div>
                <span className="text-primary-foreground/70 text-sm">Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">24h</span>
                </div>
                <span className="text-primary-foreground/70 text-sm">Suporte</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">0</span>
                </div>
                <span className="text-primary-foreground/70 text-sm">Franquia</span>
              </div>
            </div>
          </div>

          {/* Character - Right Side */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              {/* Glow effect behind character */}
              <div className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl scale-90 translate-y-10" />
              <img
                src={heroCharacter}
                alt="Atendente Octorlink"
                className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path
            d="M0 100L48 91.7C96 83.3 192 66.7 288 58.3C384 50 480 50 576 54.2C672 58.3 768 66.7 864 70.8C960 75 1056 75 1152 70.8C1248 66.7 1344 58.3 1392 54.2L1440 50V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
