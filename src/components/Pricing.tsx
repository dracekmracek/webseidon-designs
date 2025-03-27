import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import WaveAnimation from './WaveAnimation';

interface PricingProps {
  className?: string;
}

interface PricingTierProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  delay?: number;
}

const PricingTier: React.FC<PricingTierProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  popular = false,
  delay = 0
}) => {
  return (
    <div 
      className={cn(
        "opacity-100 translate-y-0 transition-all duration-700 relative",
        popular ? "transform md:scale-110 md:-translate-y-4 z-10" : ""
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={cn(
        "h-full rounded-xl border transition-all duration-300 overflow-hidden relative bg-ocean-dark/60 backdrop-blur-sm",
        popular 
          ? "border-gold shadow-gold hover:shadow-[0_0_30px_10px_rgba(255,215,0,0.4)] transition-all duration-500" 
          : "border-ocean-light/20 hover:border-ocean-light/50"
      )}>
        {popular && (
          <div className="absolute -top-1 -right-1 z-10">
            <div className="text-xs font-medium bg-gold-gradient text-ocean-darker py-1 px-3 rounded-bl-lg shadow-gold font-bold">
              Nejoblíbenější
            </div>
          </div>
        )}
        
        {popular && (
          <>
            <div className="absolute inset-0 bg-gold/5 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
          </>
        )}
        
        <div className="p-6 md:p-8 flex flex-col h-full">
          <div className="mb-6">
            <h3 className={cn(
              "text-xl font-serif font-bold",
              popular ? "text-gold-shimmer" : "text-terminal-green"
            )}>
              {title}
            </h3>
            <div className="mt-4 flex items-baseline">
              <span className={cn(
                "text-3xl md:text-4xl font-bold", 
                popular ? "text-gold" : "text-terminal-white"
              )}>
                {price}
              </span>
              {price !== "Na míru" && <span className="ml-1 text-terminal-cyan"></span>}
            </div>
            <p className="mt-2 text-sm text-terminal-white/90">{description}</p>
          </div>
          
          <ul className="space-y-3 font-mono text-sm mb-8 flex-grow terminal-list text-terminal-white/90">
            {features.map((feature, index) => (
              <li key={index}>
                {feature}
              </li>
            ))}
          </ul>
          
          <div className="mt-auto">
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={cn(
                "w-full",
                popular ? "btn-gold" : "btn-terminal"
              )}
            >
              Začít
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pricing: React.FC<PricingProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);

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
      id="pricing" 
      className={cn(
        "py-16 md:py-24 relative overflow-hidden",
        className
      )}
    >
      {/* Vylepšený gradient pozadí ve stylu oceánu */}
      <div className="absolute inset-0 bg-enhanced-gradient"></div>
      
      {/* Futuristická modrá mřížka */}
      <div className="absolute inset-0 bg-cyber-grid-blue opacity-10 pointer-events-none"></div>
      
      {/* Jemný šum pro texturu */}
      <div className="absolute inset-0 bg-noise opacity-10"></div>
      
      {/* Glow efekty pro dynamiku a hloubku */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-wave-blue/10 filter blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-wave-blue/15 filter blur-3xl"></div>
      <div className="absolute top-1/3 left-0 w-64 h-64 rounded-full bg-gold/5 filter blur-3xl"></div>
      
      {/* Vznášející se částice */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 5}s`,
              backgroundColor: i % 3 === 0 ? 'rgba(255, 215, 0, 0.3)' : 'rgba(93, 169, 233, 0.3)',
              boxShadow: i % 3 === 0 
                ? '0 0 8px rgba(255, 215, 0, 0.4)' 
                : '0 0 8px rgba(93, 169, 233, 0.4)'
            }}
          />
        ))}
      </div>
      
      {/* Subtilní konstelační efekt */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={`star-${i}`}
            className="absolute h-1 w-1 rounded-full bg-white/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              width: `${Math.max(0.5, Math.random() * 1.5)}px`,
              height: `${Math.max(0.5, Math.random() * 1.5)}px`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="opacity-100 translate-y-0 transition-all duration-700 terminal-section-title inline-block">
            grep -i "ceník" | sort
          </h2>
          <p className="opacity-100 translate-y-0 transition-all duration-700 max-w-2xl mx-auto subtitle-text">
            <span className="text-terminal-yellow">sudo</span> CENA/VÝKON řešení pro Váš byznys <span className="text-terminal-magenta">--no-kappa</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          <PricingTier 
            title="Triton"
            price="8 999 Kč"
            description="Nejlevnější řešení pro začínající firmy"
            features={[
              "1 stránka (vizitka)",
              "Doménový Email",
              "Základní SEO",
              "Design, funkce ze šablon",
              "Měsíc následných úprav a služeb",
              "V ceně doména včetně hostingu"
            ]}
            delay={0}
          />
          
          <PricingTier 
            title="Siréna"
            price="11 999 Kč"
            description="Cena/výkon: Ušetříte 20%"
            features={[
              "Až 4 stránky",
              "Vše z Triton balíčku",
              "Pokročilé SEO",
              "Úpravy designu",
              "Základní logo a obrázky na míru",
              "V ceně doména včetně hostingu"
            ]}
            popular={true}
            delay={200}
          />
          
          <PricingTier 
            title="Webseidon"
            price="18 999 Kč"
            description="All in 1 komplexní řešení"
            features={[
              "Až 10 stránek",
              "Vše z balíčku Siréna",
              "Blog, galerie nebo třeba rezervace",
              "Google analytics",
              "Design na přání (ale bez CMS)",
              "V ceně doména včetně hostingu"
            ]}
            delay={400}
          />
        </div>
        
        <div className="mt-16 text-center">
          <div className="opacity-100 translate-y-0 transition-all duration-700 inline-block p-6 rounded-lg bg-terminal-black backdrop-blur-md border border-terminal-green/30 my-12">
            <p className="text-terminal-white font-mono text-base">
              <span className="text-terminal-green mr-2">$</span>K dispozici jsou i <span className="text-terminal-cyan font-bold">měsíční plány údržby:</span>
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          <PricingTier 
            title="Hodinovka"
            price="490 Kč"
            description="Úkony navíc"
            features={[
              "Tvorba loga",
              "SEO & Copywriting",
              "Zálohování a obnova",
              "Design a ostatní funkcionality webu",
              "Fotografování a ostatní"
            ]}
            delay={0}
          />
          
          <PricingTier 
            title="Roční plán"
            price="9 600 Kč"
            description="Cena/výkon: Ušetříte 10%"
            features={[
              "Měsíční zálohování",
              "2h úprav měsíčně",
              "Konzultace 24/7",
              "Optimalizace SEO",
              "Pravidelné aktualizace"
            ]}
            popular={true}
            delay={200}
          />
          
          <PricingTier 
            title="Měsíční plán"
            price="890 Kč"
            description="Flexibilní měsíční podpora"
            features={[
              "Měsíční zálohování",
              "2h úprav a služeb",
              "Konzultace 24/7",
              "Optimalizace SEO",
              "Pravidelné aktualizace"
            ]}
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
