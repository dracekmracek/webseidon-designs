import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import WaveAnimation from './WaveAnimation';
import { Code, Terminal, MessageSquare } from 'lucide-react';

interface TestimonialsProps {
  className?: string;
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  company: string;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  quote, 
  author, 
  company, 
  delay = 0
}) => {
  return (
    <div 
      className="opacity-100 translate-y-0 transition-all duration-700 relative"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative p-6 rounded-xl border border-terminal-green/20 hover:border-terminal-green/40 transition-all duration-300 h-full flex flex-col hover-lift bg-terminal-black/50 backdrop-blur-sm">
        <div className="flex items-center mb-4">
          <div className="flex gap-1.5 mr-auto">
            <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
          </div>
          <div className="text-terminal-white/70 text-xs font-mono">~/feedback/{author.toLowerCase().replace(/\s+/g, '-')}</div>
        </div>
        
        <div className="mb-6">
          <MessageSquare className="text-terminal-green mb-4 h-6 w-6" />
          <div className="font-mono text-sm text-terminal-white mb-2">
            <span className="text-terminal-green">$</span> cat zpetna-vazba.txt
          </div>
          <blockquote className="font-mono text-terminal-cyan border-l-2 border-terminal-green/30 pl-4 py-1 text-sm">
            {quote}
          </blockquote>
        </div>
        
        <div className="mt-auto pt-4 border-t border-terminal-green/10">
          <div className="font-mono text-sm">
            <span className="text-terminal-yellow">@{author}</span> <span className="text-terminal-white/50">~</span> <span className="text-terminal-cyan">{company}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC<TestimonialsProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalTestimonials = 3;

  const testimonials = [
    {
      quote: "Spolupráce s Webseidon znamenala revoluci pro naše podnikání. Jejich pozornost k detailům a technická odbornost přeměnily naše zastaralé webové stránky na mocný prodejní nástroj, který naši zákazníci milují.",
      author: "Š. Jindřich",
      company: ""
    },
    {
      quote: "WordPress stránky, které vytvořili, předčily všechna naše očekávání. Vlastní funkce a e-commerce integrace fungují bezchybně a od spuštění jsme zaznamenali nárůst online prodejů o 40 %.",
      author: "D. Ondřej",
      company: ""
    },
    {
      quote: "Responzivní, kreativní a technicky brilantní. Jejich hluboké pochopení WordPressu a důraz na optimalizaci výkonu nám přinesly web, který se načítá bleskovou rychlostí a efektivně konvertuje návštěvníky.",
      author: "V. Adam",
      company: ""
    }
  ];

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

  // Auto-rotate testimonials pro mobilní verzi
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % totalTestimonials);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className={cn(
        "py-16 md:py-24 relative overflow-hidden",
        className
      )}
    >
      {/* Vylepšený gradient pozadí se seamless přechodem pro plynulost */}
      <div className="absolute inset-0 bg-enhanced-gradient"></div>
      
      {/* Modrá mřížka pro technologický vzhled */}
      <div className="absolute inset-0 bg-cyber-grid-blue opacity-10 pointer-events-none"></div>
      
      {/* Jemný šumový overlay */}
      <div className="absolute inset-0 bg-noise opacity-10"></div>
      
      {/* Glow efekty pro větší hloubku a vrstvy */}
      <div className="absolute left-0 top-1/4 w-80 h-80 bg-wave-blue/15 rounded-full filter blur-3xl"></div>
      <div className="absolute right-0 top-1/3 w-72 h-72 bg-wave-blue-light/10 rounded-full filter blur-3xl"></div>
      <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-gold/10 rounded-full filter blur-3xl"></div>
      <div className="absolute right-1/4 top-0 w-64 h-64 bg-ocean-light/8 rounded-full filter blur-3xl"></div>
      
      {/* Korálová dekorace na spodní části sekce */}
      <div className="coral-decoration"></div>
      
      {/* Jemný světelný prach - ambientní částice */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.max(1, Math.random() * 2)}px`,
              height: `${Math.max(1, Math.random() * 2)}px`,
              backgroundColor: i % 4 === 0 
                ? 'rgba(255, 215, 0, 0.3)' 
                : 'rgba(93, 169, 233, 0.3)',
              boxShadow: i % 4 === 0 
                ? '0 0 6px rgba(255, 215, 0, 0.5)' 
                : '0 0 6px rgba(93, 169, 233, 0.5)',
              opacity: 0.6 + Math.random() * 0.4,
              animation: `pulse-glow ${3 + Math.random() * 4}s ease-in-out infinite`
            }}
          />
        ))}
      </div>
      
      {/* Dynamický světelný paprsek */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-40 h-[200%] rotate-45 opacity-10"
          style={{
            top: '-50%',
            left: '30%',
            background: 'linear-gradient(90deg, transparent, rgba(93, 169, 233, 0.4), transparent)',
            animation: 'wave-flow 20s linear infinite'
          }}
        ></div>
        <div 
          className="absolute w-20 h-[200%] rotate-45 opacity-5"
          style={{
            top: '-50%',
            left: '60%',
            background: 'linear-gradient(90deg, transparent, rgba(93, 169, 233, 0.5), transparent)',
            animation: 'wave-flow 15s linear infinite reverse'
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="opacity-100 translate-y-0 transition-all duration-700 terminal-section-title inline-block">
            tail -f /klienti/zpětná-vazba.log
          </h2>
          {/*  <p className="opacity-100 translate-y-0 transition-all duration-700 max-w-2xl mx-auto subtitle-text">
            <span className="text-terminal-green">echo</span> "Co o našich službách říkají klienti" <span className="text-terminal-red">|</span> <span className="text-terminal-cyan">more</span>
          </p>*/}
        </div>

        <div className="opacity-100 translate-y-0 transition-all duration-700">
          {/* Desktop version - grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index} 
                {...testimonial} 
                delay={index * 200}
              />
            ))}
          </div>
          
          {/* Mobile version - carousel */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <TestimonialCard {...testimonial} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    index === activeIndex 
                      ? "bg-terminal-green w-8" 
                      : "bg-terminal-green/30 hover:bg-terminal-green/50"
                  )}
                  aria-label={`Přejít na recenzi ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <WaveAnimation position="bottom" variant="choppy" waveColor="rgba(93, 169, 233, 0.4)" />
    </section>
  );
};

export default Testimonials;
