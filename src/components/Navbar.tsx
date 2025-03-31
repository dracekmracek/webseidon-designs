import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Terminal } from 'lucide-react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    setIsInitialRender(false);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50",
    !isInitialRender ? "transition-all duration-300" : "",
    isScrolled ? 
      "py-3 bg-terminal-black/90 dark:bg-ocean-darker/90 backdrop-blur-md border-b border-ocean-light/10 shadow-md" : 
      "py-6 bg-transparent",
    className
  );

  return (
    <header className={headerClasses}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          className="text-2xl font-display font-bold flex items-center cursor-pointer group"
          onClick={() => {
            setIsMenuOpen(false);
            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="relative mr-3 transition-transform duration-300 group-hover:scale-110">
            <img 
              src="/icons/favicon-512x512.png" 
              alt="Webseidon Logo" 
              className="w-10 h-10 rounded-lg shadow-glow"
            />
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-tr from-ocean-light via-gold to-ocean-light opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>
          </div>
          
          <div className="flex items-center">
            <span className="text-gold">Web</span>
            <span className="text-ocean-light">seidon</span>
            
            <div className="hidden md:flex ml-2 items-center overflow-hidden h-6">
              <div className="flex items-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                <span className="mx-1 text-ocean-light text-xs">|</span>
                <span className="text-xs font-mono text-terminal-cyan">digitální</span>
                <span className="text-xs font-mono text-gold ml-1">bůh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktopová navigace */}
        <nav className="hidden nav:flex items-center space-x-6">
          <button onClick={() => scrollToSection('services')} className="nav-link flex items-center sea-waves-border">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
            Služby
          </button>
          <button onClick={() => scrollToSection('projects')} className="nav-link flex items-center sea-waves-border">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <path d="M21 15l-5-5L5 21"></path>
            </svg>
            Projekty
          </button>
          <button onClick={() => scrollToSection('workflow')} className="nav-link flex items-center sea-waves-border">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
              <path d="M12 2v14M4 9h16M7 3v5M17 3v5"></path>
            </svg>
            Workflow
          </button>
          <button onClick={() => scrollToSection('pricing')} className="nav-link flex items-center sea-waves-border">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            Ceník
          </button>
          <button onClick={() => scrollToSection('faq')} className="nav-link flex items-center sea-waves-border">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="9.09" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="14.96" y2="9"></line>
              <line x1="9" y1="13" x2="15" y2="13"></line>
            </svg>
            FAQ
          </button>
          <a 
            href="https://blog.webseidon.cz" 
            className="nav-link flex items-center sea-waves-border"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Blog
          </a>
          <button onClick={() => scrollToSection('contact')} className="btn-terminal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
              <path d="M12 2v14M4 9h16M7 3v5M17 3v5" />
            </svg>
            ./kontakt.sh
          </button>
        </nav>

        {/* Tlačítko mobilního menu */}
        <button 
          onClick={toggleMenu}
          className="nav:hidden flex items-center justify-center p-2 rounded-md hover:bg-ocean-darker/50 transition-all duration-300"
          aria-label="Přepnout menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-terminal-green" />
          ) : (
            <Menu className="w-6 h-6 text-terminal-green" />
          )}
        </button>
      </div>

      {/* Nové mobilní menu */}
      <div
        className={cn(
          "fixed inset-0 nav:hidden z-50",
          "bg-terminal-black/99 backdrop-blur-xl",
          "transform transition-all duration-300 ease-in-out",
          "h-screen h-[100dvh] overflow-hidden",
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <div className="h-full flex flex-col max-w-[100vw] overflow-hidden">
          {/* Horní lišta s logem a zavíracím tlačítkem */}
          <div className="flex items-center justify-between p-6 border-b border-terminal-green/20 bg-terminal-black/90 backdrop-blur-lg">
            <div className="flex items-center">
              <img 
                src="/icons/favicon-512x512.png" 
                alt="Webseidon Logo" 
                className="w-10 h-10 rounded-lg shadow-glow"
              />
              <div className="ml-4">
                <span className="text-gold text-xl font-display font-bold">Web</span>
                <span className="text-ocean-light text-xl font-display font-bold">seidon</span>
              </div>
            </div>
            <button 
              onClick={toggleMenu}
              className="p-2 hover:bg-terminal-green/10 rounded-lg transition-colors"
            >
              <X className="w-7 h-7 text-terminal-green" />
            </button>
          </div>

          {/* Menu položky */}
          <div className="flex-1 overflow-y-auto py-8 px-6 scrollbar-hide bg-terminal-black/95">
            <div className="space-y-4">
              {[
                { id: 'services', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', text: 'Služby' },
                { id: 'projects', icon: 'M3 3h18v18H3V3zm16 16V5H5v14h14zM8.5 8.5h7v7h-7v-7zM21 15l-5-5L5 21', text: 'Projekty' },
                { id: 'workflow', icon: 'M12 2v14M4 9h16M7 3v5M17 3v5', text: 'Workflow' },
                { id: 'pricing', icon: 'M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z', text: 'Ceník' },
                { id: 'faq', icon: 'M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10z M9.09 9h.01 M15 9h.04 M9 13h6', text: 'FAQ' },
                { id: 'blog', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z', text: 'Blog', isLink: true, url: 'https://blog.webseidon.cz' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (!item.isLink) {
                      scrollToSection(item.id);
                    } else if (item.url) {
                      window.open(item.url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className={cn(
                    "w-full flex items-center p-5 rounded-xl",
                    "text-terminal-white hover:text-terminal-green",
                    "bg-terminal-black/80 hover:bg-terminal-green/20",
                    "transition-all duration-300",
                    "border border-terminal-green/20 hover:border-terminal-green/40",
                    "backdrop-blur-sm",
                    "transform hover:-translate-y-0.5 active:translate-y-0"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-4">
                    <path d={item.icon}></path>
                  </svg>
                  <span className="text-xl font-mono">{item.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Kontaktní tlačítko */}
          <div className="p-6 border-t border-terminal-green/20 bg-terminal-black/90 backdrop-blur-lg">
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full py-4 px-6 bg-terminal-green/20 hover:bg-terminal-green/30 text-terminal-green border border-terminal-green/30 rounded-xl flex items-center justify-center font-mono text-lg transition-all duration-300 backdrop-blur-sm transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Terminal className="w-6 h-6 mr-3" />
              <span>./kontakt.sh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Přidáváme dekorativní vodní prvky v pozadí navigace */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none" style={{ height: '5px' }}>
        <div className="w-full h-full bg-wave-dots"></div>
      </div>
    </header>
  );
};

export default Navbar;
