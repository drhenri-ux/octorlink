import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useIsMobile } from "@/hooks/use-mobile";

interface GoogleReview {
  author: string;
  photoUrl: string | null;
  rating: number;
  text: string;
  time: string;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const ReviewCard = ({ review, index }: { review: GoogleReview; index: number }) => (
  <div
    className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-scale-in"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= review.rating
              ? "fill-secondary text-secondary"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-4">
      &ldquo;{review.text}&rdquo;
    </p>
    <div className="flex items-center gap-3">
      {review.photoUrl ? (
        <img
          src={review.photoUrl}
          alt={review.author}
          className="w-10 h-10 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold text-sm">
          {getInitials(review.author)}
        </div>
      )}
      <div>
        <p className="font-semibold text-foreground text-sm">{review.author}</p>
        {review.time && (
          <p className="text-muted-foreground text-xs">{review.time}</p>
        )}
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [overallRating, setOverallRating] = useState(5);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isGoogle, setIsGoogle] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMobile = useIsMobile();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("google-reviews");
        if (error) throw error;
        if (data?.reviews?.length > 0) {
          setReviews(data.reviews);
          setOverallRating(data.rating || 5);
          setTotalReviews(data.totalReviews || 0);
          setIsGoogle(true);
        }
      } catch (err) {
        console.warn("Erro ao buscar avaliações do Google:", err);
      }
    };
    fetchReviews();
  }, []);

  if (reviews.length === 0) return null;

  const displayReviews = reviews.slice(0, 8);

  return (
    <section id="depoimentos" className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <span className="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-4">
            Avaliações do Google
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O que nossos <span className="text-gradient">clientes</span> dizem
          </h2>
          {totalReviews > 0 && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i <= Math.round(overallRating)
                        ? "fill-secondary text-secondary"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-foreground">
                {overallRating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">
                ({totalReviews} avaliações)
              </span>
            </div>
          )}
        </div>

        {/* Mobile: Carousel */}
        {isMobile ? (
          <div className="relative max-w-md mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {displayReviews.map((review, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 px-2">
                    <ReviewCard review={review} index={0} />
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-foreground hover:bg-muted transition-colors z-10"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-foreground hover:bg-muted transition-colors z-10"
              aria-label="Próximo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {displayReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Ir para avaliação ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop: Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {displayReviews.map((review, index) => (
              <ReviewCard key={index} review={review} index={index} />
            ))}
          </div>
        )}

        {/* Google attribution */}
        <div className="text-center mt-8">
          <a
            href="https://g.page/r/CS1RddmEvN9NEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Ver todas as avaliações no Google →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
