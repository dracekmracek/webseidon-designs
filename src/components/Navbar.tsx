
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event to change navbar style
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
        top: offsetTop - 80, // Adjust for navbar height
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
          "py-3 bg-white/80 dark:bg-ocean-darker/80 backdrop-blur-md shadow-md" : 
          "py-6 bg-transparent",
        className
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          className="text-2xl font-serif font-bold flex items-center cursor-pointer"
          onClick={() => scrollToSection('hero')}
        >
          <span className="text-gold-dark">Web</span>
          <span className="text-ocean-medium">seidon</span>
          <span className="ml-1 text-gold hidden sm:inline text-gold-shimmer">∿≡</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
          <button onClick={() => scrollToSection('services')} className="nav-link">Services</button>
          <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
          <button onClick={() => scrollToSection('contact')} className="btn-gold">
            Contact
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col space-y-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={cn(
            "w-6 h-0.5 bg-foreground transition-transform duration-300", 
            isMobileMenuOpen && "transform rotate-45 translate-y-2"
          )}></span>
          <span className={cn(
            "w-6 h-0.5 bg-foreground transition-opacity duration-300", 
            isMobileMenuOpen && "opacity-0"
          )}></span>
          <span className={cn(
            "w-6 h-0.5 bg-foreground transition-transform duration-300", 
            isMobileMenuOpen && "transform -rotate-45 -translate-y-2"
          )}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-white/95 dark:bg-ocean-darker/95 backdrop-blur-md transition-all duration-300 overflow-hidden shadow-md",
        isMobileMenuOpen ? "max-h-60 py-4" : "max-h-0 py-0"
      )}>
        <div className="container px-4 mx-auto flex flex-col space-y-4">
          <button onClick={() => scrollToSection('about')} className="text-left py-2 hover:text-ocean-medium transition-colors">About</button>
          <button onClick={() => scrollToSection('services')} className="text-left py-2 hover:text-ocean-medium transition-colors">Services</button>
          <button onClick={() => scrollToSection('projects')} className="text-left py-2 hover:text-ocean-medium transition-colors">Projects</button>
          <button onClick={() => scrollToSection('contact')} className="btn-gold w-full mb-2">
            Contact
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
