import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "5511999999999";
  const message = "Olá! Gostaria de saber mais sobre os planos de internet da Octorlink.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 animate-pulse-glow"
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white fill-white" />
    </a>
  );
};

export default WhatsAppButton;
