import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Empresária",
    content: "Melhor internet que já tive! Trabalho de casa e preciso de estabilidade. A Octorlink nunca me deixou na mão. Recomendo demais!",
    rating: 5,
    avatar: "MS",
  },
  {
    name: "João Santos",
    role: "Gamer",
    content: "Ping baixíssimo e zero quedas. Finalmente consigo jogar online sem lag. A instalação foi super rápida e o técnico muito profissional.",
    rating: 5,
    avatar: "JS",
  },
  {
    name: "Ana Costa",
    role: "Estudante",
    content: "Perfeita para assistir aulas online e fazer videochamadas. O Wi-Fi pega em toda a casa. Preço justo e qualidade excelente!",
    rating: 5,
    avatar: "AC",
  },
  {
    name: "Carlos Oliveira",
    role: "Arquiteto",
    content: "Preciso enviar arquivos pesados diariamente. Com a Octorlink, o upload é incrivelmente rápido. Mudou minha produtividade!",
    rating: 5,
    avatar: "CO",
  },
];

const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <span className="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O que nossos <span className="text-gradient">clientes</span> dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Milhares de clientes satisfeitos em toda a região. Veja o que eles têm a dizer sobre a Octorlink.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
