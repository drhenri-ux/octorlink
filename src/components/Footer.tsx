import { Instagram, Facebook, Phone, Mail, MapPin, Clock } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import TikTokIcon from "@/components/icons/TikTokIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <img src={logoWhite} alt="Octorlink" className="h-10 mb-4" />
            <p className="text-background/70 text-sm max-w-md leading-relaxed">
              Internet 100% fibra óptica de alta velocidade para Eunápolis e região.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-background font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <WhatsAppIcon className="w-4 h-4 text-background/70" />
                <a 
                  href="https://wa.me/5573999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors text-sm"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-background/70" />
                <a 
                  href="tel:08003281001" 
                  className="text-background/70 hover:text-background transition-colors text-sm"
                >
                  0800 3281 001
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-background/70" />
                <a 
                  href="mailto:contato@octorlink.com" 
                  className="text-background/70 hover:text-background transition-colors text-sm"
                >
                  contato@octorlink.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-background/70" />
                <span className="text-background/70 text-sm">Atendimento 24 horas</span>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-background font-semibold mb-4">Endereço</h4>
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="w-4 h-4 text-background/70 mt-0.5" />
              <p className="text-background/70 text-sm">
                Emiliano José Soares, 54 Colonial<br />
                Eunápolis - BA
              </p>
            </div>

            {/* Social */}
            <h4 className="text-background font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/octorlink/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Instagram className="w-5 h-5 text-background" />
              </a>
              <a
                href="https://www.facebook.com/octorlink"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Facebook className="w-5 h-5 text-background" />
              </a>
              <a
                href="https://www.tiktok.com/@octorlink"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <TikTokIcon className="w-5 h-5 text-background" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col items-center gap-2">
            <p className="text-background/50 text-sm">
              CNPJ: 64.076.694/0001-23
            </p>
            <p className="text-background/50 text-sm">
              © {currentYear} Octorlink. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
