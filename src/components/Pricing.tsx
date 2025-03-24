
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
        "animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 relative",
        popular ? "transform md:scale-110 md:-translate-y-4 z-10" : ""
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={cn(
        "h-full rounded-xl border transition-all duration-300 overflow-hidden relative bg-white dark:bg-ocean-darker/60 backdrop-blur-sm",
        popular 
          ? "border-gold shadow-gold" 
          : "border-ocean-light/20 hover:border-ocean-light/50"
      )}>
        {popular && (
          <div className="absolute top-0 right-0">
            <div className="text-xs font-medium bg-gold text-ocean-darker py-1 px-3 rounded-bl-lg">
              Most Popular
            </div>
          </div>
        )}
        
        <div className="p-6 md:p-8 flex flex-col h-full">
          <div className="mb-6">
            <h3 className={cn(
              "text-xl font-serif font-bold",
              popular ? "text-gold" : "text-foreground"
            )}>
              {title}
            </h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl md:text-4xl font-bold">{price}</span>
              {price !== "Custom" && <span className="ml-1 text-muted-foreground">/mo</span>}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
          
          <ul className="space-y-3 font-mono text-sm mb-8 flex-grow terminal-list">
            {features.map((feature, index) => (
              <li key={index}>
                {feature}
              </li>
            ))}
          </ul>
          
          <div className="mt-auto">
            <button className={cn(
              "w-full",
              popular ? "btn-gold" : "btn-terminal"
            )}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pricing: React.FC<PricingProps> = ({ className }) => {
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
      id="pricing" 
      ref={sectionRef}
      className={cn(
        "py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-transparent via-ocean-light/5 to-transparent",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-wave-pattern bg-repeat-x bg-contain opacity-10 transform rotate-180"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 terminal-section-title inline-block">
            grep -i "pricing" | sort
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto text-foreground/80 font-mono">
            <span className="text-terminal-yellow">sudo</span> choose a plan that fits your project needs <span className="text-terminal-magenta">--no-cache</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          <PricingTier 
            title="Basic Site"
            price="$599"
            description="Perfect for small businesses just getting started online"
            features={[
              "Responsive WordPress site with up to 5 pages",
              "Custom theme based on your brand",
              "Basic SEO optimization",
              "Contact form integration",
              "1 month of support"
            ]}
            delay={0}
          />
          
          <PricingTier 
            title="Business Suite"
            price="$1,299"
            description="Comprehensive solution for established businesses"
            features={[
              "Responsive WordPress site with up to 10 pages",
              "Custom theme with advanced features",
              "E-commerce integration (up to 20 products)",
              "Advanced SEO package",
              "Performance optimization",
              "3 months of support & maintenance"
            ]}
            popular={true}
            delay={200}
          />
          
          <PricingTier 
            title="Enterprise"
            price="Custom"
            description="Tailored solutions for large organizations"
            features={[
              "Fully custom WordPress development",
              "Unlimited pages & functionality",
              "Advanced E-commerce & payment gateways",
              "Custom plugin development",
              "Premium hosting & security package",
              "6 months of priority support",
              "24/7 emergency assistance"
            ]}
            delay={400}
          />
        </div>
        
        <div className="mt-16 text-center">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 inline-block p-4 rounded-lg bg-terminal-black/10 backdrop-blur-md border border-ocean-light/10">
            <p className="text-sm text-foreground/70 font-mono">
              <span className="text-terminal-green">$</span> Need a custom solution? 
              <a href="#contact" className="text-ocean-light underline ml-2 hover:text-gold transition-colors">
                Contact us
              </a>
              <span className="animate-type-cursor inline-block w-2 h-4 ml-1 bg-ocean-light align-middle"></span>
            </p>
          </div>
        </div>
      </div>
      
      <WaveAnimation position="bottom" variant="choppy" />
    </section>
  );
};

export default Pricing;
