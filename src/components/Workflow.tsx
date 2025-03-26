import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Code, FileCode, Layout, Check, RefreshCw, Zap, Anchor, Ship, Compass, Map, Navigation } from 'lucide-react';

interface WorkflowProps {
  className?: string;
}

interface WorkflowStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  commandLine: string;
  number: number;
  delay?: number;
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({ icon, title, description, commandLine, number, delay = 0 }) => {
  return (
    <div 
      className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 relative group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
        <div className="relative flex-shrink-0 self-center md:self-start mb-4 md:mb-0">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-ocean-darker border-2 border-ocean-light/40 text-ocean-light group-hover:text-gold group-hover:border-gold/60 transition-all duration-500 shadow-lg shadow-ocean-light/10">
            {icon}
            <div className="absolute inset-0 rounded-full bg-cyber-grid opacity-20"></div>
            <div className="absolute -inset-1 bg-ocean-light/10 rounded-full blur-md group-hover:bg-gold/10 transition-colors duration-500"></div>
          </div>
          {number < 5 && (
            <div className="absolute hidden md:block top-full mt-2 left-1/2 transform -translate-x-1/2 h-24 w-0.5">
              <div className="h-full w-full bg-gradient-to-b from-ocean-light/40 to-ocean-light/10 group-hover:from-gold/50 group-hover:to-gold/10 transition-colors duration-500"></div>
              <div className="absolute inset-0 animate-pulse-slow opacity-60 bg-gradient-to-b from-ocean-light/30 to-transparent"></div>
            </div>
          )}
        </div>
        
        <div className="flex-1 bg-ocean-darker/50 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-ocean-light/10 group-hover:border-ocean-light/30 transition-all duration-500 shadow-lg">
          <div className="absolute top-4 md:top-6 right-4 md:right-6 text-ocean-light/30 font-mono text-lg">#{number}</div>
          <h3 className="text-xl font-mono font-bold mb-2 text-white/90 group-hover:text-gold transition-colors duration-300 pr-8">{title}</h3>
          <p className="subtitle-text mb-5 text-white/70 font-mono">{description}</p>
          
          <div className="bg-terminal-black/80 border border-ocean-light/20 group-hover:border-gold/20 rounded-md p-3 font-mono text-sm text-ocean-light relative overflow-hidden transition-all duration-300 overflow-x-auto">
            <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-ocean-light/0 via-ocean-light/40 to-ocean-light/0"></div>
            <span className="mr-2 text-gold">$</span>
            <span className="whitespace-pre-wrap break-words">{commandLine}</span>
            <span className="animate-blink ml-1">▌</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Workflow: React.FC<WorkflowProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section 
      id="workflow" 
      ref={sectionRef}
      className={cn(
        "py-24 md:py-32 relative overflow-hidden",
        className
      )}
    >
      {/* Vylepšený gradient pozadí */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-dark via-ocean-darker to-ocean-dark"></div>
      
      {/* Modrá mřížka v pozadí */}
      <div className="absolute inset-0 bg-cyber-grid-blue opacity-15 pointer-events-none"></div>
      
      {/* Šumový efekt pro texturovaný vzhled */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
      
      {/* Vodní efekty a bubliny */}
      <div className="bubble-container">
        {Array.from({ length: 12 }).map((_, i) => (
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
      
      {/* Světelné gradientové efekty */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-wave-blue/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-wave-blue/20 rounded-full filter blur-3xl"></div>
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-gold/10 rounded-full filter blur-3xl"></div>
      
      {/* Dynamické světelné částice */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 7}s`,
              animationDelay: `${Math.random() * 4}s`,
              backgroundColor: i % 3 === 0 
                ? 'rgba(255, 215, 0, 0.3)' 
                : 'rgba(93, 169, 233, 0.3)',
              boxShadow: i % 3 === 0 
                ? '0 0 15px rgba(255, 215, 0, 0.4)' 
                : '0 0 15px rgba(93, 169, 233, 0.4)'
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 terminal-section-title inline-block sea-waves-border">
            cd ../workflow
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto subtitle-text">
            # Jak bude probíhat naše společná plavba
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-20">
          <WorkflowStep 
            icon={<Anchor size={28} />}
            title="START - Zadání kurzu"
            description="Využijte kontaktní formulář k popsání Vašich požadavků nebo dotazů. Společně stanovíme účel webových stránek a určíme směr naší společné plavby."
            commandLine="echo 'Váš požadavek' > kontaktni_formular.txt"
            number={1}
            delay={0}
          />
          
          <WorkflowStep 
            icon={<Map size={28} />}
            title="Mapování Vašeho podnikání"
            description="Obdržíte dotazník pro detailní zmapování Vašeho podnikání. Tyto informace jsou klíčové pro vytvoření webu, který přesně odpovídá Vašim potřebám a cílům."
            commandLine="mkdir podnikani_info && touch podnikani_info/mapa_podniku.md"
            number={2}
            delay={200}
          />
          
          <WorkflowStep 
            icon={<Compass size={28} />}
            title="Navigace - platba první části"
            description="Po shromáždění všech informací a vzájemném odsouhlasení zaplatíte 50% ceny projektu. Tyto prostředky pokryjí počáteční náklady jako doména a webhosting."
            commandLine="payment --amount '50%' --service 'doména a webhosting'"
            number={3}
            delay={400}
          />
          
          <WorkflowStep 
            icon={<Ship size={28} />}
            title="PLAVBA - Realizace projektu"
            description="Nyní začíná samotná tvorba Vašeho webu. Veškeré detaily a časový harmonogram budou předem dohodnuty. Cenovou kalkulaci a očekávanou dobu realizace znáte ještě před zahájením prací."
            commandLine="cd vas_projekt && git init && npm run develop"
            number={4}
            delay={600}
          />
          
          <WorkflowStep 
            icon={<Navigation size={28} />}
            title="PŘÍSTAV - Předání hotového webu"
            description="Na konci cesty Vám předám kompletní web včetně všech přístupových údajů. Po úhradě zbývajících 50% je projekt dokončen. Nabízím také další podporu při správě webu a jeho průběžném vylepšování."
            commandLine="deploy --production && ./predani_projektu.sh"
            number={5}
            delay={800}
          />
        </div>
        
        <div className="text-center mt-20">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 inline-flex items-center bg-gradient-to-r from-ocean-darker to-ocean-dark px-8 py-5 rounded-xl border border-ocean-light/30 shadow-xl shadow-ocean-light/5 group hover:border-gold/30 transition-all duration-500">
            <div className="mr-4 text-ocean-light group-hover:text-gold transition-colors duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v14M4 9h16M7 3v5M17 3v5" />
              </svg>
            </div>
            <p className="font-mono text-base text-white group-hover:text-gold transition-colors duration-500">Jsi připraven vyplout na digitální moře? <span className="animate-blink">▌</span></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
