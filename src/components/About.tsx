
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className }) => {
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
      id="about" 
      ref={sectionRef}
      className={cn(
        "py-20 md:py-28 relative overflow-hidden",
        className
      )}
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-ocean-light/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gold/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Image Section */}
          <div className="w-full md:w-5/12 relative">
            <div className="relative animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <div className="absolute -inset-4 bg-ocean-gradient/10 rounded-lg blur"></div>
              <div className="relative rounded-lg overflow-hidden border border-ocean-light/20 shadow-xl">
                <div className="aspect-[4/5] bg-ocean-darker/5">
                  <div className="w-full h-full bg-gradient-to-br from-ocean-dark/80 to-ocean-light/80 p-8 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-gold-shimmer text-5xl font-serif mb-4">∿≡</div>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">Webseidon</h3>
                      <p className="text-white/80">Full Stack Developer</p>
                      <div className="mt-6 h-px w-16 bg-gold mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold/10 rounded-full blur-xl"></div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-7/12">
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <h2 className="section-title">About Me</h2>
              <p className="text-lg mb-6 text-foreground/80">
                I'm a passionate full-stack developer specializing in creating exceptional WordPress websites and custom web applications with the power and elegance of Poseidon's command over the digital seas.
              </p>

              <p className="mb-8 text-foreground/80">
                With years of experience in web development, I combine technical expertise with creative design to deliver websites that not only look stunning but also perform flawlessly. I take pride in creating digital experiences that make waves in the industry.
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 trident-bullet">
                <li>WordPress Development</li>
                <li>Custom Theme Creation</li>
                <li>E-commerce Solutions</li>
                <li>Performance Optimization</li>
                <li>Responsive Design</li>
                <li>API Integration</li>
                <li>SEO Optimization</li>
                <li>Website Maintenance</li>
              </ul>

              <button 
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                      top: offsetTop - 80,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="btn-gold"
              >
                Get in touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
