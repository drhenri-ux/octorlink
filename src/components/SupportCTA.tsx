import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

const SupportCTA = () => {
  const handlePhone = () => {
    window.open("tel:08003281001", "_self");
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/5573999999999?text=Olá! Preciso de suporte técnico.", "_blank");
  };

  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, hsl(var(--primary) / 0.92), hsl(var(--primary) / 0.88)), url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto animate-slide-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Precisa de um suporte técnico?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Milhares de clientes já confiam na Octorlink.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 min-w-[200px]"
              onClick={handlePhone}
            >
              <Phone className="w-4 h-4" />
              0800 3281 001
            </Button>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 min-w-[200px]"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportCTA;
