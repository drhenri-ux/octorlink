import { Instagram, Facebook, Linkedin, Mail } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <img src={logoWhite} alt="Octorlink" className="h-10 mb-4" />
            <p className="text-background/70 text-sm max-w-md leading-relaxed">
              A Octorlink é uma empresa de telecomunicações focada em levar internet de fibra óptica de alta qualidade para residências e empresas. Conectando você ao futuro!
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-background font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-background/70 hover:text-background transition-colors text-sm">
                  Início
                </a>
              </li>
              <li>
                <a href="#planos" className="text-background/70 hover:text-background transition-colors text-sm">
                  Planos
                </a>
              </li>
              <li>
                <a href="#beneficios" className="text-background/70 hover:text-background transition-colors text-sm">
                  Benefícios
                </a>
              </li>
              <li>
                <a href="#contato" className="text-background/70 hover:text-background transition-colors text-sm">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-background font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Instagram className="w-5 h-5 text-background" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Facebook className="w-5 h-5 text-background" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Linkedin className="w-5 h-5 text-background" />
              </a>
              <a
                href="mailto:contato@octorlink.com.br"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Mail className="w-5 h-5 text-background" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © {currentYear} Octorlink. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-background/50 hover:text-background text-sm transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-background/50 hover:text-background text-sm transition-colors">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
