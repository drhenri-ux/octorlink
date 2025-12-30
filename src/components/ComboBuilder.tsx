import { Button } from "@/components/ui/button";
import { Check, Zap, Tv, Music, Film, Gamepad2, Baby, Trophy } from "lucide-react";
import { useState } from "react";

const streamingServices = [
  {
    id: "globoplay",
    name: "Globoplay",
    icon: Tv,
    price: 24.90,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "deezer",
    name: "Deezer",
    icon: Music,
    price: 14.90,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "disney",
    name: "Disney+",
    icon: Film,
    price: 27.90,
    color: "from-blue-600 to-blue-400",
  },
  {
    id: "hbo",
    name: "HBO Max",
    icon: Film,
    price: 34.90,
    color: "from-violet-600 to-purple-500",
  },
  {
    id: "paramount",
    name: "Paramount+",
    icon: Film,
    price: 19.90,
    color: "from-blue-700 to-blue-500",
  },
  {
    id: "playkids",
    name: "PlayKids",
    icon: Baby,
    price: 12.90,
    color: "from-green-500 to-emerald-400",
  },
];

const ComboBuilder = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const totalExtra = selectedServices.reduce((acc, id) => {
    const service = streamingServices.find((s) => s.id === id);
    return acc + (service?.price || 0);
  }, 0);

  return (
    <section id="combo" className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-full text-sm mb-4">
            Monte Seu Combo
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Monte o Combo <span className="text-gradient">Perfeito</span> Para Você
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Garanta a melhor internet e os melhores streamings! Combine sua fibra com os serviços que você mais ama.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-5xl mx-auto mb-12">
          {streamingServices.map((service, index) => {
            const isSelected = selectedServices.includes(service.id);
            const Icon = service.icon;

            return (
              <button
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`relative group p-6 rounded-2xl transition-all duration-300 animate-scale-in ${
                  isSelected
                    ? "bg-gradient-to-br " + service.color + " shadow-glow scale-105"
                    : "bg-card border border-border hover:border-primary/50 hover:shadow-card"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-4 h-4 text-secondary-foreground" />
                  </div>
                )}

                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-colors ${
                  isSelected ? "bg-white/20" : "bg-primary/10"
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? "text-white" : "text-primary"}`} />
                </div>

                <h3 className={`font-semibold text-sm mb-1 ${isSelected ? "text-white" : "text-foreground"}`}>
                  {service.name}
                </h3>
                <p className={`text-xs ${isSelected ? "text-white/80" : "text-muted-foreground"}`}>
                  +R$ {service.price.toFixed(2).replace(".", ",")}/mês
                </p>
              </button>
            );
          })}
        </div>

        {/* Summary Card */}
        <div className="max-w-lg mx-auto">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-card">
            <div className="text-center mb-6">
              <p className="text-muted-foreground mb-2">Adicional ao seu plano:</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-sm text-muted-foreground">+R$</span>
                <span className="text-4xl md:text-5xl font-bold text-gradient">
                  {totalExtra.toFixed(2).replace(".", ",")}
                </span>
                <span className="text-sm text-muted-foreground">/mês</span>
              </div>
              {selectedServices.length > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  {selectedServices.length} serviço{selectedServices.length > 1 ? "s" : ""} selecionado{selectedServices.length > 1 ? "s" : ""}
                </p>
              )}
            </div>

            <Button variant="gradient" size="lg" className="w-full">
              <Zap className="w-4 h-4" />
              Montar Meu Combo Agora
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              * Valores adicionais ao plano de internet escolhido
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComboBuilder;
