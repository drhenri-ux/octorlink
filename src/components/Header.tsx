import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import logoWhite from "@/assets/logo-white.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Planos", href: "#planos" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-secondary/20">
      <div className="container mx-auto flex items-center justify-between py-3 md:py-4">
        <a href="#inicio" className="flex items-center">
          <img src={logoWhite} alt="Octorlink" className="h-8 md:h-10" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 font-medium text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <User className="w-4 h-4 mr-2" />
            Área do Cliente
          </Button>
          <Button variant="hero" size="default">
            Assine Já
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-primary-foreground p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-primary border-t border-secondary/20 py-4 animate-fade-in">
          <div className="container mx-auto flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors duration-300 font-medium py-3 px-4 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-secondary/20 mt-2 pt-4 px-4 flex flex-col gap-3">
              <Button variant="ghost" size="default" className="w-full justify-start text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <User className="w-4 h-4 mr-2" />
                Área do Cliente
              </Button>
              <Button variant="hero" size="lg" className="w-full">
                Assine Já
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
