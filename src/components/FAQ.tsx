
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
          <p className="text-foreground/70 font-mono">
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
      question: "What is the typical timeline for a WordPress website project?",
      answer: "A standard WordPress website typically takes 3-6 weeks from start to finish, depending on complexity. Small brochure sites may take as little as 2 weeks, while complex e-commerce or membership sites can take 8-10 weeks. After our initial consultation, I'll provide you with a detailed timeline specific to your project requirements."
    },
    {
      question: "Do you provide ongoing maintenance and support?",
      answer: "Yes, I offer comprehensive maintenance packages that include regular updates, security monitoring, backups, performance optimization, and technical support. Monthly and annual plans are available to ensure your site remains secure, fast, and functioning properly after launch."
    },
    {
      question: "How do you handle website security?",
      answer: "Security is a top priority in all my projects. I implement multiple layers of protection including secure hosting recommendations, SSL certificates, regular core and plugin updates, malware scanning, firewall configuration, strong password policies, and limited login attempts. All sites are also backed up regularly to ensure quick recovery if needed."
    },
    {
      question: "Can you help with migrating an existing WordPress site?",
      answer: "Absolutely! I specialize in smooth WordPress migrations with minimal to no downtime. The process includes transferring all content, images, plugins, themes, and custom functionality to the new server or domain. I'll handle DNS configuration and ensure everything is working correctly after the migration is complete."
    },
    {
      question: "Do you develop custom WordPress plugins?",
      answer: "Yes, I develop custom WordPress plugins tailored to specific business requirements. When existing plugins don't provide the functionality you need, a custom solution ensures you get exactly what your business requires without unnecessary bloat or compatibility issues. All custom plugins are built following WordPress best practices and are fully documented."
    },
    {
      question: "What payment methods do you accept?",
      answer: "I accept various payment methods including credit/debit cards, PayPal, bank transfers, and cryptocurrency. Projects typically require a 50% deposit to begin work, with the remaining balance due upon completion. For larger projects, I offer milestone-based payment schedules to align with project deliverables."
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
        "py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-transparent to-ocean-light/5",
        className
      )}
    >
      <div className="absolute bottom-0 right-0 w-full h-32 bg-wave-pattern bg-repeat-x bg-contain opacity-10 transform rotate-180"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 terminal-section-title inline-block">
            man webseidon-faq
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto text-foreground/80 font-mono">
            <span className="text-terminal-yellow">cat</span> frequently_asked_questions.md <span className="text-terminal-red">|</span> <span className="text-terminal-green">less</span>
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 dark:bg-ocean-darker/60 backdrop-blur-sm rounded-xl border border-ocean-light/20 p-6 md:p-8">
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
            <div className="inline-block p-4 rounded-lg bg-terminal-black/10 backdrop-blur-md border border-gold/10">
              <p className="text-sm text-foreground/80 font-mono">
                <span className="text-terminal-green">$</span> Have more questions? 
                <a href="#contact" className="ml-2 text-gold hover:text-ocean-light transition-colors">
                  Contact me for detailed answers
                </a>
                <span className="animate-type-cursor inline-block w-2 h-4 ml-1 bg-gold align-middle"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <WaveAnimation position="bottom" variant="smooth" />
    </section>
  );
};

export default FAQ;
