
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

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
      className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="p-6 rounded-xl bg-white/80 dark:bg-ocean-darker/80 backdrop-blur-sm border border-ocean-light/10 hover:border-ocean-light/30 transition-all duration-300 hover-lift">
        <div className="flex items-start">
          <div className="mr-4 text-ocean-light">{icon}</div>
          <div>
            <h3 className="font-mono text-lg font-medium mb-2 group-hover:text-gold transition-colors duration-300">{title}</h3>
            <p className="text-foreground/70 text-sm mb-3">{description}</p>
            <div className="flex items-center">
              <div className="flex-grow h-2 bg-ocean-light/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gold-gradient rounded-full transition-all duration-1000 transform origin-left"
                  style={{ 
                    width: '10%', 
                    animation: 'skill-bar-fill 1.5s ease-out forwards',
                    animationDelay: `${delay + 500}ms`,
                  }}
                  data-width={`${level * 20}%`}
                ></div>
              </div>
              <span className="ml-3 text-xs font-mono text-ocean-medium">{level * 20}%</span>
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
          const skillBars = entry.target.querySelectorAll('.bg-gold-gradient');
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
    <section 
      id="technologies" 
      ref={sectionRef}
      className={cn(
        "py-20 md:py-28 relative overflow-hidden",
        className
      )}
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-5 bg-terminal-grid bg-[length:50px_50px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 terminal-section-title inline-block">
            ls -la /my/tech/stack
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto text-foreground/80 font-mono">
            <span className="text-terminal-magenta">cat</span> technologies.json <span className="text-terminal-red">|</span> <span className="text-terminal-cyan">jq</span> .expertise
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
            description="Expert-level development with custom themes, plugins, and advanced configurations for optimal performance and security."
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
            description="Building high-performance e-commerce stores with custom checkout flows, payment gateways, and product displays."
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
            description="Core backend development with expertise in modern PHP practices, custom REST APIs, and database optimization."
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
            description="Creating interactive UIs with modern JavaScript frameworks and libraries for enhanced user experiences."
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
            description="Crafting intuitive user interfaces with a focus on accessibility, usability, and beautiful aesthetics."
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
            title="Performance Optimization"
            description="Implementing best practices for lightning-fast websites with server-side optimizations and frontend performance tuning."
            level={5}
            delay={500}
          />
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 col-span-1 md:col-span-3" style={{ transitionDelay: `600ms` }}>
            <div className="p-6 rounded-xl border border-gold/30 bg-gradient-to-br from-white/50 to-white/20 dark:from-ocean-darker/80 dark:to-ocean-darker/60 backdrop-blur-md">
              <h3 className="font-mono text-lg font-medium mb-4 text-gold">Additional Technical Expertise</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "MySQL / Database Optimization", 
                  "SEO & Analytics", 
                  "Responsive Design", 
                  "Webpack / Gulp / Build Tools",
                  "AJAX & REST APIs", 
                  "CSS / SASS / Tailwind", 
                  "Git Version Control",
                  "Server Management"
                ].map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-gold rounded-full mr-2"></div>
                    <span className="text-sm font-mono">{skill}</span>
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
