import { useEffect, useState, useRef } from "react";
import { Users, MapPin, Calendar, ThumbsUp } from "lucide-react";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter = ({ end, duration = 2000, suffix = "", prefix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString("pt-BR")}{suffix}
    </span>
  );
};

const stats = [
  {
    icon: Users,
    value: 8500,
    suffix: "+",
    label: "Clientes Conectados",
    description: "em Eunápolis e região",
  },
  {
    icon: MapPin,
    value: 95,
    suffix: "%",
    label: "Cobertura na Cidade",
    description: "de Eunápolis coberta",
  },
  {
    icon: Calendar,
    value: 7,
    suffix: "",
    label: "Anos de Experiência",
    description: "levando conexão de qualidade",
  },
  {
    icon: ThumbsUp,
    value: 98,
    suffix: "%",
    label: "Satisfação",
    description: "dos clientes recomendam",
  },
];

const StatsCounter = () => {
  return (
    <section className="py-16 lg:py-24 bg-hero relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-2 mb-4">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-primary-foreground text-sm font-medium">
              Eunápolis, Bahia
            </span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Conectando <span className="text-secondary">Eunápolis</span>
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Somos a escolha de milhares de famílias e empresas na cidade. Confira nossos números!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 md:p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm animate-scale-in hover:bg-primary-foreground/10 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-secondary" />
              </div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-primary-foreground font-semibold text-sm md:text-base mb-1">
                {stat.label}
              </p>
              <p className="text-primary-foreground/60 text-xs md:text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
