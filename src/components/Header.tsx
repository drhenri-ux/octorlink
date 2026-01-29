import { Button } from "@/components/ui/button";
import { Menu, X, User, Gift } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoWhite from "@/assets/logo-white.webp";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const { data: siteSettings } = useSiteSettings();

  const navLinks = [
    { label: "Início", href: "#inicio", sectionId: "inicio", type: "scroll" },
    { label: "Planos", href: "#planos", sectionId: "planos", type: "scroll" },
    { label: "Empresa", href: "/internet-empresarial", sectionId: "", type: "link" },
    { label: "Contato", href: "#contato", sectionId: "contato", type: "scroll" },
  ];

  const scrollToSection = (sectionId: string) => {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPlans = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHomePage) {
      scrollToSection("planos");
    } else {
      navigate("/#planos");
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    if (link.type === "link") {
      // Let the Link component handle navigation
      setIsMenuOpen(false);
      return;
    }
    
    e.preventDefault();
    if (isHomePage) {
      scrollToSection(link.sectionId);
    } else {
      navigate(`/#${link.sectionId}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-secondary/20">
      <div className="container mx-auto flex items-center justify-between py-3 md:py-4">
        <a href="/" className="flex items-center" onClick={(e) => { e.preventDefault(); isHomePage ? scrollToSection("inicio") : navigate("/"); }}>
          <img src={logoWhite} alt="Octorlink" className="h-8 md:h-10" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            link.type === "link" ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 font-medium text-sm"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 font-medium text-sm"
              >
                {link.label}
              </a>
            )
          ))}
          {siteSettings?.indique_ganhe_visible && (
            <Link
              to="/indique-e-ganhe"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 font-medium text-sm flex items-center gap-1"
            >
              <Gift className="w-4 h-4" />
              Indique e Ganhe
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            asChild
          >
            <a href="https://31364.ixcsoft.com/central_assinante_web/login" target="_blank" rel="noopener noreferrer">
              <User className="w-4 h-4 mr-2" />
              Área do Cliente
            </a>
          </Button>
          <Button variant="hero" size="default" onClick={scrollToPlans}>
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
              link.type === "link" ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors duration-300 font-medium py-3 px-4 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors duration-300 font-medium py-3 px-4 rounded-lg"
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link.label}
                </a>
              )
            ))}
            {siteSettings?.indique_ganhe_visible && (
              <Link
                to="/indique-e-ganhe"
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors duration-300 font-medium py-3 px-4 rounded-lg flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Gift className="w-4 h-4" />
                Indique e Ganhe
              </Link>
            )}
            <div className="border-t border-secondary/20 mt-2 pt-4 px-4 flex flex-col gap-3">
              <Button 
                variant="ghost" 
                size="default" 
                className="w-full justify-start text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <a href="https://31364.ixcsoft.com/central_assinante_web/login" target="_blank" rel="noopener noreferrer">
                  <User className="w-4 h-4 mr-2" />
                  Área do Cliente
                </a>
              </Button>
              <Button variant="hero" size="lg" className="w-full" onClick={scrollToPlans}>
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
