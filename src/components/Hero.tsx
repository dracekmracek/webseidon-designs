
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import WaveAnimation from './WaveAnimation';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const tridentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate elements on load
    const timer = setTimeout(() => {
      document.querySelectorAll('.hero-animate').forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('opacity-100');
          el.classList.remove('translate-y-10');
        }, index * 200);
      });
    }, 300);

    // Floating animation for trident
    const handleMouseMove = (e: MouseEvent) => {
      if (!tridentRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = tridentRef.current.getBoundingClientRect();
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const moveX = (clientX - centerX) / 50;
      const moveY = (clientY - centerY) / 50;
      
      tridentRef.current.style.transform = `translate(${moveX}px, ${moveY}px) rotate(15deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="hero" 
      className={cn(
        "relative min-h-screen flex items-center pt-28 pb-16 px-4 overflow-hidden",
        className
      )}
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-ocean-darker/5 dark:bg-ocean-darker/50 z-0"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-ocean-light/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <div className="flex items-center space-x-2 mb-3 opacity-0 translate-y-10 transition-all duration-700 hero-animate">
              <div className="h-px w-12 bg-gold"></div>
              <span className="text-ocean-medium text-sm tracking-wider uppercase">Full Stack Developer</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 translate-y-10 transition-all duration-700 delay-100 hero-animate">
              <span className="block">Modern web</span>
              <span className="block">solutions with</span>
              <span className="text-gold-shimmer">Webseidon</span>
            </h1>
            
            <p className="text-lg text-foreground/80 mb-8 max-w-lg opacity-0 translate-y-10 transition-all duration-700 delay-200 hero-animate">
              Crafting exceptional web experiences with the power of a digital deity. 
              Wordpress development with modern techniques and creative excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8 opacity-0 translate-y-10 transition-all duration-700 delay-300 hero-animate">
              <button
                onClick={() => {
                  const element = document.getElementById('projects');
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
                See my work
              </button>
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
                className="btn-primary"
              >
                Get in touch
              </button>
            </div>
            
            <div className="flex items-center space-x-4 opacity-0 translate-y-10 transition-all duration-700 delay-400 hero-animate">
              <div className="flex space-x-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div
              ref={tridentRef}
              className="relative max-w-sm mx-auto transform rotate-15 transition-transform duration-300 animate-float opacity-0 translate-y-10 transition-all duration-700 delay-500 hero-animate"
            >
              {/* Trident SVG */}
              <svg
                viewBox="0 0 300 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto filter drop-shadow-xl"
              >
                <path
                  d="M150 60V450"
                  stroke="#FFD700"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M150 0V60M110 60V150C110 160 120 170 130 170H170C180 170 190 160 190 150V60"
                  stroke="#FFD700"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M70 60V100C70 110 75 115 80 120L120 150"
                  stroke="#FFD700"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M230 60V100C230 110 225 115 220 120L180 150"
                  stroke="#FFD700"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M150 450L100 500"
                  stroke="#FFD700"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M150 450L200 500"
                  stroke="#FFD700"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                {/* Digital wave effects around the trident */}
                <path
                  className="animate-blink"
                  d="M90 100C100 90 110 85 120 90C130 95 140 100 150 95C160 90 170 85 180 90C190 95 200 100 210 95"
                  stroke="#5DA9E9"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="4 8"
                  opacity="0.6"
                />
                <path
                  className="animate-blink animation-delay-400"
                  d="M95 130C105 120 115 115 125 120C135 125 145 130 155 125C165 120 175 115 185 120C195 125 205 130 215 125"
                  stroke="#5DA9E9"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="4 8"
                  opacity="0.6"
                />
                <path
                  className="animate-blink animation-delay-800"
                  d="M85 160C95 150 105 145 115 150C125 155 135 160 145 155C155 150 165 145 175 150C185 155 195 160 205 155"
                  stroke="#5DA9E9"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="4 8"
                  opacity="0.6"
                />
              </svg>
              
              {/* Digital water droplets */}
              <div className="absolute w-full h-full top-0 left-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute bg-ocean-light/30 w-2 h-2 rounded-full animate-fall"
                    style={{
                      left: `${50 + Math.random() * 30 - 15}%`,
                      top: `${Math.random() * 80}%`,
                      animationDuration: `${1 + Math.random() * 3}s`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Digital water splash effect at the bottom */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-16 opacity-0 translate-y-10 transition-all duration-700 delay-600 hero-animate">
              <div className="relative w-full h-full">
                <div className="absolute bottom-0 left-0 w-full">
                  <svg viewBox="0 0 100 25" className="w-full h-auto">
                    <path
                      d="M0,25 L100,25 L100,20 C85,15 70,25 50,15 C30,5 15,15 0,20 L0,25 Z"
                      fill="rgba(93, 169, 233, 0.3)"
                    />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 w-full animation-delay-200">
                  <svg viewBox="0 0 100 20" className="w-full h-auto">
                    <path
                      d="M0,20 L100,20 L100,15 C80,5 65,15 50,10 C35,5 20,10 0,15 L0,20 Z"
                      fill="rgba(93, 169, 233, 0.2)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <WaveAnimation position="bottom" />
    </section>
  );
};

export default Hero;
