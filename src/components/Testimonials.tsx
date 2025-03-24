
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import WaveAnimation from './WaveAnimation';

interface TestimonialsProps {
  className?: string;
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  company: string;
  image: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  quote, 
  author, 
  company, 
  image,
  rating
}) => {
  return (
    <div className="px-4 py-8 md:py-10">
      <div className="relative p-6 md:p-8 rounded-xl bg-white dark:bg-ocean-darker/60 shadow-lg backdrop-blur-sm border border-ocean-light/10 h-full flex flex-col transition-all duration-300 hover:border-ocean-light/30 hover:shadow-ocean">
        {/* Water ripple effect on hover */}
        <div className="absolute -inset-px rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none">
          <div className="absolute inset-0 water-surface"></div>
        </div>
        
        {/* Quote content */}
        <div className="mb-6 relative z-10">
          {/* Rating stars */}
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={i < rating ? "#FFD700" : "none"} 
                stroke={i < rating ? "#FFD700" : "currentColor"} 
                className="w-5 h-5 text-muted-foreground mr-1"
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            ))}
          </div>
          
          {/* Quote text */}
          <blockquote className="font-serif italic text-foreground/80 relative">
            <svg 
              className="absolute -top-3 -left-3 w-8 h-8 text-gold/20" 
              fill="currentColor" 
              viewBox="0 0 32 32"
            >
              <path d="M10,8H6a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2h4v6H6a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2h4a6,6,0,0,0,6-6V14A6,6,0,0,0,10,8Z"></path>
              <path d="M26,8H22a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2h4v6H22a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2h4a6,6,0,0,0,6-6V14A6,6,0,0,0,26,8Z"></path>
            </svg>
            <p className="pl-6">{quote}</p>
          </blockquote>
        </div>
        
        {/* Author info */}
        <div className="mt-auto flex items-center relative z-10">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-ocean-light flex-shrink-0">
            <img src={image} alt={author} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-mono font-medium text-terminal-cyan">{author}</h4>
            <p className="text-sm text-foreground/60">{company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC<TestimonialsProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalTestimonials = 6;

  const testimonials = [
    {
      quote: "Working with Webseidon was a game-changer for our business. Their attention to detail and technical expertise transformed our outdated website into a powerful sales tool that our customers love navigating.",
      author: "Alexandra Chen",
      company: "OceanView Resorts",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      quote: "The WordPress site they built exceeded all our expectations. The custom functionality and e-commerce integration works flawlessly, and we've seen a 40% increase in online sales since launch.",
      author: "Michael Trent",
      company: "Aquatic Supplies Co.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      quote: "Responsive, creative, and technically brilliant. Their deep understanding of WordPress and attention to performance optimization gave us a website that loads lightning-fast and converts visitors effectively.",
      author: "Sophia Winters",
      company: "Digital Horizons",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4
    },
    {
      quote: "I needed a complex membership site with custom user roles and payment processing. Webseidon delivered a solution that works seamlessly and is easy to manage on the backend.",
      author: "David Marino",
      company: "SeaClub Membership",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      quote: "We've worked with many WordPress developers over the years, but none have matched Webseidon's technical skill and creative vision. They truly understand how to blend design and functionality.",
      author: "Emily Zhang",
      company: "Coastal Media Group",
      image: "https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      quote: "The ongoing maintenance and support has been just as impressive as the initial build. Any issues are addressed promptly, and their advice on improvements has been invaluable.",
      author: "Thomas Reynolds",
      company: "Neptune Technologies",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4
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

  // Auto-rotate testimonials
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
        "py-20 md:py-28 relative overflow-hidden bg-ocean-light/5",
        className
      )}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 terminal-section-title inline-block">
            tail -f /client/feedback.log
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto text-foreground/80 font-mono">
            <span className="text-terminal-green">echo</span> "What our clients say about our services" <span className="text-terminal-red">|</span> <span className="text-terminal-cyan">more</span>
          </p>
        </div>

        <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          {/* Desktop version - grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
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
                      ? "bg-gold w-8" 
                      : "bg-ocean-light/30 hover:bg-ocean-light/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <WaveAnimation position="bottom" waveColor="rgb(93, 169, 233)" intensity="light" variant="cascade" />
    </section>
  );
};

export default Testimonials;
