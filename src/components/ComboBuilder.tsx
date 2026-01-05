import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import LeadCaptureForm from "./LeadCaptureForm";

// Import app icons
import skyIcon from "@/assets/apps/sky.png";
import deezerIcon from "@/assets/apps/deezer.png";
import disneyplusIcon from "@/assets/apps/disneyplus.png";
import hbomaxIcon from "@/assets/apps/hbomax.webp";
import nbaIcon from "@/assets/apps/nba.png";
import playkidsIcon from "@/assets/apps/playkids.png";
import exitlagIcon from "@/assets/apps/exitlag.webp";

interface App {
  id: string;
  name: string;
  icon_url: string | null;
}

const iconMap: Record<string, string> = {
  "sky.png": skyIcon,
  "deezer.png": deezerIcon,
  "disneyplus.png": disneyplusIcon,
  "hbomax.webp": hbomaxIcon,
  "nba.png": nbaIcon,
  "playkids.png": playkidsIcon,
  "exitlag.webp": exitlagIcon,
};

const ComboBuilder = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLeadForm, setShowLeadForm] = useState(false);

  useEffect(() => {
    const fetchApps = async () => {
      const { data, error } = await supabase
        .from("apps")
        .select("id, name, icon_url")
        .order("name");

      if (!error && data) {
        setApps(data);
      }
      setLoading(false);
    };

    fetchApps();
  }, []);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const getAppIconUrl = (iconUrl: string | null) => {
    if (iconUrl) {
      if (iconUrl.startsWith("http")) {
        return iconUrl;
      }
      if (iconMap[iconUrl]) {
        return iconMap[iconUrl];
      }
      return `https://hzxsaalutzoozjngpdki.supabase.co/storage/v1/object/public/app-icons/${iconUrl}`;
    }
    return "";
  };

  return (
    <section id="combo" className="py-20 lg:py-32 bg-primary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Monte o Combo <span className="text-secondary">Perfeito</span> Para Você
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-2">
            Garanta a melhor internet e os melhores streamings!
          </p>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Desfrute de uma internet de ótima qualidade e dos melhores serviços de streaming da atualidade.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-foreground"></div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto mb-12">
            {apps.map((app, index) => {
              const isSelected = selectedServices.includes(app.id);
              const iconUrl = getAppIconUrl(app.icon_url);

              return (
                <button
                  key={app.id}
                  onClick={() => toggleService(app.id)}
                  className={`relative group transition-all duration-300 animate-scale-in ${
                    isSelected ? "scale-105" : "hover:scale-105"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  )}

                  <div className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-card shadow-lg border-4 transition-all duration-300 ${
                    isSelected 
                      ? "border-secondary shadow-glow" 
                      : "border-transparent hover:border-secondary/50"
                  }`}>
                    {iconUrl ? (
                      <img 
                        src={iconUrl} 
                        alt={app.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">{app.name[0]}</span>
                      </div>
                    )}
                  </div>

                  <p className={`mt-2 text-sm font-medium text-center ${
                    isSelected ? "text-secondary" : "text-primary-foreground"
                  }`}>
                    {app.name}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button 
            variant="default" 
            size="lg" 
            className="bg-card text-primary hover:bg-card/90 font-semibold px-8"
            onClick={() => setShowLeadForm(true)}
          >
            <Zap className="w-4 h-4" />
            Montar Meu Combo Agora
          </Button>
        </div>
      </div>

      <LeadCaptureForm
        isOpen={showLeadForm}
        onClose={() => setShowLeadForm(false)}
        isCombo={true}
      />
    </section>
  );
};

export default ComboBuilder;
