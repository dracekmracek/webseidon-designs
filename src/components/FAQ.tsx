import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import WaveAnimation from './WaveAnimation';

interface FAQProps {
  className?: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
  delay?: number;
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ 
  question, 
  answer, 
  delay = 0,
  index,
  activeIndex,
  setActiveIndex
}) => {
  const isActive = activeIndex === index;
  
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  
  useEffect(() => {
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          setHeight(entry.contentRect.height);
        }
      });
      
      resizeObserver.observe(contentRef.current);
      
      return () => {
        if (contentRef.current) {
          resizeObserver.unobserve(contentRef.current);
        }
      };
    }
  }, []);

  const toggleAccordion = () => {
    setActiveIndex(isActive ? null : index);
  };

  return (
    <div 
      className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 border-b border-ocean-light/10 last:border-b-0"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        className="w-full flex justify-between items-center py-5 text-left focus:outline-none group"
        onClick={toggleAccordion}
        aria-expanded={isActive}
      >
        <h3 className="font-mono text-lg font-medium group-hover:text-ocean-light transition-colors duration-300">
          <span className="text-gold font-mono mr-2 text-sm">~/$ man</span>
          {question}
        </h3>
        <div className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center border-2 border-ocean-light/30 transition-transform duration-300 flex-shrink-0 ml-4",
          isActive ? "bg-gold border-gold" : ""
        )}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={cn(
              "w-3 h-3 transition-transform duration-300",
              isActive ? "transform rotate-180 text-ocean-darker" : ""
            )}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>
      <div 
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ 
          maxHeight: isActive ? (height ? `${height}px` : '1000px') : '0px',
          opacity: isActive ? 1 : 0
        }}
      >
        <div ref={contentRef} className="pb-5 pr-10">
          <p className="faq-answer">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC<FAQProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Proč bych si měl nechat udělat webové stránky zrovna u Vás?",
      answer: "Protože nejsem velká firma, která musí platit spousty zaměstnanců, jejich potřeby, služební auta, nákladný software pro firmy, účetní apod.. Díky tomuto a mým zkušenostem jsem schopný srazit cenu a poskytnout kvalitní služby, stejně jako tyto velké firmy."
    },
    {
      question: "Mohu si dát tvojí fakturu do nákladů?",
      answer: "Ano, ikdyž nejsem plátcem DPH, tak si můžeš dát mou fakturu do nákladu. Pouze se z ní neodvádí žádné DPH, ale o to mám taky sníženou cenu, aby byl každý spokojen."
    },
    {
      question: "V čem vytváříte webové stránky?",
      answer: "Pro tvorbu mých webů používám převážně CMS WordPress s pluginem Elementor. Tohle je základ mé tvorby. Další pluginy jsou individuální."
    },
    {
      question: "Mohu si sám potom měnit informace na webu?",
      answer: "Ano, pokud budete chtít, naučím Vás základy používání webu a můžeš si na něm cokoliv měnit, včetně textů, obrázků, ale i grafiky, velikosti textů apod."
    },
    {
      question: "Jsem úplný amatér, potřeboval bych vše vysvětlit od začátku až do konce, je to možné?",
      answer: "Ano, mohu Vám vše vysvětlit. Daleko jednodušší je ale podívat se na můj blog, kde je většina práce vysvětlena."
    },
    {
      question: "Můžeme se domluvit osobně?",
      answer: "Ano, ale pouze v regionech Ostrava, Opava, Nový Jičín, Odry, Fulnek, Olomouc a jejich okolí."
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

  return (
    <section 
      id="faq" 
      ref={sectionRef}
      className={cn(
        "py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-ocean-darker to-ocean-dark",
        className
      )}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 terminal-section-title inline-block">
            man webseidon-faq
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto subtitle-text">
            <span className="text-terminal-yellow">cat</span> často_kladené_dotazy.md <span className="text-terminal-red">|</span> <span className="text-terminal-green">less</span>
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-ocean-dark/60 backdrop-blur-sm rounded-xl border border-ocean-light/20 p-6 md:p-8">
            {faqItems.map((item, index) => (
              <FAQItem 
                key={index}
                question={item.question}
                answer={item.answer}
                delay={index * 100}
                index={index}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>
          
          <div className="mt-10 text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700" style={{ transitionDelay: `${faqItems.length * 100 + 100}ms` }}>
            <div className="inline-block p-6 rounded-lg bg-terminal-black backdrop-blur-md border border-terminal-green/30">
              <p className="text-terminal-white font-mono text-base">
                <span className="text-terminal-green mr-2">$</span>
                <span className="text-terminal-cyan font-bold">Máte další otázky?</span>
                <a href="#contact" className="ml-2 text-terminal-yellow hover:text-terminal-green transition-colors">
                  Kontaktujte mě pro detailní odpovědi
                </a>
                <span className="blink-cursor ml-1"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default FAQ;
