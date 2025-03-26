import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Code, FileCode, Layout, Globe, Layers, Search, Workflow } from 'lucide-react';

interface TechnologiesProps {
  className?: string;
}

interface TechItemProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  primaryTech?: boolean;
  index: number;
}

// Hlavní technologie
const technologies = [
  {
    name: 'WordPress',
    description: 'Kompletní řešení webů, vlastní šablony, pluginy a pokročilá konfigurace.',
    icon: <Globe className="w-6 h-6" />,
    primaryTech: true
  },
  {
    name: 'Elementor',
    description: 'Profesionální tvorba stránek s pokročilými funkcemi a optimalizací rychlosti.',
    icon: <Layout className="w-6 h-6" />,
    primaryTech: true
  },
  {
    name: 'React/Next.js',
    description: 'Vývoj moderních, rychlých a interaktivních webových aplikací a SPA.',
    icon: <Code className="w-6 h-6" />,
    primaryTech: true
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework pro rychlý a konzistentní design.',
    icon: <Layers className="w-6 h-6" />,
    primaryTech: true
  },
  {
    name: 'TypeScript',
    description: 'Typově bezpečné programování pro spolehlivé a snadno udržovatelné aplikace.',
    icon: <FileCode className="w-6 h-6" />,
    primaryTech: true
  },
  {
    name: 'SEO & Analytika',
    description: 'Optimalizace pro vyhledávače, sledování a analýza výkonu webů.',
    icon: <Search className="w-6 h-6" />,
    primaryTech: true
  }
];

// Doplňkové technologie
const secondaryTechs = [
  "SQL & Databáze", "Python", "Linux/Windows Server", 
  "Git & Verzování", "UI/UX Design", "Správa serverů",
  "Shadcn UI", "API integrace", "Webová bezpečnost"
];

const TechItem: React.FC<TechItemProps> = ({ icon, name, description, primaryTech = false, index }) => {
  return (
    <div className="group hover-float transition-all duration-500">
      <div className="relative p-5 md:p-6 rounded-xl backdrop-blur-sm border border-ocean-light/10 
        group-hover:border-ocean-light/30 bg-ocean-darker/40 transition-all duration-500 h-full
        overflow-hidden shadow-xl">
        
        {/* Světelný efekt v pozadí */}
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-ocean-light/10 opacity-0 
          group-hover:opacity-100 rounded-full blur-xl transition-opacity duration-500"></div>
        
        {/* Horní linka */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-ocean-light/0 
          via-ocean-light/40 to-ocean-light/0 opacity-60"></div>
        
        {/* Pozadí karty */}
        <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
        <div className="absolute inset-0 bg-noise opacity-5"></div>
        
        <div className="relative">
          {/* Ikona & Název */}
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg
              bg-ocean-dark border border-ocean-light/20 text-ocean-light 
              group-hover:text-gold group-hover:border-gold/40 transition-all duration-500">
              {icon}
            </div>
            <h3 className="ml-3 text-lg font-mono font-bold text-white/90 
              group-hover:text-gold transition-colors duration-300">{name}</h3>
          </div>
          
          {/* Popis */}
          <p className="text-white/70 text-sm font-mono">{description}</p>
        </div>
      </div>
    </div>
  );
};

const SecondaryTechItem: React.FC<{name: string, index: number}> = ({ name, index }) => {
  return (
    <div className="transition-all duration-500">
      <div className="flex items-center p-2.5 hover:bg-ocean-light/5 rounded-lg transition-colors duration-300 group">
        <div className="w-2 h-2 rounded-full bg-ocean-light group-hover:bg-gold transition-colors duration-300"></div>
        <span className="ml-2.5 text-white/80 font-mono text-sm group-hover:text-gold/90 transition-colors duration-300">{name}</span>
      </div>
    </div>
  );
};

const Technologies: React.FC<TechnologiesProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      id="technologies" 
      ref={sectionRef}
      className={cn(
        "py-20 md:py-28 relative overflow-hidden",
        className
      )}
    >
      {/* Gradient pozadí s ocean tematickou */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-dark via-ocean-darker to-ocean-dark"></div>
      
      {/* Modrá mřížka v pozadí */}
      <div className="absolute inset-0 bg-cyber-grid-blue opacity-15 pointer-events-none"></div>
      
      {/* Šumový efekt pro texturovaný vzhled */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
      
      {/* Vodní efekty a bubliny */}
      <div className="bubble-container">
        {Array.from({ length: 10 }).map((_, i) => (
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
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-wave-blue/15 rounded-full filter blur-3xl"></div>
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-gold/8 rounded-full filter blur-3xl"></div>
      
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
          <h2 className="terminal-section-title inline-block sea-waves-border">
            tech --stack
          </h2>
          <p className="max-w-2xl mx-auto subtitle-text">
            # Technologie, které používám pro digitální kormidlování
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Hlavní technologie */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {technologies.map((tech, index) => (
              <TechItem
                key={tech.name}
                icon={tech.icon}
                name={tech.name}
                description={tech.description}
                primaryTech={tech.primaryTech}
                index={index}
              />
            ))}
          </div>
          
          {/* Další technologie - minimalistický layout */}
          <div className="mt-16 md:mt-20">
            <div className="border border-ocean-light/10 rounded-xl p-6 bg-ocean-darker/40 backdrop-blur-sm shadow-lg overflow-hidden relative">
              {/* Animovaný gradient v pozadí */}
              <div className="absolute -top-60 -left-60 w-96 h-96 bg-wave-blue/10 rounded-full filter blur-3xl animate-slow-pulse"></div>
              
              <div className="relative">
                <h3 className="text-xl font-mono font-bold mb-5 text-white/90 sea-waves-border inline-block">
                  <Workflow className="inline-block mr-2 text-ocean-light" size={18} />
                  Další technické dovednosti
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                  {secondaryTechs.map((tech, index) => (
                    <SecondaryTechItem key={tech} name={tech} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
