import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Qual o prazo de instalação?",
    answer: "A instalação é realizada em até 24 horas úteis após a aprovação do cadastro. Nossa equipe técnica entrará em contato para agendar o melhor horário para você.",
  },
  {
    question: "A instalação é gratuita?",
    answer: "Sim! A instalação é 100% gratuita em todos os nossos planos. Você não paga nada para ter a fibra óptica na sua casa ou empresa.",
  },
  {
    question: "Como funciona o Wi-Fi incluso?",
    answer: "Todos os planos incluem um roteador Wi-Fi de alta performance em comodato. Nos planos superiores, oferecemos roteadores Dual Band e até sistema Mesh para cobrir toda a sua casa.",
  },
  {
    question: "Tem limite de dados (franquia)?",
    answer: "Não! Nenhum dos nossos planos possui limite de dados. Use à vontade para trabalhar, estudar, jogar e assistir seus conteúdos favoritos.",
  },
  {
    question: "Como funciona o suporte técnico?",
    answer: "Oferecemos suporte técnico 24 horas por dia, 7 dias por semana. Você pode entrar em contato via WhatsApp, telefone ou através da área do cliente no nosso site.",
  },
  {
    question: "Posso mudar de plano depois?",
    answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. A alteração é feita sem custos adicionais e entra em vigor no próximo ciclo de faturamento.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <span className="inline-block bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-full text-sm mb-4">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos serviços. Se precisar de mais informações, estamos à disposição.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-2xl px-6 shadow-card data-[state=open]:shadow-glow transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:text-primary py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
