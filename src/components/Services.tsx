
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ServicesProps {
  className?: string;
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay = 0 }) => {
  return (
    <div 
      className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 relative group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-light/5 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative p-8 rounded-xl border border-ocean-light/10 hover:border-ocean-light/30 transition-all duration-300 h-full flex flex-col hover-lift bg-white/50 dark:bg-ocean-darker/50 backdrop-blur-sm">
        <div className="mb-5 text-gold">{icon}</div>
        <h3 className="text-xl font-serif font-bold mb-3">{title}</h3>
        <p className="text-foreground/70 flex-grow">{description}</p>
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
        "py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-ocean-light/5 to-transparent",
        className
      )}
    >
      <div className="absolute top-1/4 left-0 w-full h-1/2 bg-wave-pattern bg-repeat-x bg-contain opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 section-title inline-block after:left-1/2 after:-translate-x-1/2">
            My Services
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto text-foreground/80">
            Harnessing the power of modern web technologies to create exceptional digital experiences for businesses and individuals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
            }
            title="WordPress Development"
            description="Custom WordPress websites tailored to your specific needs, from blogs to e-commerce stores and business sites."
            delay={0}
          />
          
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <path d="M21 15l-5-5L5 21"></path>
              </svg>
            }
            title="UI/UX Design"
            description="Intuitive interfaces and engaging user experiences that look beautiful across all devices and provide seamless navigation."
            delay={100}
          />
          
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            }
            title="E-commerce Solutions"
            description="WooCommerce and custom e-commerce implementations with secure payment gateways and optimized product displays."
            delay={200}
          />
          
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            }
            title="Custom Web Applications"
            description="Tailor-made web applications with advanced functionality and integrations to meet your specific business requirements."
            delay={300}
          />
          
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            }
            title="Website Maintenance"
            description="Regular updates, security patches, and ongoing support to keep your website running smoothly and securely."
            delay={400}
          />
          
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            }
            title="SEO Optimization"
            description="On-page and technical SEO to improve your website's visibility in search engines and drive organic traffic."
            delay={500}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
