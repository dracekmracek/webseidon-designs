
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Code, Terminal } from 'lucide-react';

interface ServicesProps {
  className?: string;
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  command: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, command, delay = 0 }) => {
  return (
    <div 
      className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 relative group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-terminal-blue/5 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative p-6 rounded-xl border border-terminal-green/20 hover:border-terminal-green/40 transition-all duration-300 h-full flex flex-col hover-lift bg-terminal-black/50 backdrop-blur-sm">
        <div className="flex items-center mb-4">
          <div className="flex gap-1.5 mr-auto">
            <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
          </div>
          <div className="text-terminal-white/70 text-xs font-mono">~/services/{title.toLowerCase().replace(/\s+/g, '-')}</div>
        </div>
        <div className="flex items-start mb-5">
          <div className="text-terminal-green mr-3 mt-1">{icon}</div>
          <div>
            <h3 className="text-xl font-mono font-bold mb-2 text-terminal-white">{title}</h3>
            <p className="text-terminal-white/70 flex-grow font-mono text-sm">{description}</p>
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-terminal-green/10">
          <div className="font-mono text-sm">
            <span className="text-terminal-green">$</span> <span className="text-terminal-white">{command}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC<ServicesProps> = ({ className }) => {
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
      id="services" 
      ref={sectionRef}
      className={cn(
        "py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-ocean-darker/20 to-transparent",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek00NiAxNGgtMnYtNGgydjR6TTI0IDIyaC00djJoNHYyaDJ2LTRoLTJ6TTEyIDMwdi0ySDh2MmgzdjJoMnYtMmgtMXptLTIgNnYtMkg4djJoMnptMCAxMHYtMmgtMnYyaDJ6bTMyLTI2di00aC0ydjRoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 terminal-section-title inline-block mb-6">
            services --list-all
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto text-foreground/80 font-mono">
            # Harnessing the power of modern web technologies to create exceptional digital experiences for businesses and individuals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={
              <Terminal className="w-8 h-8" />
            }
            title="WordPress Development"
            description="Custom WordPress websites with modern architecture, optimized performance and tailored to your specific needs."
            command="sudo apt install wordpress-custom"
            delay={0}
          />
          
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <path d="M21 15l-5-5L5 21"></path>
              </svg>
            }
            title="UI/UX Design"
            description="Intuitive interfaces and engaging user experiences that provide seamless navigation across all devices."
            command="./design --intuitive --responsive"
            delay={100}
          />
          
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            }
            title="E-commerce Solutions"
            description="WooCommerce and custom e-commerce implementations with secure payment gateways and optimized product displays."
            command="npm install woocommerce --secure"
            delay={200}
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
            title="Custom Web Applications"
            description="Tailor-made web applications with advanced functionality and integrations to meet your business requirements."
            command="git clone custom-webapp && cd custom-webapp"
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
            title="Website Maintenance"
            description="Regular updates, security patches, and ongoing support to keep your website running smoothly and securely."
            command="crontab -e && systemctl restart nginx"
            delay={400}
          />
          
          <ServiceCard 
            icon={
              <Code className="w-8 h-8" />
            }
            title="SEO Optimization"
            description="On-page and technical SEO to improve your website's visibility in search engines and drive organic traffic."
            command="./optimize --seo --performance"
            delay={500}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
