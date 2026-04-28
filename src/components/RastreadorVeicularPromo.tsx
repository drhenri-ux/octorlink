import { Button } from "@/components/ui/button";
import { MapPin, Lock, Bell, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: MapPin, title: "Tempo real", desc: "Localização 24h" },
  { icon: Lock, title: "Bloqueio remoto", desc: "Direto do app" },
  { icon: Bell, title: "Alertas inteligentes", desc: "Velocidade e cerca virtual" },
  { icon: Shield, title: "Central 24h", desc: "Suporte sempre disponível" },
];

const RastreadorVeicularPromo = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-border" style={{ background: "var(--gradient-primary)" }}>
          <div className="grid lg:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            {/* Texto */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm mb-4">
                <Shield className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wide">Novo serviço</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Octorlink <span style={{ color: "hsl(var(--pink-glow))" }}>Tracker</span>
              </h2>
              <p className="text-white/90 text-base md:text-lg mb-6">
                Proteção e monitoramento 24h para o seu carro, moto ou frota com o Octorlink Tracker. Rastreamento em tempo real, bloqueio remoto e suporte completo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="text-white font-semibold transition-all"
                  style={{
                    backgroundColor: "hsla(142, 70%, 45%, 0.9)",
                    border: "1px solid hsl(142, 80%, 55%)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "hsla(142, 70%, 45%, 0.9)"; }}
                >
                  <Link to="/octorlink-tracker">Conhecer o serviço</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white"
                  onClick={() => {
                    const message = encodeURIComponent("Olá! Tenho interesse no Octorlink Tracker.");
                    window.open(`https://wa.me/5573988221344?text=${message}`, "_blank");
                  }}
                >
                  Falar no WhatsApp
                </Button>
              </div>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {features.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-5 hover:bg-white/15 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-white mb-1">{title}</h3>
                  <p className="text-xs text-white/80">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RastreadorVeicularPromo;
