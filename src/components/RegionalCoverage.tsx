import { Button } from "@/components/ui/button";
import { MapPin, MessageCircle, Loader2 } from "lucide-react";

const activeCities = [
  { name: "Eunápolis", active: true },
];

const comingSoonCities = [
  { name: "Porto Seguro", active: false },
  { name: "Itabela", active: false },
  { name: "Camacan", active: false },
  { name: "Itagimirim", active: false },
  { name: "São João do Paraíso", active: false },
  { name: "Mascote", active: false },
];

const RegionalCoverage = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/5573999999999?text=Olá! Gostaria de verificar a cobertura na minha região.", "_blank");
  };

  return (
    <section className="py-20 lg:py-32 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Cobertura Regional
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Levando internet de qualidade para toda a região
          </p>
        </div>

        {/* Cities Card */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-card rounded-2xl shadow-card p-8 animate-scale-in">
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Cidades Atendidas</h3>
            </div>

            {/* Cities Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Active Cities */}
              {activeCities.map((city) => (
                <div
                  key={city.name}
                  className="flex items-center gap-2 py-2 px-3 rounded-lg bg-green-50 border border-green-200"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-foreground font-medium">{city.name}</span>
                </div>
              ))}

              {/* Coming Soon Cities */}
              {comingSoonCities.map((city) => (
                <div
                  key={city.name}
                  className="flex items-center gap-2 py-2 px-3 rounded-lg bg-muted border border-border"
                >
                  <Loader2 className="w-3 h-3 text-secondary animate-spin" />
                  <span className="text-muted-foreground">{city.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-card p-8 text-center animate-scale-in">
            <p className="text-lg font-medium text-foreground mb-2">
              Não tem certeza se atendemos seu endereço?
            </p>
            <p className="text-muted-foreground mb-6">
              Entre em contato e verificamos a disponibilidade para você
            </p>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-4 h-4" />
              Verificar Cobertura
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionalCoverage;
