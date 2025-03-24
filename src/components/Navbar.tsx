import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Terminal, Code } from 'lucide-react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Zpracování události scrollování pro změnu stylu navigační lišty
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 80, // Přizpůsobení pro výšku navigační lišty
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? 
          "py-3 bg-terminal-black/90 dark:bg-ocean-darker/90 backdrop-blur-md border-b border-ocean-light/10 shadow-md" : 
          "py-6 bg-transparent",
        className
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          className="text-2xl font-mono font-bold flex items-center cursor-pointer"
          onClick={() => scrollToSection('hero')}
        >
          <span className="text-terminal-green">Web</span>
          <span className="text-terminal-white">seidon</span>
          <span className="ml-1 text-gold hidden sm:inline text-gold-shimmer">∿≡</span>
        </div>

        {/* Desktopová navigace */}
        <nav className="hidden md:flex items-center space-x-6">
          <button onClick={() => scrollToSection('about')} className="nav-link">O&nbsp;nás</button>
          <button onClick={() => scrollToSection('services')} className="nav-link">Služby</button>
          <button onClick={() => scrollToSection('terminal')} className="nav-link flex items-center">
            <Terminal className="w-3 h-3 mr-1" /> Terminál
          </button>
          <button onClick={() => scrollToSection('workflow')} className="nav-link flex items-center">
            <Code className="w-3 h-3 mr-1" /> Workflow
          </button>
          <button onClick={() => scrollToSection('pricing')} className="nav-link">Ceník</button>
          <button onClick={() => scrollToSection('faq')} className="nav-link">FAQ</button>
          <button onClick={() => scrollToSection('contact')} className="btn-terminal">
            ./kontakt.sh
          </button>
        </nav>

        {/* Tlačítko mobilního menu */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2"
          aria-label="Přepnout menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-terminal-green" />
          ) : (
            <Menu className="w-6 h-6 text-terminal-green" />
          )}
        </button>
      </div>

      {/* Mobilní menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-terminal-black/95 dark:bg-ocean-darker/95 backdrop-blur-md transition-all duration-300 overflow-hidden shadow-md border-b border-ocean-light/10",
        isMobileMenuOpen ? "max-h-screen py-4" : "max-h-0 py-0"
      )}>
        <div className="container px-4 mx-auto flex flex-col space-y-4">
          <button onClick={() => scrollToSection('about')} className="text-left py-2 font-mono text-terminal-white hover:text-terminal-green transition-colors">O nás</button>
          <button onClick={() => scrollToSection('services')} className="text-left py-2 font-mono text-terminal-white hover:text-terminal-green transition-colors">Služby</button>
          <button onClick={() => scrollToSection('terminal')} className="text-left py-2 font-mono text-terminal-white hover:text-terminal-green transition-colors flex items-center">
            <Terminal className="w-4 h-4 mr-2" /> Terminál
          </button>
          <button onClick={() => scrollToSection('workflow')} className="text-left py-2 font-mono text-terminal-white hover:text-terminal-green transition-colors flex items-center">
            <Code className="w-4 h-4 mr-2" /> Workflow
          </button>
          <button onClick={() => scrollToSection('testimonials')} className="text-left py-2 font-mono text-terminal-white hover:text-terminal-green transition-colors">Reference</button>
          <button onClick={() => scrollToSection('pricing')} className="text-left py-2 font-mono text-terminal-white hover:text-terminal-green transition-colors">Ceník</button>
          <button onClick={() => scrollToSection('blog')} className="text-left py-2 font-mono text-terminal-white hover:text-terminal-green transition-colors">Blog</button>
          <button onClick={() => scrollToSection('faq')} className="text-left py-2 font-mono text-terminal-white hover:text-terminal-green transition-colors">FAQ</button>
          <button onClick={() => scrollToSection('contact')} className="btn-terminal w-full mb-2">
            ./kontakt.sh
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
