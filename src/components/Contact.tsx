import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contato" className="py-20 lg:py-32 bg-hero relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="animate-slide-up">
            <span className="inline-block bg-secondary/20 text-secondary font-semibold px-4 py-2 rounded-full text-sm mb-4">
              Fale Conosco
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Pronto para ter a melhor{" "}
              <span className="text-secondary">internet</span>?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-12">
              Entre em contato com nossos consultores e descubra o plano perfeito para você. Atendimento rápido e sem burocracia!
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a
              href="https://wa.me/5573982264379"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-primary-foreground/10 backdrop-blur-sm border border-secondary/30 rounded-2xl p-6 hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-105 animate-scale-in"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/30 transition-colors">
                <MessageCircle className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-primary-foreground mb-1">WhatsApp</h3>
              <p className="text-primary-foreground/70 text-sm">(73) 98226-4379</p>
            </a>

            <a
              href="tel:08003281001"
              className="group bg-primary-foreground/10 backdrop-blur-sm border border-secondary/30 rounded-2xl p-6 hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-105 animate-scale-in"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/30 transition-colors">
                <Phone className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-primary-foreground mb-1">Central</h3>
              <p className="text-primary-foreground/70 text-sm">0800 3281 001</p>
            </a>

            <div
              className="group bg-primary-foreground/10 backdrop-blur-sm border border-secondary/30 rounded-2xl p-6 animate-scale-in"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-primary-foreground mb-1">Cobertura</h3>
              <p className="text-primary-foreground/70 text-sm">Consulte disponibilidade</p>
            </div>
          </div>

          {/* CTA Button */}
          <a href="https://wa.me/5573982264379" target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="xl" className="animate-pulse-glow">
              <MessageCircle className="w-5 h-5" />
              Falar pelo WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
