import React from 'react';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Code, Terminal, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      "relative bg-ocean-darkest overflow-hidden pt-16 pb-8",
      className
    )}>
      {/* Pozadí a efekty */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>
      
      {/* Vodní efekty */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ocean-light/0 via-ocean-light/50 to-ocean-light/0"></div>
      
      {/* Bubliny */}
      <div className="bubble-container">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              width: `${5 + Math.random() * 15}px`,
              height: `${5 + Math.random() * 15}px`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 7}s`
            }}
          />
        ))}
      </div>
      
      {/* Whirlpool efekt */}
      <div className="whirlpool absolute bottom-[10%] right-[5%] opacity-15" style={{ width: '100px', height: '100px' }}></div>
      
      {/* Logo a hlavní obsah */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <div className="relative mr-3">
                <img 
                  src="/icons/favicon-512x512.png" 
                  alt="Webseidon Logo" 
                  className="w-10 h-10 rounded-lg shadow-glow"
                />
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-tr from-ocean-light via-gold to-ocean-light opacity-20 blur-sm"></div>
              </div>
              <div className="text-2xl font-display font-bold">
                <span className="text-gold">Web</span>
                <span className="text-ocean-light">seidon</span>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-5 font-mono">
              Webové stránky pro moderní podnikání, firmy a živnostníky, které se chtějí prosadit na internetu.
            </p>
            <div className="flex space-x-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-ocean-dark hover:bg-ocean-medium text-ocean-light w-8 h-8 flex items-center justify-center rounded-md transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-ocean-dark hover:bg-ocean-medium text-ocean-light w-8 h-8 flex items-center justify-center rounded-md transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-ocean-dark hover:bg-ocean-medium text-ocean-light w-8 h-8 flex items-center justify-center rounded-md transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-ocean-dark hover:bg-ocean-medium text-ocean-light w-8 h-8 flex items-center justify-center rounded-md transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 sea-waves-border ocean-title">Služby</h3>
            <ul className="space-y-2 text-white/70 text-sm trident-bullet">
              <li>Tvorba webových stránek</li>
              <li>Redesign webu</li>
              <li>SEO optimalizace</li>
              <li>Copywriting</li>
              <li>Tvorba loga</li>
              <li>Konzultace</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 sea-waves-border ocean-title">Užitečné odkazy</h3>
            <ul className="space-y-2 text-white/70 text-sm trident-bullet">
              <li><a href="#services" className="hover:text-ocean-light transition-colors">Služby</a></li>
              <li><a href="#projects" className="hover:text-ocean-light transition-colors">Portfolio</a></li>
              <li><a href="#testimonials" className="hover:text-ocean-light transition-colors">Reference</a></li>
              <li><a href="#faq" className="hover:text-ocean-light transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-ocean-light transition-colors">Kontakt</a></li>
              <li><a href="https://webseidon-blog.cz" target="_blank" rel="noopener noreferrer" className="hover:text-ocean-light transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 sea-waves-border ocean-title">Kontakt</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-ocean-light">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+420 776 211 336</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-ocean-light">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>info@webseidon.cz</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-ocean-light">
                  <path d="M12 2v14M4 9h16M7 3v5M17 3v5" />
                </svg>
                <span>IČO: 21965684</span>
              </li>
              <li className="mt-4">
                <a 
                  href="#contact" 
                  className="px-4 py-2 bg-ocean-medium hover:bg-ocean-light text-white rounded-md inline-flex items-center text-sm transition-colors water-effect"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                    <path d="M12 2v14M4 9h16M7 3v5M17 3v5" />
                  </svg>
                  Kontaktujte nás
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Linka oddělující horní část od copyright zápatí */}
        <div className="trident-divider"></div>
        
        {/* Copyright section */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Webseidon. Všechna práva vyhrazena.
          </p>
          <div className="mt-2 flex justify-center space-x-4 text-white/60 text-xs">
            <Link to="/privacy-policy" className="hover:text-ocean-light transition-colors">Zásady ochrany osobních údajů</Link>
            <Link to="/terms-of-use" className="hover:text-ocean-light transition-colors">Podmínky užití</Link>
            <Link to="/cookies" className="hover:text-ocean-light transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
      
      {/* Dekorativní prvky v pozadí */}
      <div className="absolute bottom-0 right-10 opacity-10">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-36 h-36 text-ocean-light transform -rotate-12"
        >
          <path d="M12 2v14M4 9h16M7 3v5M17 3v5" />
        </svg>
      </div>
      
      <div className="coral-decoration"></div>
    </footer>
  );
};

export default Footer;
