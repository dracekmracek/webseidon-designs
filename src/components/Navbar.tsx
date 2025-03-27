import React, { useState, useEffect, useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Terminal, Code, PhoneCall } from 'lucide-react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [activeHash, setActiveHash] = useState('');
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Vytvoření statických bublin pomocí useMemo, aby se nemohly měnit mezi rendery
  const bubbles = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => {
      const randomSize = 10 + Math.random() * 20;
      const randomLeft = Math.random() * 100;
      const randomDelay = Math.random() * 5;
      const randomDuration = 5 + Math.random() * 7;
      
      return (
        <div
          key={`bubble-${i}`}
          className="bubble"
          style={{
            width: `${randomSize}px`,
            height: `${randomSize}px`,
            left: `${randomLeft}%`,
            animationDelay: `${randomDelay}s`,
            animationDuration: `${randomDuration}s`
          }}
        />
      );
    });
  }, []); // Prázdné závislosti - vytvoří se pouze jednou

  // Odstranění event listeneru když komponenta unmount a nastavení počátečního stavu
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Nastavíme isInitialRender na false po prvním renderu
    setIsInitialRender(false);
    
    // Okamžitě zkontrolujeme pozici scrollu
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Vždy obnovit scrollování při unmount
      document.body.classList.remove('mobile-menu-open');
    };
  }, []); // Závislosti jsou prázdné - spustí se pouze jednou

  // Bezpečně přepínání menu
  const toggleMobileMenu = (forceState?: boolean) => {
    // Pokud dostaneme explicitní hodnotu, nastavíme ji
    const newState = forceState !== undefined ? forceState : !isMobileMenuOpen;
    
    if (newState) {
      // Otevíráme menu - uložíme aktuální pozici scrollu
      document.body.dataset.scrollY = window.scrollY.toString();
      document.body.classList.add('mobile-menu-open');
      setIsMobileMenuOpen(true);
    } else {
      // Zavíráme menu
      setIsMobileMenuOpen(false);
      document.body.classList.remove('mobile-menu-open');
      
      // Obnovíme uloženou pozici scrollu
      const scrollY = parseInt(document.body.dataset.scrollY || '0');
      window.scrollTo(0, scrollY);
    }
  };

  const scrollToSection = (sectionId: string) => {
    // Najdeme element sekce
    const section = document.getElementById(sectionId);
    
    // Zavřeme menu, pokud je otevřené
    if (isMobileMenuOpen) {
      toggleMobileMenu(false);
      
      // Počkáme na dokončení zavření menu
      requestAnimationFrame(() => {
        // Potom scrollujeme na sekci
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
    } else {
      // Pokud menu není otevřené, scrollujeme přímo
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Stanovíme třídy pro přechody - bez animací při počátečním načtení
  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50",
    // Použít transition jen když už není počáteční render
    !isInitialRender ? "transition-all duration-300" : "",
    isScrolled ? 
      "py-3 bg-terminal-black/90 dark:bg-ocean-darker/90 backdrop-blur-md border-b border-ocean-light/10 shadow-md" : 
      "py-6 bg-transparent",
    className
  );

  return (
    <header className={headerClasses}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo s ikonou */}
        <div 
          className="text-2xl font-display font-bold flex items-center cursor-pointer group"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Pokud je mobilní menu otevřené, nejprve ho zavřeme
            if (isMobileMenuOpen) {
              toggleMobileMenu(false);
              
              // Počkáme, až se menu zavře a pak scrollujeme
              setTimeout(() => {
                const section = document.getElementById('hero');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }, 300);
            } else {
              // Jinak přímo scrollujeme
              const section = document.getElementById('hero');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }
            
            return false;
          }}
        >
          <div className="relative mr-3 transition-transform duration-300 group-hover:scale-110">
            <img 
              src="/icons/favicon-512x512.png" 
              alt="Webseidon Logo" 
              className="w-10 h-10 rounded-lg shadow-glow transition-all duration-300"
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

        {/* Desktopová navigace - změna z xl:hidden na nav:flex pro vlastní breakpoint 1175px */}
        <nav className="hidden nav:flex items-center space-x-6">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const section = document.getElementById('services');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }} 
            className="nav-link flex items-center sea-waves-border"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
            Služby
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const section = document.getElementById('projects');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }} 
            className="nav-link flex items-center sea-waves-border"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <path d="M21 15l-5-5L5 21"></path>
            </svg>
            Projekty
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const section = document.getElementById('workflow');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }} 
            className="nav-link flex items-center sea-waves-border"
          >
            <Code className="w-3 h-3 mr-1" /> Workflow
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const section = document.getElementById('pricing');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }} 
            className="nav-link flex items-center sea-waves-border"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            Ceník
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const section = document.getElementById('faq');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }} 
            className="nav-link flex items-center sea-waves-border"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="9.09" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="14.96" y2="9"></line>
              <line x1="9" y1="13" x2="15" y2="13"></line>
            </svg>
            FAQ
          </button>
          <a 
            href="https://webseidon-blog.cz" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-link flex items-center sea-waves-border" 
            onClick={(e) => e.stopPropagation()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Blog
          </a>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const section = document.getElementById('contact');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }} 
            className="btn-terminal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
              <path d="M12 2v14M4 9h16M7 3v5M17 3v5" />
            </svg>
            ./kontakt.sh
          </button>
        </nav>

        {/* Tlačítko mobilního menu - změna z xl:hidden na nav:hidden pro vlastní breakpoint 1175px */}
        <button 
          onClick={(e) => {
            e.preventDefault(); // Zabráníme výchozímu chování
            e.stopPropagation(); // Zabráníme probublávání
            
            // Otevřeme/zavřeme menu
            toggleMobileMenu();
            
            // Zabráníme dalšímu šíření události
            return false;
          }}
          className="nav:hidden flex items-center justify-center p-2 rounded-md hover:bg-ocean-darker/50 transition-all duration-300"
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
      <div
        ref={mobileMenuRef}
        className={cn(
          "fixed inset-0 nav:hidden mobile-menu-height flex flex-col transform transition-all duration-300 ease-in-out z-50",
          isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        )}
        style={{
          backgroundColor: 'rgba(0, 12, 12, 0.98)', // Téměř neprůhledné pozadí
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          overflow: 'hidden',
          overflowX: 'hidden',
          borderLeft: '1px solid rgba(5, 206, 153, 0.2)'
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleMobileMenu(false);
          return false;
        }}
      >
        {/* Hacker efekty */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-terminal-grid opacity-5"></div>
          <div className="absolute inset-0 bg-noise opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-terminal-green/0 via-terminal-green/50 to-terminal-green/0 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-terminal-green/0 via-terminal-green/50 to-terminal-green/0 animate-pulse"></div>
          <div className="bubble-container">
            {bubbles}
          </div>
        </div>

        <div className="h-full flex flex-col" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          {/* Logo */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-terminal-green/20">
            <div 
              className="text-xl sm:text-2xl font-display font-bold flex items-center cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Pouze zavřeme menu bez scrollování
                toggleMobileMenu(false);
              }}
            >
              <div className="relative mr-2 sm:mr-3">
                <img 
                  src="/icons/favicon-512x512.png" 
                  alt="Webseidon Logo" 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg shadow-glow"
                />
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-tr from-ocean-light via-gold to-ocean-light opacity-20 blur-sm"></div>
              </div>
              <span className="text-gold">Web</span>
              <span className="text-ocean-light">seidon</span>
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Pouze zavřeme menu
                toggleMobileMenu(false);
                return false;
              }}
              className="p-2 hover:bg-terminal-green/10 rounded-md transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-terminal-green" />
            </button>
          </div>

          {/* Menu položky - scrollovatelná oblast */}
          <div className="flex-1 overflow-auto flex flex-col justify-center py-4 sm:py-6">
            <div className="w-full p-1 sm:p-2 space-y-3 sm:space-y-6 md:space-y-8">
              {[
                { id: 'services', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', text: 'Služby' },
                { id: 'projects', icon: 'M3 3h18v18H3V3zm16 16V5H5v14h14zM8.5 8.5h7v7h-7v-7zM21 15l-5-5L5 21', text: 'Projekty' },
                { id: 'workflow', icon: 'workflow', text: 'Workflow' },
                { id: 'pricing', icon: 'M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z', text: 'Ceník' },
                { id: 'faq', icon: 'M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10z M9.09 9h.01 M15 9h.04 M9 13h6', text: 'FAQ' },
                { id: 'blog', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z', text: 'Blog', isLink: true }
              ].map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "w-full text-left py-3 sm:py-4 md:py-5 font-mono text-terminal-white hover:text-terminal-green transition-all duration-300 flex items-center group",
                    "transform transition-all duration-500 px-3 sm:px-4 rounded-md hover:bg-terminal-green/5",
                    isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
                    "delay-[100ms]"
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onClick={(e) => e.stopPropagation()} // Zastavit propagaci události
                >
                  <div className="w-1 h-8 sm:h-10 md:h-12 bg-terminal-green/0 group-hover:bg-terminal-green/80 transition-all duration-300 mr-3 sm:mr-4 rounded-full"></div>
                  {item.isLink ? (
                    <a 
                      href="https://webseidon-blog.cz" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center w-full"
                      onClick={(e) => {
                        // Pro externí odkazy nemusíme zabránit výchozímu chování
                        e.stopPropagation();
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mr-2 sm:mr-3 md:mr-4">
                        <path d={item.icon}></path>
                      </svg>
                      <span className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl transition-all">
                        {item.text}
                      </span>
                    </a>
                  ) : (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Nejprve zavřeme menu a uložíme ID sekce
                        const targetSection = item.id;
                        toggleMobileMenu(false);
                        
                        // Počkáme, až se menu zavře, pak scrollujeme
                        setTimeout(() => {
                          const section = document.getElementById(targetSection);
                          if (section) {
                            section.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 300);
                        
                        return false;
                      }} 
                      className="flex items-center w-full"
                    >
                      {item.icon === 'workflow' ? (
                        <Code className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mr-2 sm:mr-3 md:mr-4" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mr-2 sm:mr-3 md:mr-4">
                          <path d={item.icon}></path>
                        </svg>
                      )}
                      <span className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl transition-all">
                        {item.text}
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Kontaktní tlačítko - speciální zvýraznění */}
          <div className={cn(
            "px-6 pb-6 transform transition-all duration-500",
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            "delay-[550ms]"
          )}>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Nejprve zavřeme menu
                toggleMobileMenu(false);
                
                // Počkáme, až se menu zavře, pak scrollujeme
                setTimeout(() => {
                  const section = document.getElementById('contact');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 300);
                
                return false;
              }}
              className="w-full py-3 md:py-4 px-4 md:px-6 bg-terminal-green/10 hover:bg-terminal-green/20 text-terminal-green border border-terminal-green/20 rounded-md flex items-center justify-center font-mono transition-all duration-300 shadow-sm hover:shadow text-sm sm:text-base md:text-xl lg:text-2xl"
            >
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
              <span>./kontakt.sh</span>
            </button>
          </div>

          {/* Sociální sítě - fixní na spodku */}
          <div className={cn(
            "p-6 border-t border-terminal-green/10 transform transition-all duration-500",
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            "delay-[600ms]"
          )}>
            <h3 className="text-sm sm:text-base md:text-lg font-bold mb-4 font-mono text-terminal-green opacity-80">./sledujte_nas.sh</h3>
            <div className="flex space-x-4 justify-center">
              {useMemo(() => [
                { href: 'https://github.com', icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
                { href: 'https://linkedin.com', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z' },
                { href: 'https://instagram.com', icon: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z' },
                { href: 'https://facebook.com', icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' }
              ].map((social, index) => (
                <a
                  key={`social-${index}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md bg-terminal-black border border-terminal-green/20 text-terminal-green/70 hover:bg-terminal-green/10 hover:text-terminal-green transition-all duration-300",
                    "transform transition-all duration-500 hover:border-terminal-green/40",
                    isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                    "delay-[700ms]"
                  )}
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d={social.icon} clipRule="evenodd"></path>
                  </svg>
                </a>
              )), [isMobileMenuOpen])}
            </div>
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
