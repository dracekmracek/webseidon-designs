import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Code, Terminal, CheckCircle2 } from 'lucide-react';

interface ServicesProps {
  className?: string;
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features, delay = 0 }) => {
  return (
    <div 
      className="opacity-100 translate-y-0 transition-all duration-700"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="group cyber-gradient backdrop-blur-md rounded-lg p-6 border border-ocean-light/10 hover:border-ocean-light/30 shadow-lg hover:shadow-ocean transition-all duration-300 relative h-full hover:scale-[1.02] hover:-translate-y-1 glow-border poseidon-card water-effect">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-noise transition-opacity duration-300"></div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 holographic transition-opacity duration-300"></div>
                
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-md bg-terminal-cyan/10 text-terminal-cyan mr-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold font-mono text-terminal-white sea-waves-border">
            {title}
          </h3>
        </div>
        
        <p className="mb-4 font-mono text-terminal-white/80">
          {description}
        </p>
        
        <ul className="space-y-2 trident-bullet">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm">
              <span className="text-terminal-white/90 font-mono">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Services: React.FC<ServicesProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
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

  // Generování a animace bublin
  useEffect(() => {
    if (!bubblesRef.current) return;
    
    const container = bubblesRef.current;
    const bubbleCount = 15;
    
    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      
      const size = 5 + Math.random() * 20;
      const left = Math.random() * 100;
      const animationDuration = 5 + Math.random() * 10;
      const animationDelay = Math.random() * 5;
      
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.animationDuration = `${animationDuration}s`;
      bubble.style.animationDelay = `${animationDelay}s`;
      
      container.appendChild(bubble);
      
      // Odstraníme bublinu po dokončení animace
      setTimeout(() => {
        bubble.remove();
        createBubble();
      }, (animationDuration + animationDelay) * 1000);
    };
    
    // Vytvoříme iniciální bubliny
    for (let i = 0; i < bubbleCount; i++) {
      setTimeout(() => createBubble(), i * 300);
    }
    
    return () => {
      // Cleanup před odmontováním komponenty
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className={cn(
        "py-16 md:py-24 relative overflow-hidden",
        className
      )}
    >
      {/* Moderní gradient pozadí */}
      <div className="absolute inset-0 bg-enhanced-gradient"></div>
      
      {/* Cyber grid */}
      <div className="absolute inset-0 bg-wavy-grid opacity-10 pointer-events-none"></div>
      
      {/* Šumový texturový overlay */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
      
      {/* Glow efekty */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-ocean-light/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-ocean-light/5 rounded-full filter blur-3xl"></div>
      
      {/* Korálová dekorace na spodní části sekce */}
      <div className="coral-decoration"></div>
      
      {/* Bubliny animace */}
      <div ref={bubblesRef} className="bubble-container"></div>
      
      {/* Whirlpool efekt */}
      <div className="whirlpool absolute top-[10%] right-[10%] opacity-20"></div>
      <div className="whirlpool absolute bottom-[15%] left-[5%] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="opacity-100 translate-y-0 transition-all duration-700 terminal-section-title inline-block ocean-title">
            ls -la ./služby
          </h2>
          <p className="opacity-100 translate-y-0 transition-all duration-700 max-w-2xl mx-auto subtitle-text">
            Poskytované služby přímo na míru Vašim potřebám
          </p>
          <div className="trident-divider my-6"></div>
        </div>  
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M12 2v14M4 9h16M7 3v5M17 3v5" />
              </svg>
            }
            title="Tvorba webových stránek"
            description="Vizitkové weby a střední weby o více stránkách. Designové weby bez CMS"
            features={["Vizitkové weby (Portfolia)", "Střední weby", "Desigonové weby"]}
            delay={0}
          />
          
          <ServiceCard 
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
            title="Redesign webu"
            description="Dejte sbohem starému designu a požádejte o redesign webu na míru, nebo přes Wordpress."
            features={["CMS Wordpress", "Konzultace zdarma", "Proveďme upgrade ještě dnes"]}
            delay={100}
          />
          
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 animate-sea-sway">
                <path d="M12 22c6.23-.05 7.87-5.56 8-10-.13-4.44-1.77-9.95-8-10-6.23.05-7.87 5.56-8 10 .13 4.44 1.77 9.95 8 10z"></path>
                <path d="M12 6C6.82 7 4 10 4 12"></path>
                <path d="M12 6c5.18 1 8 4 8 6"></path>
              </svg>
            }
            title="SEO optimalizace"
            description="Analýza Vašeho webu, následná optimalizace pro organickou dosažitelnost. Základní nastavení Search Engine Optimization je v každém balíčku tvorby webu."
            features={["Analýza", "Následná optimalizace", "Rady a doporučení"]}
            delay={200}
          />
          
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M21 15l-5-5L5 21"></path>
              </svg>
            }
            title="Copywriting"
            description="Copywritingové služby, tvorba blogu a příspěvků pro větší organickou dosažitelnost. Cena služby se odvíjí od hodinového ceníku."
            features={["Copywritingové služby", "Tvorba blogu, příspěvků", "Hodinový ceník"]}
            delay={300}
          />
          
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            }
            title="Tvorba loga"
            description="Navrhnu Vám logo s mnoha variantami. Konečné logo lze taky převést do vektoru. Vektor je nejideálnější formát pro webové stránky."
            features={["Originální logo", "Více formátů", "Základní návrh v každém balíčku"]}
            delay={400}
          />
          
          <ServiceCard 
            icon={
              <Code className="w-8 h-8" />
            }
            title="Podpora a údržba"
            description="Budu Vám po ruce kdykoliv, kdy nastane problém, nebo jen budete chtít něco změnit. Nabízím měsíční i roční podporu pro Váš web."
            features={["Podpora 24/7", "Konzultace zdarma", "Nabízím měsíční i roční podporu pro Váš web"]}
            delay={500}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
