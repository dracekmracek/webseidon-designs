import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import WaveAnimation from './WaveAnimation';

interface TechnologiesProps {
  className?: string;
}

interface TechStackItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  level: number; // 1-5
  delay?: number;
}

const TechStackItem: React.FC<TechStackItemProps> = ({ 
  icon, 
  title, 
  description, 
  level,
  delay = 0
}) => {
  return (
    <div 
      className="opacity-100 translate-y-0 transition-all duration-700 group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="p-6 rounded-xl bg-ocean-darker/90 backdrop-blur-sm border border-ocean-light/20 hover:border-terminal-cyan/50 transition-all duration-300 hover-lift">
        <div className="flex items-start">
          <div className="mr-4 text-terminal-cyan">{icon}</div>
          <div>
            <h3 className="font-mono text-lg font-medium mb-2 text-terminal-green group-hover:text-gold transition-colors duration-300">{title}</h3>
            <p className="text-white text-sm mb-3">{description}</p>
            <div className="flex items-center">
              <div className="flex-grow h-2 bg-ocean-light/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-terminal-cyan rounded-full transition-all duration-1000 transform origin-left"
                  style={{ 
                    width: `${level * 20}%`, 
                    boxShadow: '0 0 8px rgba(64, 224, 208, 0.7)'
                  }}
                  data-width={`${level * 20}%`}
                ></div>
              </div>
              <span className="ml-3 text-xs font-mono text-terminal-cyan">{level * 20}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Technologies: React.FC<TechnologiesProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          
          // Animate skill bars
          const skillBars = entry.target.querySelectorAll('.bg-terminal-cyan');
          skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width') || '0%';
            (bar as HTMLElement).style.width = width;
          });
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements) {
      animatedElements.forEach(el => {
        observer.observe(el);
      });
    }

    return () => {
      if (animatedElements) {
        animatedElements.forEach(el => {
          observer.unobserve(el);
        });
      }
    };
  }, []);

  // Add animation style
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes skill-bar-fill {
        from { width: 10%; }
        to { width: var(--width, 100%); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section id="technologies" className={cn("py-16 md:py-24 relative overflow-hidden", className)}>
      {/* Ambientní gradient pozadí */}
      <div className="absolute inset-0 bg-deep-ocean"></div>
      
      {/* Subtle constellation background */}
      <div className="absolute inset-0 bg-constellation opacity-20 pointer-events-none"></div>
      
      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise pointer-events-none"></div>
      
      {/* Gradient glow effects */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-ocean-light opacity-10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-ocean-light opacity-10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="terminal-section-title inline-block">
            naše_technologie
          </h2>
          <p className="subtitle-text text-lg mb-4">
            Kombinace technologií pro moderní web
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TechStackItem 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            }
            title="WordPress"
            description="Expertní vývoj s vlastními šablonami, pluginy a pokročilou konfigurací pro optimální výkon a bezpečnost."
            level={5}
            delay={0}
          />
          
          <TechStackItem 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <path d="M3 9h18"></path>
                <path d="M15 3v18"></path>
              </svg>
            }
            title="WooCommerce"
            description="Tvorba vysoce výkonných e-shopů s vlastními průběhy nákupu, platebními bránami a zobrazením produktů."
            level={4.5}
            delay={100}
          />
          
          <TechStackItem 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            }
            title="PHP"
            description="Základní backendový vývoj s odborností v moderních PHP praktikách, vlastních REST API a optimalizaci databází."
            level={4}
            delay={200}
          />
          
          <TechStackItem 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                <line x1="12" y1="22" x2="12" y2="15.5"></line>
                <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
                <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
                <line x1="12" y1="2" x2="12" y2="8.5"></line>
              </svg>
            }
            title="JavaScript / React"
            description="Tvorba interaktivních UI s moderními JavaScript frameworky a knihovnami pro vylepšení uživatelské zkušenosti."
            level={4}
            delay={300}
          />
          
          <TechStackItem 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            }
            title="UI/UX Design"
            description="Návrh intuitivních uživatelských rozhraní se zaměřením na přístupnost, použitelnost a krásnou estetiku."
            level={4.5}
            delay={400}
          />
          
          <TechStackItem 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M18.9 9.4A9 9 0 0 0 9.4 18.9M4.8 14.5C5 11.1 7.4 10.5 9 10.5H10.5"></path>
                <path d="M4.8 9.5C5 6.1 7.4 5.5 9 5.5H10.5"></path>
                <path d="M9.4 5.1A9 9 0 0 1 18.9 14.6"></path>
                <circle cx="7.5" cy="7.5" r=".5"></circle>
                <circle cx="7.5" cy="16.5" r=".5"></circle>
                <circle cx="16.5" cy="7.5" r=".5"></circle>
                <circle cx="16.5" cy="16.5" r=".5"></circle>
              </svg>
            }
            title="Optimalizace výkonu"
            description="Implementace nejlepších postupů pro bleskově rychlé weby se serverovou optimalizací a vyladěním výkonu frontendu."
            level={5}
            delay={500}
          />
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="opacity-100 translate-y-0 transition-all duration-700 col-span-1 md:col-span-3" style={{ transitionDelay: `600ms` }}>
            <div className="p-6 rounded-xl border border-terminal-cyan/30 bg-ocean-darker/90 backdrop-blur-md shadow-glow">
              <h3 className="font-mono text-lg font-medium mb-4 text-terminal-green">Další technická expertiza</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "MySQL / Optimalizace DB", 
                  "SEO & Analytika", 
                  "Responzivní design", 
                  "Webpack / Gulp / Build Tools",
                  "AJAX & REST API", 
                  "CSS / SASS / Tailwind", 
                  "Git verzování",
                  "Správa serverů"
                ].map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-terminal-cyan rounded-full mr-2 shadow-glow-sm"></div>
                    <span className="text-sm font-mono text-white">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
